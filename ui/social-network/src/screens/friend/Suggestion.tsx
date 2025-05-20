import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import FullScreenLoader from "../../components/fullSpinner/FullScreenLoader"
import { fetchSuggestionUsersAction } from "../../redux/actions/friendshipAction"
import { UserResp } from "../../services/friendship/friendshipService"

function Suggestion() {
    const dispatch = useDispatch()
    const state: {
        suggestions: UserResp[],
        loading: boolean
    } = useSelector((state: any) => {
        return state.fetchSuggestionFriends
    })
    useEffect(() => {
        //@ts-ignore
        dispatch(fetchSuggestionUsersAction())
    }, [])

    if (state.loading) {
        return <FullScreenLoader />
    }

    return (
        <>
            <h3>Total suggestion friends: {state.suggestions?.length || 0}</h3>
            <div className="d-flex flex-wrap mt-3">

                {state.suggestions?.map(req => {
                    return (
                        <div className="card position-relative text-center  mb-3 d-flex align-item-center" style={{ marginRight: "20px", width: "200px" }}>
                            
                            <div className="mt-2">
                                <img src={req.avatar}
                                    className="rounded" alt="..."
                                    height={"150px"} width={"150px"}
                                />
                            </div>
                            <div className="text-center mt-1">
                                <Link to={`/friends/profile/${req.id}`} style={{ textDecoration: "none" }} >{req.firstName + " " + req.lastName}</Link>
                            </div>
                            <button className="mt-2 btn btn-primary">Add friend</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Suggestion