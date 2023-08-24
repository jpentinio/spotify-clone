import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/track/actions";

const BottomNavigation = () => {
  const dispatch = useAppDispatch();
  const currentPlayingTrack = useAppSelector(
    (state) => state?.track?.currentPlayingTrack.data
  );

  useEffect(() => {
    dispatch(Actions.getCurrentPlayingTrack());
  }, []);

  return (
    <div className="w-full bg-black fixed bottom-0 h-20 left-0 right-0 flex items-center p-6">
      <div className="flex gap-4">
        <img
          src={currentPlayingTrack.item.album.images[0]?.url}
          alt={currentPlayingTrack.item.name}
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex flex-col gap-1 justify-center">
          <p className="text-[12px] font-semibold">
            {currentPlayingTrack.item.name}
          </p>
          <p className="text-[10px] text-artistColor">
            {currentPlayingTrack.item.artists
              .map((artist) => artist.name)
              .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
