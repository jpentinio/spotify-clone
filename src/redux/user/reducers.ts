import {
  ArtistDetailsType,
  ArtistTopTracksType,
} from "../../types/artist.actionTypes";
import {
  CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_FAILED,
  CURRENT_USER_PROFILE_SUCCESS,
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
    error: string;
  };
  user: {
    data: UserProfileType;
    isLoading: boolean;
    error: string;
  };
  userTopTracks: {
    data: ArtistTopTracksType[];
    isLoading: boolean;
    error: string;
  };
  userTopArtists: {
    data: ArtistDetailsType[];
    isLoading: boolean;
    error: string;
  };
}

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
    error: "",
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
    error: "",
  },
  userTopTracks: {
    data: [],
    isLoading: false,
    error: "",
  },
  userTopArtists: {
    data: [],
    isLoading: false,
    error: "",
  },
};

export type Action = {
  type: string;
  payload?: string;
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
          error: "",
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
          error: "",
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
          error: "",
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
          error: "",
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
          error: "",
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
          error: "",
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
          error: "",
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
          error: "",
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
