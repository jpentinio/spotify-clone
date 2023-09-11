import { AlbumType } from "./album.actionTypes";
import { ArtistType, ImageType } from "./home.actionTypes";

export const GET_CURRENT_PLAYING_TRACK_START =
  "GET_CURRENT_PLAYING_TRACK_START";
export const GET_CURRENT_PLAYING_TRACK_SUCCESS =
  "GET_CURRENT_PLAYING_TRACK_SUCCESS";
export const GET_CURRENT_PLAYING_TRACK_FAILED =
  "GET_CURRENT_PLAYING_TRACK_FAILED";

export const SET_TRACK = "SET_TRACK";

export const PAUSE_TRACK = "PAUSE_TRACK";

export const PLAY_TRACK = "PLAY_TRACK";

export const SET_SPOTIFY_CALLBACK = "SET_SPOTIFY_CALLBACK";

export const SET_PLAYBACK_STATE = "SET_PLAYBACK_STATE";

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

export type SpotifyCallbackType = {
  isActive: boolean;
  isPlaying: boolean;
  deviceId: string;
  track: {
    artists: {
      name: string;
      uri: string;
    }[];
    id: string;
    uri: string;
    name: string;
  };
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

export interface PauseTrack {
  type: typeof PAUSE_TRACK;
}

export interface PlayTrack {
  type: typeof PLAY_TRACK;
}

export interface SetSpotifyCallback {
  type: typeof SET_SPOTIFY_CALLBACK;
  payload: SpotifyCallbackType;
}

export interface SetPlaybackState {
  type: typeof SET_PLAYBACK_STATE;
}

export type CurrentlyPlayingTrackDispatchTypes =
  | CurrentlyPlayingTrackStart
  | CurrentlyPlayingTrackFailed
  | CurrentlyPlayingTrackSuccess
  | SetTrack
  | PauseTrack
  | PlayTrack
  | SetSpotifyCallback
  | SetPlaybackState;
