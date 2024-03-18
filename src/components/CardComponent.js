import React from 'react';

const CardComponent = ({ image }) => (
  <div>
    <img src={image} alt="card" style={{ width: '100px' }} />
  </div>
);

export default CardComponent;
