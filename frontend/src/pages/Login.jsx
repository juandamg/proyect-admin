// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoBiblioteca from '../assets/logo-biblioteca.png';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso:', data);
                onLogin();  // Notifica a App.jsx que el login fue exitoso
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            setError('Hubo un problema con el servidor');
        }
    };

    return (
        <div className="login-container d-flex align-items-center justify-content-center">
            <div className="login-box p-4 shadow">
                <div className="text-center mb-4">
                    <img src={logoBiblioteca} alt="Logo Biblioteca" className="logo mb-3" />
                    <h2>Sistema de Administración de Bibliotecas</h2>
                    <p className="text-muted">Accede a la plataforma</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
