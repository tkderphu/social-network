import axios from "axios";
import {configDotenv} from 'dotenv'
configDotenv()
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL_BACKEND}`
})



export default api