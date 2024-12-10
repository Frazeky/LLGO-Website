var express = require('express');
var cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 4000;

var app = express();

app.use(cors());

const API_KEY = "RGAPI-4c23ef80-3fdd-4697-8a91-a8cc21aef064";

function getPlayerPUUID(playerName, playerTag) {
    return axios
        .get(
            `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${playerTag}?api_key=${API_KEY}`
        )
        .then(response => {
            console.log(response.data);
            return response.data.puuid;
        })
        .catch(err => {
            console.error("Error fetching PUUID:", err.message);
            throw new Error("Failed to fetch PUUID.");
        });
}

app.get('/past5Games', async (req, res) => {
    const { playerName, playerTag } = req.query;

    if (!playerName || !playerTag) {
        res.status(400).json({ error: "Player name and tag are required." });
        return;
    }

    try {
        const PUUID = await getPlayerPUUID(playerName, playerTag);

        const API_CALL = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${PUUID}/ids?start=0&count=5&api_key=${API_KEY}`;

        const gameIDs = await axios
            .get(API_CALL)
            .then(response => response.data)
            .catch(err => {
                console.error("Error fetching game IDs:", err.message);
                throw new Error("Failed to fetch game IDs.");
            });

        const matchDataArray = [];

        for (const matchID of gameIDs) {
            const matchData = await axios
                .get(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${API_KEY}`)
                .then(response => response.data)
                .catch(err => {
                    console.error(`Error fetching match data for ${matchID}:`, err.message);
                    return null; // Skip failed matches
                });

            if (matchData) {
                matchDataArray.push(matchData);
            }
        }

        res.json({ matches: matchDataArray });
    } catch (error) {
        console.error("Error processing request:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
