import React, { useState } from 'react'
import PrivacyFR from './PrivacyFR'
import PrivacyEN from './PrivacyEN'

const PrivacyPolicy = () => {
    const [language, setLanguage] = useState('fr')

  return (
    <div>
        
        <div className='services__body' id='privacy-policy'>
            <div className='lang-container'>
                <button className={language === "fr" ? "lang-on" : ""} onClick={()=>setLanguage("fr")}>FR</button> | <button onClick={()=>setLanguage("en")} className={language === "en" ? "lang-on" : ""}>EN</button>
            </div>
            <div>
                <h1 className='title relative'>Privacy Policy </h1>
                <h2 className='sub-title'>Metamorphose Productions</h2>
            </div>
            <div className='policy-body'>
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