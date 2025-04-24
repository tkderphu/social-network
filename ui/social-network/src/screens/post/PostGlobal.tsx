import { useLocation } from "react-router"

export default function PostGlobal() {
    const location = useLocation()
    const isPostOpen = location.pathname.startsWith("/posts")
    console.log("isOpen Post: ", location.pathname, isPostOpen)
    if (!isPostOpen) return null
    return (
        <>
            test
        </>
    )
}
