import api from "../axios/interceptor"
import { AuthInitPasswordReqVO, AuthLoginReqVO, AuthRegisterReqVO } from "../model/authModel"


class AuthenService {
    login(authLoginReq: AuthLoginReqVO) {
        return api.post('/auth/login', authLoginReq)
    }
    register(authRegisterReq: AuthRegisterReqVO) {
        return api.post('/auth/register', authRegisterReq)
    }
    forgotPassword(email: string) {
        return api.post(`/auth/forgot-password?email=${email}`)
    }
    initPassword(authInitPasswordReq: AuthInitPasswordReqVO) {
        return api.post('/auth/init-password', authInitPasswordReq)
    }

}
export default new AuthenService()