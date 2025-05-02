import React, { useState } from "react";
import ReactPlayer from "react-player";


export default function Publicitaire(){
    return (
        <div>
            <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Publicitaire</span></h1>
            <div className="p-20">
                <div className="video-flex">
                    <ReactPlayer url={`https://youtu.be/Rz_G90JMlb4`} playsinline muted  loop controls/>
                    <ReactPlayer url={`https://youtu.be/z6WR9nEytBg`} playsinline muted  loop controls/>
                </div>
                <div className="animation4videos">
                    <ReactPlayer className="videosAnimated" url={`https://youtube.com/shorts/pOWJ3QQea4w`} playsinline muted  loop controls/>
                    <ReactPlayer className="videosAnimated" url={`https://youtube.com/shorts/XWgMQDE7VSA`} playsinline muted  loop controls/>
                    <ReactPlayer className="videosAnimated" url={`https://youtube.com/shorts/x6_c897LUWI`} playsinline muted  loop controls/>
                    <ReactPlayer  className="videosAnimated" url={`https://youtu.be/hU5Th05_beo`} playsinline muted  loop controls/>
                </div>

                <div className="video-flex" >
                    <ReactPlayer url={`https://youtu.be/PsFoQ2wXwc8`} playsinline muted  loop controls/>
                    <ReactPlayer url={`https://youtu.be/Jw2HXGn7Q_c`} playsinline muted  loop controls/>
                </div>
            </div>
        </div>
    )
}