import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { getProjects } from "../../../../api/projectsApi"
    export default function ClipVideo(){
        const [projects,setProjects] = useState([])
        const [error,setError]=useState("")

        useEffect(()=>{
            const fetchVideos = async ()=>{
                try {
                    const data =  await getProjects()
                    if (!data || data.length < 1) {
                         setError("Error fetching projects");
                     }
                   setProjects(data.map(p => p.youtube_video))
                } catch (error) {
                    setError("Error fetching projects");
                }
            }
            fetchVideos()
        },[])
        

        return(
            <div>
                    <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Clip Video</span></h1>
                    <div className="p-20">
                       {error && <p style={{background:"red",color:"white",textAlign:"center",padding:5,fontSize:22,fontWeight:"bold"}}>{error}</p>}
                       {projects && projects.map((p,i)=> {
                        const index = i * 2
                        return i < Math.floor(projects.length) / 2 && (
                            <div className="video-flex" key={index}>
                                <ReactPlayer url={projects[index]} playsinline muted  loop controls/>
                                <ReactPlayer url={projects[index + 1]} playsinline muted  loop controls/>
                            </div>
                        )
                       })}
                    </div>
                </div>
        )
    }