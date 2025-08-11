import React, { useEffect, useState }  from 'react'
import { isMobile } from 'react-device-detect'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Figure = ({project,index,allProjects,swiperRealIndex}) => {
  const collabWith = project.collab_with.replace("&amp;","&").toUpperCase()
  const projectName =  project.name.toUpperCase()
  const abrProjectName = project.abrName.toUpperCase()
  const indicesToLoad = [swiperRealIndex, swiperRealIndex + 1, swiperRealIndex - 1];
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [newClass,setNewClass] = useState("")
  const [isCookieAccepted,setIsCookieAccepted] = useState(false)

  useEffect(() => {
    if (indicesToLoad.includes(index)) {
      if (!videoUrl) {
        setVideoUrl("assets/uploads/videos/" + project.background_video);
      }
    }
    if (swiperRealIndex === index) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [index, indicesToLoad, project.background_video, videoUrl]);

  useEffect(()=>{
    const cookie = Cookies.get("cookie")
    if (cookie === "accepted") {
      setIsCookieAccepted(true)
    }
  },[Cookies.get("cookie")])


 

  return project && (
    <>
      <figure  className={`carousel__player__container  ${isMobile ? "carousel__player__container__mobile" : ""} ${(index <= 1 && !swiperRealIndex <= 1)  ? newClass : ""}`}>
        { videoUrl &&  
        <ReactPlayer  
              onReady={()=>(index <= 1 && !localStorage.getItem("scroll")) &&  setNewClass("figure-animated")}
              className="carousel__player"  
              url={  videoUrl }
              playing = {isPlaying}
              loop
              muted
              playsinline
              width="100%"
              height="100vh"
          />
          }
        <figcaption className={`carousel__player__button`}>
           
                <Link to={"/projet/" + project.slug} state={{project,index,allProjects}}>
                  <h2>
                    {!isMobile ? projectName : abrProjectName}
                  </h2>
                </Link>
            
            {collabWith &&  <p>AVEC {collabWith}</p>}
        </figcaption>
      </figure>
    </>
  )
}


export default Figure