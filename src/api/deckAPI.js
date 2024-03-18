import axios from 'axios';

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

// Initialize a new deck and shuffle it
export const initializeDeck = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
    return response.data;
  } catch (error) {
    console.error("Error initializing deck:", error);
  }
};

// Draw a card from the deck
export const drawCard = async (deck_id, count = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/${deck_id}/draw/?count=${count}`);
    return response.data;
  } catch (error) {
    console.error("Error drawing card:", error);
  }
};
