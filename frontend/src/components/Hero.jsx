import React, { useState, useEffect } from "react";
import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import bg4 from '../assets/bg4.jpg'
import bg5 from '../assets/bg5.jpg'

// Professional men's clothing ecommerce banner images
const images = [
  {
    background: bg1,
    alt: "Men's clothing store collection",
    title: "New Season Collection",
    subtitle: "Discover the latest trends in men's fashion",
    cta: "Shop Collection"
  },
  {
    background: bg2,
    alt: "Men's formal suits and business wear",
    title: "Business Essentials",
    subtitle: "Elevate your professional wardrobe",
    cta: "Shop Suits"
  },
  {
    background: bg3,
    alt: "Men's casual fashion collection",
    title: "Casual Comfort",
    subtitle: "Style meets comfort in everyday wear",
    cta: "Shop Casual"
  },
  {
    background: bg4,
    alt: "Premium men's formal attire",
    title: "Premium Selection",
    subtitle: "Luxury fabrics, timeless style",
    cta: "Explore Premium"
  },
  {
    background: bg5,
    alt: "Men's denim and casual wear",
    title: "Denim Collection",
    subtitle: "Find your perfect fit",
    cta: "Shop Denim"
  },
  // {
  //   url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=1920&q=80",
  //   alt: "Men's jackets and outerwear",
  //   title: "Outerwear Essentials",
  //   subtitle: "Stay warm, look sharp",
  //   cta: "Shop Jackets"
  // },
  // {
  //   url: "https://images.unsplash.com/photo-1558769132-cb1aea1f1cf8?w=1920&q=80",
  //   alt: "Men's t-shirts and casual tops",
  //   title: "Everyday Basics",
  //   subtitle: "Quality essentials for your wardrobe",
  //   cta: "Shop Basics"
  // }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection('next');
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setDirection(index > current ? 'next' : 'prev');
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setDirection('prev');
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setDirection('next');
    setCurrent((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden bg-gray-100">
      {/* Image container */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <img
              src={img.background}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Simple dark overlay */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 z-20">
        <div className="max-w-2xl">
          {/* Simple badge */}
          <div
            className={`inline-block mb-3 transition-all duration-500 ${current === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <span className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              New Arrival
            </span>
          </div>

          {/* Main title */}
          <h1
            className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white transition-all duration-500 ${current === current ? "opacity-100" : "opacity-0"
              }`}
          >
            {images[current].title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl mb-6 text-white transition-all duration-500 ${current === current ? "opacity-100" : "opacity-0"
              }`}
          >
            {images[current].subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-3 transition-all duration-500 ${current === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <button className="bg-white text-black px-6 py-3 text-sm md:text-base font-semibold hover:bg-gray-100 transition-colors">
              {images[current].cta}
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 text-sm md:text-base font-semibold hover:bg-white hover:text-black transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Simple navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 transition-colors shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white p-3 transition-colors shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Simple dots navigation */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${current === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
              }`}
          />
        ))}
      </div>

      {/* Simple progress bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-white transition-all duration-[5000ms] ease-linear"
            style={{ width: current === current ? '100%' : '0%' }}
          />
        </div>
      )}
    </div>
  );
};

export default Hero;