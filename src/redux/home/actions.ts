import { Dispatch } from "redux";
import Services from "./services";
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

class Actions {
  static getRecentlyPlayedTracks() {
    return async (dispatch: Dispatch<RecentlyPlayedTracksDispatchTypes>) => {
      try {
        dispatch({ type: GET_RECENTLY_PLAYED_START });
        let response = await Services.getRecentlyPlayedTracks();
        dispatch({
          type: GET_RECENTLY_PLAYED_SUCCESS,
          payload: response.data.items.map((item: RecentlyPlayedTracksType) => {
            return {
              track: {
                name: item.track.name,
                artists: item.track.artists,
                id: item.track.id,
                type: item.track.type,
                album: item.track.album,
                uri: item.track.uri,
              },
            };
          }),
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_RECENTLY_PLAYED_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getNewAlbumReleases() {
    return async (dispatch: Dispatch<NewAlbumReleasesDispatchTypes>) => {
      try {
        dispatch({ type: GET_NEW_ALBUM_RELEASES_START });
        let response = await Services.getNewAlbumReleases();
        dispatch({
          type: GET_NEW_ALBUM_RELEASES_SUCCESS,
          payload: response.data.albums.items.map(
            (item: NewAlbumReleasesType) => {
              return {
                name: item.name,
                artists: item.artists,
                id: item.id,
                images: item.images,
                uri: item.uri,
              };
            }
          ),
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_NEW_ALBUM_RELEASES_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }
}

export default Actions;
