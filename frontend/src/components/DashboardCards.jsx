// src/components/DashboardCards.jsx
import React from 'react';

function DashboardCards() {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Total de Bibliotecas</h5>
                        <p className="card-text">5</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Usuarios Registrados</h5>
                        <p className="card-text">20</p>
                    </div>
                </div>
            </div>
            {/* Añadir más tarjetas según necesidades */}
        </div>
    );
}

export default DashboardCards;
