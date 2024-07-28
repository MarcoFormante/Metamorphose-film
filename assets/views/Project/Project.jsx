import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, Navigate, Link, useNavigate, useParams, json } from 'react-router-dom'
import { axiosInstance } from '../../middleware/axiosInstance';
import ProjectStaff from './ProjectStaff';
import Fallback from '../../components/Spinner/Fallback';



const Project = () => {
    const location = useLocation()
    const [showAssets, setShowAssets] = useState(false)
    const [projectData,setProjectData] = useState([])
    const [loading,setLoading] = useState(false)
    const [nextProject,SetNextProject] = useState(null)
    const [lastProject,setLastProject] = useState(null)
    const [project,setProject] = useState(null)
    const [projectIndex,setProjectIndex] = useState(location.state?.index || 0)
    const [allProjects,setAllProjects] = useState(null)
    const navigate = useNavigate()
    const param = useParams()



    useEffect(()=>{
        if (sessionStorage.getItem("projects")) {
            setAllProjects(JSON.parse(sessionStorage.getItem("projects")))
        }
    },[])

    useEffect(()=>{
        if (showAssets) {
            window.scrollTo({
                top: 400,
                behavior: 'smooth'
            })
        }else{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    },[showAssets])


    

    useEffect(()=>{
        if (param.name && !location.state?.project?.name) {
            setProject({})
            setShowAssets(false)
            setProjectData([])
            const formdata = new FormData()
            formdata.append("name",param?.name)
            axiosInstance.post("projectByName",formdata)
            .then(res => {
                if (res.status === 200) {
                    setProject(res.data.project[0])
                }
            }).catch(()=>{
                return navigate("/")
            })
        }
    },[param])
    


    useEffect(()=>{
        if (!projectData.staff && showAssets) {
            setLoading(true)
            axiosInstance.get("project/" + project.id)
            .then(res => {
                if (res.status === 200) {
                    setProjectData(res.data.project)
                }else{
                    console.error("Error: no project data")
                }
            }).catch(err=>{
                console.error("Error: no project data")
            }).finally(()=>{
                setLoading(false)
            })
        }       
    },[showAssets,projectData])



    useEffect(()=>{
        if (location.state?.project.name && projectIndex !== null && projectIndex !== undefined && allProjects) {
            setProject(null)
            setShowAssets(false)
            setProjectData([])
          
            if (!allProjects) {
                return
            }
            setProject(location.state.project)
            const next = allProjects[projectIndex + 1]
            if (next) {
                SetNextProject(next)
            }else{
                SetNextProject(null)
            }
            const last = projectIndex > 0 ?  allProjects[projectIndex - 1] : null
            if (last) {
                setLastProject(last)
            }else{
                setLastProject(null)
            }
        }else{
            setProject(null)
            setShowAssets(false)
            setProjectData([])
        }
    },[projectIndex,allProjects])



  return project && (
    <article className='production'>
        <div className='last-next-btns-container'>
            {lastProject && <span className='last'>
                <Link onClick={()=>setProjectIndex(prev => prev > 0 ? prev - 1 : 0)} to={"/projet/" + lastProject.name} state={{project:lastProject}}>{"<"}</Link>
            </span>}

            {nextProject && <span className='next'>
                <Link onClick={()=>setProjectIndex(prev => prev + 1 )} to={"/projet/" + nextProject.name} state={{project:nextProject}}>{">"}</Link>
            </span>}
        </div>
       <div className={"video__big"} style={{width:"100vw",height:"100vh"}} >
        
    <ReactPlayer
        url={"/assets/uploads/videos/" + project?.background_video}
        playing
         loop
         muted
         playsinline
         width="100%"
         height="100vh"
    />
       </div>
    
        <h1 className='production__title'>{project?.name}</h1>
        <p className='production__text__desc'>réalisé par {project?.made_by}</p>
        
        <div>
            <ReactPlayer className={"react-player"}  width={1000} height={500} controls  url={project?.youtube_video} preload="none"  style={{margin:"10px auto",height:500,objectFit:"cover"}} /> 
            <div className={`production__show-assets ${!showAssets ? "production__show-assets__off" : "production__show-assets__on" }`} onClick={()=>setShowAssets(!showAssets)}>
            <span></span>
            <span></span>
        </div>
        </div>
       
        <div className={`production__project-assets ${!showAssets && "production__project-assets__hidden"}`}> 
        {loading  && <Fallback inline={true}/>}
            { projectData.staff && 
                <>
                    {!loading && <ProjectStaff projectData={projectData} project={project}/>}
                </>
            }
        </div>
        
    </article>
  )
}


export default Project