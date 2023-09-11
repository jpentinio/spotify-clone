import {
  CurrentTrackType,
  CurrentlyPlayingTrackDispatchTypes,
  GET_CURRENT_PLAYING_TRACK_FAILED,
  GET_CURRENT_PLAYING_TRACK_START,
  GET_CURRENT_PLAYING_TRACK_SUCCESS,
  SET_SPOTIFY_CALLBACK,
  SET_TRACK,
  SpotifyCallbackType,
} from "../../types/track.actionTypes";

interface CurrentPlayingTrackState {
  currentPlayingTrack: {
    data: CurrentTrackType;
    isLoading: boolean;
    error: string;
  };
  selectedTrack: string;
  spotifyCallback: SpotifyCallbackType;
}

type TrackStateTypes = CurrentPlayingTrackState;

const initialState = {
  currentPlayingTrack: {
    data: {
      item: {
        name: "",
        id: "",
        uri: "",
        artists: [],
        album: {
          images: [],
        },
      },
      currently_playing_type: "",
      is_playing: false,
      timestamp: 0,
    },
    isLoading: false,
    error: "",
  },
  selectedTrack: "",
  spotifyCallback: {
    isActive: false,
    isPlaying: false,
    deviceId: "",
    track: {
      artists: [],
      id: "",
      name: "",
      uri: "",
    },
  },
};

type DispatchTypes = CurrentlyPlayingTrackDispatchTypes;

export const trackReducer = (
  state: TrackStateTypes = initialState,
  action: DispatchTypes
) => {
  switch (action.type) {
    case GET_CURRENT_PLAYING_TRACK_START:
      return {
        ...state,
        currentPlayingTrack: {
          ...state.currentPlayingTrack,
          isLoading: true,
          error: "",
        },
      };
    case GET_CURRENT_PLAYING_TRACK_SUCCESS:
      return {
        ...state,
        currentPlayingTrack: {
          ...state.currentPlayingTrack,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_CURRENT_PLAYING_TRACK_FAILED: {
      return {
        ...state,
        currentPlayingTrack: {
          ...state.currentPlayingTrack,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case SET_TRACK: {
      return {
        ...state,
        selectedTrack: action.payload,
      };
    }

    case SET_SPOTIFY_CALLBACK: {
      return {
        ...state,
        spotifyCallback: action.payload,
      };
    }
    default:
      return state;
  }
};
