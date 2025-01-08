import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../api/axiosInstance";
import Fallback from "../../../components/UI/Spinner/Spinner";
import { Draggable } from "react-drag-reorder";
import { z } from "zod";
import { purifyImagesAdminPage } from "../../../security/Dompurify/purify";
import ImageViewer from "../../../components/UI/imageViewer/ImageViewer";

const galleries = ["Concert", "Plateau", "Shooting", "Mode"];

const Gallery = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowingImage, setIsShowingImage] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);


  const showImage = useCallback(
    (e, index) => {
      setIsShowingImage(true);
      setImgSrc(index);
    },
    [setIsShowingImage, setImgSrc]
  );


  useEffect(() => {
    if (isShowingImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowingImage]);



  useEffect(() => {
  if (!galleries.includes(param.name)) {
    navigate("/admin/galleries");
  } else {
    const getImages = async () => {
      setIsLoading(true);
      const validParam = z.string().safeParse(param.name);
      if (!validParam.success) {
        setIsLoading(false);
        return;
      }
      const data = {
        galleryName: validParam.data,
      };
      axiosInstance
        .post(`admin/gallery`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const purifyImages = purifyImagesAdminPage(res.data?.images);
            setImages(purifyImages);
            setIsLoading(false);
          }
          if (res?.data?.error) {
            console.error(res.data.error);
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };
    getImages();
  }
}, [galleries, param.name, navigate]);


  const deleteImg = (id) => {
    setIsLoading(true);
    const validID = z.string().safeParse(id);
    const scrollY = window.scrollY;
    axiosInstance
      .delete(`admin/gallery/image/${validID.data}`)
      .then((res) => {
        if (res.status === 200) {
          const newImages = images.filter((img) => img.id !== validID.data);
          setImages([...newImages]);
          alert("Image deleted successfully");
          setTimeout(()=>{
            window.scrollTo(0, scrollY);
          },500)
        } else {
          alert("An error occured during deletion");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occured during deletion");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };



  const PosChange = useCallback((currPos, newPos)=> {
    if (currPos === newPos) {
      return;
    }
    setIsLoading(true);
    const firstImageID = images[currPos].id;
    const secondImageID = images[newPos].id;
    const validaFirstID = z.string().safeParse(firstImageID);
    const validaSecondID = z.string().safeParse(secondImageID);
    const scrollY = window.scrollY;
    const formdata = new FormData();
    formdata.append("currId", validaFirstID.data);
    formdata.append("newId", validaSecondID.data);
    axiosInstance.post("admin/gallery/image/reorder", formdata)
      .then((res) => {
        if (res.status !== 200) {
          alert("An error occured during reordering");
          setImages([...images]);
          setIsLoading(false);
          window.location.reload();
        } else {
          const newImages = [...images];
          const first = newImages[currPos];
          const second = newImages[newPos];
          images[currPos] = second;
          images[newPos] = first;
          setImages([...images]);
          setIsLoading(false);
          setTimeout(()=>{
            window.scrollTo(0, scrollY);
          },500)
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured during reordering");
        setIsLoading(false);
        setImages([...images]);
        window.location.reload();
      });
  },[images]) 
  

  return (
    <div className="admin-gallery">
      <div className="gallery__images">
        <ImageViewer
          isShowingImage={isShowingImage}
          isSrc={true}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          setIsShowingImage={setIsShowingImage}
          images={images}
        />
      </div>

      {isLoading && <Fallback />}
      <div className="admin-gallery__header">
        <h1>Gallery {param.name}</h1>
        <Link to={"/admin/gallery/add"} state={{ name: param.name }}>
          + Add
        </Link>
      </div>

      <div className="gallery-images">
        {!isLoading && (
          <ul>
            {images.length > 0 && !isLoading ? (
              <Draggable onPosChange={PosChange}>
                {images.map((img, index) => {
                  return (
                    <li key={img.id} className="gallery-images__img-container">
                      <img
                        onClick={(e) => showImage(e, index)}
                        src={"/assets/uploads/images/galleries/" + img.src}
                        alt="Img-gallery"
                      />
                      <span onClick={() => deleteImg(img.id)}>X</span>
                    </li>
                  );
                })}
              </Draggable>
            ) : (
              <p className="">No images in this gallery</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Gallery;
