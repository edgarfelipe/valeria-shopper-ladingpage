import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import PersonalShopper from './components/PersonalShopper';
import Contact from './components/Contact';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <section className="intro text-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/108.jpg')" }}>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-5xl font-bold text-white mb-4">VALÉRIA</h1>
            <p className="text-lg text-white">
              Desde muito jovem, me fascinava o mundo das marcas de luxo, o estilo e o bom gosto...
            </p>
          </div>
        </section>
        <section className="gallery mt-8">
          <h2 className="text-center text-3xl font-bold mb-4">Galeria de Marcas</h2>
          <Gallery />
        </section>
        <PersonalShopper />
        <section className="clients text-center p-4 mt-8 bg-white rounded shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Clientes</h2>
          <p className="text-lg">Gabriela Versiane, Romana Novais, Natália Toscano...</p>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
