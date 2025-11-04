import React, { useState, useEffect } from "react";
import bg1 from "../assets/hero_images/bg1.webp";
import bg2 from "../assets/hero_images/bg2.webp";
import bg3 from "../assets/hero_images/bg3.webp";
import bg4 from "../assets/hero_images/bg4.webp";
import bg5 from "../assets/hero_images/bg5.webp";
import bg6 from "../assets/hero_images/bg6.webp";
import bg7 from "../assets/hero_images/bg7.webp";

// Image array
const images = [bg1, bg2, bg3, bg4, bg5, bg6, bg7];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Image container */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              current === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Optional overlay text */}
      {/* 
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/30 text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3">
          Welcome to Our Store
        </h1>
        <p className="text-sm sm:text-base md:text-xl">
          Discover the latest collections
        </p>
      </div> 
      */}
    </div>
  );
};

export default Hero;
