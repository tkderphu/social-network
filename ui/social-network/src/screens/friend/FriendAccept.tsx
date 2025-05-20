import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader"
import { acceptMakeFriendRequestAction, fetchAllFriendRequestByReceiverAction, rejectMakeFriendRequestAction } from "../../redux/actions/friendshipAction"
import { UserRequest } from "../../services/friendship/friendshipService"
import { formatDate } from "../../utils/common"
import ListFriend from "./ListFriend"

function FriendAccept() {
    const dispatch = useDispatch()
    const state: {
        invitations: UserRequest[],
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchAllRequestFriendInvitation
    })
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllFriendRequestByReceiverAction())
    }, [])

    const acceptState: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.acceptMakeFriendRequest
    })

    const cancelState: {
        loading: boolean
    } = useSelector((state: any) => {
        return state.rejectMakeFriendRequest
    })

    const handleAccept = (userId: number) => {
        //@ts-ignore
        dispatch(acceptMakeFriendRequestAction(userId))
    }

    const handleCancel = (userId: number) => {
        //@ts-ignore
        dispatch(rejectMakeFriendRequestAction(userId))
    }

    if (state.loading || acceptState.loading || cancelState.loading) {
        return <FullScreenLoader />
    }
    return (
        <>
            <h3>Total friend invation: {state.invitations?.length || 0}</h3>
            <div className="d-flex flex-wrap mt-3">
                {state.invitations?.map(req => {
                    return (
                        <div className="card position-relative text-center  mb-3 d-flex align-item-center" style={{ marginRight: "20px", width: "200px" }}>
                            <div className="position-absolute  text-danger fw-bold " style={{ zIndex: 2 }}>
                                {formatDate(req.since)}
                            </div>
                            <div className="mt-2">
                                <img src={req.avatar}
                                    className="rounded" alt="..."
                                    height={"150px"} width={"150px"}
                                />
                            </div>
                            <div className="text-center mt-1">
                                <Link to={`/friends/profile/${req.id}`} style={{ textDecoration: "none" }} >{req.firstName + " " + req.lastName}</Link>
                            </div>
                            <button className="mt-2 rounded-0 btn btn-secondary" onClick={() => {
                                handleCancel(req.id)
                            }}>Cancel</button>
                            <button className="btn btn-primary rounded-0" onClick={() => {
                                handleAccept(req.id)
                            }}>Accept</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default FriendAccept