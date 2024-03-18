import React from 'react';

const ControlPanel = ({ onHit, onStand, onRestart }) => (
  <div>
    <button onClick={onHit}>Hit</button>
    <button onClick={onStand}>Stand</button>
    <button onClick={onRestart}>Restart</button>
  </div>
);

export default ControlPanel;
