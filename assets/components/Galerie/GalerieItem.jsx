import React from 'react'
import { Link } from 'react-router-dom'



export const GalleryItem = ({name,src,link,alt}) => {
    return (
      <li className='gallery__item'>
        <div className='gallery__item__img'>
        <Link to={link} state={name}><img src={src} alt={alt} /></Link>
        </div>
        <div className='gallery__item__title'>
          <Link to={link} state={name}>{name}</Link>
        </div>
      </li>
    )
  }
