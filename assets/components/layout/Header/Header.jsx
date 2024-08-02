import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEventListener } from '../../../hooks/useEventListener'
import logo from './trace.svg'
// const logo = {
//   white: "/Logo2_fond_blanc.png",
//   red: "/Logo2_fond_rouge.png"
// }

export const Header = ({headerColor}) => {
  const [menuActive, setMenuActive] = useState(false)
  const[ windowWidth,setWindowWidth] = useState(window.innerWidth)
  const location = useLocation()
  const pathname = location.pathname
  useEventListener("resize",window,()=>setWindowWidth(window.innerWidth),[],false)


  useEffect(()=>{
    if (menuActive || windowWidth > 1024) {
      setMenuActive(false)
    }
  },[pathname,windowWidth])  




  // const onMouseEnter = useCallback((e) => { 
  //   // e.target.src = logo.red
  //   // if (pathname.match(/a_propos|galerie/)) {
  //   //   e.target.src = logo.white
  //   //   return
  //   // }
  //   // if (["/"].includes(pathname)) {
  //   //   e.target.src = logo.red
  //   //   return
  //   // }
  // },[pathname])



  // const onMouseLeave = useCallback((e) => {
  //   //  e.target.src = "/Logo2_fond_blanc.png"
  //   // if (pathname.match(/a_propos|galerie/)) {
  //   //   e.target.src = "/Logo2_fond_rouge.png"
  //   //   return
  //   // }
  //   // const paths = ["/a_propos"]
  //   // if(!pathname.includes(paths)){
  //   //   e.target.src = "/Logo2_fond_blanc.png"
  //   // }
  // },[pathname])

  
  
  return (
    <header id={`header`} >
      <Link to={"/"} id="header__logo">
        <img
          // onMouseEnter={onMouseEnter}
          // onMouseLeave={onMouseLeave}
          src={logo}
          width={250}
          alt="Metamorphose"
        />
      </Link>

      <div
        className={`${menuActive ? "hamburger__active" : "hamburger"}`}
        onClick={() => setMenuActive(!menuActive)}
      >
        <div className="hamburger__line"></div>
        <div className="hamburger__line"></div>
        <div className="hamburger__line"></div>
      </div>

      <ul
        className={`${menuActive ? "header__menu__active" : "header__menu "}`}
      >
        <li className="header__menu__item">
          <NavLink to={"/corporate"}>Corporate</NavLink>
        </li>
        <li className="header__menu__item">
          <NavLink to={"/galerie"}>Galerie</NavLink>
        </li>
       
        <li className="header__menu__item">
          <NavLink to={"/services"}>Services</NavLink>
        </li>

        <li className="header__menu__item">
          <NavLink to={"/tarifs"}>Tarifs</NavLink>
        </li>
        <li className="header__menu__item">
          <NavLink to={"/a_propos"}>A propos</NavLink>
        </li>
      </ul>
    </header>
  );
}
