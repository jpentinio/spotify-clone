import {
  USER_LOGOUT,
  USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
  UserProfileDispatchTypes,
} from "../../types/userProfile.actionTypes";
import Services from "./services";
import { Dispatch } from "redux";

class Actions {
  static getUserProfile(access_token: string) {
    return async (dispatch: Dispatch<UserProfileDispatchTypes>) => {
      try {
        dispatch({ type: USER_PROFILE });
        let response = await Services.getUserProfile(access_token);
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: {
            displayName: response.data.display_name,
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
          type: USER_PROFILE_FAILED,
          payload: error.data.error.message,
        });
      }
    };
  }

  static userLogout() {
    return async (dispatch: Dispatch<UserProfileDispatchTypes>) => {
      dispatch({ type: USER_LOGOUT });
    };
  }
}

export default Actions;
