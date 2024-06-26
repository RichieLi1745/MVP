import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MatchInfo from './MatchInfo.jsx';
import axios from 'axios';
const stats = () => {
  const [icon, setIcon] = useState('');
  const [matches, setMatches] = useState([]); // [match1, match2, match3, ...
  const location = useLocation();
  const rankedInfo = location.state.rankedInfo;
  const name = location.state.name;
  const puuid = rankedInfo[0].puuid;
  const navigate = useNavigate();
  const tierProper = rankedInfo[0].tier.charAt(0) + rankedInfo[0].tier.slice(1).toLowerCase();

  const getIcon = async () => {
    const response = await axios.get('/icons');
    setIcon(response.data.data[rankedInfo[0].queueType][tierProper].image.full);

  }
  const getMatches = async () => {
     await axios.get(`/matches/${puuid}`)
      .then((response) => {
        //console.log(response.data);
        setMatches(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getIcon();
    getMatches();
  }, []);
  return (
    <div>
      <button className="league-icon"onClick={() => navigate('/')}>
      </button>
      <div className="name-rank-MatchInfo">
        <div className="profile" >

        <div className="summonerName">
          <h2 className="summoner">{name}</h2>
        </div>

        <div className="iconPlusWinLoss">

            <div className= "iconPlusTierRank">
              {icon && <img className="regalia" src={`14.4.1/img/tft-regalia/${icon}`} />}

              <div className="TierRankLP">
                {icon && <h2>{tierProper} {rankedInfo[0].rank}</h2>}
                {icon && <h2>{rankedInfo[0].leaguePoints} LP</h2>}
              </div>

            </div>

            <div className="WinLossWinRate ">
              <h2>Wins: {rankedInfo[0].wins}</h2>
              <h2>Losses: {rankedInfo[0].losses}</h2>
              <h2>Winrate: {Math.round((rankedInfo[0].wins / (rankedInfo[0].wins + rankedInfo[0].losses)) * 100)}%</h2>
            </div>
        </div>
        </div>
        <div className="MatchInfo-title">
            <h1>Match Info</h1>
        </div>
      </div>
      <div className="MatchInfo">
        {matches.map((match, index) => {
          return <MatchInfo key={index} match={match} nameID={rankedInfo[0].puuid}/>
        })}
      </div>
    </div>
  );
}
export default stats;
