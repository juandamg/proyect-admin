import React, { useState, useEffect } from 'react';

function LibroModal({ libro, onClose, onSave }) {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [editorial, setEditorial] = useState('');
    const [nPaginas, setNPaginas] = useState('');
    const [categoria, setCategoria] = useState('');
    const [estado, setEstado] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [estados, setEstados] = useState([]); // Estado para almacenar los estados de libro

    useEffect(() => {
        // Obtener categorías y estados al cargar el componente
        fetchCategorias();
        fetchEstados();

        if (libro) {
            setTitulo(libro.titulo || '');
            setAutor(libro.autor || '');
            setIsbn(libro.isbn || '');
            setEditorial(libro.editorial || '');
            setNPaginas(libro.n_paginas || '');
            setCategoria(libro.categoria_id_categoria || '');
            setEstado(libro.estado_libro_id_estado || '');
        }
    }, [libro]);

    const fetchCategorias = async () => {
        try {
            const response = await fetch(`http://localhost:3000/categorias`);
            if (!response.ok) throw new Error('Error al obtener las categorías');
            const data = await response.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error al obtener las categorías:', error);
        }
    };

    const fetchEstados = async () => {
        try {
            const response = await fetch(`http://localhost:3000/estados`);
            if (!response.ok) throw new Error('Error al obtener los estados');
            const data = await response.json();
            setEstados(data);
        } catch (error) {
            console.error('Error al obtener los estados:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const libroData = {
            titulo,
            autor,
            isbn,
            editorial,
            n_paginas: nPaginas,
            categoria_id_categoria: categoria, 
            estado_libro_id_estado: estado 
        };

        console.log("Datos que se envían al backend:", libroData); 
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
                                <label className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={autor}
                                    onChange={(e) => setAutor(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">ISBN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={isbn}
                                    onChange={(e) => setIsbn(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Editorial</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editorial}
                                    onChange={(e) => setEditorial(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número de Páginas</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={nPaginas}
                                    onChange={(e) => setNPaginas(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <select
                                    className="form-control"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categorias.map((cat) => (
                                        <option key={cat.id_categoria} value={cat.id_categoria}>
                                            {cat.nombre_categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Estado</label>
                                <select
                                    className="form-control"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    required
                                >
                                    <option value="">Selecciona un estado</option>
                                    {estados.map((est) => (
                                        <option key={est.id_estado} value={est.id_estado}>
                                            {est.descripcion}
                                        </option>
                                    ))}
                                </select>
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
