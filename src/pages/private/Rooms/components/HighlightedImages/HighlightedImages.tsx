import React, { useState } from "react";
import HighlightedImagesStyle from "./css/HighlightedImages.module.css";
import editImage from "../../../Local/assets/edit-3-svgrepo-com.svg";
import { IImage } from "../../../Local/services/Local.service";
import ImageFormModal from "../Forms/HighlightedImagesForm/HighlightedImagesForm";

interface HighlightedImagesProps {
  images: IImage[];
  idRoom: string;
}

const HighlightedImages: React.FC<HighlightedImagesProps> = ({
  images,
  idRoom,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={HighlightedImagesStyle.container}>
      <div className={HighlightedImagesStyle.header}>
        <h2 style={{ fontSize: "16px" }}>Imagenes de la sala</h2>
        <img onClick={() => setModalOpen(true)} src={editImage} alt="" />
        <ImageFormModal
          images={images}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          idRoom={idRoom}
        />
      </div>
      {images.length > 1 ? (
        <div className={HighlightedImagesStyle.highlighted_images_grid}>
          {images.map((image, index) => (
            <>
              {image.url.length > 0 ? (
                <>
                  <div
                    key={index}
                    className={HighlightedImagesStyle.highlighted_image}
                  >
                    <img
                      src={image.url}
                      alt={image.description || `Image ${index + 1}`}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      ) : <></> }
    </div>
  );
};

export default HighlightedImages;
