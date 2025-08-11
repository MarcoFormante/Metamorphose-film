import React from "react";
import ReactPlayer from "react-player";
import cap from "./thumbs/cap.webp"
import cap2 from "./thumbs/cap2.webp"
import cap3 from "./thumbs/cap3.webp"
import box from "./thumbs/box.webp"
import box2 from "./thumbs/box2.webp"
import box3 from "./thumbs/box3.webp"
import velo from "./thumbs/velo.webp"
import velo2 from "./thumbs/velo2.webp"
import velo3 from "./thumbs/velo3.webp"
import performe from "./thumbs/performe.webp"
import performe2 from "./thumbs/performe2.webp"
import performe3 from "./thumbs/performe3.webp"
import Thumbnail_Icon from "../Thumbnail_Icon";
import useCookie from "../../../../hooks/useCookie";


export default function Publicitaire(){
    const {acceptCookie} = useCookie()

    return (
        <div>
            <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Publicitaire</span></h1>
            <div className="p-20">
                <div className="video-flex">
                    <ReactPlayer  
                    onClickPreview={acceptCookie}  
                    style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                    url={`https://youtu.be/Rz_G90JMlb4`} 
                    playsinline 
                    playing 
                    light={true} 
                    playIcon={<Thumbnail_Icon title={"PIJ FREEGOBRAQ - PUBLICITÉ FICTIONNELLE"}/>} 
                    controls />
                    
                    <ReactPlayer  
                    onClickPreview={acceptCookie}  
                    style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                    url={`https://youtu.be/z6WR9nEytBg`} 
                    light={true} 
                    playing  
                    playsinline  
                    playIcon={<Thumbnail_Icon title={"MISSION LOCALE - DU SPORT À L'EMPLOI"}/>}/>
                </div>
                <div className="animation4videos">
                    <ReactPlayer  
                    onClickPreview={acceptCookie} 
                    className="videosAnimated" 
                    url={`https://youtube.com/shorts/pOWJ3QQea4w`}  
                    light={<ImageCover images={[cap,cap2,cap3]}/>} 
                    playsinline 
                    playing  
                    playIcon={<img style={{position:"absolute"}} src={"/assets/static/icons/yt-icon.svg"} width={90}></img>} 
                    controls 
                    />
                   
                    <ReactPlayer  
                    onClickPreview={acceptCookie} 
                    className="videosAnimated"
                    url={`https://youtube.com/shorts/XWgMQDE7VSA`}  
                    light={<ImageCover images={[box,box2,box3]}/>}  
                    playsinline 
                    playing 
                    playIcon={ <img style={{position:"absolute"}} src={"/assets/static/icons/yt-icon.svg"} width={90}></img>} 
                    controls 
                    />
                   
                    <ReactPlayer  
                    onClickPreview={acceptCookie} 
                    className="videosAnimated" 
                    url={`https://youtube.com/shorts/x6_c897LUWI`}  
                    light={<ImageCover images={[velo,velo2,velo3]}/>} 
                    playsinline  
                    playIcon={ <img style={{position:"absolute"}} src={"/assets/static/icons/yt-icon.svg"} width={90}></img>} 
                    controls
                    playing
                    />
                    
                    <ReactPlayer  
                    onClickPreview={acceptCookie} 
                    className="videosAnimated" 
                    url={`https://youtu.be/hU5Th05_beo`}  
                    light={<ImageCover  images={[performe,performe2,performe3]}/>}  
                    playing  
                    playsinline  
                    playIcon={ <img style={{position:"absolute"}} src={"/assets/static/icons/yt-icon.svg"} width={90}></img>} 
                    controls 
                    />
                </div>

                <div className="video-flex" >
                    <ReactPlayer  
                    onClickPreview={acceptCookie}  
                    style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                    url={`https://youtu.be/PsFoQ2wXwc8`}   
                    light={true}  
                    playing  
                    playsinline  
                    playIcon={<Thumbnail_Icon title={"GROUPAMA - RUGBY CAUSSADE"}/>} 
                    controls />

                    <ReactPlayer 
                    onClickPreview={acceptCookie}  
                    style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}}  
                    url={`https://youtu.be/Jw2HXGn7Q_c`}   
                    light={true} 
                    playing  
                    playsinline  
                    playIcon={<Thumbnail_Icon title={"PÔLE UNIVERSITAIRE VICHY - PROMOTION"}/>} 
                    controls />
                </div>
            </div>
        </div>
    )
}




function ImageCover({images,style}){
     return (
        <picture>
                <source srcSet={images[2]} media="(min-width: 1200px)" />
                <source width={"100%"} height={400}  srcSet={images[2]} media="(min-width: 1200px)" /> 
                <source style={{width:"100vw"}} height={360} width={"100%"} srcSet={images[1]} media="(min-width: 768px)" />
                <img style={style} className="cover" width={"100%"} srcSet={images[0]} alt="" />
        </picture>
     )
}




