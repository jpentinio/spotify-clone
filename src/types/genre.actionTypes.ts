import { TrackType } from "./track.actionTypes";
import { ErrorType } from "./userProfile.actionTypes";

export const GET_GENRES_START = "GET_GENRES_START";
export const GET_GENRES_SUCCESS = "GET_GENRES_SUCCESS";
export const GET_GENRES_FAILED = "GET_GENRES_FAILED";

export const GET_TRACKS_BY_GENRE_START = "GET_TRACKS_BY_GENRE_START";
export const GET_TRACKS_BY_GENRE_SUCCESS = "GET_TRACKS_BY_GENRE_SUCCESS";
export const GET_TRACKS_BY_GENRE_FAILED = "GET_TRACKS_BY_GENRE_FAILED";

export interface GetGenresStart {
  type: typeof GET_GENRES_START;
}

export interface GetGenresFailed {
  type: typeof GET_GENRES_FAILED;
  payload: ErrorType;
}

export interface GetGenresSuccess {
  type: typeof GET_GENRES_SUCCESS;
  payload: string[];
}

//GET TRACKS BY GENRE

export interface GetTracksByGenreStart {
  type: typeof GET_TRACKS_BY_GENRE_START;
}

export interface GetTracksByGenreFailed {
  type: typeof GET_TRACKS_BY_GENRE_FAILED;
  payload: ErrorType;
}

export interface GetTracksByGenreSuccess {
  type: typeof GET_TRACKS_BY_GENRE_SUCCESS;
  payload: TrackType[];
}

export type GenresDispatchTypes =
  | GetGenresStart
  | GetGenresFailed
  | GetGenresSuccess
  | GetTracksByGenreStart
  | GetTracksByGenreFailed
  | GetTracksByGenreSuccess;
