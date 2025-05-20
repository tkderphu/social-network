import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader"
import { fetchAllRequestMakeFriendAction } from "../../redux/actions/friendshipAction"
import { UserRequest } from "../../services/friendship/friendshipService"
import { formatDate } from "../../utils/common"
import ListFriend from "./ListFriend"

function FriendRequest() {
    const dispatch = useDispatch()
    const state: {
        requests: UserRequest[],
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchAllRequestMakeFriend
    })
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllRequestMakeFriendAction())
    }, [])

    if (state.loading) {
        return <FullScreenLoader />
    }

    return (
        <>
            <h3>Total requests: {state.requests?.length || 0}</h3>
            <div className="d-flex flex-wrap mt-3">

                {state.requests?.map(req => {
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
                            <button className="mt-2 btn btn-primary">Cancel</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default FriendRequest