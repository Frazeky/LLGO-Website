var express = require('express');
var cors = require('cors');
const axios = require('axios');

//in one terminal do npm start
//second do cd client -> npm start

var app = express();

app.use(cors());

const API_KEY = "RGAPI-b98fe6f7-dc71-47a0-9adf-994f227f50e0";

function getPlayerPUUID(playerName, playerTag){
    //return axios.get("https://euw1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-riot-id/" + playerName + "?api_key=" + API_KEY)
    return axios.get("https://europe.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + playerName + "/" + playerTag + "?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

app.get('/past5Games', async (req,res) => {
    const playerName = 'Im Feet lover'
    const playerTag = 'Foot'
    const PUUID = await getPlayerPUUID(playerName, playerTag);
    //const API_CALL = "https://europe.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + playerName + "/" + playerTag + "?api_key=" + API_KEY
    //https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/S0igukpP8xo2IHKoonez88fMQBS09f707PGmoZWQbpfMeZhxPeU1VtTkjIWE3V3GyVj5_iP9gpVwjQ/ids?start=0&count=5&api_key=RGAPI-0bd17b6f-6d67-48ec-b1a3-ebe5158f77af
    //REMOVE COUNT START FROM CODE TO WORK
    const API_CALL = "https://europe.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?" + "start=0&count=5&" + "api_key=" + API_KEY
    //WORKING PUUID //const API_CALL = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Im%20Feet%20lover/Foot?api_key=RGAPI-0bd17b6f-6d67-48ec-b1a3-ebe5158f77af"
    //get api call

    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err => err)

    //list of game id strings
    console.log(gameIDs);
    
    //loop through ids and get info based on ids (api calls)
    //https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_7215114668?api_key=RGAPI-0bd17b6f-6d67-48ec-b1a3-ebe5158f77af
    var matchDataArray = [];
    for(var i=0; i<gameIDs.length; i++){
        const matchID = gameIDs[i];
        const matchData = await axios.get("https://europe.api.riotgames.com/" + "lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
        .then(response => response.data)
        .catch(err => err)
        matchDataArray.push(matchData);
    }
    //save info above in array and give array as JSON responce to user
    
    //res.json()
    //res.json()
    //res.json(gameIDs);
    res.json(matchDataArray);
    //res.json(gameIDs);

});

app.listen(4000, function (){
    console.log("Server started on port 4000");
});