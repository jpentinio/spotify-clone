import { ArtistType, ImageType } from "./home.actionTypes";
import { TrackType } from "./track.actionTypes";

export const GET_ALBUM_START = "GET_ALBUM_START";
export const GET_ALBUM_SUCCESS = "GET_ALBUM_SUCCESS";
export const GET_ALBUM_FAILED = "GET_ALBUM_FAILED";

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

export type GetAlbumDispatchTypes =
  | GetAlbumStart
  | GetAlbumFailed
  | GetAlbumSuccess;
