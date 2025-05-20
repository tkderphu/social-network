import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import Alert from "../../components/Alert";
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader";
import Spinner from "../../components/Spinner";
import { logoutAction } from "../../redux/actions/authAction";

export default function LogoutScreen() {
    const dispatch = useDispatch()   
    const {success, loading} = useSelector((state: any) => {
        return state.logout
    }) 
    useEffect(() => {
        //@ts-ignore
        dispatch(logoutAction())
    }, [])


    if(success) {
        return <Navigate to={'/login'} replace={true} />
    }

    if(loading) {
       return <FullScreenLoader/>
    }
    return null
}