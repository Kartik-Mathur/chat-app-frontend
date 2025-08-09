import axios from "axios";

const api = axios.create({
    baseURL: 'https://chat-app-backend-rkzy.onrender.com/api/posts',
    withCredentials: true,
});


export const fetchPosts = () => api.get('/');
export const createPost = (post) => api.post('/', post);
export const fetchPost = id => api.get(`/${id}`);