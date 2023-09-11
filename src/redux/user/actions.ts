import {
  ArtistDetailsType,
  ArtistTopTracksType,
} from "../../types/artist.actionTypes";
import {
  CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_FAILED,
  CURRENT_USER_PROFILE_SUCCESS,
  GET_USER_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_TOP_ARTISTS_FAILED,
  GET_USER_TOP_ARTISTS_START,
  GET_USER_TOP_ARTISTS_SUCCESS,
  GET_USER_TOP_TRACKS_FAILED,
  GET_USER_TOP_TRACKS_START,
  GET_USER_TOP_TRACKS_SUCCESS,
  USER_LOGOUT,
  UserDispatchTypes,
} from "../../types/userProfile.actionTypes";
import { checkTokenIfExpired } from "../../utils/utils";
import Services from "./services";
import { Dispatch } from "redux";

class Actions {
  static getCurrentUserProfile(access_token: string) {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: CURRENT_USER_PROFILE });
        let response = await Services.getCurrentUserProfile(access_token);
        dispatch({
          type: CURRENT_USER_PROFILE_SUCCESS,
          payload: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            type: response.data.type,
            followers: response.data.followers.total,
          },
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: CURRENT_USER_PROFILE_FAILED,
          payload: error,
        });
      }
    };
  }

  static getUser(id: string) {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_START });
        let response = await Services.getUser(id);
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            type: response.data.type,
            followers: response.data.followers.total,
          },
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: GET_USER_FAILED,
          payload: error,
        });
      }
    };
  }

  static getUserTopTracks() {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_TOP_TRACKS_START });
        let response = await Services.getUserTopTracks();
        dispatch({
          type: GET_USER_TOP_TRACKS_SUCCESS,
          payload: response.data.items.map((track: ArtistTopTracksType) => {
            return {
              name: track.name,
              id: track.id,
              type: track.type,
              uri: track.uri,
              duration_ms: track.duration_ms,
              artists: track.artists,
              explicit: track.explicit,
              track_number: track.track_number,
              disc_number: track.disc_number,
              album: track.album,
            };
          }),
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: GET_USER_TOP_TRACKS_FAILED,
          payload: error,
        });
      }
    };
  }

  static getUserTopArtists() {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_TOP_ARTISTS_START });
        let response = await Services.getUserTopArtists();
        dispatch({
          type: GET_USER_TOP_ARTISTS_SUCCESS,
          payload: response.data.items.map((track: ArtistDetailsType) => {
            return {
              name: track.name,
              type: track.type,
              id: track.id,
              popularity: track.popularity,
              uri: track.uri,
              images: track.images,
              followers: {
                total: track.followers.total,
              },
              genres: track.genres,
            };
          }),
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: GET_USER_TOP_ARTISTS_FAILED,
          payload: error,
        });
      }
    };
  }

  static userLogout() {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      dispatch({ type: USER_LOGOUT });
    };
  }
}

export default Actions;
