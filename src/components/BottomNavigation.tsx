import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/track/actions";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SpotifyPlayer from "react-spotify-web-playback";

const BottomNavigation = () => {
  const dispatch = useAppDispatch();
  const currentPlayingTrack = useAppSelector(
    (state) => state?.track?.currentPlayingTrack.data
  );

  useEffect(() => {
    dispatch(Actions.getCurrentPlayingTrack());
  }, []);

  return (
    <div className="w-full bg-black fixed bottom-0 h-20 left-0 right-0 flex items-center p-6 text-artistColor">
      <SpotifyPlayer
        token={localStorage.getItem("access_token")}
        uris={currentPlayingTrack.item.uri}
        hideAttribution={true}
        styles={{
          bgColor: "#000",
          trackNameColor: "#fff",
          trackArtistColor: "#b3b3b3",
          sliderColor: "#1DB954",
          sliderHandleColor: "#fff",
          color: "#b3b3b3",
        }}
      />
    </div>
  );
};

export default BottomNavigation;
