import React, { useState } from "react";
import ReactPlayer from "react-player";
import Fallback from "../../../../components/UI/Spinner/Spinner"
export default function Evenementiel(){
      const [isLoading,setIsLoading] = useState(true)
    return (
        <div>
              <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Événementiel</span></h1>
              {isLoading && <Fallback inline={true}/>}
            <div className="p-20">
                <div className="video-flex">
                    <ReactPlayer  onReady={()=>setIsLoading(false)} url={`https://www.youtube.com/watch?v=FEM6-LIHcJo`} playsinline  controls/>
                    <ReactPlayer url={`https://youtu.be/cGhSwpDuRZU`} playsinline  controls/>
                </div>
                <div className="video-flex">
                    <ReactPlayer url={`https://youtu.be/p5lTD22xmV8`} playsinline  controls/>
                    <ReactPlayer url={`https://youtu.be/AVwIUZRrT_U?si=If-0s1jQjEtDPb98`} playsinline   controls/>
                </div>
                
                <div className="video-flex">
                    <ReactPlayer url={`https://youtu.be/13OkZ1YtNlE`} playsinline  controls/>
                    <div></div>
                </div>
            </div>
        </div>
    )
}