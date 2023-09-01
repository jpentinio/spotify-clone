import { ArtistType, ImageType } from "./home.actionTypes";

export const GET_ARTIST_DETAILS_START = "GET_ARTIST_DETAILS_START";
export const GET_ARTIST_DETAILS_SUCCESS = "GET_ARTIST_DETAILS_SUCCESS";
export const GET_ARTIST_DETAILS_FAILED = "GET_ARTIST_DETAILS_FAILED";

export const GET_ARTIST_TOP_TRACKS_START = "GET_ARTIST_TOP_TRACKS_START";
export const GET_ARTIST_TOP_TRACKS_SUCCESS = "GET_ARTIST_TOP_TRACKS_SUCCESS";
export const GET_ARTIST_TOP_TRACKS_FAILED = "GET_ARTIST_TOP_TRACKS_FAILED";

export const GET_USER_ARTIST_START = "GET_USER_ARTIST_START";
export const GET_USER_ARTIST_SUCCESS = "GET_USER_ARTIST_SUCCESS";
export const GET_USER_ARTIST_FAILED = "GET_USER_ARTIST_FAILED";

export type ArtistDetailsType = {
  name: string;
  type: string;
  id: string;
  popularity: number;
  uri: string;
  images: ImageType;
  followers: {
    total: number;
  };
  genres: string[];
};

export type ArtistTopTracksType = {
  name: string;
  duration_ms: number;
  id: string;
  type: string;
  uri: string;
  artists: ArtistType;
  explicit: boolean;
  track_number: number;
  disc_number: number;
  album: {
    id: string;
    uri: string;
    name: string;
    images: ImageType;
  };
};

export interface GetArtistDetailsStart {
  type: typeof GET_ARTIST_DETAILS_START;
}

export interface GetArtistDetailsFailed {
  type: typeof GET_ARTIST_DETAILS_FAILED;
  payload: string;
}

export interface GetArtistDetailsSuccess {
  type: typeof GET_ARTIST_DETAILS_SUCCESS;
  payload: ArtistDetailsType;
}

// GET ARTIST TOP TRACKS

export interface GetArtistTopTracksStart {
  type: typeof GET_ARTIST_TOP_TRACKS_START;
}

export interface GetArtistTopTracksFailed {
  type: typeof GET_ARTIST_TOP_TRACKS_FAILED;
  payload: string;
}

export interface GetArtistTopTracksSuccess {
  type: typeof GET_ARTIST_TOP_TRACKS_SUCCESS;
  payload: ArtistTopTracksType[];
}

// GET USER SAVED ARTISTS

export interface GetUserArtistStart {
  type: typeof GET_USER_ARTIST_START;
}

export interface GetUserArtistFailed {
  type: typeof GET_USER_ARTIST_FAILED;
  payload: string;
}

export interface GetUserArtistSuccess {
  type: typeof GET_USER_ARTIST_SUCCESS;
  payload: ArtistDetailsType[];
}

export type ArtistDetailsDispatchTypes =
  | GetArtistDetailsStart
  | GetArtistDetailsFailed
  | GetArtistDetailsSuccess;

export type ArtistTopTracksDispatchTypes =
  | GetArtistTopTracksStart
  | GetArtistTopTracksFailed
  | GetArtistTopTracksSuccess;

export type UserSavedArtistsDispatchTypes =
  | GetUserArtistStart
  | GetUserArtistFailed
  | GetUserArtistSuccess;
