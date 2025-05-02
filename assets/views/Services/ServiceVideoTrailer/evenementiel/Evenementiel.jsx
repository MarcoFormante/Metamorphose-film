import React from "react";
import ReactPlayer from "react-player";

export default function Evenementiel(){
    
    return (
        <div>
              <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Événementiel</span></h1>
            <div className="p-20">
                <div className="video-flex">
                    <ReactPlayer url={`https://www.youtube.com/watch?v=FEM6-LIHcJo`} playsinline muted  loop controls/>
                    <ReactPlayer url={`https://youtu.be/cGhSwpDuRZU`} playsinline muted  loop controls/>
                </div>
                <div className="video-flex">
                    <ReactPlayer url={`https://youtu.be/p5lTD22xmV8`} playsinline muted  loop controls/>
                    <ReactPlayer url={`https://youtu.be/wbysBR5_PK8`} playsinline  muted  loop controls/>
                </div>
                
                <div className="video-flex">
                    <ReactPlayer url={`https://youtu.be/13OkZ1YtNlE`} playsinline muted  loop controls/>
                </div>
            </div>
        </div>
    )
}