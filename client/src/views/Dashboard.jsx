import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "../components/Main";

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
        window.location.hash = "";
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


  useEffect(() => {
    const token = localStorage.getItem("spotify_token");
    if (!token) {
      handleSpotifyToken();
    } else {
      fetchSpotifyData(token);
    }
  }, []);


  return (
    <div className="relative flex flex-col h-screen ml-96">
      <Sidebar />
      <div className="flex-1 p-6 mx-auto max-w-4xl">
        {spotifyData ? (
          <>
          <Header name={spotifyData.display_name} image={spotifyData.images[1]?.url} />
          <Main />
          </>
        ) : (
          <p className="text-white">Loading Spotify data...</p>
        )}
      </div>
    </div>
  );

}
