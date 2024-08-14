import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../middleware/axiosInstance';
import ProjectStaff from './ProjectStaff';
import Fallback from '../../components/Spinner/Fallback';
import { purifyProjects,purifyProjectData } from '../../security/Dompurify/purify';


const Project = () => {
    const location = useLocation()
    const [showAssets, setShowAssets] = useState(false)
    const [projectData,setProjectData] = useState([])
    const [loading,setLoading] = useState(true)
    const [nextProject,SetNextProject] = useState(null)
    const [lastProject,setLastProject] = useState(null)
    const [project,setProject] = useState(null)
    const [projectIndex,setProjectIndex] = useState(location.state?.index)
    const [allProjects,setAllProjects] = useState(null)
    const [fade,setFade] = useState(false)
    const navigate = useNavigate()
    const param = useParams()




    useEffect(()=>{
        try {
            if (sessionStorage.getItem("projects")) {
                const JsonProjects = JSON.parse(sessionStorage.getItem("projects"))
                const purifiedProjects = purifyProjects(JsonProjects)
                setAllProjects(purifiedProjects)
            }
        } catch (error) {
            console.log("Error parsing projects");
            navigate("/")
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
            setLoading(true)
            setProject({})
            setShowAssets(false)
            setProjectData([])
          
            axiosInstance.get("projectByName/" + param?.name)
            .then(res => {
                if (res.status === 200) {
                    const project = res.data.project
                    const purifiedProjects = purifyProjects(project)
                    setProject(purifiedProjects[0])
                }else{
                    return navigate("/")
                }
            }).catch(()=>{
                return navigate("/")
            }).finally(()=>{
                setLoading(false)
            })
        }
    },[param])
    


    useEffect(()=>{
        if (!projectData.staff && showAssets) {
            setLoading(true)
            axiosInstance.get("projectData/" + project.id)
            .then(res => {
                if (res.status === 200) {
                    const resProjectData = purifyProjectData(res.data.projectData)
                    setProjectData(resProjectData)
                }else{
                    console.error("Error: no project data")
                    navigate("/")
                }
            }).catch(err=>{
                console.error("Error: no project data")
                navigate("/")
            }).finally(()=>{
                setLoading(false)
            })
        }       
    },[showAssets,projectData])



    useEffect(()=>{

        const timeout = setTimeout(()=>{
            setFade(false)
        },400)

        if (location.state?.project.name && projectIndex !== null && projectIndex !== undefined && allProjects) {
            setFade(true)
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
            location.state.index = projectIndex
        
        }else{
            setProject(null)
            setShowAssets(false)
            setProjectData([])
        }

        return ()=> clearTimeout(timeout)
    },[projectIndex,allProjects])



  return project && (
    <article className={`production ${fade ? "production-fadein" :""}`}>
      
        <div className='last-next-btns-container'>
            {lastProject && <span className='last'>
                <Link onClick={()=>setProjectIndex(prev => prev > 0 ? prev - 1 : 0)} to={"/projet/" + lastProject.name} state={{project:lastProject,index:projectIndex - 1}}>{"<"}</Link>
            </span>}

            {nextProject && <span className='next'>
                <Link onClick={()=>setProjectIndex(prev => prev + 1 )} to={"/projet/" + nextProject.name} state={{project:nextProject,index:projectIndex + 1}}>{">"}</Link>
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
            <h2>Realisé par</h2>
            {project?.made_by && 
            <ul>
                {project?.made_by?.split(',').map((r, i) => <li key={i}>{r}</li>)}
            </ul>
            }
            
        
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