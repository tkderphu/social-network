import api from "../../axios/interceptor"

const path = "/medias"
class MediaService {

    upload(formData?: FormData) {
        return api.post(`${path}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
export default new MediaService()