import {
  AlbumType,
  GET_ALBUM_FAILED,
  GET_ALBUM_START,
  GET_ALBUM_SUCCESS,
  GetAlbumDispatchTypes,
} from "../../types/album.actionTypes";

interface AlbumStateTypes {
  data: AlbumType;
  isLoading: boolean;
  error: string;
}

const initialState = {
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
};

export const albumReducer = (
  state: AlbumStateTypes = initialState,
  action: GetAlbumDispatchTypes
) => {
  switch (action.type) {
    case GET_ALBUM_START:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case GET_ALBUM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
      };
    case GET_ALBUM_FAILED: {
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
