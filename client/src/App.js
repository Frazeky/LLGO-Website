import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [riotName, setRiotName] = useState("");
  const [riotTag, setRiotTag] = useState("");
  const [gameList, setGameList] = useState([]);
  const [error, setError] = useState(null);

  const getPlayerGames = () => {
    if (!riotName.trim() || !riotTag.trim()) {
      alert("Please enter both Riot Name and Tag.");
      return;
    }

    axios
      .get(`https://llgo-website-backend.onrender.com:10000/past5Games`, {
        params: {
          playerName: riotName,
          playerTag: riotTag,
        },
      })
      .then((response) => {
        setGameList(response.data.matches || []);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data. Please check the Riot Name and Tag or try again later.");
      });
  };

  return (
    <div className="App">
      <h2>Welcome to our proxy app</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Riot Name"
          value={riotName}
          onChange={(e) => setRiotName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Riot Tag"
          value={riotTag}
          onChange={(e) => setRiotTag(e.target.value)}
        />
        <button onClick={getPlayerGames}>Get Player Data</button>
      </div>

      {error && <p className="error">{error}</p>}

      {gameList.length > 0 && (
        <div className="game-list">
          <h3>Last 5 Matches</h3>
          <ul>
            {gameList.map((game, index) => (
              <li key={index}>
                <p>Match ID: {game.metadata.matchId}</p>
                <p>Game Mode: {game.info.gameMode}</p>
                <p>Duration: {Math.floor(game.info.gameDuration / 60)} mins</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
