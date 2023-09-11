import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/playlist/actions";
import { useNavigate, useParams } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FiClock } from "react-icons/fi";
import { LuMusic4 } from "react-icons/lu";
import moment from "moment";
import UserActions from "../redux/user/actions";
import {
  createHandleSetTrack,
  getRandomColorFromArray,
  setPlaybackState,
} from "../utils/utils";
import { Loading } from "../components/Loading";

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state?.playlist.playlist.data);
  const isLoading = useAppSelector(
    (state) => state?.playlist.playlist.isLoading
  );

  const user = useAppSelector((state) => state?.user?.user.data);
  const selectedTrack = useAppSelector((state) => state.track.selectedTrack);
  const spotifyCallBack = useAppSelector(
    (state) => state.track.spotifyCallback
  );
  const theme = useAppSelector((state) => state?.home?.theme);

  const handleSetTrack = createHandleSetTrack(dispatch);
  const handleSetPlaybackState = setPlaybackState(dispatch);

  useEffect(() => {
    dispatch(Actions.getPlaylist(id!));
  }, [id]);

  useEffect(() => {
    dispatch(UserActions.getUser(data.owner.id));
  }, [data.owner.id]);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-t from-black ${theme.gradient}`}
    >
      {!isLoading && (
        <>
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
                loading="lazy"
              />
            )}

            <div className="flex flex-col gap-3">
              <p className="capitalize text-sm">
                {data.public ? "Public " : "Private "}
                {data.type}
              </p>
              <h1 className="text-5xl font-bold drop-shadow-2xl">
                {data.name}
              </h1>

              <div className="flex gap-1 text-sm font-semibold items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.images[0]?.url}
                    alt={data.owner.display_name}
                    className="w-6 h-6 rounded-full"
                    loading="lazy"
                  />
                  <span
                    onClick={() => navigate(`/user/${data.owner.id}`)}
                    className="cursor-pointer hover:underline"
                  >
                    {data.owner.display_name}
                  </span>
                </div>
                •
                <span>{`${data.tracks.total} ${
                  data.tracks.total > 1 ? "songs" : "song"
                }`}</span>
              </div>
            </div>
          </section>
          <section className="p-6 min-h-screen bg-gradient-to-t from-card to-black/20">
            <div className="flex items-center gap-6">
              <button
                onClick={handleSetTrack(data.uri)}
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
              {isLoading ? (
                <Loading />
              ) : (
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
                                {spotifyCallBack.track.uri === item.track.uri &&
                                spotifyCallBack.isPlaying ? (
                                  <FaPause
                                    onClick={handleSetPlaybackState("pause")}
                                    className="hidden group-hover:flex"
                                  />
                                ) : (
                                  <FaPlay
                                    onClick={
                                      !selectedTrack ||
                                      item.track.uri !==
                                        spotifyCallBack.track.uri
                                        ? handleSetTrack(item.track.uri)
                                        : handleSetPlaybackState("play")
                                    }
                                    className="hidden group-hover:flex"
                                  />
                                )}
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
                                <p
                                  className={`font-semibold text-md ${
                                    spotifyCallBack.track.id ===
                                      item.track.id && "text-primaryGreen"
                                  }`}
                                >
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
                                          className="cursor-pointer hover:underline hover:text-white"
                                        >
                                          {artist.name}
                                        </span>
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td
                              onClick={() =>
                                navigate(`/album/${item.track.album.id}`)
                              }
                              className="cursor-pointer text-sm text-artistColor font-semibold hover:underline hover:text-white"
                            >
                              {item.track.album.name}
                            </td>
                            <td className="w-44 text-sm text-artistColor">
                              {moment(item.added_at)
                                .startOf("minutes")
                                .fromNow()}
                            </td>
                            <td className="w-28 text-sm text-artistColor font-semibold">
                              {moment(item.track.duration_ms).format("m:ss")}
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Playlist;
