import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, BrowserRouter, Route} from 'react-router'
import LoginScreen from './screens/authen/LoginScreen'
import ForgotPassworScreen from './screens/authen/ForgotPasswordScreen'
import RegisterScreen from './screens/authen/RegisterScreen'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginScreen/>}></Route>
          <Route path='register' element={<RegisterScreen/>}></Route>
          <Route path='forgot-password' element={<ForgotPassworScreen/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
