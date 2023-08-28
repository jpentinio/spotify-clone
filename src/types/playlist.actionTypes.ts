import { ImageType } from "./home.actionTypes";
import { TrackType } from "./track.actionTypes";

export const GET_USER_PLAYLIST_START = "GET_USER_PLAYLIST_START";
export const GET_USER_PLAYLIST_SUCCESS = "GET_USER_PLAYLIST_SUCCESS";
export const GET_USER_PLAYLIST_FAILED = "GET_USER_PLAYLIST_FAILED";

export const GET_PLAYLIST_START = "GET_PLAYLIST_START";
export const GET_PLAYLIST_SUCCESS = "GET_PLAYLIST_SUCCESS";
export const GET_PLAYLIST_FAILED = "GET_PLAYLIST_FAILED";

export type UserPlaylistType = {
  name: string;
  id: string;
  owner: {
    display_name: string;
    href: string;
    type: string;
  };
  images: { url: string; height: number; width: number }[];
  type: string;
};

export type PlaylistType = {
  name: string;
  id: string;
  images: ImageType;
  owner: {
    display_name: string;
    id: string;
  };
  public: boolean;
  description: string;
  type: string;
  uri: string;
  tracks: {
    total: number;
    items: {
      added_at: string;
      track: TrackType;
    }[];
  };
};

export interface UserPlaylistStart {
  type: typeof GET_USER_PLAYLIST_START;
}

export interface UserPlaylistFailed {
  type: typeof GET_USER_PLAYLIST_FAILED;
  payload: string;
}

export interface UserPlaylistSuccess {
  type: typeof GET_USER_PLAYLIST_SUCCESS;
  payload: UserPlaylistType[];
}

// GET PLAYLIST

export interface GetPlaylistStart {
  type: typeof GET_PLAYLIST_START;
}

export interface GetPlaylistFailed {
  type: typeof GET_PLAYLIST_FAILED;
  payload: string;
}

export interface GetPlaylistSuccess {
  type: typeof GET_PLAYLIST_SUCCESS;
  payload: PlaylistType;
}

export type PlaylistDispatchType =
  | UserPlaylistStart
  | UserPlaylistSuccess
  | UserPlaylistFailed
  | GetPlaylistStart
  | GetPlaylistFailed
  | GetPlaylistSuccess;
