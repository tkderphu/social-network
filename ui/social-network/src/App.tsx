import { useEffect, useState } from 'react'

import './App.css'
import { Routes, BrowserRouter, Route } from 'react-router'
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
function App() {
  const [userChatBoxs, setUserChatBoxs] = useState<Array<any>>()
  console.log(location.pathname)

  return (
    <>
      <Provider store={store}>
        {!["/login", "/forgot-password", "/register"].includes(location.pathname) && <Header container={userChatBoxs || new Array<any>()} fn={(arr: Array<any>) => {
          setUserChatBoxs(arr)
        }} />}
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='friends/suggestions' element={<Suggestion />} />
            <Route path='friends' element={<Friend />} />
            <Route path='login' element={<LoginScreen />}></Route>
            <Route path='register' element={<RegisterScreen />}></Route>
            <Route path='forgot-password' element={<ForgotPassworScreen />}></Route>
            <Route path='profile' element={<ProfileScreen />}></Route>
            <Route path='search' element={<SearchResult />}></Route>
            <Route path='search/posts' element={<PostSearchResult />}></Route>
            <Route path='groups' element={<Group />}></Route>
          </Routes>
        </BrowserRouter>
        <ChatContainer userChatBoxs={userChatBoxs} />
      </Provider>
    </>
  )
}

export default App
