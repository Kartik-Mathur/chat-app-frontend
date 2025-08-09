import axios from 'axios';

const API_URL = 'https://chat-app-backend-rkzy.onrender.com/api/auth';

// const api = axios.create({
//     baseURL: API_URL
// })

export const signup = (username, email, password) => {
    return axios.post(
        `${API_URL}/signup`,
        { username, email, password },
        { withCredentials: true } // cookies bhi saath jaengi
    )
};

export const login = (email, password) => {
    return axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
    );
};