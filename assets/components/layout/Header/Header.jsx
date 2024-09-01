import React from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useEventListener from '../../../hooks/useEventListener'
import logo_wh from "./logo_white.svg"

function Header(){
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

  
  
  return (
    <header id={`header`} >
      <Link to={"/"} id="header__logo">
        <img
          src={logo_wh}
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
          <NavLink to={"/galerie"}>Galerie</NavLink>
        </li>
       
        <li className="header__menu__item">
          <NavLink to={"/services"}>Services</NavLink>
        </li>
        <li className="header__menu__item">
          <NavLink to={"/a_propos"}>À propos</NavLink>
        </li>
      </ul>
    </header>
  );
}


export default Header