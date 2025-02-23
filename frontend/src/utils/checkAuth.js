import axios from 'axios';

export const checkAuthentication = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/check_auth', { withCredentials: true });
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.error('Authentication check failed:', error);
    }
    return false;
};
