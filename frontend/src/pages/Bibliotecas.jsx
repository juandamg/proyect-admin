// src/pages/Bibliotecas.jsx
import React, { useEffect, useState } from 'react';
import BibliotecaTable from '../components/BibliotecaTable';
import AgregarBibliotecaModal from '../components/AgregarBibliotecaModal';

function Bibliotecas() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchBibliotecas = () => {
    fetch('http://localhost:3000/bibliotecas')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener las bibliotecas');
        return response.json();
      })
      .then((data) => setBibliotecas(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchBibliotecas();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      {/* Contenedor para el título y el botón de agregar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Bibliotecas</h1>
        <button className="btn btn-primary" onClick={handleShowModal}>
          Agregar Nueva Biblioteca
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}
      
      {/* Tabla de bibliotecas */}
      <BibliotecaTable bibliotecas={bibliotecas} refreshData={fetchBibliotecas} />
      
      {/* Modal para agregar nueva biblioteca */}
      {showModal && (
        <AgregarBibliotecaModal onClose={handleCloseModal} refreshData={fetchBibliotecas} />
      )}
    </div>
  );
}

export default Bibliotecas;
