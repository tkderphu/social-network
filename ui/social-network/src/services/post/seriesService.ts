import api from "../../axios/interceptor"
import { processJsonResponseFromServer } from "../../utils/utils"

const path = "/series"
class SeriesService {
    getListSeries(set: any) {
        processJsonResponseFromServer(
            api.get(`${path}`),
            "getListSeries",
            set
        )
    }
    createSeries(set: any) {
        processJsonResponseFromServer(
            api.post(`${path}`),
            "createSeries",
            set
        )
    }
    deleteSeries(seriesId: any, set: any) {
        processJsonResponseFromServer(
            api.delete(`${path}/${seriesId}`),
            "deleteSeries",
            set,
            0
        )
    }
}
export default new SeriesService()