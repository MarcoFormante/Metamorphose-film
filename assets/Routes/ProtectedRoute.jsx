import React from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axiosInstance"

const ProtectedRoute = ({isAuth,setIsAuth})=>{
    const navigate = useNavigate()
    const logout = ()=>{
      delete axiosInstance.defaults.headers.common['Authorization']
      sessionStorage.clear()
      navigate("/")
      setIsAuth(false)
    }
  
    const back = ()=>{
      window.history.back()
    }
  
    if (isAuth) {
        return (
          <div>
            <span className='logout-btn' onClick={logout}>Logout</span>
            <span className='back-btn' onClick={back}>Back</span>
              <Outlet/>
          </div>
        )
    }else{
        return <Navigate to="/login"/>
    }
  }

export default ProtectedRoute