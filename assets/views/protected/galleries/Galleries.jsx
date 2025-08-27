import React from 'react'
import { Link } from 'react-router-dom'

const galleries=[
    "Concert",
    "Shooting",
    "Plateau",
    "Mode"
  ]
  

const Galleries = () => {
    
  return (
    <div className='admin-galleries'>
      <h1 className='c-white ad-page-title'>Galeries</h1>
        <ul className='admin-galleries__list'>
            {galleries.map((gallery)=>
            <div className='admin-galleries__list__item' key={gallery}>
                <li><Link to={"/admin/gallery/" + gallery}>{gallery}</Link></li>
            </div>
            )}
        </ul>
    </div>
  )
}

export default Galleries