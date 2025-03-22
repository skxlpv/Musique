import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000/";
const REFRESH_URL = `${BASE_URL}api/token/refresh/`;
const LOGIN_URL = `${BASE_URL}api/token/`;
const LOGOUT_URL = `${BASE_URL}api/v1/logout/`;
const REGISTER_URL = `${BASE_URL}api/v1/register/`;
const CHECK_AUTH_ROUTE = `${BASE_URL}api/v1/check_auth/`;
const AUTH_URL = `${BASE_URL}api/v1/check_auth/`;
const CURRENT_USER = `${BASE_URL}api/v1/users/me`
const MEDIA_ROOT = `${BASE_URL}media/`
export const MEDIA_AVATARS = `${MEDIA_ROOT}users/avatars/`

function getCsrfToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue;
}

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

api.interceptors.request.use(config => {
  if (config.method !== 'get') {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
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

export const check_auth = async () => {
  try {
    const response = await api.get(CHECK_AUTH_ROUTE);
    return response.data;
  } catch (error) {
    return call_refresh(error, () => api.get(CHECK_AUTH_ROUTE));
  }
};

export const is_authenticated = async () => {
  try {
    await api.post(AUTH_URL, {});
    return true;
  } catch (error) {
    return false;
  }
};

export const get_current_user = async () => {
  try {
    const response = await api.get(CURRENT_USER);
    return response.data;
  } catch (error) {
    return call_refresh(error, () => api.get(CURRENT_USER));
  }
};

export default api;
