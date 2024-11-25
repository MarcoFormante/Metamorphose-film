import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import ProjectStaff from './ProjectStaff';
import { isMobile } from 'react-device-detect';
import SEO from '../../components/Seo/SEO';
import { getProjectByName, getProjectData } from '../../api/projectsApi';
import { purifyProjectData } from '../../security/Dompurify/purify';



const Project = ({cookie}) => {
    const location = useLocation()
    const [showAssets, setShowAssets] = useState(false)
    const [nextProject,SetNextProject] = useState(null)
    const [lastProject,setLastProject] = useState(null)
    const [project,setProject] = useState(location.state?.project)
    const [projectIndex,setProjectIndex] = useState(location.state?.index)
    const [fade,setFade] = useState(false)
    const [projectData,setProjectData] = useState(null)
    const param = useParams()
    const allProjects = location.state?.allProjects
    const navigate = useNavigate()

    useEffect(()=>{
      if (param.name && !location.state?.project) {
            getProjectByName(param.name)
            .then(project=>{
            setProject(project[0])
          }).catch(()=> navigate("/"))
      }
  },[])
  

    useEffect(()=>{
        if (showAssets) {
            window.scrollTo({
                top: 700,
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
        const timeout = setTimeout(()=>{
            setFade(false)
        },400)

        if (location.state?.project.name && projectIndex !== null && projectIndex !== undefined && allProjects) {
            setFade(true)
            setProject(null)
            setProjectData(null)
            setShowAssets(false)
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
        
        }

        return ()=> clearTimeout(timeout)
    },[projectIndex,allProjects,location.state?.project.name])



useEffect(() => {
  if (projectData && showAssets) {
      return
  }
  const getData = async ()=>{
    const data = await getProjectData(project.id)
    const purifiedData = purifyProjectData(data);
    setProjectData(purifiedData || null);
    
  } 
  if (showAssets && !projectData) {
      getData()
  }
  
}, [showAssets])


  return (
    project && (
      <>
       <SEO title={"Metamorphose Film - Projet " + project?.name } url={"/projet/" + project?.slug} robots={true} />
        <article className={`production ${fade ? "production-fadein" : ""}`}>
          <div className={`last-next-btns-container ${isMobile ? "" : "desktop"}`}>
            {lastProject && (
              <span className="last">
                <Link
                  onClick={() =>
                    setProjectIndex((prev) => (prev > 0 ? prev - 1 : 0))
                  }
                  to={"/projet/" + lastProject.slug}
                  state={{ project: lastProject, index: projectIndex - 1 ,allProjects}}
                >
                  <span className='hidden'>{lastProject.slug}</span>
                </Link>
              </span>
            )}

            {nextProject && (
              <span className="next">
                <Link
                  onClick={() => setProjectIndex((prev) => prev + 1)}
                  to={"/projet/" + nextProject.slug}
                  state={{ project: nextProject, index: projectIndex + 1 ,allProjects}}
                >
                   <span className='hidden'>{nextProject.slug}</span>
                </Link>
              </span>
            )}
          </div>
          <div
            className={"video__big"}
            style={{ width: "100vw", height: "100vh" }}
          >
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
          <h1 className="production__title">{project?.name}</h1>
          <h2>Realisé par</h2>
          {project?.made_by && (
            <ul className='made-by-list'>
              {project?.made_by?.split(",").map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
          <div>
            <div className={"projet-video"}>
            <ReactPlayer
              className={`react-player`}
              width={1000}
              height={500}
              controls={true}
              url={cookie && project.youtube_video}
              loop={false}
              playing={true}
              muted={false}
              preload="none"
              style={{ margin: "10px auto", height: 500, objectFit: "cover" }}
              light={project?.thumbnail}
              config={{
                youtube: {
                  embedOptions:{
                    host: "https://www.youtube-nocookie.com"
                  }
                },
              }}
            >
            </ReactPlayer>
            </div>
            <div
              className={`production__show-assets ${
                !showAssets
                  ? "production__show-assets__off"
                  : "production__show-assets__on"
              }`}
              onClick={() => setShowAssets(!showAssets)}
            >
              <span></span>
              <span></span>
            </div>
          </div>
          <div
            className={`production__project-assets ${
              !showAssets && "production__project-assets__hidden"
            }`}
          >
            {showAssets && projectData &&  (
              <>
                <ProjectStaff project={project} projectData={projectData} />
              </>
            )}
          </div>
        </article>  
      </>
    )
  );
}


export default Project