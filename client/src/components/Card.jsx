import React, { useEffect } from 'react';

const Card = () => {

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = '[My access token]'; 
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

   
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });


      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, []);

  return (
    <div className="card">
      <h3>Play your favorite tracks</h3>
      <button onClick={() => playTrack()}>Play</button>
    </div>
  );
};

export default Card;
