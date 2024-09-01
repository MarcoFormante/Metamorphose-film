import React, { useEffect, useState } from 'react'
import Figure from './Figure';
import SEO from '../../components/Seo/SEO'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { purifyProjects } from '../../security/Dompurify/purify';
import { getProjects } from '../../api/projectsApi';


const Home = () => {
    const [projects,setProjects] = useState([])    
    const [error,setError] = useState("")

    useEffect(() => {
          const fetchProjects = async () => {
            try {
              const data = await getProjects();
              if (!data || data.length < 1) {
                setError("Error fetching projects");
              }
              const purifiedProjects = purifyProjects(data);
              setProjects(purifiedProjects);
              sessionStorage.setItem("projects", JSON.stringify(purifiedProjects));
            } catch (error) {
              console.error(error.message);
              setError(error.message);
            }
        }
        fetchProjects();
      }, []);


    if (error) return <h1 style={{color:"white",textAlign:"center"}}>Erreur : Aucun projet</h1>;

    return  (
    <>
          <SEO
            title={"Metamorphose"}
            url={"/"}
            description={
              "Ici vous pouvez admirer tout les projets de Metamorphose"
            }
            name={"Metamorphose"}
            type={"website"}
            keywords={"Projets,videos,images,artistes,musique,projets creatifs"}
          />
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
                mousewheel={true}
            >
                {projects.length > 0 && (
                    projects.length > 1 ? (
                        projects.map((project,i) => (
                        <SwiperSlide key={project.id}>
                            <Figure project={project} index={i} />
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

