'use client';

import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import PersonalShopper from './components/PersonalShopper';
import Contact from './components/Contact';
import Clients from './components/Clients';
import PhotoSlideshow from './components/PhotoSlideshow'; // Importe o componente
import BrandGallery from './components/client/BrandGallery';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <section className="intro text-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/108.jpg')" }}>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            {!isMobile && <h1 className="text-5xl font-bold text-white mb-4">VALÉRIA</h1>}
            <p className="text-lg text-white">
              Desde muito jovem, me fascinava o mundo das marcas de luxo, o estilo e o bom gosto...
            </p>
          </div>
        </section>
        <section className="gallery mt-8">
          <h2 className="text-center text-3xl font-bold mb-4">Marcas</h2>
          <BrandGallery />
        </section>
        <PersonalShopper />
        <PhotoSlideshow /> {/* Adicione o componente do slideshow */}
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
