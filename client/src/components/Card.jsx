import React, { useEffect } from 'react';
import axios from 'axios';
const Card = ({ data, setArticle }) => {

  function getDuration(duration) {
    const minutes = Math.floor(Number(duration) / (1000 * 60));
    return minutes
  }

  const play = async (trackUri) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        { uris: [trackUri] },
        {
          headers: { Authorization: `Bearer ${localStorage.spotify_token}` },
        }
      );
      const body = {
        title: data.name, singer: data.artists[0].name
      }
      const response = await axios.post('https://server.imam-asyari.online/music', body)
      setArticle(response.data.text)
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("spotify_token");
      } else {
        console.log(error)
      }
    }
  };

  return (
    <div>

      <li
        key={data.id}
        className="relative flex flex-col cursor-pointer items-center space-y-4 p-4 rounded-lg bg-neutral-800 hover:bg-neutral-900 transition-colors duration-300"
        onClick={() => play(data.uri)}
      >
        <img
          src={data.album.images[0]?.url}
          alt={data.name}
          className="w-32 h-32 rounded-md"
        />
        <div className="flex-1 text-center w-full">
          <h3 className="text-md text-center truncate w-36">{data.name}</h3>
          <h5 className='text-xs text-center'>{getDuration(data.duration_ms)} min</h5>
        </div>
      </li>
    </div>

  );
};

export default Card;
