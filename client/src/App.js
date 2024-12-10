import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  //const [searchText, setSearchText] = useState(""); <input type="text" onChange={e => setSearchText(e.target.value)}></input>
  const [summonername, setInputSN] = useState("");
  const [summonertag, setInputST] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event){
    axios.get("https://llgo-website-backend.onrender.com/past5Games")
      .then(function (response){
        setGameList(response.data)
      }).catch(function(error){
        console.log(error);
      })
  }

 /* function getFullSummoner(){
    console.log("Name:", setInputSN);    
    console.log("Tag:", setInputST);
  }*/


  console.log(gameList);

  return (
    <div className="App">
      <h2>LLGO MEGA</h2>
       
      <div>
        <input
          type="text"
          placeholder="Summoner Name"
          value={summonername}
          onChange={(e) => setInputSN(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summoner Tag"
          value={summonertag}
          onChange={(e) => setInputST(e.target.value)}
        />
        <button onClick={handleSendValues}>Send Values</button>
      </div>

      <button onClick={getPlayerGames}>Get the past 5 games</button>
    </div>
  );
}

export default App; 