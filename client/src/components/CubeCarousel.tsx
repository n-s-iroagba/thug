import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "../assets/styles/CubeCarousel.css";

const imageArray = [
  "/assets/image1.jpg",
  "/assets/image2.jpg",
  "/assets/image3.jpg",
  "/assets/image4.jpg",
];

const CubeCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="cube-carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
        {imageArray.map((imageSrc, i) => (
          <Carousel.Item key={i}>
            <div className="cube-slide">
              <img src={imageSrc} alt={`Slide ${i + 1}`} className="cube-image" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <button onClick={() => setIndex((index - 1 + imageArray.length) % imageArray.length)} className="cube-nav-btn left">
        ◀
      </button>
      <button onClick={() => setIndex((index + 1) % imageArray.length)} className="cube-nav-btn right">
        ▶
      </button>
    </div>
  );
};

export default CubeCarousel;

