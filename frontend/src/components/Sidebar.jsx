// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Crear un archivo de estilos opcional para personalizar

function Sidebar() {
    return (
        <div className="sidebar bg-light">
            <h3 className="sidebar-title">Admin Panel</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/bibliotecas">Bibliotecas</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/usuarios">Usuarios</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/prestamos">Préstamos</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
