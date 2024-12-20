// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand ms-3" to="/dashboard">Sistema de Bibliotecas</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/bibliotecas">Gestión de Bibliotecas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/usuarios">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/configuracion">Configuración</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={onLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
