import { Dispatch } from "redux";
import Services from "./services";
import {
  GET_ALBUM_FAILED,
  GET_ALBUM_START,
  GET_ALBUM_SUCCESS,
  GET_USER_ALBUM_FAILED,
  GET_USER_ALBUM_START,
  GET_USER_ALBUM_SUCCESS,
  GetAlbumDispatchTypes,
  UserSavedAlbumType,
} from "../../types/album.actionTypes";
import { TrackType } from "../../types/track.actionTypes";

class Actions {
  static getAlbum(id: string) {
    return async (dispatch: Dispatch<GetAlbumDispatchTypes>) => {
      try {
        dispatch({ type: GET_ALBUM_START });
        let response = await Services.getAlbum(id);
        dispatch({
          type: GET_ALBUM_SUCCESS,
          payload: {
            albumType: response.data.album_type,
            artists: response.data.artists,
            copyrights: response.data.copyrights,
            id: response.data.id,
            images: response.data.images,
            name: response.data.name,
            releaseDate: response.data.release_date,
            totalTracks: response.data.total_tracks,
            type: response.data.type,
            uri: response.data.uri,
            tracks: {
              items: response.data.tracks.items.map((track: TrackType) => {
                return {
                  name: track.name,
                  id: track.id,
                  type: track.type,
                  uri: track.uri,
                  duration_ms: track.duration_ms,
                  artists: track.artists,
                  explicit: track.explicit,
                  track_number: track.track_number,
                  disc_number: track.disc_number,
                };
              }),
            },
          },
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_ALBUM_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getUserAlbum() {
    return async (dispatch: Dispatch<GetAlbumDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_ALBUM_START });
        let response = await Services.getUserAlbum();
        dispatch({
          type: GET_USER_ALBUM_SUCCESS,
          payload: response.data.items.map((item: UserSavedAlbumType) => {
            return {
              added_at: item.added_at,
              album: item.album,
            };
          }),
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_USER_ALBUM_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }
}

export default Actions;
