import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticationSwitch from '../../authenticate/components/AuthenticatedSwitch'
import AdminDashboard from '../../dashboard/screens/AdminDashboard'
import CustomerDashboard from '../../dashboard/screens/CustomerDashboard'
import LoginScreen from '../../login/screens/LoginScreen'
import RegisterScreen from '../../register/screens/RegisterScreen'

interface Props {}

function MainRouter(props: Props) {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationSwitch/>}/>
      <Route path="/login" element={<AuthenticationSwitch redirect={<LoginScreen/>}/>}/>
      <Route path="/register" element={<AuthenticationSwitch redirect={<RegisterScreen/>}/>}/>
      <Route path="/dashboard" element={<AuthenticationSwitch to={<CustomerDashboard/>}/>}/>
      <Route path="/admin-dashboard" element={<AuthenticationSwitch to={<AdminDashboard/>}/>}/>
    </Routes>
    
  )
}

export default MainRouter
