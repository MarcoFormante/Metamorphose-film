import React, { useCallback, useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../middleware/axiosInstance'
import Fallback from '../../../components/Spinner/Fallback'
import { ShowImage } from '../../../components/ShowImage/ShowImage'
import { Draggable } from 'react-drag-reorder'
import {z} from 'zod'
import { purifyImagesAdminPage } from '../../../security/Dompurify/purify'

const galleries=[
    "Concert",
    "Tournage",
    "Studio",
    "Evenements"
]

const Gallery = () => {
const param = useParams()
const navigate = useNavigate()
const [images, setImages] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [isShowingImage,setIsShowingImage] = useState(false)
const [imgSrc,setImgSrc] = useState(null)


    useEffect(() => {
        if(!galleries.includes(param.name)){
            navigate('/admin/galleries')
        }
    }, [])

    const showImage = useCallback((e,index)=>{
        setIsShowingImage(true)
        setImgSrc(index)
    },[setIsShowingImage,setImgSrc])

    useEffect(()=>{
        if (isShowingImage) {
            document.body.style.overflow = "hidden"
        }else{
            document.body.style.overflow = "auto"
        }
    },[isShowingImage])

    useEffect(() => {
        const getImages = async() => {
            setIsLoading(true)
            const validParam = z.string().safeParse(param.name)
            if (!validParam.success) {
                setIsLoading(false)
                return
            }
            axiosInstance.get(`/gallery/${validParam.data}`)
            .then((res)=>{
                if(res.status === 200){
                    const purifyImages= purifyImagesAdminPage(res.data?.images)
                    console.log(purifyImages);
                    setImages(purifyImages)
                    setIsLoading(false)
                }
                if (res?.data?.error) {
                    console.error(res.data.error)
                }
            }).catch(err => {
                console.error(err)
                setIsLoading(false)
            }).finally(()=>setIsLoading(false))
        }
            getImages()
    }, [])



    const deleteImg = (id) => {
        setIsLoading(true)
        const validID = z.string().safeParse(id)
        axiosInstance.delete(`admin/gallery/image/${validID.data}`)
        .then(res => {
            if(res.status === 200){
                const newImages = images.filter(img => img.id !== validID.data)
                setImages([...newImages])
                alert('Image deleted successfully')
            }else{
                alert('An error occured during deletion')
            }
        }).catch(err => {
            console.error(err)
            alert('An error occured during deletion')
            setIsLoading(false)
        }).finally(()=>setIsLoading(false))
    }


    const PosChange = (currPos,newPos) => {
        if (currPos === newPos) {
            return
        }
        setIsLoading(true)
        const firstImageID = images[currPos].id
        const secondImageID = images[newPos].id
        const validaFirstID = z.string().safeParse(firstImageID)
        const validaSecondID = z.string().safeParse(secondImageID)
        const formdata = new FormData()
        formdata.append("currId",validaFirstID.data)
        formdata.append("newId",validaSecondID.data)
        axiosInstance.post('admin/gallery/image/reorder',formdata)
        .then(res => {
          if (res.status !== 200) {
            alert("An error occured during reordering")
            setImages([...images])
            setIsLoading(false)
            window.location.reload()
          }else{
            const newImages = [...images]
            const first = newImages[currPos]
            const second = newImages[newPos]
            images[currPos] = second
            images[newPos] = first
            setImages([...images])
            setIsLoading(false)
          }
        }).catch(err => {
          console.log(err)
          alert("An error occured during reordering")
          setIsLoading(false)
          setImages([...images])
          window.location.reload()
        });
        
      }

  return (
    <div className='admin-gallery'>
            <div className='gallery__images'>
            <ShowImage isShowingImage={isShowingImage} isSrc={true} imgSrc={imgSrc} setImgSrc={setImgSrc} setIsShowingImage={setIsShowingImage} images={images}/>
            </div>
        
      {isLoading &&  <Fallback/>}
        <div className='admin-gallery__header'>
            <h1>Gallery {param.name}</h1> 
            <Link to={"/admin/gallery/add"} state={{name:param.name}}>+ Add</Link>
        </div>
    
        <div className="gallery-images">
           { !isLoading && <ul>
            {images.length > 0 &&  !isLoading  ?
           <Draggable  onPosChange={PosChange} >
                {images.map((img, index) => {
                    return (
                        <li  key={img.id} className="gallery-images__img-container">
                            <img onClick={(e)=>showImage(e,index)} src={"/assets/uploads/images/galleries/" + img.src} alt="Img-gallery" />
                            <span onClick={()=>deleteImg(img.id)}>X</span>
                        </li>
                        )
                    }) 
                }
            </Draggable>
            : <p className=''>No images in this gallery</p>
            }
            </ul>}
        </div>
    </div>
  )
}

export default Gallery
