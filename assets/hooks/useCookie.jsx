import { useContext, useEffect, useState } from "react";
import { Cookies } from "react-cookie-consent";
import { CookieContext } from "../contexts/CookieProvider";

export default function useCookie(open = undefined){
     const {cookieIsAccepted,setCookie} = useContext(CookieContext)
     const [openBanner,setOpenBanner] = useState(false)

    const acceptCookie = ()=>{
        if (!cookieIsAccepted) {
              Cookies.set('cookie','accepted',{expires:365,path:'/',secure:true})
              setCookie(true)
          }
    }

    useEffect(()=>{
        setOpenBanner(open)
    },[open])

    return {acceptCookie,setOpenBanner,openBanner}

}