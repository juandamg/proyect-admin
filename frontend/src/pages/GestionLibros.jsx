import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function GestionLibros() {
    const { id } = useParams(); // Obtener el id de la biblioteca desde la URL
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener la información de los libros de una biblioteca específica
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

        fetchLibros();
    }, [id]);

    if (loading) return <p>Cargando libros...</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Libros</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre del Libro</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Nombre de la Sede</th>
                        <th>Dirección de la Sede</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map((libro, index) => (
                        <tr key={index}>
                            <td>{libro.nombre_libro}</td>
                            <td>{libro.nombre_categoria}</td>
                            <td>{libro.estado_libro}</td>
                            <td>{libro.nombre_sede}</td>
                            <td>{libro.direccion_sede}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionLibros;
