import React from 'react'
import { GalleryItem } from '../../components/Galerie/GalerieItem'

const galleries=[
  {
    name:'Concert',
    src:'assets/static/images/gallery/concerts.webp',
    link:'/galerie/concert',
    alt:'Galerie Concert Metamorphose'
  },
  {
    name:'Tournage',
    src:'assets/static/images/gallery/clip.webp',
    link:'/galerie/tournage',
    alt:'Galerie Tournage Metamorphose'  
  },
  {
    name:'Studio',
    src:'assets/static/images/gallery/studio.webp',
    link:'/galerie/studio',
    alt:'Galerie Studio Metamorphose'
  },
  {
    name:'Evenements',
    src:'assets/static/images/gallery/events.webp',
    link:'/galerie/evenements',
    alt:'Galerie Evenements Metamorphose'
  },
]


const Gallery = () => {
  return (
    <div className='gallery'>
      <ul className='gallery__list'>
        {galleries.map((gallery,index)=>
        <div  key={index}>
          <GalleryItem
            name={gallery.name}
            src={gallery.src} 
            link={gallery.link}
            alt={gallery.alt}
            />
          </div>
        )}
      </ul>
    </div>
  )
}

export default Gallery


