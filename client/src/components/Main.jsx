import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from '../features/music/musicSlice'
import Sidebar from './Sidebar';
import Card from './Card';
const Main = () => {
    const dispatch = useDispatch()
    const { music, loading, error } = useSelector((state) => state.music);
    const [ article, setArticle ] = useState('') 

    useEffect(() => {
        dispatch(fetchAsync())
    }, [])


    return (
        <div>
               <Sidebar article={article} />
            <h2 className="text-xl text-white font-bold tracking-widest my-4">POPULAR MUSIC</h2>

            <div className="mt-6">
                <ul className="grid grid-cols-1 md:grid-cols-5 gap-4 text-white">
                    {
                        music.length > 0 && !error && (
                            <>
                                {
                                    music.map((item) => {
                                        return <Card key={item.id} data={item} setArticle={setArticle} />
                                    })
                                }
                            </>
                        )
                    }
                </ul>
            </div>



        </div>
    )
}

export default Main