import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader"
import Spinner from "../../components/Spinner"
import { cancelFriendAction, cancelMakeFriendRequestAction, createFriendRequestAction, fetchStatusBetweenUserAction, rejectMakeFriendRequestAction } from "../../redux/actions/friendshipAction"

export default function FriendActionButton() {
    let { userId } = useParams()
    const fetchStatusState: {
        status: "FRIEND" | "MAKE_FRIEND" |
        "ACCEPT_FRIEND" |
        "NONE",
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchStatusBetweenUser
    })

    const dispatch = useDispatch()

    const friendshipActionOnClick = () => {
        if (fetchStatusState.status === 'NONE') {
            //@ts-ignore
            dispatch(createFriendRequestAction(userId))
        } else if (fetchStatusState.status === 'ACCEPT_FRIEND') {
            //@ts-ignore
            dispatch(acceptMakeFriendRequestAction(userId))
        } else if (fetchStatusState.status == 'MAKE_FRIEND') {
            //@ts-ignore
            dispatch(cancelMakeFriendRequestAction(userId))
        } else {
            //@ts-ignore
            dispatch(cancelFriendAction(userId))
        }
    }


    useEffect(() => {
          //@ts-ignore
          dispatch(fetchStatusBetweenUserAction(userId))
    }, [])


    if(fetchStatusState.loading) {
        return <FullScreenLoader/>
    }
    return (
        <>
            {fetchStatusState.status === 'ACCEPT_FRIEND' && <button className="btn btn-secondary mx-3" onClick={() => {
                //@ts-ignore
                dispatch(rejectMakeFriendRequestAction(userId))
            }}>Cancel</button>}

            <button className="btn btn-primary" onClick={() => {
                friendshipActionOnClick()
            }}>{fetchStatusState.status === 'NONE' ? "Add friend" : (fetchStatusState.status === 'MAKE_FRIEND' ? "Cancel made friend" : (fetchStatusState.status === 'ACCEPT_FRIEND' ? "Accept friend" : "Cancel friend"))}</button>

        </>
    )
}