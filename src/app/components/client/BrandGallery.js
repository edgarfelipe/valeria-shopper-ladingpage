'use client';

import React, { useState } from 'react';
import ProductModal from '../ProductModal';

const brands = [
  { name: 'Prada', image: '/images/prada.png' },
  { name: 'Dior', image: '/images/dior.png' },
  { name: 'Gucci', image: '/images/gucci.png' },
  { name: 'LV', image: '/images/lv.png' },
  { name: 'Loewe', image: '/images/loewe.png' },
  { name: 'Saint Laurent', image: '/images/saint-laurent.png' },
  { name: 'Maison Alaia', image: '/images/maison-Alaia.png' },
  { name: 'Valentino', image: '/images/valentino.jpeg' },
  { name: 'Cult Gaia', image: '/images/cult-gaia.png' },
  { name: 'Celine', image: '/images/celine.jpg' },
  { name: 'Balenciaga', image: '/images/balenciaga.png' },
  { name: 'Jacquemus', image: '/images/jacquemus.png' },
  { name: 'MIU MIU', image: '/images/miu-miu.png' },
];

const BrandGallery = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="brand flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => handleBrandClick(brand.name)}
          >
            <img src={brand.image} alt={brand.name} className="w-auto h-24" />
          </div>
        ))}
      </div>
      <ProductModal brand={selectedBrand} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BrandGallery;
