import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'

export const CookieContext = createContext()

const CookieProvider = ({children}) => {
    const [cookie, setCookie] = useState(Cookies.get('cookie'))
    const [cookieIsAccepted,setCoockieIsAccepted] = useState(cookie === "accepted")
    const [openBanner,setOpenBanner] = useState(false)
    const location = useLocation()
    const isCookiePath = new RegExp(/\/projet\/|\/services|\/a-propos/).test(location.pathname)

    useEffect(()=>{
      setCookie(Cookies.get('cookie'))
    },[Cookies.get("cookie")])

    useEffect(()=>{
      setCoockieIsAccepted(cookie === "accepted")
    },[cookie])

    useEffect(()=>{
      if (isCookiePath && !cookie) {
        setOpenBanner(true)
      }
    },[isCookiePath,cookie])

  return (
    <CookieContext.Provider value={{cookie,setCookie,cookieIsAccepted,openBanner,setOpenBanner}}>
        {children}
    </CookieContext.Provider>
  )
}

export default CookieProvider