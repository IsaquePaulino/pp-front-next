import Axios from 'axios'

export const api = Axios.create({
    baseURL: "https://backend-pp-2025-1.onrender.com"
})