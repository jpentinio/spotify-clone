import {
  ColorType,
  GET_NEW_ALBUM_RELEASES_FAILED,
  GET_NEW_ALBUM_RELEASES_START,
  GET_NEW_ALBUM_RELEASES_SUCCESS,
  GET_RECENTLY_PLAYED_FAILED,
  GET_RECENTLY_PLAYED_START,
  GET_RECENTLY_PLAYED_SUCCESS,
  NewAlbumReleasesDispatchTypes,
  NewAlbumReleasesType,
  RecentlyPlayedTracksDispatchTypes,
  RecentlyPlayedTracksType,
  SET_COLOR_THEME,
  SetColorTheme,
} from "../../types/home.actionTypes";
import { ErrorType } from "../../types/userProfile.actionTypes";
import { errorInitialState } from "../user/reducers";

interface RecentlyPlayedTracksStateTypes {
  recentlyPlayedTracks: {
    data: RecentlyPlayedTracksType[];
    isLoading: boolean;
    error: ErrorType;
  };
}

interface NewAlbumReleasesStateTypes {
  newAlbumReleases: {
    data: NewAlbumReleasesType[];
    isLoading: boolean;
    error: ErrorType;
  };
}

interface ThemeStateTypes {
  theme: ColorType;
}

type HomeStateTypes = RecentlyPlayedTracksStateTypes &
  NewAlbumReleasesStateTypes &
  ThemeStateTypes;

const initialState = {
  recentlyPlayedTracks: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
  newAlbumReleases: {
    data: [],
    isLoading: false,
    error: errorInitialState,
  },
  theme: {
    hexcode: "",
    background: "",
    gradient: "",
  },
};

type DispatchTypes =
  | RecentlyPlayedTracksDispatchTypes
  | NewAlbumReleasesDispatchTypes
  | SetColorTheme;

export const homeReducer = (
  state: HomeStateTypes = initialState,
  action: DispatchTypes
) => {
  switch (action.type) {
    case GET_RECENTLY_PLAYED_START:
      return {
        ...state,
        recentlyPlayedTracks: {
          ...state.recentlyPlayedTracks,
          isLoading: true,
        },
      };
    case GET_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        recentlyPlayedTracks: {
          ...state.recentlyPlayedTracks,
          data: action.payload,
          isLoading: false,
        },
      };
    case GET_RECENTLY_PLAYED_FAILED: {
      return {
        ...state,
        recentlyPlayedTracks: {
          ...state.recentlyPlayedTracks,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    //NEW ALBUM RELEASES
    case GET_NEW_ALBUM_RELEASES_START:
      return {
        ...state,
        newAlbumReleases: {
          ...state.newAlbumReleases,
          isLoading: true,
        },
      };
    case GET_NEW_ALBUM_RELEASES_SUCCESS:
      return {
        ...state,
        newAlbumReleases: {
          ...state.newAlbumReleases,
          data: action.payload,
          isLoading: false,
        },
      };
    case GET_NEW_ALBUM_RELEASES_FAILED: {
      return {
        ...state,
        newAlbumReleases: {
          ...state.newAlbumReleases,
          isLoading: false,
          error: action.payload,
        },
      };
    }
    case SET_COLOR_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    default:
      return state;
  }
};
