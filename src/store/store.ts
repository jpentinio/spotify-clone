import { configureStore } from "@reduxjs/toolkit";
import { userProfileReducer } from "../redux/user/reducers";
import { playlistReducer } from "../redux/playlist/reducers";
import { homeReducer } from "../redux/home/reducers";
import { trackReducer } from "../redux/track/reducers";
import { albumReducer } from "../redux/album/reducers";
import { artistDetailsReducer } from "../redux/artist/reducers";
import { searchReducer } from "../redux/search/reducers";
import { genreReducer } from "../redux/genres/reducers";

export const store = configureStore({
  reducer: {
    user: userProfileReducer,
    playlist: playlistReducer,
    home: homeReducer,
    track: trackReducer,
    album: albumReducer,
    artist: artistDetailsReducer,
    search: searchReducer,
    genre: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
