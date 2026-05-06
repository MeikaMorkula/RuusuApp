import { useState } from "react";

export type Card = {
  code: string;
  image: string;
  value: string;
  suit: string;
};

export function useDeck() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [remaining, setRemaining] = useState<number>(52);
  const [loading, setLoading] = useState(false);

  const createDeck = async () => {
    setLoading(true);

    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
    );
    const data = await res.json();

    setDeckId(data.deck_id);
    setRemaining(data.remaining);
    setCard(null);
    setLoading(false);
  };

  const drawCard = async () => {
    if (!deckId || remaining === 0) return null;

    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`,
    );

    const data = await res.json();

    const drawn = data.cards[0];

    setCard(drawn);
    setRemaining(data.remaining);

    return drawn;
  };

  return {
    card,
    remaining,
    loading,
    createDeck,
    drawCard,
  };
}
