
import { useEffect, useState } from "react";
import { useDeck } from "../hooks/useDeck";
import "../styles/styles.css";

export default function GameScreen() {
  const { card, remaining, createDeck, drawCard } = useDeck();

  const [flipping, setFlipping] = useState(false);
  const [displayCard, setDisplayCard] = useState<typeof card>(null);

  useEffect(() => {
    createDeck();
  }, []);

  const handleDraw = async () => {
    if (flipping) return;

    setFlipping(true);


    const res = await drawCard(); 
    const nextCard = res;

    setTimeout(() => {
      setDisplayCard(nextCard);
    }, 300);

    setTimeout(() => {
      setFlipping(false);
    }, 600);
  };

  return (
    <div className="container">
      <h1>RUUSU 🌹</h1>

      {remaining > 0 ? (
        <button onClick={handleDraw}>Nosta Kortti</button>
      ) : (
        <button onClick={createDeck}>Uusi pakka</button>
      )}

      <p>Kortteja jäljellä: {remaining}</p>

      <div className={`scene ${flipping ? "flip" : ""}`}>
        <div className="card">
          {/* FRONT */}
          <div className="face front">
            {displayCard ? (
              <img src={displayCard.image} alt={displayCard.code} />
            ) : (
              <div className="back">🂠</div>
            )}
          </div>

          {/* BACK */}
          <div className="face back">🂠</div>
        </div>
      </div>
    </div>
  );
}