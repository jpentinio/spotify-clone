import {
  GET_PLAYLIST_FAILED,
  GET_PLAYLIST_START,
  GET_PLAYLIST_SUCCESS,
  GET_USER_PLAYLIST_FAILED,
  GET_USER_PLAYLIST_START,
  GET_USER_PLAYLIST_SUCCESS,
  PlaylistDispatchType,
  PlaylistType,
  UserPlaylistType,
} from "../../types/playlist.actionTypes";

interface StateTypes {
  userPlaylist: {
    data: UserPlaylistType[];
    isLoading: boolean;
    error: string;
  };
  playlist: {
    data: PlaylistType;
    isLoading: boolean;
    error: string;
  };
}

const initialState = {
  userPlaylist: {
    data: [],
    isLoading: false,
    error: "",
  },
  playlist: {
    data: {
      name: "",
      id: "",
      images: [],
      owner: {
        display_name: "",
        id: "",
      },
      public: false,
      description: "",
      type: "",
      uri: "",
      tracks: {
        total: 0,
        items: [],
      },
    },
    isLoading: false,
    error: "",
  },
};

export const playlistReducer = (
  state: StateTypes = initialState,
  action: PlaylistDispatchType
) => {
  switch (action.type) {
    case GET_USER_PLAYLIST_START:
      return {
        ...state,
        userPlaylist: {
          ...state.userPlaylist,
          isLoading: true,
          error: "",
        },
      };
    case GET_USER_PLAYLIST_SUCCESS:
      return {
        ...state,
        userPlaylist: {
          ...state.userPlaylist,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_USER_PLAYLIST_FAILED: {
      return {
        ...state,
        userPlaylist: {
          ...state.userPlaylist,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    // GET PLAYLIST
    case GET_PLAYLIST_START:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          isLoading: true,
          error: "",
        },
      };
    case GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: {
          ...state.playlist,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_PLAYLIST_FAILED: {
      return {
        ...state,
        playlist: {
          ...state.playlist,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
