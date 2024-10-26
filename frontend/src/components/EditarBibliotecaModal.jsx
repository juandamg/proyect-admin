// src/components/EditarBibliotecaModal.jsx
import React, { useState, useEffect } from 'react';

function EditarBibliotecaModal({ biblioteca, onClose, refreshData }) {
  const [nombre, setNombre] = useState(biblioteca.nombre);
  const [correo, setCorreo] = useState(biblioteca.correo);
  const [titular, setTitular] = useState(biblioteca.titular);
  const [telefono, setTelefono] = useState(biblioteca.telefono);

  const handleSave = () => {
    fetch(`http://localhost:3000/bibliotecas/${biblioteca.id_biblioteca}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, titular, telefono }),
    })
      .then((response) => {
        if (response.ok) {
          refreshData();
          onClose();
        } else {
          console.error('Error al actualizar la biblioteca');
        }
      })
      .catch((error) => console.error('Error en la solicitud de actualización:', error));
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Biblioteca</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Titular</label>
              <input
                type="text"
                className="form-control"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarBibliotecaModal;
