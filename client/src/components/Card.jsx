import React from 'react'
import axios from 'axios';
const Card = ({ data, tracks }) => {
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
          <h2 className="text-xl text-white">Recommended Tracks:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            {data.map((track) => (
              <li key={track.id} className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg">
                <img src={track.album.images[0]?.url} alt={track.name} className="w-32 h-32 rounded-md" />
                <div className="flex-1 text-center">
                  <h3 className="text-lg">{track.name}</h3>
                  <button
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                    onClick={() => play(track.uri)}
                  >
                    Play
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Card