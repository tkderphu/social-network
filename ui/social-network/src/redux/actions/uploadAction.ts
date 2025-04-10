import uploadService from "../../services/upload/uploadService"
import { UPLOAD_FILE_BEGIN, UPLOAD_FILE_FAILED } from "../constants/uploadConstant"

export const uploadsAction = (formData: FormData) => {
    return (dispatch: any) => {
        dispatch({
            type: UPLOAD_FILE_BEGIN
        })
        uploadService.uploads(formData).then(resp => {
            const imageUrl = resp.data
            dispatch({
                //save image to user gallery
            })

        }).catch(err => {
            if(err.status === 401) {
                localStorage.clear()
                alert("Your token is expired, please login again");
                location.href = '/login'
            }
            console.log("err: ", err)
            dispatch({
                type: UPLOAD_FILE_FAILED,
                payload: {
                    message: err.message,
                    status: err.code,
                    error: err
                }
            })
        })
    }
}