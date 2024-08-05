import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Resizer from "react-image-file-resizer";
import { axiosInstance } from '../../../../middleware/axiosInstance';
import Fallback from '../../../../components/Spinner/Fallback';


const ProjectUpdate = () => {
  const location = useLocation()
  const [project,setProject] = useState(null)
  const [projectActive,setProjectActive] = useState(null)
  const [projectName, setProjectName] = useState(null)
  const [abrName, setAbrName] = useState(null)
  const [youtubeLink, setYoutubeLink] = useState(null)
  const [collab, setCollab] = useState(null)
  const [bgVideo, setBgVideo] = useState(null)
  const [lastVideo, setLastVideo] = useState(null)
  const [images, setImages] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  // const [canSubmit, setCanSubmit] = useState(false)
  const [production, setProduction] = useState(null)
  const [madeBy, setMadeBy] = useState(null)
  const [artists, setArtists] = useState(null)
  const [montage, setMontage] = useState(null)
  const [cadrage, setCadrage] = useState(null)
  const [droniste, setDroniste] = useState(null)
  const [phPlateau, setPhPlateau] = useState(null)
  const [decorateurs, setDecorateurs] = useState(null)
  const [newVideo, setNewVideo] = useState(false)
  const [moreStaffFields, setMoreStaffFields] = useState(null)
  const [moreStaffFieldsCounter, setMoreStaffFieldsCounter] = useState(0)
  const [updatedValues, setUpdatedValues] = useState({imgs:[],video:false,projectName:false,abrName:false,youtubeLink:false,collab:false,production:false,madeBy:false,artists:false,montage:false,cadrage:false,droniste:false,phPlateau:false,decorateurs:false,lastMoreStaffFields:[],newMoreStaffFields:[],lastStaff:false,newStaff:false})
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    axiosInstance.get('admin/projectData/' + location.state)
    .then(res => {
      if (res.status === 200) {
        console.log(project);
          const proj = res.data?.project
          setProject(proj)
          setProjectActive(proj.isActive)
          setProjectName(proj.name)
          setAbrName(proj.abrName)
          setYoutubeLink(proj.youtube_video)
          setCollab(proj.collab_with)
          setProduction(proj.staff.production)
          setMadeBy(proj.made_by)
          setArtists(proj.staff.artists)
          setMontage(proj.staff.montage)
          setCadrage(proj.staff.cadrage)
          setDroniste(proj.staff.droniste)
          setPhPlateau(proj.staff.phPlateau)
          setDecorateurs(proj.staff.decorateurs)
          setMoreStaffFields(proj.staff.moreStaffFields)
          setLastVideo(proj.background_video)
          setImages(proj.images)
          setLastVideo(proj.background_video)
          setProjectActive(proj.isActive)
      }
    })
  },[])



  useEffect(()=>{
    if (moreStaffFields && moreStaffFields.length > 0) {
        const jsonArray = JSON.parse(moreStaffFields)
        if (Array.isArray(jsonArray) && jsonArray.length > 0) {
          setUpdatedValues({...updatedValues,lastMoreStaffFields:[...jsonArray]})
        }
    }
  },[moreStaffFields])


  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsSubmit(true)
    if (images.length !== 6) {
      return alert("You have to upload 6 images")
    }
    const formData = new FormData()
    if (updatedValues.imgs.length > 0) {
      const ids = updatedValues.imgs.map(id=>id)
      const imgs = images.filter((img,index)=> ids.includes(img.id))
      formData.append('oldImages',JSON.stringify(ids))
      const compressedImages = await compressImages(imgs)
      if (!compressedImages) {
        return alert('An error occurred while compressing images, please try again')
      }
      compressedImages.forEach((img, index) => {
        formData.append('images[]',img)
      })
    }

   let staff = []

    if (updatedValues.lastStaff === true) {
      const arrayMoreFieldsWithoutUndefined = updatedValues.lastMoreStaffFields.filter(field => field !== undefined)
      const arrayMoreFieldsWithoutUndefinedAndVoid = arrayMoreFieldsWithoutUndefined.filter(field => field.value1 !== "" && field.value2 !== "")
      if (arrayMoreFieldsWithoutUndefinedAndVoid.length === 0 && updatedValues.newStaff === false) {
        staff = null
      }else if(arrayMoreFieldsWithoutUndefinedAndVoid.length > 0){
        staff.push(...arrayMoreFieldsWithoutUndefinedAndVoid)
      }
    }else {
      staff.push(...updatedValues.lastMoreStaffFields)
    }

  if (updatedValues.newStaff === true) {
    const arrayMoreFieldsWithoutUndefined = updatedValues.newMoreStaffFields.filter(field => field !== undefined)
    const arrayMoreFieldsWithoutUndefinedAndVoid = arrayMoreFieldsWithoutUndefined.filter(field => field.value1 !== "" && field.value2 !== "")
    staff.push(...arrayMoreFieldsWithoutUndefinedAndVoid)
  }

  if (staff !== null && staff.length > 0) {
      formData.append('staff',JSON.stringify(staff))
  }else{
    formData.append('staff',null)
  }
    
    formData.append('id',location.state)
    if (newVideo) {
      formData.append('video',bgVideo)
      formData.append('oldVideo',lastVideo.trim())
    }
    if (updatedValues.projectName) {
      formData.append('name',projectName.trim())
    }
    if (updatedValues.abrName) {
      formData.append('abrName',abrName.trim())
    }
    if (updatedValues.youtubeLink) {
      formData.append('yt',youtubeLink.trim())
    }
    if (updatedValues.collab) {
      formData.append('collab',collab.trim())
    }
    if (updatedValues.production) {
      formData.append('production',production.trim())
    }
    if (updatedValues.madeBy) {
      formData.append('madeBy',madeBy.trim())
    } 
    if (updatedValues.artists) {
      formData.append('artists',artists.trim())
    }
    if (updatedValues.montage) {
      formData.append('montage',montage.trim())
    }
    if (updatedValues.cadrage) {
      formData.append('cadrage',cadrage.trim())
    }
    if (updatedValues.droniste) {
      formData.append('droniste',droniste.trim())
    }
    if (updatedValues.phPlateau) {
      formData.append('phPlateau',phPlateau.trim())
    }
    if (updatedValues.decorateurs) {
      formData.append('decorateurs',decorateurs.trim())
    }
    setLoading(true)
    axiosInstance.post('admin/project/update',formData)
    .then(res => {
      if (res.status !== 200) {
        setIsSubmit(false)
        return alert('An error occurred while updating project, please try again')
      }else{
        alert('Project updated successfully')
        window.history.back()
      }
    }).catch(err => { 
      alert('An error occurred while updating project, please try again')
      setIsSubmit(false)
    }).finally(()=> setLoading(false))
  }

  const handleVideo = (file) => {
    setBgVideo(file)
    setNewVideo(true)
  }


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        1080,
        "WEBP",
        85,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });


    const compressImages = (images) => {
      const resizedImages = images.map(async(image,index) => await resizeFile(image.src))
      const files = Promise.all(resizedImages)
      return files
  }


  const handleImages = (file,index,id) => {
    const arrayImages = images.map((img,i)=> {
      return i === index ? {src:file,id:img.id} : img
    })

    if (!updatedValues.imgs.includes(id)) {
      setUpdatedValues({...updatedValues,imgs:[...updatedValues.imgs,id]})
    }
    setImages([...arrayImages])
  }


