import React, { useEffect, useState } from 'react'
import Figure from './Figure';
import SEO from '../../components/Seo/SEO'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { purifyProjects } from '../../security/Dompurify/purify';
import { getProjects } from '../../api/projectsApi';
import { useContext } from 'react';
import { ProjectsContext } from '../../contexts/ProjectsContext';
import SchemaHome from '../../components/Seo/Schema/SchemaHome';
import { Helmet } from 'react-helmet-async';

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
            title={"Metamorphose Film - Société de production audiovisuelle créative"}
            url={"/"}
            robots={true}
          />

         {projects.length && <Helmet>
          <script type="application/ld+json">{
            JSON.stringify(projects.map(project => ({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: project.name,
              description: `Realizzato da Metamorphose Film`,
              contentUrl: `https://metamorphosefilm.com/assets/uploads/videos/${project.background_video}`,
              embedUrl: project.youtube_video?.includes("watch?v=")
              ? project.youtube_video.replace("watch?v=", "embed/")
              : project.youtube_video?.includes("youtu.be/")
                ? `https://www.youtube.com/embed/${project.youtube_video.split("youtu.be/")[1].split("?")[0]}`
                : project.youtube_video || "",
                thumbnailUrl:"https://metamorphosefilm.com/assets/uploads/images/projects/" + project.thumb,
              uploadDate: project.updated_at,
              publisher: {
                "@type": "Organization",
                name: "Metamorphose Film",
                logo: {
                  "@type": "ImageObject",
                  url: "https://metamorphosefilm.com/android-chrome-192x192.png",
                  width: 192,
                  height: 192
                }
              }
            })))
          }</script>
          </Helmet> }

        
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

