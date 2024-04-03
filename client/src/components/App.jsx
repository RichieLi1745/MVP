import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from './Stats';
import { useNavigate, useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import searchIcon from '/Users/richardli/hackreactortest/MVP/client/dist/team-fight-tactics-svgrepo-com.png';
import searchIconTwo from '/Users/richardli/hackreactortest/MVP/client/dist/team-fight-tactics-svgrepo-com (1).png';
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
        //console.log(response.data.id);
        const id = response.data.id;
        axios.get(`/ranked/${id}`)
          .then((response) => {
            //console.log('rankedInfo:' ,response.data);
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
    <div className="welcome">
      <h1>Welcome Summoner.</h1>
      <div className="enterName">
        <input className="input" placeholder="Enter Summoner Name..." type="text" onChange={(e) => setSummonerName(e.target.value)} />
        <button className="searchButton" onClick={() => getSummonerInfo(summonerName)}></button>
      </div>
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