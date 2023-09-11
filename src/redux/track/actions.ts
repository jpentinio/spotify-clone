import { Dispatch } from "redux";
import Services from "./services";
import {
  CurrentlyPlayingTrackDispatchTypes,
  GET_CURRENT_PLAYING_TRACK_FAILED,
  GET_CURRENT_PLAYING_TRACK_START,
  GET_CURRENT_PLAYING_TRACK_SUCCESS,
  SET_PLAYBACK_STATE,
  SET_SPOTIFY_CALLBACK,
  SET_TRACK,
  SetPlaybackState,
  SetSpotifyCallback,
  SetTrack,
  SpotifyCallbackType,
} from "../../types/track.actionTypes";

class Actions {
  static getCurrentPlayingTrack() {
    return async (dispatch: Dispatch<CurrentlyPlayingTrackDispatchTypes>) => {
      try {
        dispatch({ type: GET_CURRENT_PLAYING_TRACK_START });
        let response = await Services.getCurrentPlayingTrack();
        dispatch({
          type: GET_CURRENT_PLAYING_TRACK_SUCCESS,
          payload: {
            item: {
              name: response.data.item.name,
              id: response.data.item.id,
              uri: response.data.item.uri,
              artists: response.data.item.artists,
              album: {
                images: response.data.item.album.images,
              },
            },
            currently_playing_type: response.data.currently_playing_type,
            is_playing: response.data.is_playing,
            timestamp: response.data.timestamp,
          },
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_CURRENT_PLAYING_TRACK_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static setTrack(track: string) {
    return async (dispatch: Dispatch<SetTrack>) => {
      dispatch({ type: SET_TRACK, payload: track });
    };
  }

  static setSpotifyCallback(value: SpotifyCallbackType) {
    return async (dispatch: Dispatch<SetSpotifyCallback>) => {
      dispatch({ type: SET_SPOTIFY_CALLBACK, payload: value });
    };
  }

  static setPlaybackState(value: string) {
    return async (dispatch: Dispatch<SetPlaybackState>) => {
      await Services.setPlaybackState(value);
      dispatch({ type: SET_PLAYBACK_STATE });
    };
  }
}

export default Actions;
