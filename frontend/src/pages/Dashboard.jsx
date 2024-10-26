// src/pages/Dashboard.jsx
import React from 'react';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
    return (
      <div>
        {/* Contenido Principal */}
        <div className="container mt-4">
          <h1 className="mb-4">Dashboard</h1>
          <div className="row">
            <Card title="Total de Bibliotecas" value="5" />
            <Card title="Usuarios Registrados" value="20" />
          </div>
        </div>
      </div>
    );
}

export default Dashboard;
