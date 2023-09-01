import {
  AlbumType,
  GET_ALBUM_FAILED,
  GET_ALBUM_START,
  GET_ALBUM_SUCCESS,
  GET_USER_ALBUM_FAILED,
  GET_USER_ALBUM_START,
  GET_USER_ALBUM_SUCCESS,
  GetAlbumDispatchTypes,
  UserSavedAlbumType,
} from "../../types/album.actionTypes";

interface AlbumStateTypes {
  userAlbum: {
    data: UserSavedAlbumType[];
    isLoading: boolean;
    error: string;
  };
  album: {
    data: AlbumType;
    isLoading: boolean;
    error: string;
  };
}

const initialState = {
  userAlbum: {
    data: [],
    isLoading: false,
    error: "",
  },
  album: {
    data: {
      albumType: "",
      artists: [],
      copyrights: [],
      id: "",
      images: [],
      name: "",
      releaseDate: "",
      totalTracks: 0,
      type: "",
      uri: "",
      tracks: {
        items: [],
      },
    },
    isLoading: false,
    error: "",
  },
};

export const albumReducer = (
  state: AlbumStateTypes = initialState,
  action: GetAlbumDispatchTypes
) => {
  switch (action.type) {
    case GET_ALBUM_START:
      return {
        ...state,
        album: {
          ...state.album,
          isLoading: true,
          error: "",
        },
      };
    case GET_ALBUM_SUCCESS:
      return {
        ...state,
        album: {
          ...state.album,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_ALBUM_FAILED: {
      return {
        ...state,
        album: {
          ...state.album,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    //GET USER ALBUM
    case GET_USER_ALBUM_START:
      return {
        ...state,
        userAlbum: {
          ...state.userAlbum,
          isLoading: true,
          error: "",
        },
      };
    case GET_USER_ALBUM_SUCCESS:
      return {
        ...state,
        userAlbum: {
          ...state.userAlbum,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_USER_ALBUM_FAILED: {
      return {
        ...state,
        userAlbum: {
          ...state.userAlbum,
          isLoading: false,
          error: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
