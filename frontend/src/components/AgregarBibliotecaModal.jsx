// src/components/AgregarBibliotecaModal.jsx
import React, { useState } from 'react';

function AgregarBibliotecaModal({ onClose, refreshData }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [titular, setTitular] = useState(''); // Nuevo estado para "titular"

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaBiblioteca = { nombre, correo, telefono, titular }; // Añadido "titular" a los datos enviados

    fetch('http://localhost:3000/bibliotecas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaBiblioteca),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al crear la biblioteca');
        return response.json();
      })
      .then(() => {
        refreshData(); // Refrescar la lista de bibliotecas
        onClose(); // Cerrar el modal
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Nueva Biblioteca</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Titular</label> {/* Campo para titular */}
                <input
                  type="text"
                  className="form-control"
                  value={titular}
                  onChange={(e) => setTitular(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgregarBibliotecaModal;
