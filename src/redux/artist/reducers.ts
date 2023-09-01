import {
  ArtistDetailsDispatchTypes,
  ArtistDetailsType,
  ArtistTopTracksDispatchTypes,
  ArtistTopTracksType,
  GET_ARTIST_DETAILS_FAILED,
  GET_ARTIST_DETAILS_START,
  GET_ARTIST_DETAILS_SUCCESS,
  GET_ARTIST_TOP_TRACKS_FAILED,
  GET_ARTIST_TOP_TRACKS_START,
  GET_ARTIST_TOP_TRACKS_SUCCESS,
  GET_USER_ARTIST_FAILED,
  GET_USER_ARTIST_START,
  GET_USER_ARTIST_SUCCESS,
  UserSavedArtistsDispatchTypes,
} from "../../types/artist.actionTypes";

interface ArtistDetailsStateType {
  artistDetails: {
    data: ArtistDetailsType;
    isLoading: boolean;
    error: string;
  };
}

interface ArtistTopTracksStateType {
  artistTopTracks: {
    data: ArtistTopTracksType[];
    isLoading: boolean;
    error: string;
  };
}

interface UserSavedArtistsStateType {
  userArtist: {
    data: ArtistDetailsType[];
    isLoading: boolean;
    error: string;
  };
}
type ArtistStateTypes = ArtistDetailsStateType &
  ArtistTopTracksStateType &
  UserSavedArtistsStateType;

const initialState = {
  artistDetails: {
    data: {
      name: "",
      type: "",
      id: "",
      popularity: 0,
      uri: "",
      images: [],
      followers: {
        total: 0,
      },
      genres: [],
    },
    isLoading: false,
    error: "",
  },
  artistTopTracks: {
    data: [],
    isLoading: false,
    error: "",
  },
  userArtist: {
    data: [],
    isLoading: false,
    error: "",
  },
};

type DispatchTypes =
  | ArtistDetailsDispatchTypes
  | ArtistTopTracksDispatchTypes
  | UserSavedArtistsDispatchTypes;

export const artistDetailsReducer = (
  state: ArtistStateTypes = initialState,
  action: DispatchTypes
) => {
  switch (action.type) {
    case GET_ARTIST_DETAILS_START:
      return {
        ...state,
        artistDetails: {
          ...state.artistDetails,
          isLoading: true,
          error: "",
        },
      };
    case GET_ARTIST_DETAILS_SUCCESS:
      return {
        ...state,
        artistDetails: {
          ...state.artistDetails,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_ARTIST_DETAILS_FAILED: {
      return {
        ...state,
        artistDetails: {
          ...state.artistDetails,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    //ARTIST TOP TRACKS
    case GET_ARTIST_TOP_TRACKS_START:
      return {
        ...state,
        artistTopTracks: {
          ...state.artistTopTracks,
          isLoading: true,
          error: "",
        },
      };
    case GET_ARTIST_TOP_TRACKS_SUCCESS:
      return {
        ...state,
        artistTopTracks: {
          ...state.artistTopTracks,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_ARTIST_TOP_TRACKS_FAILED: {
      return {
        ...state,
        artistTopTracks: {
          ...state.artistTopTracks,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    //USER SAVED ARTISTS
    case GET_USER_ARTIST_START:
      return {
        ...state,
        userArtist: {
          ...state.userArtist,
          isLoading: true,
          error: "",
        },
      };
    case GET_USER_ARTIST_SUCCESS:
      return {
        ...state,
        userArtist: {
          ...state.userArtist,
          data: action.payload,
          isLoading: false,
          error: "",
        },
      };
    case GET_USER_ARTIST_FAILED: {
      return {
        ...state,
        userArtist: {
          ...state.userArtist,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
