import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./css/HighlightedImagesForm.css";
import { useAppSelector } from "../../../../../../redux/hooks";

interface IImage {
  url: string;
  description?: string;
}

interface ImageFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (images: IImage[]) => void;
}

const ImageFormModal: React.FC<ImageFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [localImages, setLocalImages] = useState<IImage[]>([]);

  const localImageState = useAppSelector(state => state.local.additionalImages);

  useEffect(()=> {
    setLocalImages([...localImageState])
  }, [localImageState])

  const handleChange = (index: number, field: keyof IImage, value: string) => {
    const newImages = [...localImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setLocalImages(newImages);
  };

  const handleAddImage = () => {
    setLocalImages([...localImages, { url: "", description: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
  };

  const handleSave = () => {
    onSave(localImages);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Imágenes"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-button" onClick={onClose}>
        X
      </button>
      <h2>Editar Imágenes</h2>
      <div className="image-form">
        {localImages.map((image, index) => (
          <div key={index} className="image-form-group">
            <input
              type="text"
              placeholder="URL de la imagen"
              value={image.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
            {image.url && <img src={image.url} alt="Preview" className="image-preview" />}
            <input
              type="text"
              placeholder="Descripción de la imagen"
              value={image.description || ""}
              onChange={(e) => handleChange(index, "description", e.target.value)}
            />
            <button onClick={() => handleRemoveImage(index)} className="remove-button">Eliminar</button>
          </div>
        ))}
        <button onClick={handleAddImage} className="add-button">Agregar Imagen</button>
      </div>
      <button onClick={handleSave} className="save-button">Guardar</button>
    </Modal>
  );
};

export default ImageFormModal;
