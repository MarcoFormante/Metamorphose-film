import React from 'react'


const ServicesCards = () => {
  return (
    <section className='cards-section'>
    <div className='flex-c-container services-flex-container'>
        <article className='services-card-container ' >
            <div>
                <div className='card'> 
                    <h1 className='art-h1'>Production Video</h1>
                </div>
          </div>
        </article>

        <article className='services-card-container' >
            <div>
                <div className='card'> 
                    <h1 className='art-h1'>Montage</h1>
                </div >
          </div>
        </article>
    </div>

    <div className='flex-c-container flex-container2'>
        <article className='services-card-container ' >
            <div >
                <div className='card'> 
                    <h1 className='art-h1'>Photographie</h1>
                </div >
          </div>
        </article>

        <article className='services-card-container ' >
            <div>
                <div className='card'> 
                    <h1 className='art-h1'>Drone</h1>
                </div>
          </div>
        </article>
    </div>
  </section>
  )
}

export default ServicesCards