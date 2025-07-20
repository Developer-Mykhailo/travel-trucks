import { useState } from "react";
import CloseIcon from "../assets/catalogSvg/close_icon.svg?react";
import s from "./ImageModal.module.scss";

export const ImageModal = ({ thumb, original, alt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setImageLoaded(false);
  };

  return (
    <>
      <div className={s.image_box}>
        <a href={original} onClick={openModal}>
          <img src={thumb} alt={alt} />
        </a>
      </div>

      {isOpen && (
        <div className={s.modal_overlay} onClick={closeModal}>
          <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
            <img src={original} alt={alt} onLoad={() => setImageLoaded(true)} />

            {imageLoaded && (
              <button className={s.close_btn} onClick={closeModal}>
                <CloseIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
