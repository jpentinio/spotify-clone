import {
  CurrentTrackType,
  CurrentlyPlayingTrackDispatchTypes,
  GET_CURRENT_PLAYING_TRACK_FAILED,
  GET_CURRENT_PLAYING_TRACK_START,
  GET_CURRENT_PLAYING_TRACK_SUCCESS,
} from "../../types/track.actionTypes";

interface CurrentPlayingTrackState {
  currentPlayingTrack: {
    data: CurrentTrackType;
    isLoading: boolean;
    error: string;
  };
}

type TrackStateTypes = CurrentPlayingTrackState;

const initialState = {
  currentPlayingTrack: {
    data: {
      item: {
        name: "",
        id: "",
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
    default:
      return state;
  }
};
