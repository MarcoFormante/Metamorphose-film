import React from 'react'
import Card from './Card'


const ServicesCards = () => {
    
  return (
    <section className='cards-section'>
        <div className='flex-c-container services-flex-container'>
            <Card title={"Production Video"} videoName={"production-video"}/>
            <Card title={"Montage"} videoName={"montage"} />
        </div>
        <div className='flex-c-container flex-container2'>
            <Card title={"Photographie"} videoName={"photographie"} />
            <Card title={"Drone"} videoName={"drone"} />
        </div>
  </section>
  )
}

export default ServicesCards