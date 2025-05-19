import React, { useState } from "react";
import "./index.css"; // ensure you import the CSS
import pinkShoes from "./assets/images/sepatu_1.png"
import redShoes from "./assets/images/sepatu_2.png"
import beigeShoes from "./assets/images/sepatu_3.png"

const images = [
  "./assets/images/sepatu_1.png",
  "./assets/images/sepatu_2.png",
  "./assets/images/sepatu_3.png",
];

const Carousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const angleStep = 360 / images.length;

  const rotateTo = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        style={{
          transform: `rotateY(-${activeIndex * angleStep}deg)`,
        }}
      >
        {images.map((img, i) => {
          const angle = i * angleStep;
          return (
            <div
              key={i}
              className="carousel-item"
              onClick={() => rotateTo(i)}
              style={{
                transform: `
                  rotateY(${angle}deg)
                  translateZ(300px)
                `,
                backgroundImage: `url(${img})`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel3D;
