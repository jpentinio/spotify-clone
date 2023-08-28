import { ImageType } from "./home.actionTypes";

export const CURRENT_USER_PROFILE = "USER_PROFILE";
export const CURRENT_USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const CURRENT_USER_PROFILE_FAILED = "USER_PROFILE_FAILED";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const USER_LOGOUT = "USER_LOGOUT";

export type UserProfileType = {
  display_name: string;
  id?: string;
  images: ImageType;
  type: string;
  followers: number;
};

export interface CurrentUserProfileStart {
  type: typeof CURRENT_USER_PROFILE;
}

export interface CurrentUserProfileFailed {
  type: typeof CURRENT_USER_PROFILE_FAILED;
  payload: string;
}

export interface CurrentUserProfileSuccess {
  type: typeof CURRENT_USER_PROFILE_SUCCESS;
  payload: UserProfileType;
}

//GET USER

export interface GetUserStart {
  type: typeof GET_USER_START;
}

export interface GetUserFailed {
  type: typeof GET_USER_FAILED;
  payload: string;
}

export interface GetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  payload: UserProfileType;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserDispatchTypes =
  | CurrentUserProfileStart
  | CurrentUserProfileSuccess
  | CurrentUserProfileFailed
  | GetUserStart
  | GetUserFailed
  | GetUserSuccess
  | UserLogout;
