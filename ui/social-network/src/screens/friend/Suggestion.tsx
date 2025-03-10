import { useState } from "react"
import { Link } from "react-router"
import ProfileScreen from "../profile/ProfileScreen"

function Suggestion() {

    const [html, setHtml] = useState<any>()

    const seeProfile = () => {
        setHtml(<ProfileScreen/>)
    }

    return (
        <div className="row">
            <div className="col-3">
                <Link to={"/friends"}>Friends</Link>
                <button className="w-100 p-2" style={{ border: "none" }}>Suggestions</button>
                <div className="card mb-3 mt-2 pt-2 pb-2" onClick={() => {
                    seeProfile()
                }} style={{ marginRight: "20px", cursor: "pointer" }}>
                    <div className="d-flex align-items-center">
                        <img src="https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-1/476503885_122099746784764599_4075482615597324842_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_ohc=-dvUvOnE_S8Q7kNvgHx-dQn&_nc_oc=Adg3dKoPahVNldfT4lW6eoRUY2TE6rD5-rxjfnug_79DPvTFl-BRGi2jdfA_iMc0H-peH1thjP6p3dQzhsuBD1vQ&_nc_zt=24&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AIYzqjdWFzcrLHP25hwHq5I&oh=00_AYChHtsgEMhWGOo9AzNScOHJFkMty8LZxZTKpR5rlT2VUQ&oe=67CB53CC"
                            className="rounded-circle" alt="..."
                            height={"100px"} width={"100px"}
                        />
                        <div className="mx-5">
                        <h3 >Phu Quang</h3>
                            <button className="mt-3">Add Friend</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="col-8 ">
               {!html && ( <h3 className="text-center">Select people's names to preview their profile.</h3>)}
               {html && (html)}
            </div>
        </div>
    )
}
export default Suggestion