'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';

const fetchProducts = async (brand) => {
  const products = {
    Prada: [
      { name: 'Product 1', image: '/images/products/prada/prada.png' },
      { name: 'Product 2', image: '/images/products/prada/product2.jpg' },
      { name: 'Product 3', image: '/images/products/prada/product3.jpg' },
    ],
    Dior: [
      { name: 'Product 1', image: '/images/products/dior/product1.jpg' },
      { name: 'Product 2', image: '/images/products/dior/product2.jpg' },
      { name: 'Product 3', image: '/images/products/dior/product3.jpg' },
    ],
    // Adicione mais marcas e produtos aqui
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return products[brand] || [];
};

const ProductModal = ({ brand, isOpen, onClose }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && brand) {
      setLoading(true);
      fetchProducts(brand).then((fetchedProducts) => {
        setProducts(fetchedProducts);
        setLoading(false);
      });
    }
  }, [isOpen, brand]);

  if (!isOpen) return null;

  const handleProductClick = (product) => {
    window.open(`https://wa.me/?text=Estou%20interessado%20no%20produto%20${product.name}%20da%20marca%20${brand}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full relative">
        <button className="absolute top-2 right-2 text-2xl" onClick={onClose}><AiOutlineClose /></button>
        <h2 className="text-2xl font-bold mb-4 text-center">{brand}</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Carregando...</div>
          </div>
        ) : (
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {products.length === 0 ? (
              <p className="text-center w-full">Nenhum produto encontrado</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="flex-none w-60 relative">
                  <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
                  <button
                    className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
                    onClick={() => handleProductClick(product)}
                  >
                    <FaWhatsapp className="text-2xl" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
