const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
//routes
app.use(express.static('client/dist'));
const token = 'RGAPI-72133fd9-36f3-443e-9b5b-9a8df01fb870';

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
  axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${req.params.puuid}/ids?count=20&api_key=${token}`)
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