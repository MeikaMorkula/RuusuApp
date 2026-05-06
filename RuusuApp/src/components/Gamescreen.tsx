import { useEffect, useState } from "react";

type Card = {
  code: string;
  image: string;
  value: string;
  suit: string;
};

export default function GameScreen() {
  const [deckId, setDeckId] = useState(null);
const [card, setCard] = useState<Card | null>(null);
  const [remaining, setRemaining] = useState(52);

  const createDeck = async () => {
    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await res.json();
    setDeckId(data.deck_id);
    setRemaining(data.remaining);
    setCard(null);
  };

  const drawCard = async () => {
    if (!deckId || remaining === 0) return;

    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await res.json();

    setCard(data.cards[0]);
    setRemaining(data.remaining);
  };

  useEffect(() => {
    createDeck();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🃏 Card Drawer</h1>

      {remaining > 0 ? (
        <button onClick={drawCard}>
          Draw Card
        </button>
      ) : (
        <button onClick={createDeck}>
          Generate New Deck
        </button>
      )}

      <p>Cards remaining: {remaining}</p>

      {card && (
        <div style={{ marginTop: "20px" }}>
          <img src={card.image} alt={card.code} />
          <p>
            {card.value} of {card.suit}
          </p>
        </div>
      )}
    </div>
  );
}