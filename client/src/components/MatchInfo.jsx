import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function MatchInfo({ match, nameID }) {
  const [matchInfo, setMatchInfo] = useState([]);
  const [gameLength, setGameLength] = useState('');
  const [matchParticipants, setMatchParticipants] = useState([]);

  useEffect(() => {
    axios.get(`/match/${match}`)
      .then((response) => {
        if(response.data && response.data.info && response.data.info.game_length && response.data.info.participants) {
          const gameLengthInSeconds = response.data.info.game_length;
          const minutes = Math.floor(gameLengthInSeconds / 60);
          const seconds = Math.floor(gameLengthInSeconds % 60);
          setGameLength(`${minutes} minute ${seconds} seconds`);
          setMatchInfo(response.data.info);
          setMatchParticipants(response.data.info.participants);
          //console.log(response.data.info.participants);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div  >

      {matchParticipants && matchParticipants.map((participant) => {
        if(participant.puuid === nameID) {
          console.log(participant);
          return (
            <div className="champion-items-container" key={participant.puuid}>

              <h2>Placement: {participant.placement}</h2>
              <h2>Game Length: {gameLength}</h2>
              <div className="champion-items">{participant.units.map((unit, index) => {
                return (
                <div className="champion-items-individual">
                  {unit.character_id.split('_')[1] === 'WuKong' ?
                  <img className="tft-champion" key={index} src={'/photos/WukongSquare.webp'} />
                  :
                  <img className="tft-champion" key={index} src={`14.4.1/img/champion/${unit.character_id.split('_')[1]}.png`} />}

                  <div className="tft-items">
                    {unit.itemNames && unit.itemNames.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="tft-items-container">
                            <img  src={`14.4.1/img/tft-item/${item}.png`}
                            onError={(e)=>{e.target.onerror = null; e.target.src="14.4.1/img/tft-item/TFT_Assist_TrainingDummy.png"}}
                            />
                          </div>
                        </div>

                      )
                    })}
                  </div>
                </div>
                )

              })}</div>
            </div>
          );
        }
      }
      )}
    </div>
  );
}