// src/components/EditarUsuarioModal.jsx
import React, { useState } from 'react';

function EditarUsuarioModal({ usuario, onClose, refreshData }) {
    const [nombre, setNombre] = useState(usuario.nombre);
    const [apellido, setApellido] = useState(usuario.apellido);
    const [correo, setCorreo] = useState(usuario.correo);
    const [telefono, setTelefono] = useState(usuario.telefono);
    const [rol, setRol] = useState(usuario.rol);
    const [direccion, setDireccion] = useState(usuario.direccion);
    const [contraseña, setContraseña] = useState(usuario.contraseña);

    const handleSave = (e) => {
        e.preventDefault();
        const usuarioActualizado = { nombre, apellido, correo, telefono, rol, direccion, contraseña };

        fetch(`http://localhost:3000/usuarios/${usuario.id_usuario}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioActualizado),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Error al actualizar el usuario');
                refreshData();
                onClose();
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Usuario</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSave}>
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
                                <label className="form-label">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
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
                                <label className="form-label">Rol</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
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

export default EditarUsuarioModal;
