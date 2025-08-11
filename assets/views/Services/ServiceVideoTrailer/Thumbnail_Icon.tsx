import React from "react";

export default function Thumbnail_Icon({title,position,boxShadowUnset}){
    return (
        <div style={{ display: "flex", justifyContent: "center",height:"100%",width:"100%",boxShadow:!boxShadowUnset ? "inset 0px 50px 80px black":"",position:position || "none"}}>
            {title && <span style={{position:"absolute",left:5,top:"3%",color:"white",fontWeight:"bold",fontSize:"clamp(12px,2vw,16px)"}}>{title}</span>}
                <img src={"/assets/static/icons/yt-icon.svg"} width={90}></img>
            {title && <span style={{position:"absolute",right:8,bottom:"3%",color:"white",fontWeight:"bold",fontSize:"clamp(11px,2vw,16px)"}}>YouTube</span>}
        </div>
    );
}
