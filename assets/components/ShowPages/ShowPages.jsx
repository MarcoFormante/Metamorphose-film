import React from 'react'
import {  NavLink } from 'react-router-dom'
const pages = [{
   name: 'ACCEUIL',
   to: '/'
   },
   {
   name: 'GALERIE',
   to: '/galerie'
   },
   {
   name: 'SERVICES',
   to: '/services'
   },
   {
   name: 'A PROPOS',
   to: '/a-propos'
   },
   {
   name: 'CONTACT',
   to: '/contact'
   },
]


export const ShowPages = ({isShowingPages,setIsShowingPages}) => {


  return (
    <>
    <div className={`show-pages ${isShowingPages ? "show-pages__on" : "show-pages__off"}`}></div>
    <div className='show-pages__container' >
      { isShowingPages &&  <ul>

         {pages.map((page,index)=> 
         <li key={index}>
            <NavLink onClick={()=>setIsShowingPages(false)} to={page.to}>{page.name}</NavLink>  
        </li>
        )}

       </ul>
      }
    </div>
    </>
  )
}
