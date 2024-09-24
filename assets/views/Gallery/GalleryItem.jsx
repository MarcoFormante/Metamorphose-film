import React from 'react'
import { Link } from 'react-router-dom'

const GalleryItem = ({name,src,link,alt,setImgLoadedCounter}) => {

const stateName = name === 'Événementiel' ? 'evenementiel' : name

    return (
      <li className='gallery__item'>
        <div className='gallery__item__img'>
        <Link to={link} state={stateName}>
      <img src={src} alt={alt} onLoad={()=> setImgLoadedCounter(prev => prev + 1)}/>
          </Link>
        </div>
        <div className='gallery__item__title'>
          <Link to={link} state={stateName}>{name}</Link>
        </div>
      </li>
    )
  }

export default GalleryItem