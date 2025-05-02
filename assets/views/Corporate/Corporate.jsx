import React from 'react'
import { Link } from 'react-router-dom'


const Corporate = () => {


  return (
    <>
    <section className='cards-section'>
    <div className='flex-c-container services-flex-container pointer'>
        <article className='services-card-container ' >
          <Link to={"/services/publicitaire"}>
            <div>
                <div className='card btn'> 
                  <h2 className='art-h1'>PUBLICITAIRE</h2>
                </div>
            </div>
          </Link>
            
        </article>

        <article className='services-card-container pointer' >
        <Link to="/services/corporate">
            <div>
                  <div className='card btn'> 
                      <h2 className='art-h1'>CORPORATE</h2>
                  </div>
            </div>
          </Link>
        </article>
    </div>

    <div className='flex-c-container flex-container2 pointer'>
        <article className='services-card-container ' >
        <Link to="/services/evenementiel">
          <div>
                  <div className='card btn'> 
                    <h2 className='art-h1'>ÉVÉNEMENTIEL</h2>
                  </div >
            </div>
          </Link>
        </article>

        <article className='services-card-container pointer' >
        <Link to="/services/clip-video">
            <div>
                <div className='card btn'> 
                  <h2 className='art-h1'>CLIP VIDÉO</h2>
                </div>
          </div>
        </Link>
        </article>
    </div>
    
  </section>
</>
    
  )
}

export default Corporate


