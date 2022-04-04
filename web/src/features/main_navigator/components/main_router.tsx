import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticationSwitch from '../../authenticate/components/authenticate'
import DashboardScreen from '../../dashboard/screens/dashboard_screen'
import LoginScreen from '../../login/screens/login_screen'
import RegisterScreen from '../../register/screens/register_screen'

interface Props {}

function MainRouter(props: Props) {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationSwitch/>}/>
      <Route path="/login" element={<AuthenticationSwitch redirect={<LoginScreen/>}/>}/>
      <Route path="/register" element={<AuthenticationSwitch redirect={<RegisterScreen/>}/>}/>
      <Route path="/dashboard" element={<AuthenticationSwitch to={<DashboardScreen/>}/>}/>
    </Routes>
    
  )
}

export default MainRouter
