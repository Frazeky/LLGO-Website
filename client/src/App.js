import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  //const [gameList, setGameList] = useState([]);

  function getPlayerGames() {
    axios.get("https://llgo-website-backend.onrender.com/past5Games")
      .then(function (response) {
        setGameList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function SummonernameInput() {
    console.log("Summoner name:", input1);
    console.log("Summoner Tag:", input2);
    // You can send these values to an API if needed using axios.post or axios.get
  }

  return (
    <div className="App">
      <h2>Welcome to our proxy app</h2>

      <div>
        <input
          type="text"
          placeholder="Enter first value"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second value"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <button onClick={SummonernameInput}>Send Values</button>
      </div>

      <button onClick={getPlayerGames}>Get the past 5 games</button>
    </div>
  );
}

export default App;
