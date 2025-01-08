import React from 'react'
import { Link } from 'react-router-dom'

const GalleryItem = ({name,src,link,alt,setImgLoadedCounter}) => {



    return (
      <li className='gallery__item'>
        <div className='gallery__item__img'>
        <Link to={link} state={name}>
      <img src={src} width={300} loading='eager' height={420} alt={alt} title={alt} onLoad={()=> setImgLoadedCounter(prev => prev + 1)}/>
          </Link>
        </div>
        <div className='gallery__item__title'>
          <Link to={link} state={name}>{name}</Link>
        </div>
      </li>
    )
  }

export default GalleryItem