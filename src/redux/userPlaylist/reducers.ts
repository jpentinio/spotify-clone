import {
  GET_USER_PLAYLIST_FAILED,
  GET_USER_PLAYLIST_START,
  GET_USER_PLAYLIST_SUCCESS,
  UserPlaylistDispatchTypes,
  UserPlaylistType,
} from "../../types/userPlaylist.actionTypes";

interface UserPlaylistState {
  data: UserPlaylistType[];
  isLoading: boolean;
  error: string;
}

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

export const userPlaylistReducer = (
  state: UserPlaylistState = initialState,
  action: UserPlaylistDispatchTypes
) => {
  switch (action.type) {
    case GET_USER_PLAYLIST_START:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case GET_USER_PLAYLIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
      };
    case GET_USER_PLAYLIST_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
