import React from 'react';

const Contact = () => {
  return (
    <section className="intro text-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/90.jpg')" }}>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-6">Contato</h2>
        <div className="text-lg text-white">
          <p>Telefone: +351 961 217 829</p>
          <p>Email: valeriashopper@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
