import React from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import { useSelector } from 'react-redux'
const AppRouter = () => {
  const userData = useSelector((state)=>state.reducer.user)
  console.log(userData)
  return (
    <Routes>
    {
      (!userData.data?.token)
        ? (
          <>
            <Route path='/auth' element={<Login />} />
            <Route path='/*' element={<Navigate to="/auth" />} />
          </>
        )
        : (
          <>
            <Route path='/home' element={<Home />} />
            <Route path='/*' element={<Navigate to="/home" />} />
          </>
        )
    }
  </Routes>
  )
}

export default AppRouter