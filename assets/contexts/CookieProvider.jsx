import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import Cookies from 'js-cookie'

export const CookieContext = createContext()

const CookieProvider= ({children}) => {
    const [cookie, setCookie] = useState(Cookies.get('cookie') === 'accepted')

  return (
    <CookieContext.Provider value={{cookie,setCookie}}>
        {children}
    </CookieContext.Provider>
  )
}

export default CookieProvider