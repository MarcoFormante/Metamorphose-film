import React from "react";
import ReactPlayer from "react-player";
import Thumbnail_Icon from "../Thumbnail_Icon";
import useCookie from "../../../../hooks/useCookie";


export default function Evenementiel(){

const {acceptCookie} = useCookie()

    return (
        <div>
            <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Événementiel</span></h1>
            <div className="p-20">
                <div className="video-flex">
                    <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}} url={`https://www.youtube.com/watch?v=FEM6-LIHcJo`} playsinline playing light={true} playIcon={<Thumbnail_Icon title={"IFSO VICHY - REMISE DE DIPLÔMES 2023"}/>} controls/>
                    <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}} url={`https://youtu.be/cGhSwpDuRZU`} playsinline playing light={true} playIcon={<Thumbnail_Icon title={"LE REX TECHNO"} controls/>} />
                </div>
                <div className="video-flex">
                  {/*bodyKarate*/}
                    <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}} url={`https://youtu.be/p5lTD22xmV8`} playsinline playing light={true} playIcon={<Thumbnail_Icon title={"MARIAGE CHRISTIAN & LAURENCE"} controls/>} />
                    <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}} url={`https://youtu.be/3_3cz-N5VjA`} playsinline playing light={true} playIcon={<Thumbnail_Icon title={"BODY KARATÉ - AFTERMOVIE"} controls/>} />
                </div>
                
                <div className="video-flex">
                    <ReactPlayer onClickPreview={acceptCookie} style={{position:"relative",maxHeight:"clamp(100px,5vw,300px)"}} url={`https://youtu.be/13OkZ1YtNlE`} playsinline playing light={true} playIcon={<Thumbnail_Icon title={"REMISE DES DIPLÔMES - ESG"} controls/>} />
                    <div></div>
                </div>
            </div>
        </div>
    )
}