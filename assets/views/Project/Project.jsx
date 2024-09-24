import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import ProjectStaff from './ProjectStaff';
import Fallback from '../../components/UI/Spinner/Spinner';
import { purifyProjects } from '../../security/Dompurify/purify';
import { getProjectByName } from '../../api/projectsApi';
import { isMobile } from 'react-device-detect';




const Project = ({cookie}) => {
    const location = useLocation()
    const [showAssets, setShowAssets] = useState(false)
    const [loading,setLoading] = useState(false)
    const [nextProject,SetNextProject] = useState(null)
    const [lastProject,setLastProject] = useState(null)
    const [project,setProject] = useState(location.state?.project)
    const [projectIndex,setProjectIndex] = useState(location.state?.index)
    const [fade,setFade] = useState(false)
    const navigate = useNavigate()
    const param = useParams()
    const allProjects = location.state?.allProjects
  

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
        if (param.name && !location.state?.project) {
            navigate("/")
        }
    },[])


    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setFade(false)
        },400)

        if (location.state?.project.name && projectIndex !== null && projectIndex !== undefined && allProjects) {
            setFade(true)
            setProject(null)
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
        
        }else{
            setProject(null)
            setShowAssets(false)
        }

        return ()=> clearTimeout(timeout)
    },[projectIndex,allProjects,location.state?.project.name])



  return (
    project && (
      <article className={`production ${fade ? "production-fadein" : ""}`}>
    
        <div className={`last-next-btns-container ${isMobile ? "" : "desktop"}`}>
          {lastProject && (
            <span className="last">
              <Link
                onClick={() =>
                  setProjectIndex((prev) => (prev > 0 ? prev - 1 : 0))
                }
                to={"/projet/" + lastProject.name}
                state={{ project: lastProject, index: projectIndex - 1 ,allProjects}}
              >
                {""}
              </Link>
            </span>
          )}

          {nextProject && (
            <span className="next">
              <Link
                onClick={() => setProjectIndex((prev) => prev + 1)}
                to={"/projet/" + nextProject.name}
                state={{ project: nextProject, index: projectIndex + 1 ,allProjects}}
              >
                {""}
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
          <ul>
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
          {loading && <Fallback inline={true} />}
          {showAssets && (
            <>
              <ProjectStaff project={project} />
            </>
          )}
        </div>
      </article>
    )
  );
}


export default Project