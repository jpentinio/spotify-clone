import { AlbumType } from "./album.actionTypes";
import { ArtistType, ImageType } from "./home.actionTypes";

export const GET_CURRENT_PLAYING_TRACK_START =
  "GET_CURRENT_PLAYING_TRACK_START";
export const GET_CURRENT_PLAYING_TRACK_SUCCESS =
  "GET_CURRENT_PLAYING_TRACK_SUCCESS";
export const GET_CURRENT_PLAYING_TRACK_FAILED =
  "GET_CURRENT_PLAYING_TRACK_FAILED";

export const SET_TRACK = "SET_TRACK";

export type TrackType = {
  name: string;
  id: string;
  type: string;
  uri: string;
  duration_ms: number;
  artists: ArtistType;
  explicit: boolean;
  track_number?: number;
  disc_number?: number;
  album: AlbumType;
};

export type CurrentTrackType = {
  item: {
    name: string;
    id: string;
    uri: string;
    artists: ArtistType;
    album: {
      images: ImageType;
    };
  };
  currently_playing_type: string;
  is_playing: boolean;
  timestamp: number;
};

export interface CurrentlyPlayingTrackStart {
  type: typeof GET_CURRENT_PLAYING_TRACK_START;
}

export interface CurrentlyPlayingTrackFailed {
  type: typeof GET_CURRENT_PLAYING_TRACK_FAILED;
  payload: string;
}

export interface CurrentlyPlayingTrackSuccess {
  type: typeof GET_CURRENT_PLAYING_TRACK_SUCCESS;
  payload: CurrentTrackType;
}

export interface SetTrack {
  type: typeof SET_TRACK;
  payload: string;
}

export type CurrentlyPlayingTrackDispatchTypes =
  | CurrentlyPlayingTrackStart
  | CurrentlyPlayingTrackFailed
  | CurrentlyPlayingTrackSuccess
  | SetTrack;
