import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signin = (formData) => API.post(`auth/signin`, formData);
export const signup = (formData) => API.post(`auth/signup`, formData);
