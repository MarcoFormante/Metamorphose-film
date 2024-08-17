
import React from 'react'

const Spinner = ({inline}) => {
  return (
    <div className={!inline ? `fallback` : "inline-fallback"}>
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="10" fill="transparent" strokeDashoffset={5} strokeDasharray={40}/>
    </svg>
  </div>
  )
}

export default Spinner

