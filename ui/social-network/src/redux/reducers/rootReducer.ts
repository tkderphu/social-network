import {combineReducers} from 'redux'
import { loginReducer } from './authReducer'
import { updateAddressReducer, updateEducationReducer, updateInfoReducer, uploadPersonalImageReducer } from './profileReducer'
const rootReducer = combineReducers({
    uploadPersonalImage: uploadPersonalImageReducer,
    updateInfo: updateInfoReducer,
    updateAddress: updateAddressReducer,
    updateEducation: updateEducationReducer,
    //auth
    login: loginReducer
})
export default rootReducer