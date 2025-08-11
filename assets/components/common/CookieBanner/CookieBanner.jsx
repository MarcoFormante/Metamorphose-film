import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { CookieContext } from '../../../contexts/CookieProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const CookieBanner = () => {
  
    const {setCookie,setOpenBanner} = useContext(CookieContext)

    const acceptCookie = () => {
        setOpenBanner(false)
        Cookies.set('cookie','accepted',{expires:365,path:'/',secure:true})
        setCookie(true)
        window.location.reload()
    }

    const refuseCookie = ()=>{
      setOpenBanner(false)
      Cookies.set('cookie','refused',{expires:365,path:'/',secure:true})
      setCookie(true)
      window.location.reload()
    }

    const handleClick = ()=>{
        setCookie(true)
        setOpenBanner(false)
    }


  return (
    <div className='cookie-banner'>
        <div className='cookie-banner__container' style={{position:"relative"}}>
            <div onClick={handleClick} style={{position:'absolute',right:5,top:5,zIndex:50,cursor:"pointer"}}>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#ffffff" stroke-width="1.5"></circle> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </div>
            <p className='cookie-banner__title'>Ce site utilise des Cookies</p>
            <p className='cookie-banner__text'>En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour vous offrir une expérience de navigation optimale.
            Pour en savoir plus sur les cookies que nous utilisons, veuillez consulter notre <strong><Link to={"/privacy-policy"}>politique de confidentialité</Link> </strong>
            </p>
            <div style={{display:"flex",gap:40}}>
              <button className='cookie-banner__button' onClick={()=> refuseCookie() }>Refuser</button>
              <button className='cookie-banner__button' onClick={()=> acceptCookie() }>Accepter</button>  
            </div>
        </div>
    </div>
  )
}

export default CookieBanner