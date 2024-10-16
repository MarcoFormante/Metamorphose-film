import React from 'react'

const  BackButton = ({props,callback,label}) => {
  return (
    <button style={{position:"relative",zIndex:3}} className={"backButton"} onClick={callback}>
      <svg fill="#ffffff" width={props.width} height={props.height} viewBox="-18.2 -2.2 38.40 38.40" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)" stroke="#ffffff">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.512"/>
      <g id="SVGRepo_iconCarrier"> <title>retour</title> <path d="M12.52 22.24c-0.12 0-0.24-0.040-0.36-0.080l-11.68-5.4c-0.28-0.12-0.48-0.44-0.48-0.76s0.2-0.64 0.48-0.76l11.64-5.4c0.24-0.12 0.56-0.12 0.8 0.040s0.4 0.44 0.4 0.72v10.84c0 0.28-0.16 0.56-0.4 0.72-0.12 0.040-0.28 0.080-0.4 0.080zM2.88 16l8.8 4.12v-8.24l-8.8 4.12z"/> </g>
      </svg>
      <span>{label}</span>
    </button>
  )
}


export default BackButton
