import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Following = () => {
  const [following, setFollowing] = useState([]);
  


  const fetchFollowingData = async () => {
    try {
   
      const { data } = await axios.get("https://api.spotify.com/v1/me/following?type=artist", {
        headers: { Authorization: `Bearer ${localStorage.spotify_token}` },
      });
      setFollowing(data.artists.items);
    } catch (error) {
      console.error('Error fetching following data:', error);
    }
  };


  async function deleteFollowing(id) {
    try {
      await axios.delete(`https://api.spotify.com/v1/me/following?type=artist&ids=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.spotify_token}` },
      });
      fetchFollowingData()
    } catch (error) {
      console.error('Error deleting following:', error);
    }
  }


  useEffect(() => {
    fetchFollowingData();
    console.log(following)
  }, []); 

  return (
    <div className=' w-full grid grid-cols-3 gap-2 mt-2'>
      {following.map((item) => (
        <div key={item.id} className='flex flex-col p-2 border rounded-lg'>
          <span className='text-xs font-semibold truncate'>{item.name}</span>
          <button onClick={() => deleteFollowing(item.id)} className='btn btn-neutral btn-xs mt-2'>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Following;
