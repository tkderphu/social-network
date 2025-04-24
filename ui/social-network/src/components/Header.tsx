import { useState } from "react"
import { Link } from "react-router"
import { defaultAvatar, TokenUtils } from "../common"
import Chat from "../screens/chat/Chat"
import Notify from "../screens/notify/Notify"


function Header(props: { container: any, fn: any }) {
    const [nav, setNav] = useState("home")
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ fontSize: "20px",  }}>
            <Link className="navbar-brand" to={"/"}>Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-between flex-wrap" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0" action={'/search'}>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <Link to={"/search"} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Link>
                </form>
                <ul className="navbar-nav ">
                    <li className={`nav-item ${nav === "home" ? "active" : ""}`}>
                        <Link className="nav-link" to="/" onClick={() => setNav("home")}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${nav === "friend" ? "active" : ""}`}>
                        <Link className="nav-link" to="/friends" onClick={()=> {
                            setNav("friend")
                        }}>Friends</Link>
                    </li>
                    <li className={`nav-item ${nav === "group" ? "active" : ""}`}>
                        <Link className="nav-link" to='/groups' onClick={() => setNav("group")}>Groups</Link>
                    </li>
                </ul>
                <ul className="navbar-nav d-flex align-items-center flex-wrap">
                    <li className="nav-item dropleft">
                        <a className="nav-link dropleft-toggle" href="#" id="user-message-dropleft" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <a className="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15" />
                            </svg></a>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="user-message-dropleft" style={{ fontSize: "18px", width: "500px" }}>
                            <Chat container={props.container} fn={props.fn} />
                        </div>
                    </li>
                    <li className="nav-item mx-3 dropleft">
                        <a className="nav-link dropleft-toggle" href="#" id="user-notification-dropleft" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <a className="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                            </svg></a>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="user-notification-dropleft" style={{ fontSize: "18px", width:"600px" }}>
                            <Notify/>
                        </div>
                    </li>
                    <li className="nav-item dropleft">
                        <a className="nav-link dropleft-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={defaultAvatar}
                                height={40} className='rounded-circle' width={40}
                            />
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ fontSize: "18px" }}>
                            <a href={`/profile/${TokenUtils.authLogin.userId}`} className="dropdown-item" >Profile</a>
                            <a className="dropdown-item" href="#">Change password</a>
                            <a className="dropdown-item" href="#">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Header