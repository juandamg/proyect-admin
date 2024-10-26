// src/components/BibliotecaTable.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditarBibliotecaModal from './EditarBibliotecaModal';

function BibliotecaTable({ bibliotecas, refreshData }) {
  const [selectedBiblioteca, setSelectedBiblioteca] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (biblioteca) => {
    setSelectedBiblioteca(biblioteca);
  };

  const handleCloseModal = () => {
    setSelectedBiblioteca(null);
  };

  const handleGestionarLibrosClick = (id_biblioteca) => {
    navigate(`/bibliotecas/${id_biblioteca}/libros`);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Titular</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bibliotecas.map((biblioteca) => (
            <tr key={biblioteca.id_biblioteca}>
              <td>{biblioteca.id_biblioteca}</td>
              <td>{biblioteca.nombre}</td>
              <td>{biblioteca.correo}</td>
              <td>{biblioteca.titular}</td>
              <td>{biblioteca.telefono}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleEditClick(biblioteca)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(biblioteca.id_biblioteca)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleGestionarLibrosClick(biblioteca.id_biblioteca)}
                >
                  Gestionar Libros
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edición */}
      {selectedBiblioteca && (
        <EditarBibliotecaModal
          biblioteca={selectedBiblioteca}
          onClose={handleCloseModal}
          refreshData={refreshData}
        />
      )}
    </>
  );

  function handleDelete(id) {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta biblioteca?")) {
      fetch(`http://localhost:3000/bibliotecas/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            refreshData();
          } else {
            console.error("Error al eliminar la biblioteca");
          }
        })
        .catch((error) => console.error("Error en la solicitud de eliminación:", error));
    }
  }
}

export default BibliotecaTable;
