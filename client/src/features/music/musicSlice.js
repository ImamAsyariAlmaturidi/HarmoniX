import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    music: [],
    loading: false,
    error: ""
};

export const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        fetchPending(state) {
            state.loading = true;
            state.music = []
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.loading = false
            state.music = action.payload
            state.error = ""
        },
        fetchReject(state, action) {
            state.loading = false
            state.music = []
            state.error = action.payload
        },
    }
})

export const { fetchPending, fetchSuccess, fetchReject } = musicSlice.actions;

export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())

        const { data } = await axios.get(
            "https://api.spotify.com/v1/recommendations?seed_genres=pop&limit=20",
            {
                headers: { Authorization: `Bearer ${localStorage.spotify_token}` },
            }
        );

        dispatch(fetchSuccess(data))
    } catch (error) {
        dispatch(fetchReject(error.message))
    }
}

export default musicSlice.reducer;

