import React from 'react';
import './Card.css';

const Card = ({ label, value, trend }) => {
  return (
    <div className="card">
      <h4 className="card-label">{label}</h4>
      <p className="card-value">{value}</p>
      {trend && <span className={`card-trend ${trend.includes('-') ? 'negative' : 'positive'}`}>{trend}</span>}
    </div>
  );
};

export default Card;
