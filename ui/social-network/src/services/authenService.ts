import api from "../axios/interceptor"


class AuthenService {
    login(email: string, password: string) {
        return api.post('/auth/login', {email, password})
    }
    register(email: string, password: string, firstName: string, lastName: string, dateOfBirth: string, sex: string) {
        return api.post('/auth/register', {email, password, firstName, lastName, dateOfBirth, sex})
    }
    forgotPassword(email: string) {
        return api.post(`/auth/forgot-password?email=${email}`)
    }
    initPassword(code: string, newPassword: string) {
        return api.post('/auth/init-password', {code, newPassword})
    }

}
export default new AuthenService()