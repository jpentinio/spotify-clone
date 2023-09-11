import { Dispatch } from "redux";
import Services from "./services";
import { checkTokenIfExpired } from "../../utils/utils";
import {
  GET_GENRES_FAILED,
  GET_GENRES_START,
  GET_GENRES_SUCCESS,
  GET_TRACKS_BY_GENRE_FAILED,
  GET_TRACKS_BY_GENRE_START,
  GET_TRACKS_BY_GENRE_SUCCESS,
  GenresDispatchTypes,
} from "../../types/genre.actionTypes";

class Actions {
  static getGenres() {
    return async (dispatch: Dispatch<GenresDispatchTypes>) => {
      try {
        dispatch({ type: GET_GENRES_START });
        let response = await Services.getGenres();
        dispatch({
          type: GET_GENRES_SUCCESS,
          payload: response.data.genres,
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: GET_GENRES_FAILED,
          payload: error,
        });
      }
    };
  }

  static getTracksByGenre(genre: string) {
    return async (dispatch: Dispatch<GenresDispatchTypes>) => {
      try {
        dispatch({ type: GET_TRACKS_BY_GENRE_START });
        let response = await Services.getTracksByGenre(genre);
        dispatch({
          type: GET_TRACKS_BY_GENRE_SUCCESS,
          payload: response.data.tracks,
        });
        return response;
      } catch (error: any) {
        checkTokenIfExpired({ status: error.status, message: error.message });
        dispatch({
          type: GET_TRACKS_BY_GENRE_FAILED,
          payload: error,
        });
      }
    };
  }
}

export default Actions;
