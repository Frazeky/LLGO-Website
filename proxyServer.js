var express = require('express');
var cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 4000;


//in one terminal do npm start
//second do cd client -> npm start

var app = express();

app.use(cors());

const API_KEY = "RGAPI-4c23ef80-3fdd-4697-8a91-a8cc21aef064";

function getPlayerPUUID(playerName, playerTag){
    //return axios.get("https://euw1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-riot-id/" + playerName + "?api_key=" + API_KEY)
    return axios.get("https://europe.api.riotgames.com" + "/riot/account/v1/accounts/by-riot-id/" + playerName + "/" + playerTag + "?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid
    }).catch(err => err);
}

app.get('/past5Games', async (req, res) => {
    const { summonername, summonertag } = req.query;
    if (!summonername || !summonertag) {
        return res.status(400).send("Summoner name and tag are required.");
    }
    try {
        const PUUID = await getPlayerPUUID(summonername, summonertag);
        const API_CALL = "https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + PUUID + "/ids?start=0&count=5&api_key=" + API_KEY;
        const gameIDs = await axios.get(API_CALL).then(response => response.data);
        
        const matchDataArray = [];
        for (const matchID of gameIDs) {
            const matchData = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
                .then(response => response.data);
            matchDataArray.push(matchData);
        }
        
        res.json(matchDataArray);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data.");
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
