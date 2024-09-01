import React from 'react'
import GalleryItem from './GalleryItem'
import Fallback from '../../components/UI/Spinner/Spinner'

const galleries=[
  {
    name:'Concert',
    src:'assets/static/images/gallery/concerts.webp',
    link:'/galerie/concert',
    alt:'Galerie Concert Metamorphose'
  },
  {
    name:'Studio',
    src:'assets/static/images/gallery/studio.webp',
    link:'/galerie/studio',
    alt:'Galerie Studio Metamorphose'
  },
  {
    name:'Tournage',
    src:'assets/static/images/gallery/clip.webp',
    link:'/galerie/tournage',
    alt:'Galerie Tournage Metamorphose'  
  },
  {
    name:'Événementiel',
    src:'assets/static/images/gallery/events.webp',
    link:'/galerie/evenementiel',
    alt:'Galerie Evenements Metamorphose'
  },
]


const Gallery = () => {
  const [imgLoadedCounter, setImgLoadedCounter] = React.useState(0)

  return (
    <div className='gallery'>
      <ul className='gallery__list'>
        {imgLoadedCounter < galleries.length && <Fallback />}
        {galleries.map((gallery)=>
        <div  key={gallery.name}>
          <GalleryItem
            name={gallery.name}
            src={gallery.src} 
            link={gallery.link}
            alt={gallery.alt}
            setImgLoadedCounter={setImgLoadedCounter}
            />
          </div>
        )}
      </ul>
    </div>
  )
}

export default Gallery


