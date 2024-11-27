import React from 'react'
import Card from './Card'


const ServicesCards = () => {
    
  return (
    <section className='cards-section'>
        <div className='flex-c-container services-flex-container'>
            <Card hasVideo={false} title={"Production Video"} videoName={"production-video"}/>
            <Card hasVideo={false} title={"Montage"} videoName={"montage"} />
        </div>
        <div className='flex-c-container flex-container2'>
            <Card hasVideo={false} title={"Photographie"} videoName={"photographie"} />
            <Card hasVideo={false} title={"Drone"} videoName={"drone"} />
        </div>
  </section>
  )
}

export default ServicesCards