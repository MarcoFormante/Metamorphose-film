import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../api/axiosInstance';
import Resizer from "react-image-file-resizer";
import Fallback from '../../../components/UI/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import NewProjectBasePage from './NewProjectBasePage';
import NewProjectStaffPage from './NewProjectStaffPage';
import NewProjectImagesPage from './NewProjectImagesPage';
import { newProjectSchema } from '../../../security/Zod/zod';

const NewProject = () => {
  const [projectName, setProjectName] = useState('')
  const [abrName, setAbrName] = useState('')
  const [slug, setSlug] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const [collab, setCollab] = useState('')
  const [bgVideo, setBgVideo] = useState(null)
  const [canNext, setCanNext] = useState(false)
  const [pageCounter, setPageCounter] = useState(0)
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [production, setProduction] = useState('')
  const [madeBy, setMadeBy] = useState('')
  const [artists, setArtists] = useState('')
  const [montage, setMontage] = useState('')
  const [cadrage, setCadrage] = useState('')
  const [droniste, setDroniste] = useState('')
  const [phPlateau, setPhPlateau] = useState('')
  const [decorateurs, setDecorateurs] = useState('')
  const [moreStaffFields, setMoreStaffFields] = useState([])
  const [moreStaffFieldsCounter, setMoreStaffFieldsCounter] = useState(0)
  const [inputsHidden, setInputsHidden] = useState([])
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        1080,
        "WEBP",
        90,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });


    const compressImages = async(images) => {
      const resizedImages = images.map((image) => resizeFile(image))
      const files = await Promise.all(resizedImages)
      return files
  }

  useEffect(()=>{
    if (projectName && youtubeLink && collab && bgVideo && slug &&  pageCounter === 0) {
      setCanNext(true)
    }else if ( pageCounter === 1 && images.length > 0) {
      setCanNext(true)
    }else{
      setCanNext(false)
    }
},[projectName,youtubeLink,collab,bgVideo,pageCounter,images,slug])


useEffect(()=>{
  if(pageCounter === 0){
    setTitle('New Project')
  }else if (pageCounter === 1) {
    setTitle('Project Images')
  }else if (pageCounter === 2) {
    setTitle('Project Staff')
  }
},[pageCounter])


useEffect(()=>{
  if (projectName  && abrName &&  youtubeLink  && collab  && bgVideo  && images &&  production && madeBy && slug &&  pageCounter === 2 ) {
    setCanSubmit(true)
  }else{
    setCanSubmit(false)
  }
},[ projectName, youtubeLink, abrName, collab, bgVideo, images, production, madeBy, pageCounter,slug])

const handleImages = (files) => {
  if (files.length !== 6) {
     return  alert("You can only upload 6 images")
  }
  setImages([...files])
}


//SUBMIT NEW PROJECT
const handleSubmit = async(e) => {
  try {
    e.preventDefault()
      setLoading(true)
      setIsSubmit(true)
      if (!canSubmit) {
        setLoading(false)
        return
      }
      const formdata = new FormData()
      const compressedImages = await compressImages(images)
      if (!compressedImages) {
        setLoading(false)
        setIsSubmit(false)
        return alert('An error occurred while compressing images, please try again')
      }
      const objectToVerify = {
        name: projectName.trim(),
        abrName: abrName.trim(),
        yt: youtubeLink.trim(),
        collab: collab.trim(),
        video: bgVideo,
        production: production.trim(),
        madeBy: madeBy.trim(),
        artists: artists.trim(),
        montage: montage.trim(),
        cadrage: cadrage.trim(),
        droniste: droniste.trim(),
        phPlateau: phPlateau.trim(),
        decorateurs: decorateurs.trim(),
        moreStaffFields: moreStaffFields,
        images: [...compressedImages],
        slug: slug.trim()
      }

    const validate = newProjectSchema.safeParse(objectToVerify)
    if (!validate.success) {
      setLoading(false)
      setIsSubmit(false)
      return alert(validate.error.errors[0].message)
    }
      validate.data.images.forEach(img => {
      formdata.append('images[]',img)
    })
    
    formdata.append('name',validate.data.name)
    formdata.append('abrName',validate.data.abrName)
    formdata.append('slug',validate.data.slug)
    formdata.append('yt',validate.data.yt)
    formdata.append('collab',validate.data.collab)
    formdata.append('video',validate.data.video)
    formdata.append('production',validate.data.production)
    formdata.append('madeBy',validate.data.madeBy)
    formdata.append('artists',validate.data.artists)
    formdata.append('montage',validate.data.montage)
    formdata.append('cadrage',validate.data.cadrage)
    formdata.append('droniste',validate.data.droniste)
    formdata.append('phPlateau',validate.data.phPlateau)
    formdata.append('decorateurs',validate.data.decorateurs)


    if (moreStaffFields.length > 0) {
      const arrayMoreFieldsWithoutUndefined = validate.data.moreStaffFields.filter(field => field !== undefined)
      const arrayMoreFieldsWithoutUndefinedAndVoid = arrayMoreFieldsWithoutUndefined.filter(field => field.value1 !== "" && field.value2 !== "")
      formdata.append('moreStaffFields',JSON.stringify(arrayMoreFieldsWithoutUndefinedAndVoid))
    }
    
    axiosInstance.post('admin/project/new',formdata)
    .then(res => {
      console.log(res.data);
      console.log(res);
      
        alert('Project created successfully')
        setProduction('')
        setMadeBy('')
        setArtists('')
        setMontage('')
        setCadrage('')
        setDroniste('')
        setPhPlateau('')
        setDecorateurs('')
        setProjectName('')
        setAbrName('')
        setYoutubeLink('')
        setCollab('')
        setSlug('')
        setBgVideo(null)
        setImages([])
        setIsSubmit(false)
        setMoreStaffFields([])
        setMoreStaffFieldsCounter(0)
        setInputsHidden([])
        navigate(-1)
      }
  ).catch(err => {
    alert('An error occured : '+ err)
    console.log(err);
    setIsSubmit(false)
  }).finally(()=>{
    setLoading(false)
  })
    } catch (error) {
      console.log(error)
      setLoading(false)
      setIsSubmit(false)
    }
}

