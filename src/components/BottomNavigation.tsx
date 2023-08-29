import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/track/actions";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SpotifyPlayer from "react-spotify-web-playback";

const BottomNavigation = () => {
  const dispatch = useAppDispatch();
  const [play, setPlay] = useState(false);
  const selectedTrack = useAppSelector((state) => state?.track.selectedTrack);

  useEffect(() => {
    dispatch(Actions.getCurrentPlayingTrack());
  }, []);

  useEffect(() => {
    setPlay(true);
  }, [selectedTrack]);
  return (
    <div className="w-full bg-black fixed bottom-0 h-20 left-0 right-0 flex items-center p-6 text-artistColor">
      <SpotifyPlayer
        token={localStorage.getItem("access_token")}
        showSaveIcon
        uris={selectedTrack ? [selectedTrack] : []}
        callback={(state: any) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
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
