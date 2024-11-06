// src/components/UsuarioRow.jsx
import React, { useState } from 'react';
import EditarUsuarioModal from './EditarUsuarioModal';

function UsuarioRow({ usuario, refreshData }) {
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de eliminar el usuario "${usuario.nombre} ${usuario.apellido}"?`)) {
            fetch(`http://localhost:3000/usuarios/${usuario.id_usuario}`, {
                method: 'DELETE',
            })
                .then((response) => {
                    if (!response.ok) throw new Error('Error al eliminar el usuario');
                    refreshData();
                })
                .catch((error) => alert(error.message));
        }
    };

    const handleEditClick = () => setShowEditModal(true);
    const handleCloseModal = () => setShowEditModal(false);

    return (
        <>
            <tr>
                <td>{usuario.id_usuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.rol}</td>
                <td>
                    <button className="btn btn-secondary btn-sm me-2" onClick={handleEditClick}>
                        Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        Eliminar
                    </button>
                </td>
            </tr>

            {/* Modal para editar usuario */}
            {showEditModal && (
                <EditarUsuarioModal
                    usuario={usuario}
                    onClose={handleCloseModal}
                    refreshData={refreshData}
                />
            )}
        </>
    );
}

export default UsuarioRow;
