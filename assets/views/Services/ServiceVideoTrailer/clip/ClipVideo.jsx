import React, { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { getProjects } from "../../../../api/projectsApi"
import Fallback from "../../../../components/UI/Spinner/Spinner"
    export default function ClipVideo(){
        const [projects,setProjects] = useState([])
        const [error,setError]=useState("")
        const [isLoading,setIsLoading] = useState(true)

        useEffect(()=>{
            const fetchVideos = async ()=>{
                setIsLoading(true)
                try {
                    const data =  await getProjects()
                    if (!data || data.length < 1) {
                         setError("Error fetching projects");
                     }
                   setProjects(data.map(p => p.youtube_video))
                } catch (error) {
                    setError("Error fetching projects");
                }finally{
                    setIsLoading(false)
                }
            }
            fetchVideos()
        },[])
        

        return(
            <div>
                    <h1 style={{fontSize: "clamp(3rem, 10vw, 8rem)",color:"white"}}>Service<span>Clip Video</span></h1>
                    {isLoading && !error &&  <Fallback inline={true}/>}
                    <div className="p-20">
                       {error && <p style={{background:"red",color:"white",textAlign:"center",padding:5,fontSize:22,fontWeight:"bold"}}>{error}</p>}
                       {projects && projects.map((p,i)=> {
                        const index = i * 2
                        return i < Math.floor(projects.length) / 2 && (
                            <div className="video-flex" key={index}>
                                <ReactPlayer  url={projects[index]} playsinline  controls/>
                                <ReactPlayer url={projects[index + 1]} playsinline  controls/>
                            </div>
                        )
                       })}
                    </div>
                </div>
        )
    }