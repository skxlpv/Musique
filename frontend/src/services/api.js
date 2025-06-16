import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/";
const REFRESH_URL = `${BASE_URL}api/token/refresh/`;
const LOGIN_URL = `${BASE_URL}api/token/`;
const LOGOUT_URL = `${BASE_URL}api/v1/logout/`;
const REGISTER_URL = `${BASE_URL}api/v1/register/`;
const AUTH_URL = `${BASE_URL}api/v1/check_auth/`;
const CURRENT_USER = `${BASE_URL}api/v1/users/me`
export const FILES_URL = `${BASE_URL}api/v1/files/`
export const MEDIA_ROOT = `${BASE_URL}media/`
export const MEDIA_AVATARS = `${MEDIA_ROOT}users/avatars/`

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

api.interceptors.request.use(config => {
  return config;
});

export const call_refresh = async (error, func) => {
  if (error.response && error.response.status === 401) {
    const tokenRefreshed = await refresh_token();
    if (tokenRefreshed) {
      const retryResponse = await func();
      return retryResponse.data;
    }
  }
  return null;
};

export const refresh_token = async () => {
  try {
    const response = await api.post(REFRESH_URL, {});
    return response.data.refreshed;
  } catch (error) {
    if (!error.response || error.response.status !== 401) {
      console.error("Refresh token error:", error);
    }
    return false;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post(LOGIN_URL, {
      username: username,
      password: password
    });

    if (response.data && response.data.success) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login API error:", error);
    return false;
  }
};

export const logout = async () => {
  try {
    await api.post(LOGOUT_URL, {});
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};

export const register_user = async (data) => {
  try {
    const response = await api.post(REGISTER_URL, {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    });

    if (response.status >= 200 && response.status < 300) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Registration error:", error);
    if (error.response && error.response.data) {
      console.error("Error details:", error.response.data);
    }
    return false;
  }
};

export const is_authenticated = async () => {
  try {
    const response = await api.post(AUTH_URL, {});
    console.log(response.data);
    return response.data.authenticated === true;
  } catch (error) {
    if (error.response?.status === 401) {
      return false;
    }
    console.error("Auth check error:", error);
    return false;
  }
};

export const get_current_user = async () => {
  try {
    const response = await api.get(CURRENT_USER);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error)
    return call_refresh(error, () => api.get(CURRENT_USER));
  }
};

export const get_user_files = async (username) => {
  try {
    const response = await api.get(FILES_URL + `${username}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// services/api.js

export const create_subprofile = async (data) => {
  try {
    const profileType = data.profileType;

    const payload = {
      profile_type: profileType.toUpperCase(),
      ...data
    };

    delete payload.profileType;

    // Process ManyToMany fields by converting comma-separated strings to arrays
    const processManyToManyFields = (fieldNames) => {
      fieldNames.forEach(field => {
        if (payload[field] && typeof payload[field] === 'string') {
          payload[field] = payload[field].split(',').map(item => item.trim());
        }
      });
    };

    // Process fields based on profile type
    switch (profileType) {
      case 'musician':
        processManyToManyFields(['instruments', 'genres', 'bands']);
        break;
      case 'artist':
        processManyToManyFields(['styles', 'mediums']);
        break;
      case 'theatre':
        processManyToManyFields(['current_projects', 'theatre_companies', 'preferred_genre']);
        break;
      case 'writer':
        processManyToManyFields(['genres']);
        break;
      case 'craftsman':
        processManyToManyFields(['materials']);
        break;
      default:
        throw new Error('Invalid profile type');
    }

    console.log(payload)

    const response = await api.post(`${BASE_URL}api/v1/user_profile/create_sub_profile`, payload);
    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases
      if (response.status === 400 && errorData.detail === "User already has this profile type") {
        throw new Error('You already have a profile of this type');
      }

      throw new Error(errorData.detail || 'Failed to create subprofile');
    }

    return await response.json();

  } catch (error) {
    console.error('Error creating subprofile:', error);
    throw error;
  }
};

export default api;
