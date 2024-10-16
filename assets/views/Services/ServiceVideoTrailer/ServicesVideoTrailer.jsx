import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

const videoMap = {
    "drone":"Dr9XDs3njpc",
    "montage":"Dr9XDs3njp",
    "photographie":"Dr9XDs3njp",
    "production-video":"Dr9XDs3njp"
}

const ServicesVideoTrailer = () => {
const name = useParams().name

  return (
    <div id='service-video-trailer' >
        <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Drone</h1>
        <div id='service-video-container' >
            <ReactPlayer   url={`https://www.youtube.com/watch?v=${videoMap[name]}`} playsinline muted playing loop controls/>
        </div>
        
    </div>
  )
} 

export default ServicesVideoTrailer