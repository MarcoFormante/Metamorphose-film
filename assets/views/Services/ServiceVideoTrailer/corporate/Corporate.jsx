import React from 'react'
import ReactPlayer from 'react-player'

export default function Corporate(){
  return (
    <div>
        <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Corporate</span></h1>
        <div className="p-20">
            <div className="video-flex">
                <ReactPlayer url={`https://www.youtube.com/watch?v=sEHRIp3gjLY`} playsinline muted  loop controls/>
                <ReactPlayer url={`https://www.youtube.com/watch?v=dKoekUihrLM`} playsinline muted  loop controls/>
            </div>

            <div className="animation4videos">
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/z3mpTcSQI68`} playsinline muted  loop controls/>
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/yTwVrVBqj4k`} playsinline muted  loop controls/>
                <ReactPlayer className="videosAnimated" url={`https://youtu.be/jHxkIXkzMro`} playsinline muted  loop controls/>
                {/* <ReactPlayer  className="videosAnimated" url={`https://youtu.be/hU5Th05_beo`} playsinline muted  loop controls/> */}
            </div>
        </div>
    </div>
  )
}

