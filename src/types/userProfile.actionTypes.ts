import { ArtistDetailsType, ArtistTopTracksType } from "./artist.actionTypes";
import { ImageType } from "./home.actionTypes";

export const CURRENT_USER_PROFILE = "USER_PROFILE";
export const CURRENT_USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const CURRENT_USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_USER_TOP_TRACKS_START = "GET_USER_TOP_TRACKS_START";
export const GET_USER_TOP_TRACKS_SUCCESS = "GET_USER_TOP_TRACKS_SUCCESS";
export const GET_USER_TOP_TRACKS_FAILED = "GET_USER_TOP_TRACKS_FAILED";

export const GET_USER_TOP_ARTISTS_START = "GET_USER_TOP_ARTISTS_START";
export const GET_USER_TOP_ARTISTS_SUCCESS = "GET_USER_TOP_ARTISTS_SUCCESS";
export const GET_USER_TOP_ARTISTS_FAILED = "GET_USER_TOP_ARTISTS_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";

export type ErrorType = {
  message: string | null;
  code: number | null;
};

export type UserProfileType = {
  display_name: string;
  id?: string;
  images: ImageType;
  type: string;
  followers: number;
};

export interface CurrentUserProfileStart {
  type: typeof CURRENT_USER_PROFILE;
}

export interface CurrentUserProfileFailed {
  type: typeof CURRENT_USER_PROFILE_FAILED;
  payload: ErrorType;
}

export interface CurrentUserProfileSuccess {
  type: typeof CURRENT_USER_PROFILE_SUCCESS;
  payload: UserProfileType;
}

//GET USER

export interface GetUserStart {
  type: typeof GET_USER_START;
}

export interface GetUserFailed {
  type: typeof GET_USER_FAILED;
  payload: ErrorType;
}

export interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: UserProfileType;
}

//GET USER TOP TRACKS

export interface GetUserTopTracksStart {
  type: typeof GET_USER_TOP_TRACKS_START;
}

export interface GetUserTopTracksFailed {
  type: typeof GET_USER_TOP_TRACKS_FAILED;
  payload: ErrorType;
}

export interface GetUserTopTracksSuccess {
  type: typeof GET_USER_TOP_TRACKS_SUCCESS;
  payload: ArtistTopTracksType[];
}

//GET USER TOP ARTISTS

export interface GetUserTopArtistsStart {
  type: typeof GET_USER_TOP_ARTISTS_START;
}

export interface GetUserTopArtistsFailed {
  type: typeof GET_USER_TOP_ARTISTS_FAILED;
  payload: ErrorType;
}

export interface GetUserTopArtistsSuccess {
  type: typeof GET_USER_TOP_ARTISTS_SUCCESS;
  payload: ArtistDetailsType[];
}

// LOGOUT

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserDispatchTypes =
  | CurrentUserProfileStart
  | CurrentUserProfileSuccess
  | CurrentUserProfileFailed
  | GetUserStart
  | GetUserFailed
  | GetUserSuccess
  | GetUserTopTracksStart
  | GetUserTopTracksFailed
  | GetUserTopTracksSuccess
  | GetUserTopArtistsStart
  | GetUserTopArtistsFailed
  | GetUserTopArtistsSuccess
  | UserLogout;
