import React from 'react';

const ScoreDisplay = ({ playerHand, houseHand, winner }) => {
  return (
    <div>
      <h3>Game Over</h3>
      {winner === 'Tie' ? (
        <p>It's a tie!</p>
      ) : (
        <p>{winner} wins!</p>
      )}
    </div>
  );
};

export default ScoreDisplay;
