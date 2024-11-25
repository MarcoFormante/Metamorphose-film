import React, { useState } from 'react'
import GalleryItem from './GalleryItem'
import Fallback from '../../components/UI/Spinner/Spinner'
import { galleries } from './utils'
import SEO from '../../components/Seo/SEO'


const Gallery = () => {
  const [imgLoadedCounter, setImgLoadedCounter] = useState(0)

  return (

    <>
     <SEO title={"Metamorphose Film - Galerie"} url={"/galerie"} robots={true} />
   
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
    </>
  )
}

export default Gallery


