// src/components/LibroModal.jsx
import React, { useState, useEffect } from 'react';

function LibroModal({ libro, onClose, onSave }) {
    const [nombre, setNombre] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');

    useEffect(() => {
        if (libro) {
            setNombre(libro.nombre_libro);
            setCategoria(libro.nombre_categoria);
            setEstado(libro.estado_libro);
        }
    }, [libro]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const libroData = { nombre_libro: nombre, nombre_categoria: categoria, estado_libro: estado };
        if (libro && libro.id) {
            libroData.id = libro.id; // Para el modo de edición
        }
        onSave(libroData);
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{libro ? 'Editar Libro' : 'Agregar Nuevo Libro'}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nombre del Libro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estado</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
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

export default LibroModal;
