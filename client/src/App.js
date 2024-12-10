import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [summonername, setSummonername] = useState("");
  const [summonertag, setSummonertag] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames() {
    axios.get("https://llgo-website-backend.onrender.com/past5Games", {
      params: {
        summonername: summonername,
        summonertag: summonertag
      }
    })
      .then(function (response) {
        setGameList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <h2>Welcome to our proxy app</h2>

      <div>
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
        <button onClick={getPlayerGames}>Send Values</button>
      </div>

      <button onClick={getPlayerGames}>Get the past 5 games</button>
    </div>
  );
}

export default App;
