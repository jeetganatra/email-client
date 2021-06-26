import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signin = (formData) => API.post(`auth/signin`, formData);
export const signup = (formData) => API.post(`auth/signup`, formData);
export const getMails = () => API.get(`mails/`);
export const sendMail = (formData) => API.post(`mails/add`, formData);
