// src/components/Card.jsx
import React from 'react';

function Card({ title, value }) {
  return (
    <div className="col-md-6 mb-4">
      <div className="card text-center">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
