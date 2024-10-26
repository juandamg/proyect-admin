// src/components/BibliotecaRow.jsx
import React from 'react';

function BibliotecaRow({ biblioteca, refreshData }) {
  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar la biblioteca "${biblioteca.nombre}"?`)) {
      fetch(`http://localhost:3000/bibliotecas/${biblioteca.id_biblioteca}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) throw new Error('Error al eliminar la biblioteca');
          refreshData(); // Refrescar la lista de bibliotecas
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <tr>
      <td>{biblioteca.id_biblioteca}</td>
      <td>{biblioteca.nombre}</td>
      <td>{biblioteca.direccion}</td>
      <td>{biblioteca.telefono}</td>
      <td>
        <button className="btn btn-secondary me-2">Editar</button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default BibliotecaRow;
