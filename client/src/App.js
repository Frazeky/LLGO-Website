import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [summonername, setSummonername] = useState("");
  const [summonertag, setSummonertag] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames() {
    axios.get("https://llgo-website-backend.onrender.com/past5Games", {
      params: { summonername, summonertag },
    })
      .then((response) => {
        setGameList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <h1>LLGO Mega</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Summoner Name"
          value={summonername}
          onChange={(e) => setSummonername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summoner Tag"
          value={summonertag}
          onChange={(e) => setSummonertag(e.target.value)}
        />
        <button onClick={getPlayerGames}>Fetch Games</button>
      </div>

      <div className="game-list">
        {gameList.length > 0 ? (
          gameList.map((game, index) => (
            <div className="game-card" key={index}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Aatrox.png`} // Replace with actual API data
                alt="Summoner Icon"
                className="summoner-icon"
              />
              <div className="game-info">
                <h3>Match {index + 1}</h3>
                <p><strong>Game Duration:</strong> {info.gameDuration}s</p>
                <p><strong>Game Type:</strong> {info.gameType}</p>
              </div>
              <button className="details-button">View Details</button>
            </div>
          ))
        ) : (
          <p>No games to display. Enter details to fetch matches.</p>
        )}
      </div>
    </div>
  );
}

export default App;
