import {
  GET_SEARCH_FAILED,
  GET_SEARCH_START,
  GET_SEARCH_SUCCESS,
  RESET_STATE,
  SearchDispatchTypes,
  SearchType,
} from "../../types/search.actionTypes";

interface SearchStateTypes {
  data: SearchType;
  isLoading: boolean;
  error: string;
}

const initialState = {
  data: {
    albums: [],
    artists: [],
    tracks: [],
    playlists: [],
  },
  isLoading: false,
  error: "",
};

export const searchReducer = (
  state: SearchStateTypes = initialState,
  action: SearchDispatchTypes
) => {
  switch (action.type) {
    case GET_SEARCH_START:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        error: "",
      };
    case GET_SEARCH_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case RESET_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};
