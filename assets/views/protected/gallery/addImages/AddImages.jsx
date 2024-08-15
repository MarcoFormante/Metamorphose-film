import React, { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShowImage } from '../../../../components/ShowImage/ShowImage'
import { axiosInstance } from '../../../../middleware/axiosInstance'
import Fallback from '../../../../components/Spinner/Fallback'
import Resizer from "react-image-file-resizer";
import { z } from 'zod'


const galleries=[
    "Concert",
    "Tournage",
    "Studio",
    "Evenements"
]


const AddImages = () => {
    const location = useLocation()
    const [images, setImages] = useState([])
    const [isShowingImage,setIsShowingImage] = useState(false)
    const [imgSrc,setImgSrc] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const resizeFile = (file) =>
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1920,
            1080,
            "WEBP",
            80,
            0,
            (uri) => {
              resolve(uri);
            },
            "file"
          );
        });


   
    const submit =  async(e) => {
        setIsLoading(true)
        e.preventDefault()
        if (images.length === 0) {
            return alert('Please select images to upload')
        }
        const compressedImages = await compressImages(images)
        if (!compressedImages) {
            return alert('An error occurred while compressing images, please try again')
        }
        const formData = new FormData()

        const validImages = z.array(z.instanceof(File).superRefine((f,ctx)=>{
            if (!["image/webp"].includes(f.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Le fichier doit être un fichier image de type webp"
                })
            }
            if (f.size > (4 * 1024 * 1024)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "La taille du fichier IMAGE ne doit pas dépasser 3MB"
                })
            }
        })).safeParse(compressedImages)
        if (!validImages.success) {
            return alert('An error occurred while compressing images, please try again')
        }

        validImages.data.forEach((image) => {
            formData.append('images[]', image)
        })

        const validName = z.string().safeParse(location.state?.name)
        formData.append("galleryName", validName.data)
       axiosInstance.post("admin/gallery/addImages", formData)
        .then(res => {
            if (res.status === 200) {
                alert('Images uploaded successfully')
                setImages([])
                setIsLoading(false)
            }
        }
        ).catch(err => {
            console.error(err)
            setIsLoading(false)
            alert('An error occurred while uploading images, please try again. Code : ' + err.code)
        }).finally(()=>setIsLoading(false))
    }


    const onChange = (e) => {
        setIsLoading(true)
        if (e.target?.files.length === 0) {
            return
        }
        if (e.target.files.length > 10) {
             e.target.value = ''
             alert('You can only upload 10 images at a time')
        }
        const files = [...e.target.files]
        const imgArray = []
        files.forEach(file => {
          const type = file.type.split('/')[1]
          const types = ['jpg','png','webm',"jpeg"]
            if (types.includes(type.toLowerCase())) {
                imgArray.push(file)
            }
        })
        setIsLoading(false)
        setImages([...imgArray])
    }


     
    const showImage = useCallback((e,index)=>{
        setIsShowingImage(true)
        setImgSrc(index)
    },[setIsShowingImage,setImgSrc])


    useEffect(() => {
        if (!galleries.includes(location.state?.name)) {
            window.history.back()
        }
    }, [location])


    const deleteImg = (index) => {
        const newImages = images.filter((img, i) => i !== index)
        setImages([...newImages])
    }

    const compressImages = (images) => {
        const resizedImages = images.map(async(image) => await resizeFile(image))
        const files = Promise.all(resizedImages)
        return files
    }



  return (
    <>
     {isLoading && <Fallback/>}
  
    <div className='admin-gallery-addImages'>
       
        <div className='admin-gallery-addImages__header'>
            <h1>Galerie {location.state?.name}</h1>
        </div>

        <form onSubmit={submit}>
            <span className='n-files'>{images.length > 0 && images.length + " files"}</span>
            <label htmlFor='file'>Choose images </label>
            <input type='file' id='file' onChange={onChange} multiple accept='.jpg,.png,.webm,.jpeg' />
            <input type='submit' value={"ENVOIS"}/>
        </form>
        <div className='admin-gallery-addImages__images'>
        {images.map((image, index) => 
                images[index] && <div className='img-container' key={"images_" + index}>
                    <img className={"new-image"} onClick={(e)=>showImage(e,index)} src={ URL.createObjectURL(image) || ""} alt='' />
                    <span onClick={()=>deleteImg(index)}>X</span>
                </div>
            )
        }
        </div>
        <div className="gallery__images">
            <ShowImage isShowingImage={isShowingImage} imgSrc={imgSrc} setImgSrc={setImgSrc} setIsShowingImage={setIsShowingImage} images={images.map(image=>URL.createObjectURL(image))}/>
        </div>
      
    </div>
    </>
  )
}

export default AddImages