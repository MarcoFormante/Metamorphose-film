import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import ProjectStaff from './ProjectStaff';
import Fallback from '../../components/UI/Spinner/Spinner';
import { purifyProjects } from '../../security/Dompurify/purify';
import { getProjectByName } from '../../api/projectsApi';
import { isMobile } from 'react-device-detect';
import CookieConsent, { Cookies } from "react-cookie-consent";




const Project = () => {
    const location = useLocation()
    const [showAssets, setShowAssets] = useState(false)
    const [loading,setLoading] = useState(false)
    const [nextProject,SetNextProject] = useState(null)
    const [lastProject,setLastProject] = useState(null)
    const [project,setProject] = useState(location.state?.project || null)
    const [projectIndex,setProjectIndex] = useState(location.state?.index)
    const [allProjects,setAllProjects] = useState(null)
    const [fade,setFade] = useState(false)
    const navigate = useNavigate()
    const param = useParams()
    const [youtubeVideo,setYoutubeVideo] = useState()
    const [coockieConsent,setCoockieConsent] = useState(Cookies.get("cookieConsent"))
    const [svgHide,setSvgHide] = useState(false)
    

    useEffect(()=>{
        try {
            if (sessionStorage.getItem("projects")) {
                const JsonProjects = JSON.parse(sessionStorage.getItem("projects"))
                const purifiedProjects = purifyProjects(JsonProjects)
                if (!purifiedProjects) {
                    throw new Error("Error parsing projects")
                }
                setAllProjects(purifiedProjects)
            }
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    },[])

    useEffect(()=>{
      if (coockieConsent === "true") {
          setYoutubeVideo(project?.youtube_video)
      }else if ( coockieConsent === "false") {
            setYoutubeVideo("/assets/uploads/videos/" + project?.background_video)
      }else if (coockieConsent === undefined) {
          setYoutubeVideo(undefined)
      }
    },[coockieConsent])


 
    const handleWantWatch = ()=>{
      setYoutubeVideo(project?.youtube_video)
      setSvgHide(true)
    }
   
   useEffect(()=>{
      if (coockieConsent === "false" && Cookies.get("cookieConsentUsed") !== "true") {
          Cookies.remove("cookieConsent")
          setCoockieConsent(undefined)
          setYoutubeVideo(undefined)
      }
   },[])

   const handleDeclineCookie = () => {
      setCoockieConsent("false")
      Cookies.set("cookieConsent","false")
      Cookies.set("cookieConsentUsed","true")
   }

   const handleAcceptCookie = () => {
      setCoockieConsent("true")
      Cookies.set("cookieConsent","true")
      Cookies.set("cookieConsentUsed","true")
   }


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


    const fetchProject = async () => {
        try {
            const projectByName = await getProjectByName(param.name)
            const purifiedProject =  purifyProjects(projectByName)
            setProject(purifiedProject[0])
            setLoading(false)
        } catch (error) {
            console.log(error);
            navigate("/")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (param.name && !location.state?.project?.name) {
            setLoading(true)
            setProject({})
            setShowAssets(false)
            fetchProject()
        }else if(location.state?.project?.name && !sessionStorage.getItem("projects")){
            navigate("/")
        }
    },[param])


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
       <CookieConsent
        declineButtonText="Refuser"
        location="bottom"
        buttonText="Accepter"
        cookieName="cookieConsent"
        style={ { background: "#F51000",direction:"ltr", textAlign:"left",flexDirection:"row",justifyContent:"center",alignItems:"center",display:"flex",padding:"10px",fontSize:"15px",transition:"all 0.5s " }}
        buttonStyle={{background:"white", color: "black", fontSize: "16px",fontWeight:"bold" }}
        expires={300}
        acceptOnScroll={false}
        enableDeclineButton
        onAccept={handleAcceptCookie}
        onDecline={handleDeclineCookie}
      >
        <>
        Ce site utilise des cookies de <strong>YouTube </strong> 
        pour afficher des vidéos. Sans ces cookies, 
        vous ne pourrez pas voir directement la vidéo ici, 
        mais vous devrez cliquer dessus et être redirigé vers la page de YouTube.
        Pour en savoir plus sur les cookies de YouTube, veuillez consulter ce lien <a style={{color:"white",fontWeight:"bold"}} href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy</a> .
        En acceptant, vous consentez à l'utilisation des cookies de YouTube pour l'affichage du contenu.
        Si vous souhaitez en savoir plus sur la politique de confidentialité et des cookies <strong>nécessaires</strong> de ce site web, veuillez cliquer
         <Link style={{color:"white",fontWeight:"bold"}} to="/privacy-policy"> ici</Link>.
        </>
      </CookieConsent>
        <div className={`last-next-btns-container ${isMobile ? "" : "desktop"}`}>
          {lastProject && (
            <span className="last">
              <Link
                onClick={() =>
                  setProjectIndex((prev) => (prev > 0 ? prev - 1 : 0))
                }
                to={"/projet/" + lastProject.name}
                state={{ project: lastProject, index: projectIndex - 1 }}
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
                state={{ project: nextProject, index: projectIndex + 1 }}
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
       {coockieConsent === "false" && youtubeVideo !== undefined ? <div className={`yt-svg ${svgHide ? "yt-svg--hide" : ""}`} onClick={handleWantWatch}><svg  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70px" height="70px" viewBox="0 0 96.875 96.875" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M95.201,25.538c-1.186-5.152-5.4-8.953-10.473-9.52c-12.013-1.341-24.172-1.348-36.275-1.341 c-12.105-0.007-24.266,0-36.279,1.341c-5.07,0.567-9.281,4.368-10.467,9.52C0.019,32.875,0,40.884,0,48.438 C0,55.992,0,64,1.688,71.336c1.184,5.151,5.396,8.952,10.469,9.52c12.012,1.342,24.172,1.349,36.277,1.342 c12.107,0.007,24.264,0,36.275-1.342c5.07-0.567,9.285-4.368,10.471-9.52c1.689-7.337,1.695-15.345,1.695-22.898 C96.875,40.884,96.889,32.875,95.201,25.538z M35.936,63.474c0-10.716,0-21.32,0-32.037c10.267,5.357,20.466,10.678,30.798,16.068 C56.434,52.847,46.23,58.136,35.936,63.474z"></path> </g> </g></svg> </div> : null}
       {youtubeVideo === undefined && coockieConsent === undefined  ? 
        <div className='spinner'>
          <svg width="100" height="100">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="10" fill="transparent" strokeDashoffset={5} strokeDasharray={40}/>
          </svg>
        </div> 
        : null
        }
          <ReactPlayer
            className={`react-player ${coockieConsent ? "" : "no-youtube"}`}
            width={1000}
            height={500}
            controls={coockieConsent === "true" ? true : false}
            url={youtubeVideo}
            loop={false}
            playing={coockieConsent === "true"  || youtubeVideo?.includes("youtube") ? true : true}
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