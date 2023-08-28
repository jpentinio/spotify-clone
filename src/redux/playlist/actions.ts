import { Dispatch } from "redux";
import {
  GET_PLAYLIST_FAILED,
  GET_PLAYLIST_START,
  GET_PLAYLIST_SUCCESS,
  GET_USER_PLAYLIST_FAILED,
  GET_USER_PLAYLIST_START,
  GET_USER_PLAYLIST_SUCCESS,
  PlaylistDispatchType,
} from "../../types/playlist.actionTypes";
import Services from "./services";

class Actions {
  static getUserPlaylist() {
    return async (dispatch: Dispatch<PlaylistDispatchType>) => {
      try {
        dispatch({ type: GET_USER_PLAYLIST_START });
        let response = await Services.getUserPlaylist();
        dispatch({
          type: GET_USER_PLAYLIST_SUCCESS,
          payload: response.data.items,
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_USER_PLAYLIST_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getPlaylist(id: string) {
    return async (dispatch: Dispatch<PlaylistDispatchType>) => {
      try {
        dispatch({ type: GET_PLAYLIST_START });
        let response = await Services.getPlaylist(id);
        dispatch({
          type: GET_PLAYLIST_SUCCESS,
          payload: response.data,
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_PLAYLIST_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }
}

export default Actions;
