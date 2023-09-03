import { ArtistDetailsType } from "./artist.actionTypes";
import { ArtistType, ImageType } from "./home.actionTypes";
import { PlaylistType } from "./playlist.actionTypes";
import { TrackType } from "./track.actionTypes";

export const GET_SEARCH_START = "GET_SEARCH_START";
export const GET_SEARCH_SUCCESS = "GET_SEARCH_SUCCESS";
export const GET_SEARCH_FAILED = "GET_SEARCH_FAILED";

export const RESET_STATE = "RESET_STATE";

export type SearchType = {
  albums: {
    name: string;
    id: string;
    uri: string;
    images: ImageType;
    artists: ArtistType;
  }[];
  artists: ArtistDetailsType[];
  tracks: TrackType[];
  playlists: PlaylistType[];
};

export interface GetSearchStart {
  type: typeof GET_SEARCH_START;
}

export interface GetSearchFailed {
  type: typeof GET_SEARCH_FAILED;
  payload: string;
}

export interface GetSearchSuccess {
  type: typeof GET_SEARCH_SUCCESS;
  payload: SearchType;
}

export interface ResetState {
  type: typeof RESET_STATE;
}

export type SearchDispatchTypes =
  | GetSearchStart
  | GetSearchFailed
  | GetSearchSuccess
  | ResetState;
