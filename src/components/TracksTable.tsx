import { FiClock, FiDisc } from "react-icons/fi";
import { FaPause, FaPlay } from "react-icons/fa";
import { TrackType } from "../types/track.actionTypes";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { createHandleSetTrack, setPlaybackState } from "../utils/utils";

type TracksTableProps = {
  data: TrackType[];
};

export const TracksTable = ({ data }: TracksTableProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSetTrack = createHandleSetTrack(dispatch);
  const handleSetPlaybackState = setPlaybackState(dispatch);
  const selectedTrack = useAppSelector((state) => state.track.selectedTrack);
  const spotifyCallBack = useAppSelector(
    (state) => state.track.spotifyCallback
  );
  const groupedData: { [disc_number: number]: TrackType[] } = {};

  data.forEach((item) => {
    const disc_number = item.disc_number!;
    if (!groupedData[disc_number]) {
      groupedData[disc_number] = [];
    }
    groupedData[disc_number].push(item);
  });

  return (
    <table className="w-full table-fixed">
      <thead className="border-b-[1px] border-b-artistColor text-artistColor text-sm">
        <tr>
          <th className="w-20 py-2">#</th>
          <th className="text-left">Title</th>
          <th className="w-28">
            <FiClock className="w-5 h-5" />
          </th>
        </tr>
      </thead>
      {Object.keys(groupedData).map((disc) => (
        <tbody>
          <div className="flex items-center ml-4 py-6 px-4 w-48 text-artistColor font-semibold">
            <FiDisc className="mr-7 w-5 h-5" /> Disc {disc}
          </div>
          {groupedData[Number(disc)].map((track, index) => (
            <tr key={index} className="group hover:bg-white/10">
              <td className="w-20">
                <div className="flex items-center justify-center">
                  {spotifyCallBack.track.uri === track.uri &&
                  spotifyCallBack.isPlaying ? (
                    <FaPause
                      onClick={handleSetPlaybackState("pause")}
                      className="hidden group-hover:flex"
                    />
                  ) : (
                    <FaPlay
                      onClick={
                        !selectedTrack ||
                        track.uri !== spotifyCallBack.track.uri
                          ? handleSetTrack(track.uri)
                          : handleSetPlaybackState("play")
                      }
                      className="hidden group-hover:flex"
                    />
                  )}

                  <span className="flex group-hover:hidden">
                    {track.track_number}
                  </span>
                </div>
              </td>
              <td className="py-2">
                <p
                  className={`font-semibold ${
                    spotifyCallBack.track.id === track.id && "text-primaryGreen"
                  }`}
                >
                  {track.name}
                </p>
                <p className="text-artistColor text-sm">
                  {track.artists.map((artist, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      <span
                        onClick={() => navigate(`/artist/${artist.id}`)}
                        className="cursor-pointer hover:underline hover:text-white"
                      >
                        {artist.name}
                      </span>
                    </span>
                  ))}
                </p>
              </td>
              <td className="w-28 text-sm text-artistColor font-semibold">
                {moment(track.duration_ms).format("m:ss")}
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
};

export const TrackTableLoading = () => {
  return (
    <tr className="animate-pulse ">
      <td className="p-2 flex items-center gap-4">
        <div className="w-12 h-12 bg-cardHover"></div>
        <div className="flex flex-col gap-2">
          <div className="w-80 h-4 bg-cardHover rounded-lg"></div>
          <div className="w-64 h-3 bg-cardHover rounded-lg"></div>
        </div>
      </td>
      <td></td>
    </tr>
  );
};
