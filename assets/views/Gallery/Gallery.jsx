import React, { useState } from 'react'
import GalleryItem from './GalleryItem'
import Fallback from '../../components/UI/Spinner/Spinner'
import { galleries } from './utils'
import SEO from '../../components/Seo/SEO'
import { Helmet } from 'react-helmet-async'

const SchemaGallery = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `Galerie - Metamorphose Film`,
  url: "https://metamorphosefilm.com/galerie",
  publisher: {
    "@type": "Organization",
    name: "Metamorphose Film",
    logo: {
      "@type": "ImageObject",
      url: "https://metamorphosefilm.com/android-chrome-192x192.png",
      width: 192,
      height: 192
    }
  },
};


const Gallery = () => {
  const [imgLoadedCounter, setImgLoadedCounter] = useState(0)

  return (
    <>
     <SEO title={"Metamorphose Film - Galerie"} url={"/galerie"} robots={true} />

     <Helmet>
     <script
        type="application/ld+json"
       >
        {JSON.stringify(SchemaGallery)}
       </script>
     </Helmet>
   
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


