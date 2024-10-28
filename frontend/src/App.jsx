// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bibliotecas from './pages/Bibliotecas';
import GestionLibros from './pages/GestionLibros';
import Navbar from './components/NavBar'; 


function App() {
  return (
    <Router>
      {/* Barra de Navegación */}
      <Navbar />

      {/* Contenedor Principal */}
      <div className="container mt-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bibliotecas" element={<Bibliotecas />} />
          <Route path="/bibliotecas/:id/libros" element={<GestionLibros />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
