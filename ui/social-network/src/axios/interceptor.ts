import axios, { AxiosError } from "axios";
import { T } from "react-router/dist/development/fog-of-war-Cm1iXIp7";
import { TokenUtils } from "../common";
// import {configDotenv} from 'dotenv'
// configDotenv()
const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`
const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000
})

// **Request Interceptor**
api.interceptors.request.use(
    (config) => {
        const token = TokenUtils.authLogin.accessToken
        console.log("token: ", token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach auth token
        } 
        console.log("config: ", config)
        console.log("Before send request")
        return config;
    },
    (error) => {
        // Handle request error
       console.error(error)
        return Promise.reject(error);
    }
);

// **Response Interceptor**
api.interceptors.response.use(
    (response) => {
        console.log("Response Received:", response);
        return response;
    },
    (error: AxiosError) => {
        console.error("response error: ", error)
        if (error.response) {
            const originalRequest: any = error.config
            if (error.response.status === 401 &&
                error.request.responseURL == `${baseUrl}/auth/refresh-token`) {
                window.location.href = '/login'
            }

            if(error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                axios.post(`${baseUrl}/auth/refreshToken?${TokenUtils.authLogin.refreshToken}`).then(response => {
                    TokenUtils.storeToken(response.data.data)
                    originalRequest.headers.Authorization = `Bearer ${TokenUtils.authLogin.accessToken}`;
                    return api(originalRequest)
                })
            }

        }
        return Promise.reject(error);
    }
);


export default api