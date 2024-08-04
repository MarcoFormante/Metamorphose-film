import React from 'react'
import StaffList from './StaffList'

const 
ProjectStaff = ({projectData,project}) => {


  return (
    <React.Fragment>
       <div className='production__imgs'>
           <img src={"/assets/uploads/images/projects/" + projectData?.images[0] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
           <img src={"/assets/uploads/images/projects/" + projectData?.images[1] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
       </div>
      <StaffList title={"Production"} items={projectData.staff?.production } className={"production"} />
      <StaffList title={"Artistes"} items={projectData.staff?.artists} className={"artists"} />
       <div className='production__imgs'>
       <img src={"/assets/uploads/images/projects/" + projectData?.images[2] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
       <img src={"/assets/uploads/images/projects/" + projectData?.images[3] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
       </div>
      <StaffList title={"Montage"} items={projectData.staff?.montage} className={"montage"} />
      <StaffList title={"Cadrage"} items={projectData.staff?.cadrage} className={"cadrage"} />
      <StaffList title={"Droniste"} items={projectData.staff?.droniste} className={"droniste"} />

      {projectData.staff?.photographePlateau && 
        <>
          <h2>Photographe de plateau</h2>
          <ul className='photoplateau-list'>
            {projectData.staff?.photographePlateau?.split(',').map((p, i) => <li key={i} className='photoplateau'>{p}</li>)}
          </ul>
        </>
      }

      <StaffList title="Photographe de plateau" items={projectData.staff?.photographePlateau} className="photoplateau" />
      <StaffList title="Décorateurs" items={projectData.staff?.decorateurs} className="deco" />

      <div className='production__imgs'>
        <img src={"/assets/uploads/images/projects/" + projectData?.images[4] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
        <img src={"/assets/uploads/images/projects/" + projectData?.images[5] } alt={`Projet video ${project.name} de ${projectData.staff.production}`} />
      </div>

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
      </React.Fragment>
  )
}

export default ProjectStaff




