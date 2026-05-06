import { useEffect, useState } from "react";
import { useDeck } from "../hooks/useDeck";
import "../styles/styles.css";
import PlayerSetup from "./PlayerSetup";
import PlayerCircle from "./RuusuCircle";

export default function GameScreen() {
  const { card, remaining, createDeck, drawCard } = useDeck();
  const [players, setPlayers] = useState<string[]>([]);
  const [lastDrinkerIndex, setLastDrinkerIndex] = useState(0);
  const [currentDrinkerIndex, setCurrentDrinkerIndex] = useState<number | null>(
    null,
  );
  const [flipping, setFlipping] = useState(false);
  const [displayCard, setDisplayCard] = useState<typeof card>(null);

  useEffect(() => {
    createDeck();
  }, []);

  const getCardValue = (card: any) => {
    if (!card) return null;

    if (card.value === "ACE") return 1;

    if (
      card.value === "JACK" ||
      card.value === "QUEEN" ||
      card.value === "KING"
    ) {
      return null;
    }

    return parseInt(card.value);
  };

  const handleDraw = async () => {
    if (flipping) return;

    setFlipping(true);

    const nextCard = await drawCard();

    setTimeout(() => {
      setDisplayCard(nextCard);

      if (players.length > 0) {
        const value = getCardValue(nextCard);

        if (value !== null) {
          const nextIndex = (lastDrinkerIndex + value - 1) % players.length;

          setLastDrinkerIndex(nextIndex);
          setCurrentDrinkerIndex(nextIndex);
        } else {
          setCurrentDrinkerIndex(null);
        }
      }
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
              <img
                src={displayCard.image}
                alt={displayCard.code}
                loading="lazy"
              />
            ) : (
              <div className="placeholder">
                <span>Aloita peli</span>
                <span>painamalla nappia</span>
              </div>
            )}
          </div>

          {}
          <div className="face back">🂠</div>
        </div>
        {players.length > 0 && currentDrinkerIndex !== null && (
          <h2>{players[currentDrinkerIndex]} Juo </h2>
        )}

        {players.length > 0 && currentDrinkerIndex === null && displayCard && (
          <h2>Jaa</h2>
        )}
      </div>
      {remaining > 0 ? (
        <button className="button" onClick={handleDraw}>
          Nosta Kortti
        </button>
      ) : (
        <button className="button" onClick={createDeck}>
          Uusi pakka
        </button>
      )}

      <p>Kortteja jäljellä: {remaining}</p>

      {players.length === 0 && <p>Voit nostaa kortteja tai lisätä pelaajia ruusuun</p>}
      {players.length === 0 && <p></p>}

{players.length > 0 && (
        <PlayerCircle players={players} activeIndex={currentDrinkerIndex} />
      )}
      <PlayerSetup players={players} setPlayers={setPlayers} />

      
    </div>
  );
}
