import axios from "axios";

const baseURL = 'https://clinics-563e.onrender.com/api';

const api = axios.create({
    baseURL: baseURL,
});

export default api;
