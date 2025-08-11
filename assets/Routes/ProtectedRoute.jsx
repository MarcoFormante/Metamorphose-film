import React from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axiosInstance"

const ProtectedRoute = ({isAuth,setIsAuth})=>{
    const navigate = useNavigate()
    const logout = ()=>{
      delete axiosInstance.defaults.headers.common['Authorization']
      sessionStorage.clear()
      axiosInstance.post("/admin/logout")
      .then(res =>{
          setIsAuth(false)
          navigate("/login",{replace:true})
      })
     
    }
  
    const back = ()=>{
      const pathname = window.location.pathname === "/admin/home" ? null : -1
      navigate(pathname,{replace:true})
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