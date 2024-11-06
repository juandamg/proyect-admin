// src/pages/Usuarios.jsx
import React, { useEffect, useState } from 'react';
import UsuarioTable from '../components/UsuarioTable';
import AgregarUsuarioModal from '../components/AgregarUsuarioModal';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchUsuarios = () => {
    fetch('http://localhost:3000/usuarios')
      .then((response) => {
        if (!response.ok) throw new Error('Error al obtener los usuarios');
        return response.json();
      })
      .then((data) => setUsuarios(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestión de Usuarios</h1>
        <button className="btn btn-primary" onClick={handleShowModal}>
          Agregar Nuevo Usuario
        </button>
      </div>

      {error && <p className="text-danger">{error}</p>}
      
      <UsuarioTable usuarios={usuarios} refreshData={fetchUsuarios} />

      {showModal && (
        <AgregarUsuarioModal onClose={handleCloseModal} refreshData={fetchUsuarios} />
      )}
    </div>
  );
}

export default Usuarios;
