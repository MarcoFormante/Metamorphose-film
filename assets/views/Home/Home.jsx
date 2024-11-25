import React, { useEffect, useState } from 'react'
import Figure from './Figure';
import SEO from '../../components/Seo/SEO'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { purifyProjects } from '../../security/Dompurify/purify';
import { getProjects } from '../../api/projectsApi';
import { useContext } from 'react';
import { ProjectsContext } from '../../contexts/ProjectsContext';

const Home = () => {
    const [projects,setProjects] = useState([])    
    const [error,setError] = useState("")
    const [swiperRealIndex, setSwiperRealIndex] = useState(0);
    const {contextProjects,setContextProjects} = useContext(ProjectsContext)
    
    
    useEffect(() => {
          const fetchProjects = async () => {
            try {
              const data = await getProjects();
              if (!data || data.length < 1) {
                setError("Error fetching projects");
              }
              const purifiedProjects = purifyProjects(data);
              setProjects(purifiedProjects);
              setContextProjects(purifiedProjects);
             
            } catch (error) {
              console.error(error.message);
              setError(error.message);
            }
        }
        if (contextProjects && contextProjects.length > 0) {
          setProjects(contextProjects)
        }else{
          fetchProjects();
        }
      }, []);


    if (error) return <p style={{color:"white",textAlign:"center"}}>Erreur : Aucun projet</p>;

    return  (
    <>
          <SEO
            title={"Metamorphose Film - Accueil"}
            url={"/"}
            robots={true}
          />
        <div id='home'>
          <h1 style={{position:'fixed',left:-5000,opacity:0}}>Metamorphose Film - Accueil</h1>
            <Swiper style={{color:"white"}}
                modules={[Navigation, Pagination, Scrollbar, A11y,Keyboard,Mousewheel]}
                passiveListeners={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                keyboard={{ enabled: true }}
                speed={1000}
                direction='horizontal'
                mousewheel={true}
                onSlideChange={
                  (swiper) => {
                    setSwiperRealIndex(swiper.realIndex )
                  }
                
               }
            >
                {projects.length > 0 && (
                    projects.length > 1 ? (
                        projects.map((project,i) => (
                        <SwiperSlide key={project.id}>
                            <Figure project={project} allProjects={projects} index={i} swiperRealIndex={swiperRealIndex} />
                        </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                          <Figure project={projects[0]} index={0}  />
                        </SwiperSlide>
                    )
                    ) }
            </Swiper>
        </div>
    </>
    )
}

export default Home

