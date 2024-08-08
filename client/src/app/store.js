import { configureStore } from '@reduxjs/toolkit'
import music from '../features/music/musicSlice'

export default configureStore({
  reducer: {
    music
  },
})