const handleMoreStaffFields = (value,index) => {
  moreStaffFields[index] = {value1:value , value2: moreStaffFields[index]?.value2 || ""}
  setMoreStaffFields([...moreStaffFields])
}

const handleMoreStaffFields2 = (value,index) => {
  moreStaffFields[index] = {value1: moreStaffFields[index]?.value1, value2: value || ""}
  setMoreStaffFields([...moreStaffFields])
}




  return (
    <div className='admin-projects'>
      {loading && <Fallback/>}
      <h1 className='c-white ad-page-title'>{title}</h1>
     <form onSubmit={handleSubmit}>

        {/* Base Section */}
        { 
          pageCounter === 0 &&  
            <NewProjectBasePage 
              projectName={projectName} 
              abrName={abrName} 
              madeBy={madeBy} 
              youtubeLink={youtubeLink} 
              collab={collab.replace("&amp;","&")} 
              bgVideo={bgVideo}
              setProjectName={setProjectName}
              setAbrName={setAbrName}
              setMadeBy={setMadeBy}
              setYoutubeLink={setYoutubeLink}
              setCollab={setCollab}
              setBgVideo={setBgVideo}
              slug={slug}
              setSlug={setSlug}
            />
        }
        

        {/* Images Section */}
        { 
          pageCounter === 1 &&
          <NewProjectImagesPage handleImages={handleImages}/>
        }
        
{     /* // Staff Section */}
        { 
          pageCounter === 2 &&
            <NewProjectStaffPage 
              production={production}
              setProduction={setProduction}
              artists={artists}
              setArtists={setArtists}
              montage={montage}
              setMontage={setMontage}
              cadrage={cadrage}
              setCadrage={setCadrage}
              droniste={droniste}
              setDroniste={setDroniste}
              phPlateau={phPlateau}
              setPhPlateau={setPhPlateau}
              decorateurs={decorateurs}
              setDecorateurs={setDecorateurs}
              moreStaffFields={moreStaffFields}
              setMoreStaffFieldsCounter={setMoreStaffFieldsCounter}
              moreStaffFieldsCounter={moreStaffFieldsCounter}
              inputsHidden={inputsHidden}
              canSubmit={canSubmit}
              isSubmit={isSubmit}
              handleMoreStaffFields={handleMoreStaffFields}
              handleMoreStaffFields2={handleMoreStaffFields2}
          />
        }
      </form>

        {/* // Images preview */}
      { pageCounter === 1 &&<div className='p-images-container'>
            {images.length > 0 && images.map((img,index)=>
              <img key={index} src={URL.createObjectURL(img)} alt=''/>
            )}
          </div>
      }

      {/* // Next and Back buttons */}
      { canNext && pageCounter <= 2  && <div className='next'>
          <button onClick={()=> setPageCounter(pageCounter + 1)}>Next</button>
      </div>}
      { pageCounter > 0 && pageCounter <= 2  && <div className='back'>
          <button onClick={()=> setPageCounter(pageCounter - 1)}>Back</button>
      </div>}
    </div>
  )
}

export default NewProject