import { useState } from "react";

type PlayerSetupProps = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PlayerSetup({ players, setPlayers }: PlayerSetupProps) {
  const [inputName, setInputName] = useState("");

  const addPlayer = () => {
    if (!inputName.trim()) return;
    setPlayers([...players, inputName.trim()]);
    setInputName("");
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  return (
    <div className="player-setup">
      <h3>Lisää pelaajat</h3>
      <p className="player-count">Pelaajia: {players.length}</p>

      <div className="input-row">
        <input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Nimi"
        />
        <button onClick={addPlayer}>Lisää</button>
      </div>

      <div className="player-list">
        {players.map((p, i) => (
          <div key={i} className="player-item">
            {p}
            <button onClick={() => removePlayer(i)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
