import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "../assets/styles/SlidingTextCarousel.css";

const slides = [
  {
    image: "/assets/slide1.jpg",
    title: "Discover Amazing Places",
    description: "Explore the most beautiful destinations in the world.",
  },
  {
    image: "/assets/slide2.jpg",
    title: "Experience the Adventure",
    description: "Find your next thrill in breathtaking locations.",
  },
  {
    image: "/assets/slide3.jpg",
    title: "Relax and Unwind",
    description: "Enjoy a peaceful retreat in stunning surroundings.",
  },
];

const SlidingTextCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls={true} indicators={true} className="sliding-carousel">
      {slides.map((slide, i) => (
        <Carousel.Item key={i} className="carousel-item-custom">
          <img src={slide.image} className="d-block w-100 carousel-image" alt={`Slide ${i + 1}`} />
          <Carousel.Caption className="carousel-caption-custom">
            <h3 className="slide-title">{slide.title}</h3>
            <p className="slide-description">{slide.description}</p>
            <button className="slide-button">Learn More</button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SlidingTextCarousel;
