import {
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
} from "../../types/home.actionTypes";

interface RecentlyPlayedTracksStateTypes {
  recentlyPlayedTracks: {
    data: RecentlyPlayedTracksType[];
    isLoading: boolean;
    error: string;
  };
}

interface NewAlbumReleasesStateTypes {
  newAlbumReleases: {
    data: NewAlbumReleasesType[];
    isLoading: boolean;
    error: string;
  };
}

type HomeStateTypes = RecentlyPlayedTracksStateTypes &
  NewAlbumReleasesStateTypes;

const initialState = {
  recentlyPlayedTracks: {
    data: [],
    isLoading: false,
    error: "",
  },
  newAlbumReleases: {
    data: [],
    isLoading: false,
    error: "",
  },
};

type DispatchTypes =
  | RecentlyPlayedTracksDispatchTypes
  | NewAlbumReleasesDispatchTypes;

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
          error: "",
        },
      };
    case GET_RECENTLY_PLAYED_SUCCESS:
      return {
        ...state,
        recentlyPlayedTracks: {
          ...state.recentlyPlayedTracks,
          data: action.payload,
          isLoading: false,
          error: "",
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
          error: "",
        },
      };
    case GET_NEW_ALBUM_RELEASES_SUCCESS:
      return {
        ...state,
        newAlbumReleases: {
          ...state.newAlbumReleases,
          data: action.payload,
          isLoading: false,
          error: "",
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
    default:
      return state;
  }
};
