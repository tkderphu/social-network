import axios from "axios";
// import {configDotenv} from 'dotenv'
// configDotenv()
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
})




export default api