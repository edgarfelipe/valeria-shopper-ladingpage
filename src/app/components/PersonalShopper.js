import React from 'react';

const PersonalShopper = () => {
  return (
    <section className="intro text-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/108.jpg')" }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-6">Personal Shopper</h2>
        <div className="flex flex-col md:flex-row items-center text-white">
          <div className="text-lg">
            <p>
              Como Personal Shopper, meu objetivo é transformar sua experiência de compra em algo excepcional. Seja no setor de moda, beleza ou lifestyle, estou aqui para oferecer um serviço de compras personalizadas que atende às suas necessidades e desejos específicos.
            </p>
            <p className="mt-4">
              Desde a seleção de peças exclusivas até a criação de looks completos que refletem seu estilo pessoal, estou dedicada a garantir que cada compra seja perfeita para você. Vamos juntos descobrir as melhores tendências e produtos que combinam com a sua personalidade única.
            </p>
            <p className="mt-4">
              Entre em contato e permita-me tornar suas compras uma experiência prazerosa e inesquecível. Afinal, você merece o melhor em cada detalhe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalShopper;
