import { FiClock, FiDisc } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { TrackType } from "../types/track.actionTypes";

import moment from "moment";

type TracksTableProps = {
  data: TrackType[];
  handleSetTrack: (e: React.MouseEvent<HTMLButtonElement>, uri: string) => void;
};

const TracksTable = ({ data, handleSetTrack }: TracksTableProps) => {
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
                  <FaPlay
                    onClick={(e: any) => handleSetTrack(e, track.uri)}
                    className="hidden group-hover:flex"
                  />
                  <span className="flex group-hover:hidden">
                    {track.track_number}
                  </span>
                </div>
              </td>
              <td className="py-2">
                <p className="font-semibold">{track.name}</p>
                <p className="text-artistColor text-sm">
                  {track.artists.map((artist) => artist.name).join(", ")}
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

export default TracksTable;
