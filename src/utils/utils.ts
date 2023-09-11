import { MouseEvent } from "react";
import TrackActions from "../redux/track/actions";
import TrackServices from "../redux/track/services";
import { albumColors, colors } from "../constants";

type DispatchType = (action: any) => void;

export const createHandleSetTrack =
  (dispatch: DispatchType) =>
  (uri: string) =>
  (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(TrackActions.setTrack(uri));
  };

export const checkTokenIfExpired = ({
  status,
  message,
}: {
  status: number;
  message: string;
}) => {
  if (
    status === 401 &&
    (message === "The access token expired" ||
      message === "Invalid access token")
  ) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in");
  }
};

export function getRandomColorFromArray() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export const setPlaybackState =
  (dispatch: DispatchType) =>
  (value: string) =>
  (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(TrackActions.setPlaybackState(value));
  };
