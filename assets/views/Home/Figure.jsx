import React  from 'react'
import { isMobile } from 'react-device-detect'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'

const Figure = ({project,index,allProjects}) => {
  const collabWith = project.collab_with.replace("&amp;","&").toUpperCase()
  const projectName =  project.name.toUpperCase()
  const abrProjectName = project.abrName.toUpperCase()
  const backgroundVideo = project.background_video


  return project && (
    <>
      <figure  className={`carousel__player__container ${isMobile ? "carousel__player__container__mobile" : ""}`}>
        { backgroundVideo && 
        <ReactPlayer  className="carousel__player"  
              url={  "assets/uploads/videos/" +  backgroundVideo }
              playing
              loop
              muted
              playsinline
              width="100%"
              height="100vh"
          />}
        <figcaption className='carousel__player__button'>
           
                <Link to={"/projet/" + project.name} state={{project,index,allProjects}}>
                  <h3>
                    {!isMobile ? projectName : abrProjectName}
                  </h3>
                </Link>
            
            {collabWith &&  <p>AVEC {collabWith}</p>}
        </figcaption>
      </figure>
    </>
  )
}


export default Figure