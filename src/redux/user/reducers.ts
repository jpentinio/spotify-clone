import {
  ArtistDetailsType,
  ArtistTopTracksType,
} from "../../types/artist.actionTypes";
import {
  CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_FAILED,
  CURRENT_USER_PROFILE_SUCCESS,
  ErrorType,
  GET_USER_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_TOP_ARTISTS_FAILED,
  GET_USER_TOP_ARTISTS_START,
  GET_USER_TOP_ARTISTS_SUCCESS,
  GET_USER_TOP_TRACKS_FAILED,
  GET_USER_TOP_TRACKS_START,
  GET_USER_TOP_TRACKS_SUCCESS,
  USER_LOGOUT,
  UserDispatchTypes,
  UserProfileType,
} from "../../types/userProfile.actionTypes";

interface UserStateType {
  currentUser: {
    data: UserProfileType;
    isLoading: boolean;
    error: ErrorType;
  };
  user: {
    data: UserProfileType;
    isLoading: boolean;
    error: ErrorType;
  };
  userTopTracks: {
    data: ArtistTopTracksType[];
    isLoading: boolean;
    error: ErrorType;
  };
  userTopArtists: {
    data: ArtistDetailsType[];
    isLoading: boolean;
    error: ErrorType;
  };
}

export const errorInitialState = {
  message: "",
  code: 0,
};

const initialState = {
  currentUser: {
    data: {
      display_name: "",
      id: "",
      images: [],
      type: "",
      followers: 0,
    },
    isLoading: false,
    error: errorInitialState,
  },
  user: {
    data: {
      display_name: "",
      id: "",
      images: [],
      type: "",
      followers: 0,
    },
    isLoading: false,
    error: errorInitialState,
  },
  userTopTracks: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
  userTopArtists: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
};

export const userProfileReducer = (
  state: UserStateType = initialState,
  action: UserDispatchTypes
) => {
  switch (action.type) {
    case CURRENT_USER_PROFILE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: true,
        },
      };
    }
    case CURRENT_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          data: action.payload,
          isLoading: false,
        },
      };
    }
    case CURRENT_USER_PROFILE_FAILED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case GET_USER_START: {
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload,
          isLoading: false,
        },
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case GET_USER_TOP_TRACKS_START: {
      return {
        ...state,
        userTopTracks: {
          ...state.userTopTracks,
          isLoading: true,
        },
      };
    }
    case GET_USER_TOP_TRACKS_SUCCESS: {
      return {
        ...state,
        userTopTracks: {
          ...state.userTopTracks,
          data: action.payload,
          isLoading: false,
        },
      };
    }
    case GET_USER_TOP_TRACKS_FAILED: {
      return {
        ...state,
        userTopTracks: {
          ...state.userTopTracks,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    // GET USER TOP ARTISTS
    case GET_USER_TOP_ARTISTS_START: {
      return {
        ...state,
        userTopArtists: {
          ...state.userTopArtists,
          isLoading: true,
        },
      };
    }
    case GET_USER_TOP_ARTISTS_SUCCESS: {
      return {
        ...state,
        userTopArtists: {
          ...state.userTopArtists,
          data: action.payload,
          isLoading: false,
        },
      };
    }
    case GET_USER_TOP_ARTISTS_FAILED: {
      return {
        ...state,
        userTopArtists: {
          ...state.userTopArtists,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in");
      break;
    }
    default:
      return state;
  }
};
