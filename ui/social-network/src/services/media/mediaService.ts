import api from "../../axios/interceptor"
import { processJsonResponseFromServer1 } from "../../utils/utils"

const path = "/medias"
class MediaService {

    upload(formData?: FormData) {
        return api.post(`${path}/uploads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    getListUploaded(set: any) {
        processJsonResponseFromServer1(
            api.get(`${path}/uploads`),
            "getListUploaded",
            set
        )
    }
    saveMedia(listMediaReq: any) {
        processJsonResponseFromServer1(
            api.post(`${path}`, listMediaReq),
            "saveMedia",
            () => {}
        )
    }
}
export default new MediaService()