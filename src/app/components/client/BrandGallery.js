'use client';

import React, { useState } from 'react';
import ProductModal from '../ProductModal';

const brands = [
  { name: '', image: '/images/prada.png' },
  { name: '', image: '/images/dior.png' },
  { name: '', image: '/images/gucci.png' },
  { name: '', image: '/images/lv.png' },
  { name: '', image: '/images/loewe.png' },
  { name: '', image: '/images/saint-laurent.png' },
  { name: '', image: '/images/maison-Alaia.png' },
  { name: '', image: '/images/valentino.jpeg' },
  { name: '', image: '/images/cult-gaia.png' },
  { name: '', image: '/images/celine.jpg' },
  { name: '', image: '/images/balenciaga.png' },
  { name: '', image: '/images/jacquemus.jpg' },
  { name: '', image: '/images/miu-miu.png' },
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
            <p className="text-center mt-2 text-lg font-semibold">{brand.name}</p>
          </div>
        ))}
      </div>
      <ProductModal brand={selectedBrand} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BrandGallery;
