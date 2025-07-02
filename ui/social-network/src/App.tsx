import { useEffect, useState } from 'react'

import './App.css'
import { Routes, BrowserRouter, Route, useLocation } from 'react-router'
import LoginScreen from './screens/authen/LoginScreen'
import ForgotPassworScreen from './screens/authen/ForgotPasswordScreen'
import RegisterScreen from './screens/authen/RegisterScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import Header from './components/Header'
import Friend from './screens/friend/Friend'
import Suggestion from './screens/friend/Suggestion'
import UserChatBox from './screens/chat/UserChatBox'
import ChatContainer from './screens/chat/ChatContainer'
import SearchResult from './screens/search/SearchResult'
import PostSearchResult from './screens/search/PostSearchResult'
import Home from './screens/home/Home'
import Group from './screens/group/Group'
import { Provider } from 'react-redux'
import store from './redux/store'
import { TokenUtils } from './common'
import FriendRequest from './screens/friend/FriendRequest'
import ListFriend from './screens/friend/ListFriend'
import FriendAccept from './screens/friend/FriendAccept'
import ChatList from './screens/chat/ChatList'
import NewFeed from './screens/feed/NewFeed'
import GroupPage from './screens/group/GroupDetails'
import UserSearchResult from './screens/search/UserSearchResult'
import PostDetailDialog from './screens/post/PostDetailDialog'
import Messenger from './screens/chat/Messenger'
import GroupChatForm from './screens/chat/GroupChatForm'
import { ac } from 'react-router/dist/development/route-data-BmvbmBej'
import { connectStomp } from './utils/stomp/stomp.client'
import Messenger1 from './screens/chat/Messenger1'
import ConversationInfo from './screens/chat/ConversationInfo'
import Sidebar from './components/Sidebar'
import FriendProfile from './screens/friend/FriendProfile'
import ChatArea from './screens/chat/ChatArea'
import ProfilePostComponent from './screens/profile/ProfilePostComponent'
import ProfilePhotosComponent from './screens/profile/ProfilePhotosComponent'
import ProfileAbouComponent from './screens/profile/ProfileAboutComponent'
import ProfileFriendsComponent from './screens/profile/ProfileFriends'
import GroupDetails from './screens/group/GroupDetails'
import GroupAbout from './screens/group/GroupAbout'
import GroupPost from './screens/group/GroupPost'
import GroupMember from './screens/group/GroupMember'
import ProtectedRoute from './components/ProtectedRoute'
import LogoutScreen from './screens/authen/Logout'
import ForgotPassworCodeScreen from './screens/authen/ForgotPasswordCodeScreen'
import CreateNewPasswordScreen from './screens/authen/CreateNewPasswordScreen'
import { useStompClient } from './utils/useStomp'
import MyFriends from './screens/friend/MyFriends'
import Notification from './screens/notification/Notification'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyListGroup from './screens/group/MyListGroup'
import GroupManagement, { GroupSetting, PendingPost, PendingUser } from './screens/group/GroupManagement'
import GroupUserProfile from './screens/group/GroupUserProfile'
import GroupProvider from './screens/group/GroupProvider'
import GroupWrapper from './screens/group/GroupWrapper'

export interface HandleChat {
  handleClickChat: any,
  handleCloseChat: any
}
function App() {


  useEffect(() => {

  }, [])




  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  console.log("location: ", location)

  return (
    <>
      <Provider store={store}>
        {/* {!["/login", "/forgot-password", "/register"].includes(location.pathname) &&
          <Header container={userChatBoxs || new Array<any>()} fn={(arr: Array<any>) => {
            setUserChatBoxs(arr)
          }} />} */}
        <div className='container-fluid'>
          <div className='row'>
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='main-content'>
              <Routes location={state?.backgroundLocation || location}>

                <Route path='login' element={<LoginScreen />}></Route>
                <Route path='register' element={<RegisterScreen />}></Route>
                <Route path='forgot-password' element={<ForgotPassworScreen />} />
                <Route path='forgot-password-code' element={<ForgotPassworCodeScreen />} />
                <Route path='new-password' element={<CreateNewPasswordScreen />} />

                <Route element={<ProtectedRoute />}>
                  <Route path='/' element={<Home />} />
                  <Route path='logout' element={<LogoutScreen />} />
                  <Route path='friends' element={<Friend />}>
                    <Route element={<MyFriends />} index />

                    <Route path='suggestions' element={<Suggestion />} >
                    </Route>

                    <Route path='requests' element={<FriendRequest />} >
                    </Route>

                    <Route path='accepts' element={<FriendAccept />}>
                    </Route>

                    <Route path='profile/:id' element={<FriendProfile />}>
                    </Route>

                  </Route>

                  <Route path='profile/:userId' element={<ProfileScreen />} >
                    <Route element={<ProfilePostComponent />} index />
                    <Route element={<ProfilePostComponent />} path='posts' />
                    <Route element={<ProfilePhotosComponent />} path='photos' />
                    <Route element={<ProfileAbouComponent />} path='about' />
                    <Route element={<ProfileFriendsComponent />} path='friends' />

                  </Route>

                  <Route path='search' element={<SearchResult />}>
                    <Route index element={<UserSearchResult />} />
                    <Route path='profile/:id' element={<ProfileScreen />} />
                  </Route>
                  <Route path='search/posts' element={<PostSearchResult />}></Route>
                  <Route element={<Messenger1 />} path='inbox' >

                    <Route element={<ChatArea />} path="c/:id" />
                    <Route element={<ChatArea />} path="c/u/:id" />
                    {/* <Route elemen /> */}
                  </Route>


                </Route>

              </Routes>
              {/**group route */}
              <GroupProvider>
                <Routes location={state?.backgroundLocation || location}>
                  <Route element={<GroupWrapper />}>
                    <Route path='groups' element={<Group />}>
                      {/* <Route path='joined' element={<GroupPage/>} /> */}
                      <Route path='feed' element={<NewFeed />} />
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
                        </Route>
                      </Route>
                      <Route path=':groupId/profile/:userId' element={<GroupUserProfile />} />
                      <Route path='my' element={<MyListGroup />} />
                    </Route>
                  </Route>

                </Routes>
              </GroupProvider>
              {state?.backgroundLocation && (
                <Routes>
                  <Route path="/posts/:id" element={<PostDetailDialog />} />
                  <Route path='notifications' element={<Notification />} />

                </Routes>
              )}
            </div>
          </div>

          <ToastContainer />
        </div>
      </Provider>
    </>
  )
}

export default App
