import api from "../../axios/interceptor"

class UploadService {
    upload(formData: FormData) {
        return api.post("/uploads", formData)
    }   
    uploads(formData: FormData) {
        return api.post("/uploads/multiples", formData)
    }

}
export default new UploadService()