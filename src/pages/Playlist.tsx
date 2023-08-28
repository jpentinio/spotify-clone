import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/playlist/actions";
import { useNavigate, useParams } from "react-router-dom";
import { getRandomColorFromArray } from "./Album";
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FiClock } from "react-icons/fi";
import { LuMusic4 } from "react-icons/lu";
import moment from "moment";
import TrackActions from "../redux/track/actions";
import UserActions from "../redux/user/actions";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state?.playlist.playlist.data);
  const user = useAppSelector((state) => state?.user?.user.data);

  const handleSetTrack = (
    e: React.MouseEvent<HTMLButtonElement>,
    uri: string
  ) => {
    e.preventDefault();
    dispatch(TrackActions.setTrack(uri));
  };

  useEffect(() => {
    dispatch(Actions.getPlaylist(id!));
  }, [id]);

  useEffect(() => {
    dispatch(UserActions.getUser(data.owner.id));
  }, [data.owner.id]);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-t from-black ${getRandomColorFromArray()}`}
    >
      <section className="pt-20 pb-6 px-6 w-full flex flex-row items-end gap-6">
        {!data.images.length ? (
          <div className="bg-[#282828] w-60 h-60 flex items-center justify-center p-3">
            <LuMusic4 className="w-20 h-20 text-artistColor" />
          </div>
        ) : (
          <img
            src={data.images[0]?.url}
            alt={data.name}
            className="w-60 h-60 object-cover drop-shadow-2xl"
          />
        )}

        <div className="flex flex-col gap-3">
          <p className="capitalize text-sm">
            {data.public ? "Public " : "Private "}
            {data.type}
          </p>
          <h1 className="text-5xl font-bold drop-shadow-2xl">{data.name}</h1>
          <div className="flex gap-1 items-center text-sm font-semibold">
            <div className="flex gap-2 items-center">
              <img
                src={user?.images[0]?.url}
                alt={data.owner.display_name}
                className="w-6 h-6 rounded-full"
              />
              <span
                onClick={() => navigate(`/user/${data.owner.id}`)}
                className="cursor-pointer hover:underline"
              >
                {data.owner.display_name}
              </span>
            </div>
            •<span>{data.tracks.total} songs</span>
          </div>
        </div>
      </section>
      <section className="p-6 min-h-screen bg-gradient-to-t from-black to-white/20">
        <div className="flex items-center gap-6">
          <button
            // onClick={(e) => handleSetTrack(e, data.uri)}
            className="bg-primaryGreen w-14 h-14 flex items-center justify-center rounded-full shadow-xl"
          >
            <FaPlay className="text-base w-5 h-5" />
          </button>
          <button className="px-4 border border-white/30 text-white/90 font-semibold rounded-full text-sm h-8">
            Enhance
          </button>
          <button>
            <SlOptions className="text-base w-6 h-6 text-white/80" />
          </button>
        </div>

        <div className="py-7">
          <table className="w-full table-fixed">
            <thead className="border-b-[1px] border-b-white/20 text-artistColor text-sm">
              <th className="py-4 w-14">#</th>
              <th className="text-left">Title</th>
              <th className="text-left">Album</th>
              <th className="text-left w-44">Date added</th>
              <th className="w-28">
                <FiClock className="w-5 h-5" />
              </th>
            </thead>
            <tbody>
              {data.tracks.items.length > 0
                ? data.tracks.items.map((item, index) => (
                    <tr key={index} className="group hover:bg-white/10">
                      <td className="w-14">
                        <div className="flex items-center justify-center">
                          <FaPlay
                            onClick={(e: any) =>
                              handleSetTrack(e, item.track.uri)
                            }
                            className="hidden group-hover:flex"
                          />
                          <span className="flex text-artistColor text-sm group-hover:hidden">
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 flex items-center gap-4">
                        <img
                          src={item.track.album.images[0]?.url}
                          alt={item.track.album.name}
                          className="w-12 h-12"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-md">
                            {item.track.name}
                          </p>
                          <div className="flex items-center gap-2">
                            {item.track.explicit && (
                              <div className="bg-white/40 h-5 w-5 text-[10px] flex items-center justify-center rounded-sm font-semibold text-black">
                                E
                              </div>
                            )}
                            <p className="text-sm text-artistColor">
                              {item.track.artists.map((artist, i) => (
                                <span key={i}>
                                  {i > 0 && ", "}
                                  <span
                                    onClick={() =>
                                      navigate(`/artist/${artist.id}`)
                                    }
                                    className="cursor-pointer hover:underline"
                                  >
                                    {artist.name}
                                  </span>
                                </span>
                              ))}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-sm text-artistColor font-semibold">
                        {item.track.album.name}
                      </td>
                      <td className="w-44 text-sm text-artistColor">
                        {moment(item.added_at).startOf("minutes").fromNow()}
                      </td>
                      <td className="w-28 text-sm text-artistColor font-semibold">
                        {moment(item.track.duration_ms).format("m:ss")}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Playlist;
