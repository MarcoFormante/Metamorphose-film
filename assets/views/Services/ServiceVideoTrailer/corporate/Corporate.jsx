import React from 'react'
import ReactPlayer from 'react-player'
import Thumbnail_Icon from '../Thumbnail_Icon'
import useCookie from '../../../../hooks/useCookie'

export default function Corporate(){

  const {acceptCookie} = useCookie()

  return (
    <div>
        <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Corporate</span></h1>
        <div className="p-20">
            <div className="video-flex">
                <ReactPlayer 
                onClickPreview={acceptCookie} 
                style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                url={`https://www.youtube.com/watch?v=sEHRIp3gjLY`} 
                playing 
                light={true}  
                playsinline  
                controls 
                playIcon={<Thumbnail_Icon title={"SUPPLY INDUSTRY - CORPORATE"}/>}/>

                <ReactPlayer 
                onClickPreview={acceptCookie} 
                style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                url={`https://www.youtube.com/watch?v=dKoekUihrLM`} 
                playing 
                light={true} 
                playsinline   
                controls 
                playIcon={<Thumbnail_Icon title={"100TAUR - ARTISTE PEINTRE"}/>} />
            </div>

            <div className="corporate-videos">
                <ReactPlayer 
                onClickPreview={acceptCookie} 
                style={{position:"relative"}} 
                url={`https://youtu.be/z3mpTcSQI68`} 
                playing 
                light={true} 
                playsinline  
                controls 
                playIcon={<Thumbnail_Icon title={"LES PROS DE L'IMMO - ITW VINCENT"}/>}/>

                <ReactPlayer 
                onClickPreview={acceptCookie} 
                style={{position:"relative"}} 
                url={`https://youtu.be/yTwVrVBqj4k`} 
                playing 
                light={true} 
                playsinline  
                controls 
                playIcon={<Thumbnail_Icon title={"LES PROS DE L'IMMO - ITW GRÉGORY"}/>}/>
                
                <ReactPlayer 
                onClickPreview={acceptCookie} 
                style={{position:"relative"}} 
                url={`https://youtu.be/jHxkIXkzMro`} 
                playing 
                light={true} 
                playsinline  
                controls 
                playIcon={<Thumbnail_Icon title={"LES PROS DE L'IMMO - ITW JEAN GAËL"}/>}/>
                {/* <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:200}} className="videosAnimated" url={`https://youtu.be/hU5Th05_beo`} playsinline  controls/> */}
            </div>
        </div>
    </div>
  )

}




