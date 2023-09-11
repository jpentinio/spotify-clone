import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/artist/actions";
import { useNavigate, useParams } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import moment from "moment";
import { createHandleSetTrack, setPlaybackState } from "../utils/utils";

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const data = useAppSelector((state) => state?.artist?.artistDetails.data);
  const isLoading = useAppSelector(
    (state) => state?.artist?.artistDetails.isLoading
  );
  const tracks = useAppSelector((state) => state?.artist?.artistTopTracks.data);
  const selectedTrack = useAppSelector((state) => state.track.selectedTrack);
  const spotifyCallBack = useAppSelector(
    (state) => state.track.spotifyCallback
  );
  const theme = useAppSelector((state) => state?.home?.theme);

  const handleSetTrack = createHandleSetTrack(dispatch);
  const handleSetPlaybackState = setPlaybackState(dispatch);

  useEffect(() => {
    dispatch(Actions.getArtistDetails(id!));
    dispatch(Actions.getArtistTopTracks(id!));
  }, [id]);

  return (
    <div
      className={`min-h-screen w-full rounded bg-gradient-to-t from-black ${theme.gradient}`}
    >
      {!isLoading && (
        <>
          <section
            style={{
              backgroundImage: `url(${data?.images[0]?.url})`,
              backgroundPositionY: "23%",
              boxShadow: "inset 0 0 8em 10px #000",
            }}
            className={`w-full pt-52 pb-6 px-6 bg-cover flex flex-col opacity-90`}
          >
            <p className="capitalize">{data.type}</p>
            <h1 className="text-7xl font-bold pt-4 drop-shadow-sm">
              {data.name}
            </h1>
            <p className="text-md font-semibold mt-8">
              {data.followers.total.toLocaleString() + " followers"}
            </p>
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
                Follow
              </button>
              <button>
                <SlOptions className="text-base w-6 h-6 text-white/80" />
              </button>
            </div>

            <div className="py-7">
              <h1 className="text-2xl font-bold">Popular</h1>
              <table className="w-full table-fixed my-4">
                <tbody>
                  {tracks.length > 0
                    ? tracks?.map((item, i) => (
                        <tr key={i} className="group hover:bg-white/10">
                          <td className="w-14">
                            <div className="flex items-center justify-center">
                              {spotifyCallBack.track.uri === item.uri &&
                              spotifyCallBack.isPlaying ? (
                                <button
                                  onClick={handleSetPlaybackState("pause")}
                                >
                                  <FaPause className="text-white hidden group-hover:flex" />
                                </button>
                              ) : (
                                <button
                                  onClick={
                                    !selectedTrack ||
                                    item.uri !== spotifyCallBack.track.uri
                                      ? handleSetTrack(item.uri)
                                      : handleSetPlaybackState("play")
                                  }
                                >
                                  <FaPlay className="text-white hidden group-hover:flex" />
                                </button>
                              )}

                              <span className="flex text-center group-hover:hidden">
                                {i + 1}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 flex items-center gap-4">
                            <img
                              src={item.album.images[0].url}
                              alt={item.album.name}
                              className="w-12 h-12"
                              loading="lazy"
                            />
                            <div className="flex flex-col gap-1">
                              <p
                                className={`font-semibold ${
                                  spotifyCallBack.track.id === item.id &&
                                  "text-primaryGreen"
                                }`}
                              >
                                {item.name}
                              </p>
                              {item.explicit && (
                                <div className="bg-white/40 h-5 w-5 text-[10px] flex items-center justify-center rounded-sm font-semibold text-black">
                                  E
                                </div>
                              )}
                            </div>
                          </td>
                          <td
                            onClick={() => navigate(`/album/${item.album.id}`)}
                            className="text-sm text-artistColor font-semibold cursor-pointer hover:underline hover:text-white"
                          >
                            {item.album.name}
                          </td>
                          <td className="w-28 text-sm text-artistColor font-semibold">
                            {moment(item.duration_ms).format("m:ss")}
                          </td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Artist;
