import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const stats = () => {
  const [icon, setIcon] = useState('');
  const location = useLocation();
  const rankedInfo = location.state.rankedInfo;
  const tierProper = rankedInfo[0].tier.charAt(0) + rankedInfo[0].tier.slice(1).toLowerCase();
  //console.log(rankedInfo[0]);
  const getIcon = async () => {
    const response = await axios.get('/icons');
    setIcon(response.data.data[rankedInfo[0].queueType][tierProper].image.full);

  }
  useEffect(() => {
    getIcon();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <h2>{rankedInfo[0].summonerName}</h2>
      <h2>{rankedInfo[0].tier} {rankedInfo[0].rank}</h2>
      <h2>LP: {rankedInfo[0].leaguePoints}</h2>
      <h2>Wins: {rankedInfo[0].wins}</h2>
      <h2>Losses: {rankedInfo[0].losses}</h2>
      <img src={`/14.4.1/img/tft-regalia/${icon}`} />
    </div>
  );
}
export default stats;