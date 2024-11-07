// src/components/PortadaModal.jsx
import React, { useState } from 'react';

function PortadaModal({ libroId, onClose, onUpload, portadaUrl }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert("Por favor, selecciona una imagen");
            return;
        }

        const formData = new FormData();
        formData.append("imagen", file);
        formData.append("libroId", libroId);

        onUpload(formData);
    };

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{portadaUrl ? "Ver Portada" : "Cargar Portada"}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {portadaUrl ? (
                            <img src={portadaUrl} alt="Portada" className="img-fluid" />
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="form-control mb-3"
                                />
                                <button className="btn btn-primary" onClick={handleUpload}>
                                    Subir Portada
                                </button>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortadaModal;
