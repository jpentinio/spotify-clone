import {
  USER_LOGOUT,
  USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
  UserProfileDispatchTypes,
  UserProfileType,
} from "../../types/userProfile.actionTypes";

interface SpotifyState {
  data: UserProfileType;
  isLoading: boolean;
  error: string;
}

const initialState = {
  data: {
    displayName: "",
    id: "",
    images: [],
    type: "",
    followers: 0,
  },
  isLoading: false,
  error: "",
};

export type Action = {
  type: string;
  payload?: string;
};

export const userProfileReducer = (
  state: SpotifyState = initialState,
  action: UserProfileDispatchTypes
) => {
  switch (action.type) {
    case USER_PROFILE: {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
