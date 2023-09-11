import { Dispatch } from "redux";
import Services from "./services";
import {
  GET_SEARCH_FAILED,
  GET_SEARCH_START,
  GET_SEARCH_SUCCESS,
  RESET_STATE,
  SET_SEARCH_PARAMS,
  SearchDispatchTypes,
} from "../../types/search.actionTypes";

class Actions {
  static getSearch(value: string) {
    return async (dispatch: Dispatch<SearchDispatchTypes>) => {
      try {
        dispatch({ type: GET_SEARCH_START });
        let response = await Services.getSearch(value);
        dispatch({
          type: GET_SEARCH_SUCCESS,
          payload: {
            albums: response.data.albums.items,
            artists: response.data.artists.items,
            tracks: response.data.tracks.items,
            playlists: response.data.playlists.items,
          },
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_SEARCH_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static resetState() {
    return async (dispatch: Dispatch<SearchDispatchTypes>) => {
      dispatch({ type: RESET_STATE });
    };
  }

  static setSearchParams(value: string) {
    return async (dispatch: Dispatch<SearchDispatchTypes>) => {
      dispatch({ type: SET_SEARCH_PARAMS, payload: value });
    };
  }
}

export default Actions;
