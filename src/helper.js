export const axiosHeaders = (getState) => {
    const token = getState().auth.token;
    // Headers
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers as bearer token
    if (token) {
        axiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    return axiosConfig;
}