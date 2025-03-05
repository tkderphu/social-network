import { useState } from 'react'

import './App.css'
import {Routes, BrowserRouter, Route} from 'react-router'
import LoginScreen from './screens/authen/LoginScreen'
import ForgotPassworScreen from './screens/authen/ForgotPasswordScreen'
import RegisterScreen from './screens/authen/RegisterScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import Header from './components/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Header/>} /> */}
          <Route path='login' element={<LoginScreen/>}></Route>
          <Route path='register' element={<RegisterScreen/>}></Route>
          <Route path='forgot-password' element={<ForgotPassworScreen/>}></Route>
          <Route path='profile' element={<ProfileScreen/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
