import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useEventListener } from '../../hooks/useEventListener'
import { Figure } from '../../components/Home/Figure'
import { axiosInstance } from '../../middleware/axiosInstance'
import SEO from '../../components/Seo/SEO'



const Home = () => {
    const carouselRef = useRef(null)
    const [isHold, setIsHold] = useState(false)
    const [isScrolling, setIsScrolling] = useState(false)
    const [projects,setProjects] = useState([])

    console.log(projects);
    // Scroll to the first slide when the page is loaded
    useEffect(()=>{
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = 0
        }
    },[carouselRef])


    // Scroll the carousel when the mouse is down and moving
    const  scroll = useCallback((e)=>{
        if (isHold) {
            setIsScrolling(true)
            carouselRef.current.scrollLeft -= e.movementX
        }
    },[isHold]) 
       
    

    // set Hold State to true when the mouse is down
    const mouseDown = useCallback((e)=>{
        setIsHold(true)
    },[]) 

    // set Hold State to false when the mouse is up and scroll to the closest slide
    const  mouseUp = useCallback((e)=>{
        if (carouselRef?.current) {
            setIsHold(false)
            const itemWidth = window.innerWidth  ;
            const currentScrollPosition = carouselRef?.current?.scrollLeft;
            const index = Math.round(currentScrollPosition / itemWidth );
            const closestSnapPoint = index * itemWidth;
            carouselRef.current.scrollTo({
                left: closestSnapPoint,
                behavior: 'smooth',
            });
          
            if (carouselRef?.current?.scrollLeft === closestSnapPoint) {
                setIsScrolling(false)
            }
        }
    },[carouselRef]) 
    
    
    useEventListener("mousedown",carouselRef,mouseDown,[],true)
    useEventListener("mouseup",carouselRef,mouseUp,[],true)
    useEventListener("mouseleave",carouselRef,mouseUp,[],true)
    useEventListener("mousemove",carouselRef,scroll,[isHold],true)



    useEffect(()=>{
        if (sessionStorage.getItem("projects") && !sessionStorage.getItem("token-ad")) {
                return setProjects(JSON.parse(sessionStorage.getItem("projects")))
            }
        axiosInstance.get("home/projects")
        .then(res => {
            if (res.status === 200) {
                setProjects(res.data.projects)
                sessionStorage.setItem("projects",JSON.stringify(res.data.projects))
            }else{
                console.error("Error: No projects")
            }
        }).catch(()=>"Error: No projects")
    },[])


    return (
        <>
      
       <SEO title={"Metamorphose"} url={"/"}  description={"Ici vous pouvez admirer tout les projets de Metamorphose"} name={"Metamorphose"} type={"website"} keywords={"Projets,videos,images,artistes,musique,projets creatifs"}/> 
        <div id='home'>
            <div ref={carouselRef} className='carousel'>
                { projects.length > 1 ?  projects.map((project,index) =>
                   <div key={index}>
                        <Figure project={project} index={index} isScrolling={isScrolling} />
                   </div>
                  
                )
            :
            <div >
                <Figure project={projects[0]} index={0} isScrolling={isScrolling} />
            </div>
            }
            </div>
        </div>
        </>
    )
}

export default Home

