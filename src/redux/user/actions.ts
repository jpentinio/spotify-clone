import {
  CURRENT_USER_PROFILE,
  CURRENT_USER_PROFILE_FAILED,
  CURRENT_USER_PROFILE_SUCCESS,
  GET_USER_FAILED,
  GET_USER_START,
  GET_USER_SUCCESS,
  USER_LOGOUT,
  UserDispatchTypes,
} from "../../types/userProfile.actionTypes";
import Services from "./services";
import { Dispatch } from "redux";

class Actions {
  static getCurrentUserProfile(access_token: string) {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: CURRENT_USER_PROFILE });
        let response = await Services.getCurrentUserProfile(access_token);
        dispatch({
          type: CURRENT_USER_PROFILE_SUCCESS,
          payload: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            type: response.data.type,
            followers: response.data.total,
          },
        });
        return response;
      } catch (error: any) {
        console.log(error);
        dispatch({
          type: CURRENT_USER_PROFILE_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static getUser(id: string) {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      try {
        dispatch({ type: GET_USER_START });
        let response = await Services.getCurrentUserProfile(id);
        dispatch({
          type: GET_USER_SUCCESS,
          payload: {
            display_name: response.data.display_name,
            id: response.data.id,
            images: response.data.images,
            type: response.data.type,
            followers: response.data.total,
          },
        });
        return response;
      } catch (error: any) {
        console.log(error);
        dispatch({
          type: GET_USER_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static userLogout() {
    return async (dispatch: Dispatch<UserDispatchTypes>) => {
      dispatch({ type: USER_LOGOUT });
    };
  }
}

export default Actions;
