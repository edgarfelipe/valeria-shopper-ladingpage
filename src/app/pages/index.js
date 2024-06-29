import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="intro p-4 text-center">
          <h1>VALÉRIA</h1>
          <p>
            Desde muito jovem, me fascinava o mundo das marcas de luxo, o estilo e o bom gosto...
          </p>
        </section>
        <section className="gallery">
          <h2 className="text-center text-2xl p-4">Galeria de Marcas</h2>
          <Gallery />
        </section>
        <section className="services p-4">
          <h2 className="text-center text-2xl">Personal Shopper</h2>
          <p>
            É um termo em inglês usado para se referir ao profissional que presta serviços de compras personalizadas...
          </p>
        </section>
        <section className="clients p-4">
          <h2 className="text-center text-2xl">Clientes</h2>
          <p>Gabriela Versiane, Romana Novais, Natália Toscano...</p>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
