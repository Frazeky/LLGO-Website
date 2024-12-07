import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event){
    axios.get("http://localhost:4000/past5Games")
      .then(function (response){
        setGameList(response.data)
      }).catch(function(error){
        console.log(error);
      })
  }

  console.log(gameList);

  return (
    <div className="App">
      <h2>Welcome to our proxy app</h2>
      <input type="text" onChange={e => setSearchText(e.target.value)}></input>
      <button onClick={getPlayerGames}>Get the past 5 games</button>
    </div>
  );
}

export default App;
