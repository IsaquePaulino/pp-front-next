import axios from "axios"

export const api = axios.create({
    baseURL: "https://backend-pp-2025-1.onrender.com"
})
/*api.interceptors.request.use(
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
);*/