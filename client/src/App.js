import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [riotName, setRiotName] = useState("");
  const [riotTag, setRiotTag] = useState("");
  const [gameList, setGameList] = useState([]);
  const [summonerInfo, setSummonerInfo] = useState(null);

  function getPlayerGames() {
    if (!riotName.trim() || !riotTag.trim()) {
      alert("Please enter both Riot Name and Tag.");
      return;
    }

    const riotId = `${encodeURIComponent(riotName)}/${encodeURIComponent(riotTag)}`;

    axios
      .get(`https://llgo-website-backend.onrender.com:10000/past5Games?riotId=${riotId}`)
      .then((response) => {
        setGameList(response.data.matches); // Assuming the backend returns matches in `response.data.matches`
        setSummonerInfo(response.data.summoner); // Assuming the backend includes summoner info in `response.data.summoner`
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch data. Please check the Riot Name and Tag or try again later.");
      });
  }

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

      {summonerInfo && (
        <div className="summoner-info">
          <h3>Summoner Info</h3>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/13.20.1/img/profileicon/${summonerInfo.iconId}.png`}
            alt="Summoner Icon"
            style={{ width: 100, height: 100 }}
          />
          <p>Summoner Name: {summonerInfo.name}</p>
          <p>Level: {summonerInfo.level}</p>
        </div>
      )}

      {gameList.length > 0 && (
        <div className="game-list">
          <h3>Last 5 Matches</h3>
          <ul>
            {gameList.map((game, index) => (
              <li key={index}>
                <p>Game Mode: {game.mode}</p>
                <p>Result: {game.result}</p>
                <p>Kills: {game.kills}, Deaths: {game.deaths}, Assists: {game.assists}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
