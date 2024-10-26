// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bibliotecas from './pages/Bibliotecas';
import Navbar from './components/NavBar'; // Asegúrate de que coincida con el nombre exacto del archivo


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
          {/* Agrega aquí otras rutas según sea necesario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
