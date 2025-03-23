import {combineReducers} from 'redux'
import { forgotPasswordReducer, loginReducer, registerReducer } from './authReducer'
import { updateAddressReducer, updateEducationReducer, updateInfoReducer, uploadPersonalImageReducer } from './profileReducer'
const rootReducer = combineReducers({
    uploadPersonalImage: uploadPersonalImageReducer,
    updateInfo: updateInfoReducer,
    updateAddress: updateAddressReducer,
    updateEducation: updateEducationReducer,
    //auth
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer
})
export default rootReducer