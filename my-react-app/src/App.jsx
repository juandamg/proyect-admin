import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './App.css';

function App() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [bibliotecaEditada, setBibliotecaEditada] = useState(null);
  const [nuevaBiblioteca, setNuevaBiblioteca] = useState({ nombre: '', correo: '', titular: '', telefono: '' });

  useEffect(() => {
    fetch('http://localhost:3000/bibliotecas')
      .then(response => response.json())
      .then(data => setBibliotecas(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBibliotecaEditada({ ...bibliotecaEditada, [name]: value });
  };

  const handleNuevaBibliotecaInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaBiblioteca({ ...nuevaBiblioteca, [name]: value });
  };

  const handleActualizarBiblioteca = () => {
    fetch(`http://localhost:3000/bibliotecas/${bibliotecaEditada.id_biblioteca}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bibliotecaEditada),
    })
      .then(response => response.json())
      .then(() => {
        setBibliotecas(bibliotecas.map(bib => 
          bib.id_biblioteca === bibliotecaEditada.id_biblioteca ? bibliotecaEditada : bib
        ));
        setBibliotecaEditada(null);
      })
      .catch(error => console.error('Error al actualizar la biblioteca:', error));
  };

  const handleCrearBiblioteca = () => {
    fetch('http://localhost:3000/bibliotecas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaBiblioteca),
    })
      .then(response => response.json())
      .then((data) => {
        setBibliotecas([...bibliotecas, data]);
        setNuevaBiblioteca({ nombre: '', correo: '', titular: '', telefono: '' });
      })
      .catch(error => console.error('Error al crear la biblioteca:', error));
  };

  const handleEliminarBiblioteca = (id) => {
    fetch(`http://localhost:3000/bibliotecas/${id}`, { method: 'DELETE' })
      .then(() => {
        setBibliotecas(bibliotecas.filter(biblioteca => biblioteca.id_biblioteca !== id));
      })
      .catch(error => console.error('Error al eliminar la biblioteca:', error));
  };

  const handleEditarClick = (biblioteca) => {
    setBibliotecaEditada(biblioteca);
  };

  return (
    <div className="container">
      <NavBar />
      <h1 className="text-center my-4">Hola mundo</h1>
      <h2 className="text-center">Lista de Bibliotecas</h2>

      {/* Tabla de bibliotecas */}
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
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
          {bibliotecas.map(biblioteca => (
            <tr key={biblioteca.id_biblioteca}>
              <td>{biblioteca.id_biblioteca}</td>
              <td>{biblioteca.nombre}</td>
              <td>{biblioteca.correo}</td>
              <td>{biblioteca.titular}</td>
              <td>{biblioteca.telefono}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditarClick(biblioteca)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleEliminarBiblioteca(biblioteca.id_biblioteca)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para crear una nueva biblioteca */}
      <h2 className="my-4">Crear Nueva Biblioteca</h2>
      <form className="mb-4">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="nombre"
              placeholder="Nombre"
              value={nuevaBiblioteca.nombre}
              onChange={handleNuevaBibliotecaInputChange}
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              name="correo"
              placeholder="Correo"
              value={nuevaBiblioteca.correo}
              onChange={handleNuevaBibliotecaInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="titular"
              placeholder="Titular"
              value={nuevaBiblioteca.titular}
              onChange={handleNuevaBibliotecaInputChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              name="telefono"
              placeholder="Teléfono"
              value={nuevaBiblioteca.telefono}
              onChange={handleNuevaBibliotecaInputChange}
            />
          </div>
          <div className="col">
            <button type="button" className="btn btn-success w-100" onClick={handleCrearBiblioteca}>Crear nueva biblioteca</button>
          </div>
        </div>
      </form>

      {/* Formulario para actualizar una biblioteca */}
      {bibliotecaEditada && (
        <div className="mb-4">
          <h2>Actualizar Biblioteca</h2>
          <form>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre"
                  value={bibliotecaEditada.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  placeholder="Correo"
                  value={bibliotecaEditada.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="titular"
                  placeholder="Titular"
                  value={bibliotecaEditada.titular}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  placeholder="Teléfono"
                  value={bibliotecaEditada.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col">
                <button type="button" className="btn btn-primary w-100" onClick={handleActualizarBiblioteca}>Guardar cambios</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
