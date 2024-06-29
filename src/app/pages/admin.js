import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [image, setImage] = useState(null);
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    
    await axios.post('/api/upload', formData)
      .then(response => {
        alert('Imagem carregada com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao carregar a imagem', error);
      });
  };

  const handleTextUpdate = async (e) => {
    e.preventDefault();
    const data = { section, content };
    
    await axios.post('/api/update-text', data)
      .then(response => {
        alert('Texto atualizado com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao atualizar o texto', error);
      });
  };

  return (
    <div className="p-4">
      <h2>Painel Administrativo</h2>
      <form onSubmit={handleImageUpload} className="mb-4">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2">Carregar Imagem</button>
      </form>
      <form onSubmit={handleTextUpdate}>
        <input type="text" placeholder="Seção" value={section} onChange={(e) => setSection(e.target.value)} className="mb-2"/>
        <textarea placeholder="Conteúdo" value={content} onChange={(e) => setContent(e.target.value)} className="mb-2"/>
        <button type="submit" className="bg-blue-500 text-white p-2">Atualizar Texto</button>
      </form>
    </div>
  );
};

export default Admin;
