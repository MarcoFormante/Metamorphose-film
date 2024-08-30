import React from 'react'

const NewProjectStaffPage = ({
    production,
    artists,
    montage,
    cadrage,
    droniste,
    phPlateau,
    decorateurs,
    moreStaffFields,
    moreStaffFieldsCounter,
    setMoreStaffFieldsCounter,
    handleMoreStaffFields,
    handleMoreStaffFields2,
    setProduction,
    setArtists,
    setMontage,
    setCadrage,
    setDroniste,
    setPhPlateau,
    setDecorateurs,
    canSubmit,
    isSubmit
}) => {


  return (
    <div>
          <div className='inpt-container'>
            <label htmlFor='p-staff-production'>Production</label>
            <input type='text' required id='p-staff-production' name='p-staff-production' value={production} onChange={(e)=>setProduction(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-artists'>Artistes</label>
            <input type='text'  id='p-staff-artists' name='p-staff-artists' value={artists} onChange={(e)=>setArtists(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-montage'>Montage</label>
            <input type='text'  id='p-staff-montage' name='p-staff-montage' value={montage} onChange={(e)=>setMontage(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-cadrage'>Cadrage</label>
            <input type='text'   id='p-staff-cadrage' name='p-staff-cadrage' value={cadrage} onChange={(e)=>setCadrage(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-droniste'>Pilote de drone</label>
            <input type='text'  id='p-staff-droniste' name='p-staff-droniste' value={droniste} onChange={(e)=>setDroniste(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-ph_plateau'>Ph_plateau</label>
            <input type='text'  id='p-staff-ph_plateau' name='p-staff-ph_plateau' value={phPlateau} onChange={(e)=>setPhPlateau(e.target.value)} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-decorateurs'>Directeur de la photographie</label>
            <input type='text'  id='p-staff-decorateurs' name='p-staff-decorateurs' value={decorateurs} onChange={(e)=>setDecorateurs(e.target.value)} />
          </div>

          {moreStaffFieldsCounter > 0 && Array.from({length: moreStaffFieldsCounter}).map((_,index)=>
        <div  key={"Staffcounter" + index}>
          <div className='inpt-container'>
            <label htmlFor={'staffCounter-' + index}>Autre Staff</label>
            <input type='text' id={'staffCounter-' + index} name={'moreStaff-' + index} value={moreStaffFields[index]?.value1} placeholder='Titre'  onChange={(e)=>handleMoreStaffFields(e.target.value,index)}/>
            <input type='text' id={'staffCounter2-' + index  } name={'moreStaff2-' + index} value={moreStaffFields[index]?.value2} placeholder='Valeur'  onChange={(e)=>handleMoreStaffFields2(e.target.value,index)}/>
          </div>
        </div>
      )}

        <div className='moreStaff-btn'>
                <span onClick={()=>setMoreStaffFieldsCounter(prev => prev + 1)}>+</span>
        </div>
        

         { canSubmit &&  <div className='inpt-container m-40'>
            <input disabled={isSubmit} type='submit' id='p-staff-p-submit' value='Submit' />
          </div>}
        </div>
  )
}

export default NewProjectStaffPage