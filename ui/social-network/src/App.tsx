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
function App() {
  const [userChatBoxs, setUserChatBoxs] = useState<Array<any>>()

  useEffect(() => {
    let userChatBoxs = new Array<any>()
    userChatBoxs?.push(<UserChatBox />)
    // userChatBoxs?.push(<UserChatBox />)
    // userChatBoxs?.push(<UserChatBox />)
    // userChatBoxs?.push(<UserChatBox />)
    // userChatBoxs?.push(<UserChatBox />)
    // userChatBoxs?.push(<UserChatBox />)
    userChatBoxs?.push(<UserChatBox />)
    setUserChatBoxs(userChatBoxs)
  }, [])


  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Header/>} /> */}
          <Route path='friends/suggestions' element={<Suggestion />} />
          <Route path='friends' element={<Friend />} />
          <Route path='login' element={<LoginScreen />}></Route>
          <Route path='register' element={<RegisterScreen />}></Route>
          <Route path='forgot-password' element={<ForgotPassworScreen />}></Route>
          <Route path='profile' element={<ProfileScreen />}></Route>
        </Routes>
      </BrowserRouter>
      <ChatContainer userChatBoxs={userChatBoxs}/>
    </>
  )
}

export default App
