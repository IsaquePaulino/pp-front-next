import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:3331"
})
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    
    console.log('DEBUG Interceptor: Tentando anexar token. Token lido do localStorage:', token ? token.substring(0, 30) + '...' : 'NÃO ENCONTRADO'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);