import { Dispatch } from "redux";
import {
  GET_USER_PLAYLIST_FAILED,
  GET_USER_PLAYLIST_START,
  GET_USER_PLAYLIST_SUCCESS,
  UserPlaylistDispatchTypes,
} from "../../types/userPlaylist.actionTypes";
import Services from "./services";

class Actions {
  static getUserPlaylist() {
    return async (dispatch: Dispatch<UserPlaylistDispatchTypes>) => {
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
}

export default Actions;
