import React, { useContext, useState } from 'react'
import PrivacyFR from './PrivacyFR'
import PrivacyEN from './PrivacyEN'
import BackButton from '../../components/common/BackButton/BackButton'
import { Cookies } from 'react-cookie-consent'
import SEO from '../../components/Seo/SEO'
import {  useNavigate } from 'react-router-dom'
import { CookieContext } from '../../contexts/CookieProvider'

const PrivacyPolicy = ({setShowPrivacyPolicy}) => {
    const [language, setLanguage] = useState('fr')
    const {cookie,setCookie} = useContext(CookieContext)
    const navigate = useNavigate()
    const deleteCookies = () => {
        document.cookie = "cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setCookie(true)
        window.location.reload()
    }

    const acceptCookies = () => {
        Cookies.set('cookie','accepted',{expires:365,path:'/',secure:true,sameSite:"Lax"})
        setCookie(true)
        window.location.reload()
    }
    
  return (
    <div>
         <SEO
            title={"Metamorphose Film - Privacy Policy"}
            url={"/privacy-policy"}
            robots={true}
          />
        <div className='services__body' id='privacy-policy'>
            <div className='lang-container'>
                <div>
                <BackButton
                    props={{ width: 24, height: 24 }}
                    callback={setShowPrivacyPolicy ? () => setShowPrivacyPolicy() : () => navigate("/")}
                    label={"Retour"}
                />
                </div>
                <div>
                    <button className={language === "fr" ? "lang-on" : ""} onClick={()=>setLanguage("fr")}>FR</button> | <button onClick={()=>setLanguage("en")} className={language === "en" ? "lang-on" : ""}>EN</button>
                </div>
            </div>
            <div>
                {cookie === "accepted" ?
                <div>
                    <button className='lang-on' onClick={deleteCookies}>{language === "fr" ? "Supprimer les Cookies" : " Delete Cookies"}</button>
                    <br />
                    <br />
                </div>
                :

                <div>
                <button className='lang-on' onClick={acceptCookies}>{language === "fr" ? "Accepter les cookies" : " Acccept cookies"}</button>
                <br />
                <br />
            </div>
                }
                <h1 className='title relative'>Privacy Policy </h1>
                <h2 className='sub-title'>Metamorphose Film</h2>
               
            </div>
            <div className='policy-body'  style={{textAlign:"left"}}>
            <p> <strong>Page:</strong> /privacy-policy</p>
                {language === 'fr' ?
                <PrivacyFR/>
                :
                <PrivacyEN/>
                }
            </div>
        </div>
    </div>
  )
}

export default PrivacyPolicy