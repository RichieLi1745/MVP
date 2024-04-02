import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from './Stats';
import { useNavigate, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  const [summonerName, setSummonerName] = useState('');
  const navigate = useNavigate();

  const getSummonerInfo = (name) => {
    if (!name.trim()) {
      alert('Please enter a valid summoner name');
      return;
    }
    axios.get(`/summoner/${name}`)
      .then((response) => {
        console.log(response.data.id);
        const id = response.data.id;
        axios.get(`/ranked/${id}`)
          .then((response) => {
            console.log('rankedInfo:' ,response.data);
            navigate('/stats', { state: { rankedInfo: response.data } });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (
    <div>
      <h1>Welcome Summoner.</h1>
      <input placeholder="Enter Summoner Name..." type="text" onChange={(e) => setSummonerName(e.target.value)} />
      <button onClick={() => getSummonerInfo(summonerName)}>Search</button>
    </div>
  );
}
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default Main;