const resetImages = (e) =>{
  e.preventDefault()
    setImages(project.images)
    setUpdatedValues({...updatedValues,imgs:[]})
}


const resetVideo = (e) => {
  e.preventDefault()
  setBgVideo(null)
  setNewVideo(false)
  setUpdatedValues({...updatedValues,video:false})
}





const deleteProject = ()=>{
  const confirm = window.confirm("Are you suer to delete this project?")
  if (!confirm) return
  setLoading(true)
  const id = location.state 
  axiosInstance.delete("admin/project/" + id)
  .then(res =>{
    if (res.status === 200) {
        alert("Project Deleted!")
        navigate("/admin/projects/")
    }else{
      alert("Error during deleting the project. try again")
      setLoading(false)
    }
  }).catch(err =>{
    alert("Error during deleting the project. try again")
    setLoading(false)
  })
}

const projectActiveToggle = ()=>{
  setLoading(true)
  const id = location.state
  const formData = new FormData()
  formData.append("id",id)
  axiosInstance.post("admin/project/active",formData)
  .then(res => {
      if (res.status === 200) {
         setProjectActive(res.data?.isActive)
         alert("Project Updated")
         
      }else{
        alert("Error during updating project, try again")
      }
  }).catch(err =>{
    alert("Error during updating project, try again")
    
  }).finally(()=> setLoading(false))
}


const handleMoreStaffFields = (value,index) => {
  updatedValues.lastMoreStaffFields[index] = {value1:value,value2:updatedValues.lastMoreStaffFields[index]?.value2  === undefined ? moreStaffFields[index].split(":")[1].replace(/\|/g,",") : updatedValues.lastMoreStaffFields[index]?.value2 }
  setUpdatedValues({...updatedValues,lastStaff:true})
}

