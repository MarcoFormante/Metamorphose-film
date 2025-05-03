import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import Fallback from "../../../../components/UI/Spinner/Spinner"

export default function Corporate(){
  const [isLoading,setIsLoading] = useState(true)
  return (
    <div>
        <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Corporate</span></h1>
        {isLoading && <Fallback inline={true}/>}
        <div className="p-20">
            <div className="video-flex">
                <ReactPlayer  onReady={()=>setIsLoading(false)} url={`https://www.youtube.com/watch?v=sEHRIp3gjLY`} playsinline  controls/>
                <ReactPlayer url={`https://www.youtube.com/watch?v=dKoekUihrLM`} playsinline   controls/>
            </div>

            <div className="animation4videos">
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/z3mpTcSQI68`} playsinline   controls/>
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/yTwVrVBqj4k`} playsinline  controls/>
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/jHxkIXkzMro`} playsinline  controls/>
                {/* <ReactPlayer  className="videosAnimated" url={`https://youtu.be/hU5Th05_beo`} playsinline  controls/> */}
            </div>
        </div>
    </div>
  )
}

