import { ArtistType, ImageType } from "./home.actionTypes";
import { TrackType } from "./track.actionTypes";

export const GET_ALBUM_START = "GET_ALBUM_START";
export const GET_ALBUM_SUCCESS = "GET_ALBUM_SUCCESS";
export const GET_ALBUM_FAILED = "GET_ALBUM_FAILED";

export const GET_USER_ALBUM_START = "GET_USER_ALBUM_START";
export const GET_USER_ALBUM_SUCCESS = "GET_USER_ALBUM_SUCCESS";
export const GET_USER_ALBUM_FAILED = "GET_USER_ALBUM_FAILED";

export type AlbumType = {
  albumType: string;
  artists: ArtistType;
  copyrights: {
    text: string;
  }[];
  id: string;
  images: ImageType;
  name: string;
  releaseDate: string;
  totalTracks: number;
  type: string;
  uri: string;
  tracks: {
    items: TrackType[];
  };
};

export type UserSavedAlbumType = {
  added_at: string;
  album: AlbumType;
};

export interface GetAlbumStart {
  type: typeof GET_ALBUM_START;
}

export interface GetAlbumFailed {
  type: typeof GET_ALBUM_FAILED;
  payload: string;
}

export interface GetAlbumSuccess {
  type: typeof GET_ALBUM_SUCCESS;
  payload: AlbumType;
}

// GET USER ALBUMS

export interface GetUserAlbumStart {
  type: typeof GET_USER_ALBUM_START;
}

export interface GetUserAlbumFailed {
  type: typeof GET_USER_ALBUM_FAILED;
  payload: string;
}

export interface GetUserAlbumSuccess {
  type: typeof GET_USER_ALBUM_SUCCESS;
  payload: UserSavedAlbumType[];
}

export type GetAlbumDispatchTypes =
  | GetAlbumStart
  | GetAlbumFailed
  | GetAlbumSuccess
  | GetUserAlbumStart
  | GetUserAlbumFailed
  | GetUserAlbumSuccess;
