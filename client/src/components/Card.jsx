import React from 'react';
import axios from 'axios';
const Card = ({ data }) => {
  console.log(data)
  function getDuration(duration) {
    const minutes = Math.floor(Number(duration)/ (1000 * 60));
    return minutes
  }
  const play = async (trackUri) => {
    const token = localStorage.getItem("spotify_token");
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        { uris: [trackUri] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("spotify_token");
        handleSpotifyToken();
      } else {
        console.log(error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="mt-6">
          <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 text-white">
            {data.tracks.map((track) => (
              <li
                key={track.id}
                className="relative flex flex-col cursor-pointer items-center space-y-4 p-4 rounded-lg bg-neutral-800 hover:bg-neutral-900 transition-colors duration-300"
                onClick={() => play(track.uri)}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-32 h-32 rounded-md"
                />
                <div className="flex-1 text-center w-full">
                  <h3 className="text-md text-center truncate w-36">{track.name}</h3>
                  <h5 className='text-xs text-center'>{getDuration(track.duration_ms)} min</h5>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
