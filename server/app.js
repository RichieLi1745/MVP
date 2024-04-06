const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
//routes
app.use(express.static('client/dist'));

const token = process.env.RIOT_GAME_TOKEN;

//SUMMONER INFO ROUTE
app.get('/summoner/:name', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=${token}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
} );
//RANKED STATS ROUTE
app.get('/ranked/:id', (req, res) => {
  axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${req.params.id}?api_key=${token}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
} );
//MATCHES ROUTE
app.get('/matches/:puuid', (req, res) => {
  axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${req.params.puuid}/ids?count=10&api_key=${token}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
} );
//MATCH INFO ROUTE
app.get('/match/:matchId', (req, res) => {
  axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${req.params.matchId}?api_key=${token}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
} );
//RANKED ICONS ROUTE
app.get('/icons', (req, res) => {
  axios.get('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/tft-regalia.json')
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
} );
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});