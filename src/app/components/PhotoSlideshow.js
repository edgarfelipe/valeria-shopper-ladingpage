'use client';

import React, { useEffect, useRef } from 'react';

const photos = [
  { src: '/images/79.jpg', alt: 'Valeria 79' },
  { src: '/images/90.jpg', alt: 'Valeria 90' },
  { src: '/images/95.jpg', alt: 'Valeria 95' },
  { src: '/images/96.jpg', alt: 'Valeria 96' },
  { src: '/images/108.jpg', alt: 'Valeria 108' },
];

const PhotoSlideshow = () => {
  const slideshowRef = useRef(null);

  useEffect(() => {
    const slideshow = slideshowRef.current;
    let currentIndex = 0;

    const changeSlide = () => {
      if (slideshow) {
        const slides = slideshow.querySelectorAll('.slide');
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
      }
    };

    const interval = setInterval(changeSlide, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-8">
      <h2 className="text-center text-3xl font-bold mb-6"> </h2>
      <div className="slideshow relative w-full overflow-hidden" ref={slideshowRef}>
        {photos.map((photo, index) => (
          <div key={index} className={`slide absolute inset-0 transition-opacity duration-1000 ${index === 0 ? 'active' : 'opacity-0'}`}>
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover rounded-lg shadow-lg" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoSlideshow;
