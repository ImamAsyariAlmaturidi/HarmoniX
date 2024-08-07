import React from 'react'
import { useState, useEffect } from 'react'
import Card from './Card';
import axios from 'axios';
const Main = () => {
    const [recommendations, setRecommendations] = useState([]);
    const fetchRecommendations = async (token) => {
        try {
            const { data } = await axios.get(
                "https://api.spotify.com/v1/recommendations?seed_genres=pop&limit=10",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setRecommendations(data.tracks);
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
        fetchRecommendations(token);
      
    }, []);

    return (
        <div>
           <Card data={recommendations}/>
        </div>
    )
}

export default Main