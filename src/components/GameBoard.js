import React, { useState, useEffect } from 'react';
import { initializeDeck, drawCard } from '../api/deckAPI';
import CardComponent from './CardComponent';
import ControlPanel from './ControlPanel';
import ScoreDisplay from './ScoreDisplay';

const GameBoard = () => {
  const [deck, setDeck] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [houseHand, setHouseHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const initializeGame = async () => {
    const newDeck = await initializeDeck();
    setDeck(newDeck.deck_id);
    const initialDraw = await drawCard(newDeck.deck_id, 4);
    setPlayerHand([initialDraw.cards[0], initialDraw.cards[2]]);
    setHouseHand([initialDraw.cards[1], initialDraw.cards[3]]);
    setGameOver(false);
    setWinner('');
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleRestart = () => {
    initializeGame(); 
  };

  const calculateScore = (hand) => {
    const values = hand.map(card => {
      if (card.value === 'ACE') return 11;
      if (['KING', 'QUEEN', 'JACK'].includes(card.value)) return 10;
      return parseInt(card.value);
    });
    const total = values.reduce((acc, value) => acc + value, 0);
    // Adjust for Aces if total is over 21
    const aces = values.filter(value => value === 11).length;
    let adjustedTotal = total;
    for (let i = 0; i < aces; i++) {
      if (adjustedTotal > 21) adjustedTotal -= 10; // Adjusting Ace from 11 to 1
    }
    return adjustedTotal;
  };

  const checkForGameOver = () => {
    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
      setGameOver(true);
      setWinner('House');
    }
  };

  const handleHit = async () => {
    if (!deck || gameOver) return;
    const cardDrawn = await drawCard(deck);
    const newHand = [...playerHand, ...cardDrawn.cards];
    setPlayerHand(newHand);
    checkForGameOver(); // Check if game is over after new card is added
  };

  const determineWinner = () => {
    const playerScore = calculateScore(playerHand);
    const houseScore = calculateScore(houseHand);

    if (playerScore > 21) return 'House';
    else if (houseScore > 21) return 'Player';
    else if (playerScore === houseScore) return 'Tie';
    else return playerScore > houseScore ? 'Player' : 'House';
  };

  const handleStand = () => {
    const winner = determineWinner();
    setWinner(winner);
    setGameOver(true);
  };

  return (
    <div>
      <h2>Blackjack Game - test</h2>
      <div>
        <h3>Player Hand:</h3>
        {playerHand.map(card => <CardComponent key={card.code} image={card.image} />)}
      </div>
      <div>
        <h3>House Hand:</h3>
        {houseHand.map(card => <CardComponent key={card.code} image={card.image} />)}
      </div>
      <ControlPanel onHit={handleHit} onStand={handleStand} onRestart={handleRestart}/>
      {gameOver && <ScoreDisplay playerHand={playerHand} houseHand={houseHand} winner={winner} />}
    </div>
  );
};

export default GameBoard;
