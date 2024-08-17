import React from 'react'

const ShowMoreButton = ({callback,hidden}) => {
  return (
    <div  className={`moreItems-btn ${hidden ? "moreItems-btn--hidden" : ""}`} role='button' onClick={callback}>
      <span>Afficher plus</span>
    </div>
  )
}

export default ShowMoreButton