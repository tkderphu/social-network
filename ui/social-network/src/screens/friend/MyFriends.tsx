import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { TokenUtils } from "../../common"
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader"
import { fetchAllFriendsAction } from "../../redux/actions/friendshipAction"
import { UserResp } from "../../services/friendship/friendshipService"
import { formatDate } from "../../utils/common"

export default function MyFriends() {
    const dispatch = useDispatch()
    const state: {
        friends: UserResp[],
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchAllFriends
    })
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchAllFriendsAction(TokenUtils.authLogin.userId))
    }, [])

    if (state.loading) {
        return <FullScreenLoader />
    }

    return (
        <>
            <h3>Total friends: {state.friends?.length || 0}</h3>
            <div className="d-flex flex-wrap mt-3">

                {state.friends?.map(friend => {
                    return (
                        <div className="card position-relative text-center  mb-3 d-flex align-item-center" style={{ marginRight: "20px", width: "200px" }}>
                            
                            <div className="mt-2">
                                <img src={friend.avatar}
                                    className="rounded" alt="..."
                                    height={"150px"} width={"150px"}
                                />
                            </div>
                            <div className="text-center mt-1">
                                <Link to={`/friends/profile/${friend.id}`} style={{ textDecoration: "none" }} >{friend.firstName + " " + friend.lastName}</Link>
                            </div>
                            <button className="mt-2 btn btn-primary">Cancel</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}