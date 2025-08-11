import React from "react";
import close from "./close.svg";
import arrow from "./arrow.svg";

const ImageViewer = ({
  isShowingImage,
  imgSrc,
  setImgSrc,
  setIsShowingImage,
  images,
  isSrc,
}) => {
  return (
    <>
      {isShowingImage && (
        <div className="black__background">
          <img
            className="black__background__img"
            src={
              isSrc
                ? "/assets/uploads/images/galleries/" + images[imgSrc].src
                : images[imgSrc].src
            }
            alt=""
          />
          <span
            role="button"
            className="btn-exit"
            onClick={() => {
              setImgSrc(null);
              setIsShowingImage(false);
            }}
          >
            <img className="btn-exit_img" src={close} alt="Close" />
          </span>

          <span
            role="button"
            className="black_background_arrow btn-right"
            onClick={() => {
              setImgSrc(imgSrc + 1);
              if (images.length - 1 === imgSrc) {
                setImgSrc(0);
                return;
              }
            }}
          >
            <img className="arrow_img arrow_right" src={arrow} alt="Continue" />
          </span>

          <span
            role="button"
            className="black_background_arrow btn-left"
            onClick={() => {
              setImgSrc(imgSrc - 1);
              if (0 === imgSrc) {
                setImgSrc(images.length - 1);
                return;
              }
            }}
          >
            <img className="arrow_img arrow_left" src={arrow} alt="Back" />
          </span>
        </div>
      )}
    </>
  );
};

export default ImageViewer;
