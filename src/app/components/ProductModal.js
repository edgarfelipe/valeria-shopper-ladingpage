'use client'; // Adiciona esta linha no início do arquivo

import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Adiciona um ícone de fechamento

const fetchProducts = async (brand) => {
  // Simula a busca de produtos dinamicamente
  const products = {
    Prada: [
      { name: 'Product 1', image: '/images/products/prada/product1.jpg' },
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

  // Simulação de tempo de carregamento
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
          <div className="flex overflow-x-scroll space-x-4 pb-4">
            {products.length === 0 ? (
              <p className="text-center w-full">Nenhum produto encontrado</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="flex-none w-60 cursor-pointer" onClick={() => handleProductClick(product)}>
                  <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
                  <p className="text-center mt-2">{product.name}</p>
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
