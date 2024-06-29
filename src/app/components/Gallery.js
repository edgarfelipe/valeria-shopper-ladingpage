import React from 'react';

const brands = [
  'Prada', 'Dior', 'Gucci', 'LV', 'Loewe', 'Saint Laurent', 
  'Maison Alaia', 'Valentino', 'Cult Gaia', 'Celine', 
  'Balenciaga', 'Jacquemus', 'MIU MIU'
];

const Gallery = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {brands.map((brand, index) => (
        <div key={index} className="brand">
          <img src={`/images/${brand.toLowerCase()}.jpg`} alt={brand} className="w-full h-auto" />
          <p className="text-center mt-2">{brand}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
