import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function MatchInfo({ match }) {
  const [matchInfo, setMatchInfo] = useState([]);
  const [gameLength, setGameLength] = useState('');
  const [matchParticipants, setMatchParticipants] = useState([]);

  useEffect(() => {
    axios.get(`/match/${match}`)
      .then((response) => {
        if(response.data && response.data.info && response.data.info.game_length) {
          const gameLengthInSeconds = response.data.info.game_length;
          const minutes = Math.floor(gameLengthInSeconds / 60);
          const seconds = Math.floor(gameLengthInSeconds % 60);
          setGameLength(`${minutes} minute ${seconds} seconds`);
          setMatchInfo(response.data.info);
          setMatchParticipants(response.data.info.participants);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1>Match Info</h1>
      {matchInfo && <h2>Game Length: {gameLength}</h2>}

    </div>
  );
}