import { Route, Routes } from "react-router";
import ProfileFriendsComponent from "../screens/profile/ProfileFriends";
import ProfilePhotosComponent from "../screens/profile/ProfilePhotosComponent";
import ProfilePostComponent from "../screens/profile/ProfilePostComponent";
import ProfileScreen from "../screens/profile/ProfileScreen";

export default function ProfileRoute() {
    return (
        <Routes>
            <Route path='profile/:userId' element={<ProfileScreen />} >
                <Route element={<ProfilePostComponent />} index />
                <Route element={<ProfilePostComponent />} path='posts' />
                <Route element={<ProfilePhotosComponent />} path='photos' />
                <Route element={<ProfileFriendsComponent />} path='friends' />
            </Route>
        </Routes>
    )
}