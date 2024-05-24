import { useState } from "react";
import CarouselCompStyle from "./css/Carousel.module.css";

interface CarouselProps<T> {
  items: T[];
  renderCard: (item: T) => JSX.Element;
}

const CarouselComp = <T,>({
  items,
  renderCard,
}: CarouselProps<T>): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={CarouselCompStyle.carousel}>
      <button onClick={goToPreviousCard} className={CarouselCompStyle.prev}>
        &#10094;
      </button>
      {items.map((item, index) => (
        <div
          key={index}
          className={
            index === currentIndex || index === (currentIndex + 1)
              ? `${CarouselCompStyle.card_slide} ${CarouselCompStyle.active}`
              : `${CarouselCompStyle.card_slide}`
          }
        >
          {renderCard(item)}
        </div>
      ))}
      <button onClick={goToNextCard} className={CarouselCompStyle.next}>
        &#10095;
      </button>
    </div>
  );
};

export default CarouselComp;
