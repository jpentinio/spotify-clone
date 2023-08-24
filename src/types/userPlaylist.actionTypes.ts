export const GET_USER_PLAYLIST_START = "GET_USER_PLAYLIST_START";
export const GET_USER_PLAYLIST_SUCCESS = "GET_USER_PLAYLIST_SUCCESS";
export const GET_USER_PLAYLIST_FAILED = "GET_USER_PLAYLIST_FAILED";

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

export type UserPlaylistDispatchTypes =
  | UserPlaylistStart
  | UserPlaylistSuccess
  | UserPlaylistFailed;
