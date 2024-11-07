import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LibroModal from '../components/LibroModal';

function GestionLibros() {
    const { id } = useParams(); // Obtener el id de la biblioteca desde la URL
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLibro, setSelectedLibro] = useState(null);

    useEffect(() => {
        fetchLibros();
    }, [id]);

    const fetchLibros = async () => {
        try {
            const response = await fetch(`http://localhost:3000/bibliotecas/${id}/libros`);
            if (!response.ok) throw new Error('Error al obtener los libros');
            const data = await response.json();
            setLibros(data);
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddLibro = async (nuevoLibro) => {
        try {
            const response = await fetch(`http://localhost:3000/bibliotecas/${id}/libros`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoLibro),
            });
            if (!response.ok) throw new Error('Error al agregar el libro');
            fetchLibros();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const handleEditLibro = async (libroEditado) => {
        try {
            const response = await fetch(`http://localhost:3000/bibliotecas/libros/${libroEditado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(libroEditado),
            });
            if (!response.ok) throw new Error('Error al editar el libro');
            fetchLibros();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const handleDeleteLibro = async (libroId) => {
        if (!window.confirm("¿Estás seguro de eliminar este libro?")) return;
        try {
            const response = await fetch(`http://localhost:3000/bibliotecas/libros/${libroId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar el libro');
            fetchLibros();
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    const handleUploadPortada = async (libroId) => {
        const formData = new FormData();
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                formData.append("imagen", file);
                formData.append("libroId", libroId);

                try {
                    const response = await fetch(`http://localhost:3000/imagenes/upload`, {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) throw new Error('Error al cargar la portada');
                    alert("Portada cargada exitosamente");
                } catch (error) {
                    console.error(error.message);
                    alert(error.message);
                }
            }
        };
        fileInput.click();
    };

    const handleViewPortada = async (libroId) => {
        try {
            const response = await fetch(`http://localhost:3000/imagenes/${libroId}`);
            if (!response.ok) throw new Error('Portada no encontrada');
            const imageUrl = URL.createObjectURL(await response.blob());
            window.open(imageUrl, "_blank");
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };

    if (loading) return <p>Cargando libros...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Libros</h2>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Agregar Nuevo Libro</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre del Libro</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Nombre de la Sede</th>
                        <th>Dirección de la Sede</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro) => (
                        <tr key={libro.id}>
                            <td>{libro.nombre_libro}</td>
                            <td>{libro.nombre_categoria}</td>
                            <td>{libro.estado_libro}</td>
                            <td>{libro.nombre_sede}</td>
                            <td>{libro.direccion_sede}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm me-2" onClick={() => { setSelectedLibro(libro); setShowEditModal(true); }}>
                                    Editar
                                </button>
                                <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteLibro(libro.id)}>
                                    Eliminar
                                </button>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleUploadPortada(libro.id)}>
                                    Cargar Portada
                                </button>
                                <button className="btn btn-info btn-sm" onClick={() => handleViewPortada(libro.id)}>
                                    Ver Portada
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para agregar libro */}
            {showAddModal && (
                <LibroModal
                    onClose={() => setShowAddModal(false)}
                    onSave={(nuevoLibro) => { handleAddLibro(nuevoLibro); setShowAddModal(false); }}
                />
            )}

            {/* Modal para editar libro */}
            {showEditModal && selectedLibro && (
                <LibroModal
                    libro={selectedLibro}
                    onClose={() => setShowEditModal(false)}
                    onSave={(libroEditado) => { handleEditLibro(libroEditado); setShowEditModal(false); }}
                />
            )}
        </div>
    );
}

export default GestionLibros;

