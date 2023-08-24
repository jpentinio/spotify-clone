export const USER_PROFILE = "USER_PROFILE";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILED = "USER_PROFILE_FAILED";
export const USER_LOGOUT = "USER_LOGOUT";

export type UserProfileType = {
  displayName: string;
  id?: string;
  images: { url: string; height: number; width: number }[];
  type: string;
  followers: number;
};

export interface UserProfileStart {
  type: typeof USER_PROFILE;
}

export interface UserProfileFailed {
  type: typeof USER_PROFILE_FAILED;
  payload: string;
}

export interface UserProfileSuccess {
  type: typeof USER_PROFILE_SUCCESS;
  payload: UserProfileType;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserProfileDispatchTypes =
  | UserProfileStart
  | UserProfileSuccess
  | UserProfileFailed
  | UserLogout;
