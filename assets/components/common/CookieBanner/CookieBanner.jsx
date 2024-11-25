import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { CookieContext } from '../../../contexts/CookieProvider'
import { Link } from 'react-router-dom'

const CookieBanner = () => {
    const {setCookie} = useContext(CookieContext)

    const acceptCookie = () => {
        Cookies.set('cookie','accepted',{expires:365,path:'/',secure:true})
        setCookie(true)
    }

  return (
    <div className='cookie-banner'>
        <div className='cookie-banner__container'>
            <p className='cookie-banner__title'>Ce site utilise des Cookies</p>
            <p className='cookie-banner__text'>En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies pour vous offrir une expérience de navigation optimale.
            Pour en savoir plus sur les cookies que nous utilisons, veuillez consulter notre <strong><Link to={"/privacy-policy"}>politique de confidentialité</Link> </strong>.
            </p>
            <button className='cookie-banner__button' onClick={()=> acceptCookie() }>Accepter</button>        
        </div>
    </div>
  )
}

export default CookieBanner