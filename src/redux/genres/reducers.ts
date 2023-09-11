import {
  GET_GENRES_FAILED,
  GET_GENRES_START,
  GET_GENRES_SUCCESS,
  GET_TRACKS_BY_GENRE_FAILED,
  GET_TRACKS_BY_GENRE_START,
  GET_TRACKS_BY_GENRE_SUCCESS,
  GenresDispatchTypes,
} from "../../types/genre.actionTypes";
import { TrackType } from "../../types/track.actionTypes";
import { ErrorType } from "../../types/userProfile.actionTypes";
import { errorInitialState } from "../user/reducers";

interface GenresStateType {
  genres: {
    data: string[];
    isLoading: boolean;
    error: ErrorType;
  };
  tracksByGenre: {
    data: TrackType[];
    isLoading: boolean;
    error: ErrorType;
  };
}

const initialState = {
  genres: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
  tracksByGenre: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
};

export const genreReducer = (
  state: GenresStateType = initialState,
  action: GenresDispatchTypes
) => {
  switch (action.type) {
    case GET_GENRES_START:
      return {
        ...state,
        genres: {
          ...state.genres,
          isLoading: true,
        },
      };
    case GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: {
          ...state.genres,
          data: action.payload,
          isLoading: false,
        },
      };
    case GET_GENRES_FAILED: {
      return {
        ...state,
        genres: {
          ...state.genres,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    //TRACKS BY GENRE
    case GET_TRACKS_BY_GENRE_START:
      return {
        ...state,
        tracksByGenre: {
          ...state.tracksByGenre,
          isLoading: true,
        },
      };
    case GET_TRACKS_BY_GENRE_SUCCESS:
      return {
        ...state,
        tracksByGenre: {
          ...state.tracksByGenre,
          data: action.payload,
          isLoading: false,
        },
      };
    case GET_TRACKS_BY_GENRE_FAILED: {
      return {
        ...state,
        tracksByGenre: {
          ...state.tracksByGenre,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
