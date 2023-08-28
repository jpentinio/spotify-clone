import {
  CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_FAILED,
  CURRENT_USER_PROFILE_SUCCESS,
  GET_USER_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
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
    case USER_LOGOUT: {
      localStorage.removeItem("access_token");
      localStorage.removeItem("expires_in");
      break;
    }
    default:
      return state;
  }
};
