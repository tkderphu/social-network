import { useState } from "react"
import { Link } from "react-router"
import ProfileScreen from "../profile/ProfileScreen"
import ListFriend from "./ListFriend"

function Suggestion() {
    return (
        <ListFriend type="SUGGESTION" title="Your suggestion friends"/>
    )
}
export default Suggestion