import React, { useEffect, useState } from 'react'
import { Figure } from '../../components/Home/Figure'
import { axiosInstance } from '../../middleware/axiosInstance'
import SEO from '../../components/Seo/SEO'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { purifyProjects } from '../../security/Dompurify/purify';


const Home = () => {
    const [projects,setProjects] = useState([])
    
    

    useEffect(()=>{
        try {
            
            if (sessionStorage.getItem("projects") && !sessionStorage.getItem("token-ad")) {
                const jsonProjects = JSON.parse(sessionStorage.getItem("projects"))
                const purifiedProjects = purifyProjects(jsonProjects)
                return setProjects(purifiedProjects)
            }
        } catch (error) {
            console.log("Error parsing projects");
        }
        axiosInstance.get("home/projects")
        .then(res => {
            if (res.status === 200) {
                const resProjects = res.data?.projects
                const purifiedProjects = purifyProjects(resProjects)
                setProjects(purifiedProjects)
                sessionStorage.setItem("projects",JSON.stringify(resProjects))
            }else{
                console.error("Error: No projects")
            }
        }).catch(()=>"Error: No projects")
    },[])


    return (
    <>
        <SEO title={"Metamorphose"} url={"/"}  description={"Ici vous pouvez admirer tout les projets de Metamorphose"} name={"Metamorphose"} type={"website"} keywords={"Projets,videos,images,artistes,musique,projets creatifs"}/> 

        <div id='home'>
            <Swiper style={{color:"white"}}
                modules={[Navigation, Pagination, Scrollbar, A11y,Keyboard,Mousewheel]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                keyboard={{ enabled: true }}
                speed={1000}
                direction='horizontal'
                mousewheel={{enabled:true,forceToAxis: true, releaseOnEdges: true,}}
            >
                {projects.length > 1 ?  projects.map((project,index) =>
                    <SwiperSlide key={index}>
                            <Figure project={project} index={index}  />
                    </SwiperSlide>)
                    :
                    <SwiperSlide>
                    <Figure project={projects[0]} index={0}  />
                    </SwiperSlide> 
                }
            </Swiper>
        </div>
    </>
    )
}

export default Home

