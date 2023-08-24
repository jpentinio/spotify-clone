export const GET_RECENTLY_PLAYED_START = "GET_RECENTLY_PLAYED_START";
export const GET_RECENTLY_PLAYED_SUCCESS = "GET_RECENTLY_PLAYED_SUCCESS";
export const GET_RECENTLY_PLAYED_FAILED = "GET_RECENTLY_PLAYED_FAILED";

export const GET_NEW_ALBUM_RELEASES_START = "GET_NEW_ALBUM_RELEASES_START";
export const GET_NEW_ALBUM_RELEASES_SUCCESS = "GET_NEW_ALBUM_RELEASES_SUCCESS";
export const GET_NEW_ALBUM_RELEASES_FAILED = "GET_NEW_ALBUM_RELEASES_FAILED";

export type ArtistType = {
  name: string;
  type: string;
  id: string;
}[];

export type ImageType = {
  url: string;
  width: number;
  height: number;
}[];

export type RecentlyPlayedTracksType = {
  track: {
    name: string;
    artists: ArtistType;
    id: string;
    type: string;
    album: {
      images: ImageType;
    };
  };
};

export type NewAlbumReleasesType = {
  name: string;
  id: string;
  artists: ArtistType;
  images: ImageType;
};

// Recently Played Tracks

export interface RecentlyPlayedTracksStart {
  type: typeof GET_RECENTLY_PLAYED_START;
}

export interface RecentlyPlayedTracksFailed {
  type: typeof GET_RECENTLY_PLAYED_FAILED;
  payload: string;
}

export interface RecentlyPlayedTracksSuccess {
  type: typeof GET_RECENTLY_PLAYED_SUCCESS;
  payload: RecentlyPlayedTracksType[];
}

// New Album Releases

export interface NewAlbumReleasesStart {
  type: typeof GET_NEW_ALBUM_RELEASES_START;
}

export interface NewAlbumReleasesFailed {
  type: typeof GET_NEW_ALBUM_RELEASES_FAILED;
  payload: string;
}

export interface NewAlbumReleasesSuccess {
  type: typeof GET_NEW_ALBUM_RELEASES_SUCCESS;
  payload: NewAlbumReleasesType[];
}

export type RecentlyPlayedTracksDispatchTypes =
  | RecentlyPlayedTracksStart
  | RecentlyPlayedTracksFailed
  | RecentlyPlayedTracksSuccess;

export type NewAlbumReleasesDispatchTypes =
  | NewAlbumReleasesStart
  | NewAlbumReleasesFailed
  | NewAlbumReleasesSuccess;
