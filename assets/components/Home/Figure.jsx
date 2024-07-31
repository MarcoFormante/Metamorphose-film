import React from 'react'
import { isMobile } from 'react-device-detect'
import ReactPlayer from 'react-player'
import { Link, useNavigate } from 'react-router-dom'

export const Figure = ({project,index,isScrolling}) => {
const navigate = useNavigate()
  return project && (
 <>
    <figure  className={`carousel__player__container ${isMobile ? "carousel__player__container__mobile" : ""}`}>
   { project.background_video && 
   <ReactPlayer className="carousel__player"  
         url={ "assets/uploads/videos/" +  project.background_video }
         playing
         loop
         muted
         playsinline
         width="100%"
         height="100vh"
    />}
    <figcaption className='carousel__player__button'>
        <h3 onClick={ ()=> !isScrolling && navigate("/projet/"+ project.name,{state:{project,index}}) }>
            <Link to={"/projet/" + project.name}>{!isMobile ? project.name.toUpperCase() : project.abrName.toUpperCase()}</Link>
        </h3>
       {project.collab_with &&  <p>AVEC {project.collab_with.toUpperCase()}</p>}
    </figcaption>
    </figure>
    </>
  )
}
