import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const [spotifyData, setSpotifyData] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState({});
  const navigate = useNavigate();

  const handleSpotifyToken = () => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("spotify_token", token);
        navigate("/dashboard");
      }
    }
  };

  const fetchSpotifyData = async (token) => {
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpotifyData(data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("spotify_token");
        handleSpotifyToken();
      } else {
        console.log(error);
      }
    }
  };

  const fetchAlbums = async (token) => {
    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlbums(data.items);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("spotify_token");
        handleSpotifyToken();
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (!token) {
      handleSpotifyToken();
    } else {
      fetchSpotifyData(token);
      fetchAlbums(token);
    }
  }, [navigate]);

  const fetchTracks = async (albumId) => {
    const token = localStorage.getItem("spotify_token");
    if (token) {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTracks((prevTracks) => ({
          ...prevTracks,
          [albumId]: data.items,
        }));
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("spotify_token");
          handleSpotifyToken();
        } else {
          console.log(error);
        }
      }
    }
  };

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
    <>
      <div className="relative flex flex-col h-screen ml-96">
        <Sidebar />
        <div className="flex-1 p-6 mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold text-accent-focus">Dashboard</h1>
          {spotifyData ? (
            <div className="mt-6">
              <h2 className="text-xl text-white">Spotify User Info:</h2>
              <p className="text-white">Display Name: {spotifyData.display_name}</p>
              <p className="text-white">Email: {spotifyData.email}</p>
            </div>
          ) : (
            <p className="text-white">Loading Spotify data...</p>
          )}
          {albums.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xl text-white">Your Albums:</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                {albums.map((album) => (
                  <li key={album.id} className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg">
                    <img src={album.images[0]?.url} alt={album.name} className="w-32 h-32 rounded-md" />
                    <div className="flex-1 text-center">
                      <h3 className="text-lg">{album.name}</h3>
                      <button
                        className="mt-2 p-2 bg-green-500 text-white rounded"
                        onClick={() => fetchTracks(album.id)}
                      >
                        Show Tracks
                      </button>
                      {tracks[album.id] && (
                        <ul className="mt-2">
                          {tracks[album.id].map((track) => (
                            <li key={track.id} className="mt-2">
                              {track.name}
                              <button
                                className="ml-2 p-2 bg-green-500 text-white rounded"
                                onClick={() => play(track.uri)}
                              >
                                Play
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-white">Loading albums...</p>
          )}
        </div>
      </div>
    </>
  );
}
