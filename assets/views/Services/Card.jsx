import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({videoName,title,hasVideo}) => {
    const navigate = useNavigate()
  return (
    <article className='services-card-container '  >
        <div className='video-background'>
            <video autoPlay loop muted>
                <source src={"/assets/static/videos/" + videoName + ".mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
            <div>
                <div className='card'> 
                    <h2 className='art-h1' onClick={()=> hasVideo ? navigate("/services/" + videoName) : null}>{title}</h2>
                </div>
          </div>
        </article>
  )
}

export default Card