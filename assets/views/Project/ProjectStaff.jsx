import React from 'react'

const 
ProjectStaff = ({projectData,project}) => {


  return (
    <React.Fragment>
         <div className='production__imgs'>
             <img src={"/assets/uploads/images/projects/" + projectData?.images[0] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
             <img src={"/assets/uploads/images/projects/" + projectData?.images[1] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
         </div>


         {projectData.staff.production && 
         <>
            <h2>Production</h2>
            <p>{projectData.staff.production}</p>
         </>
          }
         {projectData.staff.artists && 
          <>
            <h2>Artistes</h2>
            {projectData.staff.artists && projectData.staff.artists?.split(',').map((artist,i)=><p key={i} className='artists'>{artist}</p>)}
          </>
         }


         <div className='production__imgs'>
         <img src={"/assets/uploads/images/projects/" + projectData?.images[2] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
         <img src={"/assets/uploads/images/projects/" + projectData?.images[3] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
         </div>


         {projectData.staff?.montage && 
         <>
          <h2>Montage</h2>
          {projectData.staff?.montage?.split(',').map((m,i)=><p key={i} className='montage'>{m}</p>)}
         </>
         }
       

         {projectData.staff?.cadrage &&
          <>
            <h2>Cadrage</h2>
            {projectData.staff?.cadrage?.split(',').map((c,i)=><p key={i} className='cadrage'>{c}</p>)}
          </>
        }
         

         {projectData.staff?.droniste &&  
          <>
            <h2>Droniste</h2>
            {projectData.staff?.droniste?.split(',').map((d,i)=><p key={i} className='droniste'>{d}</p>)}
          </>
          }
       

         {projectData.staff?.photographePlateau && 
          <>
            <h2>Photographe de plateau</h2>
            {projectData.staff?.photographePlateau?.split(',').map((p,i)=>
            <p key={i} className='photoplateau'>{p}</p>)
            }
          </>
         }

         {projectData.staff?.decorateurs  && 
          <>
            <h2>Décorateurs</h2>
          {projectData.staff?.decorateurs?.split(',').map((d,i)=><p key={i} className='deco'>{d}</p>)}
          </>
          }

         <div className='production__imgs'>
         <img src={"/assets/uploads/images/projects/" + projectData?.images[4] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
         <img src={"/assets/uploads/images/projects/" + projectData?.images[5] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
         </div>

         {projectData.staff?.moreStaffFields && projectData.staff.moreStaffFields.length > 0 &&
             JSON.parse(projectData.staff?.moreStaffFields).map((f, i) => (
               <div key={f.value1 + i}>
                 <h2>{f.value1}</h2>
                 {f.value2.split(',').map((m, i) => (
                   <p key={m + i} className='morestaff'>{m}</p>
                 ))}
               </div>
             ))
           }
      </React.Fragment>
  )
}

export default ProjectStaff