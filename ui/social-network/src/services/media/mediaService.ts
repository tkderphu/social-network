import api from "../../axios/interceptor"

const path = "/medias"
class MediaService {

    upload(formData?: FormData) {
        return api.post(`${path}/uploads`, formData)
    }
}
export default new MediaService()