import { useContext, useEffect, useState } from 'react'

import './App.css'
import { Routes, Route, useLocation } from 'react-router'
import LoginScreen from './screens/authen/LoginScreen'
import ForgotPassworScreen from './screens/authen/ForgotPasswordScreen'
import RegisterScreen from './screens/authen/RegisterScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import Friend from './screens/friend/Friend'
import Suggestion from './screens/friend/Suggestion'
import SearchResult from './screens/search/SearchResult'
import PostSearchResult from './screens/search/PostSearchResult'
import Home from './screens/home/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import FriendRequest from './screens/friend/FriendRequest'
import FriendAccept from './screens/friend/FriendAccept'
import UserSearchResult from './screens/search/UserSearchResult'
import PostDetailDialog from './screens/post/PostDetailDialog'
import Messenger1 from './screens/chat/Messenger'
import Sidebar from './components/Sidebar'
import FriendProfile from './screens/friend/FriendProfile'
import ChatArea from './screens/chat/ChatArea'
import ProfilePostComponent from './screens/profile/ProfilePostComponent'
import ProfilePhotosComponent from './screens/profile/ProfilePhotosComponent'
import ProfileAbouComponent from './screens/profile/ProfileAboutComponent'
import ProfileFriendsComponent from './screens/profile/ProfileFriends'

import ProtectedRoute from './components/ProtectedRoute'
import LogoutScreen from './screens/authen/Logout'
import ForgotPassworCodeScreen from './screens/authen/ForgotPasswordCodeScreen'
import CreateNewPasswordScreen from './screens/authen/CreateNewPasswordScreen'
import MyFriends from './screens/friend/MyFriends'
import Notification from './screens/notification/Notification'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SettingScreen from './screens/setting/SettingScreen'
import ProfileSettingComponent from './screens/setting/ProfileSetting/ProfileSettingComponent'
import GroupRoute from './routes/GroupRoute'
import UnProtectedRoute from './routes/UnProtectedRoute'
import { AppContext } from './provider/AppProvider'
import Search from './screens/search/Search'
import ModalCustome from './components/modal/ModalCustom'
import ProfileRoute from './routes/ProfileRoute'





function App() {




  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location }
  const openSearch = useContext(AppContext)?.openSearch
  const openNotification = useContext(AppContext)?.openNotification
  return (
    <>
      <Provider store={store}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='sidebar'>
              <Sidebar />
            </div>
            <div className='main-content'>
              {/* <ModalCustome
                  show={openSearch?.get || false}
                  children={<Search/>}
                  title={"Search"}
                  height={"100vh"}
                  closable={false}
                  onClose={() => openSearch?.set(false)}
              /> */}
              {openSearch?.get && <Search />}
              {openNotification?.get && <Notification />}
              {/* <ModalCustome
                  show={openNotification?.get || false}
                  children={<Notification/>}
                  title={"Notification"}
                  height={"100vh"}
                  closable={false}
                  onClose={() => openNotification?.set(false)}
              /> */}
              <Routes location={state?.backgroundLocation || location}>
                <Route element={<ProtectedRoute />}>
                  <Route path='/' element={<Home />} />
                  <Route path='setting' element={<SettingScreen />}>
                    <Route index element={<ProfileSettingComponent />} />
                    <Route path='profile' element={<ProfileSettingComponent />} />
                  </Route>
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

              <UnProtectedRoute />
              <GroupRoute />
              <ProfileRoute/>
              {state?.backgroundLocation && (
                <Routes>
                  <Route path="/posts/:id" element={<PostDetailDialog />} />
                  {/* <Route path='notifications' element={<Notification />} /> */}

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
