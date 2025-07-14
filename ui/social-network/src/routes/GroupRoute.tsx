import { Route, Routes, useLocation } from "react-router";
import Group from "../screens/group/Group";
import GroupProvider from "../screens/group/GroupProvider";
import GroupDetails from '../screens/group/GroupDetails'
import GroupAbout from '../screens/group/GroupAbout'
import GroupPost from '../screens/group/GroupPost'
import GroupMember from '../screens/group/GroupMember'
import MyListGroup from '../screens/group/MyListGroup'
import GroupManagement, { GroupSetting, PendingPost, PendingUser } from '../screens/group/GroupManagement'
import GroupUserProfile from '../screens/group/GroupUserProfile'
import GroupWrapper from '../screens/group/GroupWrapper'
import UsersWereBanned from '../screens/group/UsersWereBanned'
import GroupNewFeed from '../screens/group/GroupNewFeed'
export default function GroupRoute() {
    

  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location }
    return (
        <GroupProvider>
            <Routes location={state?.backgroundLocation || location}>
                <Route path='groups' element={<Group />}>
                    {/* <Route path='joined' element={<GroupPage/>} /> */}
                    <Route path='feed' element={<GroupNewFeed />} />
                    <Route index element={<GroupNewFeed />} />
                    <Route element={<GroupWrapper />}>
                        <Route path=':groupId' element={<GroupDetails />} >
                            <Route path='about' element={<GroupAbout />} />
                            <Route path='posts' element={<GroupPost />} />
                            <Route index element={<GroupPost />} />
                            <Route path='members' element={<GroupMember />} >
                            </Route>

                            <Route path='management' element={<GroupManagement />}>
                                <Route path='pending/post' element={<PendingPost />} />
                                <Route path='pending/user' element={<PendingUser />} />
                                <Route index element={<PendingUser />} />
                                <Route path='setting' element={<GroupSetting />} />
                                <Route path='unban' element={< UsersWereBanned />} />
                            </Route>
                        </Route>
                        <Route path=':groupId/profile/:userId' element={<GroupUserProfile />} />
                        <Route path='my' element={<MyListGroup />} />
                    </Route>
                </Route>

            </Routes>
        </GroupProvider>
    )
}