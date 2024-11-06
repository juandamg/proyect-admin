import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Bibliotecas from './pages/Bibliotecas';
import GestionLibros from './pages/GestionLibros';
import Usuarios from './pages/Usuarios';
import Configuracion from './pages/Configuracion';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/checkAuth', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error en la verificación de autenticación:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <Router>
            {isAuthenticated && <Navbar onLogout={handleLogout} />}

            <Routes>
                <Route
                    path="/login"
                    element={
                        isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                    }
                />

                {/* Rutas adicionales */}
                <Route
                    path="/bibliotecas"
                    element={
                        isAuthenticated ? <Bibliotecas /> : <Navigate to="/login" />
                    }
                />

                <Route
                    path="/bibliotecas/:id/libros" 
                    element={
                        isAuthenticated ? <GestionLibros /> : <Navigate to="/login" />
                    }
                />
                 <Route
                    path="/usuarios"
                    element={
                        isAuthenticated ? <Usuarios /> : <Navigate to="/login" />
                    }
                />
                 <Route
                    path="/configuracion"
                    element={
                        isAuthenticated ? <Configuracion /> : <Navigate to="/login" />
                    }
                />

                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
