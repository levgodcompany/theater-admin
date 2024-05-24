import React, { useState } from 'react';
import './css/HighlightedImages.css';
import { IImage } from '../../services/Local.service';

interface HighlightedImagesProps {
    images: IImage[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
    onViewMore: (index: number) => void;
  }

const HighlightedImages: React.FC<HighlightedImagesProps> = ({ images, onDelete, onEdit, onViewMore }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
    return (
      <div className="highlighted-images-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="highlighted-image"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={image.url} alt={image.description || `Image ${index + 1}`} />
            {hoveredIndex === index && (
              <div className="highlighted-image-overlay">
                <button onClick={() => onDelete(index)}>Borrar</button>
                <button onClick={() => onEdit(index)}>Editar</button>
                <button onClick={() => onViewMore(index)}>Ver más</button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default HighlightedImages;
