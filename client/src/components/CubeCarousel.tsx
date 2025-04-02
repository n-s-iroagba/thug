import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "../assets/styles/CubeCarousel.css";
import image1 from '../assets/images/adele.jpg'
import image2 from '../assets/images/drake.jpeg'
import image3 from '../assets/images/rihanna.jpg'
import image4 from '../assets/images/reality.webp'
const imageArray = [
 image1,
 image2, image3, image4,
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
    </div>
  );
};

export default CubeCarousel;

