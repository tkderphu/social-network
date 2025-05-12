import api from "../../axios/interceptor"
import { AuthInitPasswordReqVO, AuthLoginReqVO } from "../../model/authModel"


class AuthenService {
    login(authLoginReq: AuthLoginReqVO) {
        return api.post('/auth/login', authLoginReq)
    }
    forgotPassword(email: string) {
        return api.post(`/auth/forgot-password?email=${email}`)
    }
    initPassword(authInitPasswordReq: AuthInitPasswordReqVO) {
        return api.post('/auth/init-password', authInitPasswordReq)
    }
    logout() {
        return api.get("/auth/logout")
    }

}
export default new AuthenService()