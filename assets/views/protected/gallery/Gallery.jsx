import React, { useCallback, useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../middleware/axiosInstance'
import Fallback from '../../../components/Spinner/Fallback'
import { ShowImage } from '../../../components/ShowImage/ShowImage'
import { Draggable } from 'react-drag-reorder'


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
const [loading, setLoading] = useState(false)


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
            axiosInstance.get(`/gallery/${param.name}`)
            .then((res)=>{
                if(res.status === 200){
                    setImages(res.data.images)
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
        axiosInstance.delete(`admin/gallery/image/${id}`)
        .then(res => {
            if(res.status === 200){
                const newImages = images.filter(img => img.id !== id)
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
        console.log(currPos,newPos);
        if (currPos === newPos) {
            return
            
        }
        setLoading(true)
        const  newImages = [...images]
        let firstImage = newImages.splice(currPos,1)
        let firstImageID = firstImage[0].id
        let secondImageID = newImages[newPos].id
        newImages.splice(newPos,0,...images)
        const formdata = new FormData()
        formdata.append("currId",firstImageID)
        formdata.append("newId",secondImageID)
        axiosInstance.post('admin/gallery/image/reorder',formdata)
        .then(res => {
          if (res.status !== 200) {
            alert("An error occured during reordering")
            window.location.reload()
          }else{
            setImages(newImages)
          }
        }).catch(err => {
          console.log(err)
          alert("An error occured during reordering")
          window.location.reload()
        });
        setLoading(false)
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
            {images.length > 0 ?
            <Draggable draggable onPosChange={PosChange} >
                {images.map((img, index) => {
                    return (
                        <li draggable key={img.id} className="gallery-images__img-container">
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
