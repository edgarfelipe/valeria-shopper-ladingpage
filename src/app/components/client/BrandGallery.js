'use client';

import React, { useState } from 'react';
import ProductModal from '../ProductModal';

const brands = [
  { name: 'Prada', image: '/images/prada.jpg' },
  { name: 'Dior', image: '/images/dior.jpg' },
  { name: 'Gucci', image: '/images/gucci.jpg' },
  { name: 'LV', image: '/images/lv.jpg' },
  { name: 'Loewe', image: '/images/loewe.jpg' },
  { name: 'Saint Laurent', image: '/images/saint-laurent.jpg' },
  { name: 'Maison Alaia', image: '/images/maison-alaia.jpg' },
  { name: 'Valentino', image: '/images/valentino.jpg' },
  { name: 'Cult Gaia', image: '/images/cult-gaia.jpg' },
  { name: 'Celine', image: '/images/celine.jpg' },
  { name: 'Balenciaga', image: '/images/balenciaga.jpg' },
  { name: 'Jacquemus', image: '/images/jacquemus.jpg' },
  { name: 'MIU MIU', image: '/images/miu-miu.jpg' },
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
            className="brand bg-white p-4 shadow rounded-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => handleBrandClick(brand.name)}
          >
            <img src={brand.image} alt={brand.name} className="w-full h-auto rounded" />
            <p className="text-center mt-2 text-lg font-semibold">{brand.name}</p>
          </div>
        ))}
      </div>
      <ProductModal brand={selectedBrand} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BrandGallery;
