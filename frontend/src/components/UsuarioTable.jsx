// src/components/UsuarioTable.jsx
import React from 'react';
import UsuarioRow from './UsuarioRow';

function UsuarioTable({ usuarios, refreshData }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <UsuarioRow key={usuario.id_usuario} usuario={usuario} refreshData={refreshData} />
                ))}
            </tbody>
        </table>
    );
}

export default UsuarioTable;
