import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import fetchMusic from '../features/music/musicSlice'
import Card from './Card';
import axios from 'axios';
const Main = ({music}) => {

    return (
        <div>
            <h2 className="text-xl text-white font-bold tracking-widest my-4">POPULAR MUSIC</h2>
            <Card data={music}/>
        </div>
    )
}

export default Main