const handleMoreStaffFields2 = (value,index) => {  
  updatedValues.lastMoreStaffFields[index] = {value1:updatedValues.lastMoreStaffFields[index]?.value1  === undefined ? moreStaffFields[index].split(":")[0] : updatedValues.lastMoreStaffFields[index]?.value1,value2:value}
  setUpdatedValues({...updatedValues,lastStaff:true})
}


const handleNewMoreStaffFields = (value,index) => {
  updatedValues.newMoreStaffFields[index] = {value1:value , value2: updatedValues.newMoreStaffFields[index]?.value2 || ""}
  setUpdatedValues({...updatedValues, newStaff:true})

}

const handleNewMoreStaffFields2 = (value,index) => {
  updatedValues.newMoreStaffFields[index] = {value1:updatedValues.newMoreStaffFields[index]?.value1 || "" , value2:value }
  setUpdatedValues({...updatedValues, newStaff:true})
}

console.log(updatedValues.lastMoreStaffFields);



useEffect(()=>{
  if (moreStaffFieldsCounter > 0) {
    updatedValues.newMoreStaffFields.push({value1:"",value2:""})
    setUpdatedValues({...updatedValues})
  }

},[moreStaffFieldsCounter])



  return projectActive !== null && (
    <div className='admin-projects' id='p-update'>
      {loading && <Fallback/>}
        <h1>Update Project</h1>
        <div className='flex-container'>
            <button onClick={projectActiveToggle} className={`active-btn ${projectActive === false ? "active-btn-off" : "active-btn-on"}`}>{projectActive === true ? "Active" : "Not Active"}</button>
            <button onClick={deleteProject} className='delete-btn'>Delete Project</button>
        </div>
        
        <form onSubmit={handleSubmit}>
        <div>
          <div className='inpt-container'>
              <label htmlFor='p-name'>Nom du projet</label>
              <input type='text' id='p-name' name='p-name' value={projectName} onChange={(e)=>{
                  setUpdatedValues({...updatedValues,projectName:e.target.value !== projectName })
                  setProjectName(e.target.value)
              }
                  } placeholder='ex. heliopolis' />
            </div>
            
            <div className='inpt-container'>
              <label htmlFor='p-name-abr'>Nom pour petits ecrans</label>
              <input type='text' id='p-name-abr' name='p-name-abr' value={abrName} onChange={(e)=>
              { 
                  setUpdatedValues({...updatedValues,abrName:e.target.value !== abrName})
                  setAbrName(e.target.value)
              }
                  } />
            </div>

            <div className='inpt-container'>
            <label htmlFor='p-staff-madeby'>Realisé par</label>
            <input type='text' id='p-staff-madeby' name='p-staff-madeby'  value={madeBy} onChange={(e)=>{
              setMadeBy(e.target.value)
              setUpdatedValues({...updatedValues,madeBy:e.target.value !== madeBy})
            }} />
          </div>

            <div className='inpt-container'>
              <label htmlFor='p-ytb'>YouTube Link</label>
              <input type='text' id='p-ytb' value={youtubeLink} onChange={(e)=>{
                setYoutubeLink(e.target.value)
                setUpdatedValues({...updatedValues,youtubeLink:e.target.value !== youtubeLink})
              }
                } name='p-ytb'/>
            </div>

            <div className='inpt-container'>
              <label htmlFor='p-coll'>Collab avec</label>
              <input type='text' id='p-coll' value={collab} onChange={(e)=>{
                setCollab(e.target.value)
                setUpdatedValues({...updatedValues,collab:e.target.value !== collab})
                }} name='p-coll'/>
            </div>

            <div className='inpt-container'>
              <label htmlFor='p-bg-v'>BG video</label>
              <input type='file' id='p-bg-v' name='p-bg-v' accept='.mp4' onChange={(e)=>{
                handleVideo(e.target.files[0])
                setUpdatedValues({...updatedValues,video:true})
                }}/>
            </div>

          <video controls src={!newVideo ?  "/assets/uploads/videos/" + lastVideo : URL.createObjectURL(bgVideo)}></video>
          </div>

          <div className='inpt-container'>
            <button onClick={resetVideo}>Reset Video</button>
          </div>

      

        <div className='p-images-container'>
            {images.map((img,index)=>
            <>
               <input type='file' id='p-images' name='p-images' accept='.jpg,.jpeg,.png,.webp'  onChange={(e)=>handleImages(e.target.files[0],index,img.id)}/>
              { updatedValues.imgs.includes(img.id) ?  
               <img key={index} src={ URL.createObjectURL(img.src) } alt=''/>
                : <img key={index} src={"/assets/uploads/images/projects/" + img.src} alt=''/>
              }
            </>
            )}
          </div> 
          <div className='inpt-container'>
            <button onClick={resetImages}>Reset Images</button>
          </div>

        
        <div>
          <div className='inpt-container'>
            <label htmlFor='p-staff-production'>Production</label>
            <input type='text' id='p-staff-production' name='p-staff-production' value={production} onChange={(e)=>{
              setProduction(e.target.value)
              setUpdatedValues({...updatedValues,production:e.target.value !== production})
              }} />
          </div>

         

          <div className='inpt-container'>
            <label htmlFor='p-staff-artists'>Artistes</label>
            <input type='text' id='p-staff-artists' name='p-staff-artists' value={artists} onChange={(e)=>{
              setArtists(e.target.value)
              setUpdatedValues({...updatedValues,artists:e.target.value !== artists})
            }} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-montage'>Montage</label>
            <input type='text' id='p-staff-montage' name='p-staff-montage' value={montage} onChange={(e)=>{
              setMontage(e.target.value)
              setUpdatedValues({...updatedValues,montage:e.target.value !== montage})
              }} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-cadrage'>Cadrage</label>
            <input type='text' id='p-staff-cadrage' name='p-staff-cadrage' value={cadrage} onChange={(e)=>{
              setCadrage(e.target.value)
              setUpdatedValues({...updatedValues,cadrage:e.target.value !== cadrage})
              }} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-droniste'>Droniste</label>
            <input type='text' id='p-staff-droniste' name='p-staff-droniste' value={droniste} onChange={(e)=>{
              setDroniste(e.target.value)
              setUpdatedValues({...updatedValues,droniste:e.target.value !== droniste})
              }} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-ph_plateau'>Ph_plateau</label>
            <input type='text' id='p-staff-ph_plateau' name='p-staff-ph_plateau' value={phPlateau} onChange={(e)=>{
              setPhPlateau(e.target.value)
              setUpdatedValues({...updatedValues,phPlateau:e.target.value !== phPlateau})
              }} />
          </div>

          <div className='inpt-container'>
            <label htmlFor='p-staff-decorateurs'>Decorateurs</label>
            <input type='text' id='p-staff-decorateurs' name='p-staff-decorateurs' value={decorateurs} onChange={(e)=>{
              setDecorateurs(e.target.value)
              setUpdatedValues({...updatedValues,decorateurs:e.target.value !== decorateurs})
              }} />
          </div>


          {updatedValues.lastMoreStaffFields && updatedValues.lastMoreStaffFields.length > 0 && updatedValues.lastMoreStaffFields.map((s,index)=> 
          <div  key={"Staffcounter" + index}>
            <div className='inpt-container'>
              <label htmlFor={'staffCounter' + index}>Titre</label>
              <input type='text' id={'staffCounter-' + index} name={'moreStaff-' + index} value={s.value1 ?? moreStaffFields[index].toString().split(":")[0] }  onChange={(e)=>handleMoreStaffFields(e.target.value,index)}/>
              <label htmlFor={'staffCounter2-' + index}>Value</label>
              <input type='text' id={'staffCounter2-' + index  } name={'moreStaff2-' + index} value={s.value2 ?? moreStaffFields[index].toString().split(":")[1].replace(/\|/g,",")  }  onChange={(e)=>handleMoreStaffFields2(e.target.value,index)}/>
            </div>
        </div>
      )}

      

{moreStaffFieldsCounter > 0 && updatedValues.newMoreStaffFields.map((f,index)=> 
        <div  key={"Staffcounter" + index} >
          <div className='inpt-container'>
            <label htmlFor={'staffCounter' + index}>Autre Champ</label>
            <input type='text' id={'staffCounter-' + index} name={'moreStaff-' + index} placeholder='Titre' value={f.value1}  onChange={(e)=>handleNewMoreStaffFields(e.target.value,index)}/>
            <input type='text' id={'staffCounter2-' + index  } name={'moreStaff2-' + index} placeholder='Valeur' value={f.value2}  onChange={(e)=>handleNewMoreStaffFields2(e.target.value,index)}/>
          </div>
        </div>
      )}

        {/* <p onClick={()=>setMoreStaffFieldsCounter(prev => prev + 1)}>Ajouter Plus de staff</p> */}
        <div className='moreStaff-btn'>
                <span onClick={()=>setMoreStaffFieldsCounter(prev => prev + 1)}>+</span>
        </div>
        

 
          <div className='inpt-container m-40'>
            <input disabled={isSubmit} type='submit' id='p-staff-p-submit' value='Submit' />
          </div>
        </div>
        
      </form>
    </div>
  )
}

export default ProjectUpdate