
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
      <h1 className="mainheader">RUUSUPAKKA 🌹</h1>

     
      <div className={`scene ${flipping ? "flip" : ""}`}>
        <div className="card">
          {}
          <div className="face front">
            {displayCard ? (
              <img src={displayCard.image} alt={displayCard.code} />
            ) : (
              <div className="back">🂠</div>
            )}
          </div>

          {}
          <div className="face back">🂠</div>
        </div>
      </div>
       {remaining > 0 ? (
        <button className="button" onClick={handleDraw}>Nosta Kortti</button>
      ) : (
        <button className="button" onClick={createDeck}>Uusi pakka</button>
      )}

      <p>Kortteja jäljellä: {remaining}</p>

    </div>
  );
}