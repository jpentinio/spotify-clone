import { Dispatch } from "redux";
import Services from "./services";
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

class Actions {
  static getArtistDetails(id: string) {
    return async (dispatch: Dispatch<ArtistDetailsDispatchTypes>) => {
      try {
        dispatch({ type: GET_ARTIST_DETAILS_START });
        let response = await Services.getArtistDetails(id);
        dispatch({
          type: GET_ARTIST_DETAILS_SUCCESS,
          payload: {
            name: response.data.name,
            type: response.data.type,
            id: response.data.id,
            popularity: response.data.popularity,
            uri: response.data.uri,
            images: response.data.images,
            followers: {
              total: response.data.followers.total,
            },
            genres: response.data.genres,
          },
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_ARTIST_DETAILS_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getArtistTopTracks(id: string) {
    return async (dispatch: Dispatch<ArtistTopTracksDispatchTypes>) => {
      try {
        dispatch({ type: GET_ARTIST_TOP_TRACKS_START });
        let response = await Services.getArtistTopTracks(id);
        dispatch({
          type: GET_ARTIST_TOP_TRACKS_SUCCESS,
          payload: response.data.tracks.map((item: ArtistTopTracksType) => {
            return {
              name: item.name,
              duration_ms: item.duration_ms,
              id: item.id,
              type: item.type,
              album: item.album,
              track_number: item.track_number,
              disc_number: item.disc_number,
              artists: item.artists,
              explicit: item.explicit,
            };
          }),
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_ARTIST_TOP_TRACKS_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getUserArtist() {
    return async (dispatch: Dispatch<UserSavedArtistsDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_ARTIST_START });
        let response = await Services.getUserArtist();
        dispatch({
          type: GET_USER_ARTIST_SUCCESS,
          payload: response.data.artists.items.map(
            (item: ArtistDetailsType) => {
              return {
                name: item.name,
                id: item.id,
                type: item.type,
                images: item.images,
              };
            }
          ),
        });
        return response;
      } catch (error: any) {
        dispatch({
          type: GET_USER_ARTIST_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }
}

export default Actions;
