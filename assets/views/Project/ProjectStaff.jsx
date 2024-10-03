import React, { useEffect, useState } from 'react'
import StaffList from './StaffList'
import { getProjectData } from '../../api/projectsApi'
import { purifyProjectData } from '../../security/Dompurify/purify'
import Spinner from '../../components/UI/Spinner/Spinner'

const ProjectStaff = (props) => {
const [projectData, setProjectData] = useState(props.projectData)
const [loading, setLoading] = useState(true)

useEffect(() => {
    if (projectData) {
        setLoading(false)
    }
}, [projectData])


if (loading) return <Spinner inline={true} />;
  

  return projectData &&(
    <React.Fragment>
       <div className='production__imgs'>
           <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[0] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
           <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[1] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
       </div>
       <div className='production__imgs'>
          <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[2] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
          <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[3] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
       </div>
       <div className='production__imgs'>
        <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[4] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
        <img loading='lazy' src={"/assets/uploads/images/projects/" + projectData?.images[5] } alt={`Projet video ${props.project.name} de ${projectData.staff.production}`} />
      </div>
      <div className='staff-list-flex'>
        
      <StaffList title={"Production"} items={projectData.staff?.production } className={"production"} />
      <StaffList title={"Artistes"} items={projectData.staff?.artists} className={"artists"} />
      <StaffList title={"Montage"} items={projectData.staff?.montage} className={"montage"} />
      <StaffList title={"Cadrage"} items={projectData.staff?.cadrage} className={"cadrage"} />
      <StaffList title={"Pilote de drone"} items={projectData.staff?.droniste} className={"droniste"} />
      {projectData.staff?.photographePlateau && 
        <>
          <h2>Photographe de plateau</h2>
          <ul className='photoplateau-list'>
            {projectData.staff?.photographePlateau?.split(',').map((p, i) => <li key={i} className='photoplateau'>{p}</li>)}
          </ul>
        </>
      }

      <StaffList title="Photographe de plateau" items={projectData.staff?.photographePlateau} className="photoplateau" />
      <StaffList title="Directeur de la photographie" items={projectData.staff?.decorateurs} className="deco" />

    

      {projectData.staff?.moreStaffFields && projectData.staff.moreStaffFields.length > 0 &&
        JSON.parse(projectData.staff?.moreStaffFields).map((f, i) => (
          <StaffList 
            key={f.value1 + i} 
            title={f.value1} 
            items={f.value2} 
            className="morestaff"
          />
        ))
      }
      </div>
      
      </React.Fragment>
  )
}

export default ProjectStaff




