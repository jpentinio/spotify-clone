import { configureStore } from "@reduxjs/toolkit";
import { userProfileReducer } from "../redux/userProfile/reducers";
import { userPlaylistReducer } from "../redux/userPlaylist/reducers";
import { homeReducer } from "../redux/home/reducers";
import { trackReducer } from "../redux/track/reducers";

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    userPlaylist: userPlaylistReducer,
    home: homeReducer,
    track: trackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
