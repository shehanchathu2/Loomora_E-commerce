import React, { useState, useEffect } from "react";

// Professional men's clothing ecommerce banner images
const images = [
  {
    url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80",
    alt: "Men's clothing store collection",
    title: "New Season Collection",
    subtitle: "Discover the latest trends in men's fashion",
    cta: "Shop Collection"
  },
  {
    url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=80",
    alt: "Men's formal suits and business wear",
    title: "Business Essentials",
    subtitle: "Elevate your professional wardrobe",
    cta: "Shop Suits"
  },
  {
    url: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1920&q=80",
    alt: "Men's casual fashion collection",
    title: "Casual Comfort",
    subtitle: "Style meets comfort in everyday wear",
    cta: "Shop Casual"
  },
  {
    url: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1920&q=80",
    alt: "Premium men's formal attire",
    title: "Premium Selection",
    subtitle: "Luxury fabrics, timeless style",
    cta: "Explore Premium"
  },
  {
    url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1920&q=80",
    alt: "Men's denim and casual wear",
    title: "Denim Collection",
    subtitle: "Find your perfect fit",
    cta: "Shop Denim"
  },
  {
    url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=1920&q=80",
    alt: "Men's jackets and outerwear",
    title: "Outerwear Essentials",
    subtitle: "Stay warm, look sharp",
    cta: "Shop Jackets"
  },
  {
    url: "https://images.unsplash.com/photo-1558769132-cb1aea1f1cf8?w=1920&q=80",
    alt: "Men's t-shirts and casual tops",
    title: "Everyday Basics",
    subtitle: "Quality essentials for your wardrobe",
    cta: "Shop Basics"
  }
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
    <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden bg-gray-900">
      {/* Image container */}
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
              current === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Dynamic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content overlay with animations */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-20">
        <div className="max-w-3xl">
          {/* Animated badge */}
          <div 
            className={`inline-block mb-4 transition-all duration-700 delay-100 ${
              current === current ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider border border-white/30">
               Featured Collection
            </span>
          </div>

          {/* Main title with stagger animation */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight text-white transition-all duration-700 delay-200 ${
              current === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {images[current].title}
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg sm:text-xl md:text-3xl mb-8 md:mb-10 text-gray-100 transition-all duration-700 delay-300 ${
              current === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {images[current].subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
              current === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button className="group bg-white text-black px-8 py-3 md:px-12 md:py-4 text-sm md:text-base font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center gap-2">
              {images[current].cta}
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 md:px-12 md:py-4 text-sm md:text-base font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
              View All
            </button>
          </div>

          {/* Feature badges */}
          <div 
            className={`flex flex-wrap gap-6 mt-10 md:mt-12 transition-all duration-700 delay-500 ${
              current === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 text-white/90">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm md:text-base font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              <span className="text-sm md:text-base font-medium">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows with improved design */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full transition-all group border border-white/20 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-full transition-all group border border-white/20 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Enhanced dots navigation */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2 md:gap-3 bg-black/30 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative"
            >
              <div className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                current === index 
                  ? "bg-white scale-125" 
                  : "bg-white/40 hover:bg-white/70 group-hover:scale-110"
              }`} />
              {current === index && (
                <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
              )}
            </button>
          ))}
        </div>
        
        {/* Play/Pause button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute -right-14 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20 transition-all"
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Progress bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
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