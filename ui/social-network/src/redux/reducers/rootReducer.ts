import { redirect } from 'react-router'
import {combineReducers} from 'redux'
import { fetchProfileAction } from '../actions/profileAction'
import { forgotPasswordReducer, loginReducer, redirectReducer, registerReducer } from './authReducer'
import { fetchProfileReducer, updateAddressReducer, updateEducationReducer, updateInfoReducer, uploadPersonalImageReducer } from './profileReducer'
const rootReducer = combineReducers({
    uploadPersonalImage: uploadPersonalImageReducer,
    updateInfo: updateInfoReducer,
    updateAddress: updateAddressReducer,
    updateEducation: updateEducationReducer,
    fetchProfile: fetchProfileReducer,
    //auth
    redirect: redirectReducer,
    login: loginReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer
})
export default rootReducer