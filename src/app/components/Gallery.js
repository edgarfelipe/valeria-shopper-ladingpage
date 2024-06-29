import React from 'react';

const images = [
  { src: '/images/79.jpg', alt: 'Gallery Image 1' },
  { src: '/images/90.jpg', alt: 'Gallery Image 2' },
  { src: '/images/95.jpg', alt: 'Gallery Image 3' },
  { src: '/images/96.jpg', alt: 'Gallery Image 4' },
  { src: '/images/108.jpg', alt: 'Gallery Image 5' },
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {images.map((image, index) => (
        <div key={index} className="brand bg-white p-4 shadow rounded-lg">
          <img src={image.src} alt={image.alt} className="w-full h-auto rounded" />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
