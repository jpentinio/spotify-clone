import { configureStore } from "@reduxjs/toolkit";
import { userProfileReducer } from "../redux/userProfile/reducers";
import { userPlaylistReducer } from "../redux/userPlaylist/reducers";
import { homeReducer } from "../redux/home/reducers";
import { trackReducer } from "../redux/track/reducers";
import { albumReducer } from "../redux/album/reducers";
import { artistDetailsReducer } from "../redux/artist/reducers";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    userPlaylist: userPlaylistReducer,
    home: homeReducer,
    track: trackReducer,
    album: albumReducer,
    artist: artistDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
