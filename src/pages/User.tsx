import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/user/actions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaPlay } from "react-icons/fa";
import { ArtistCard } from "../components/cards/ArtistCard";
import { createHandleSetTrack } from "../utils/utils";

const User = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token") || "";
  const currentUser = useAppSelector((state) => state?.user?.currentUser.data);
  const user = useAppSelector((state) => state?.user?.user.data);
  const topTracks =
    useAppSelector((state) => state?.user?.userTopTracks.data) || [];
  const topArtists =
    useAppSelector((state) => state?.user?.userTopArtists.data) || [];
  const theme = useAppSelector((state) => state?.home?.theme);

  const data = currentUser || user;

  const handleSetTrack = createHandleSetTrack(dispatch);

  useEffect(() => {
    if (user?.id === currentUser?.id) {
      dispatch(Actions.getCurrentUserProfile(accessToken));
      dispatch(Actions.getUserTopTracks());
      dispatch(Actions.getUserTopArtists());
    } else {
      dispatch(Actions.getUser(id!));
    }
  }, [id]);

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-t from-black ${theme.gradient}`}
    >
      <section className="pt-20 pb-6 px-6 w-full flex flex-row items-end gap-6">
        <img
          src={data?.images[1]?.url}
          alt={data?.display_name}
          className="w-60 h-60 object-cover rounded-full shadow-2xl"
        />

        <div className="flex flex-col gap-3">
          <p className="capitalize text-sm">{data?.type}</p>
          <h1 className="text-5xl font-bold drop-shadow-2xl">
            {data?.display_name}
          </h1>
          <div className="text-md font-semibold mt-8">
            <p>{data?.followers + " Followers"}</p>
          </div>
        </div>
      </section>
      <section className="py-10 px-6 min-h-screen bg-gradient-to-t from-card to-black/20 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold hover:underline cursor-pointer">
            Top artists this month
          </h1>
          <small className="text-artistColor font-semibold">
            Only visible to you
          </small>
          <div className="my-6 grid grid-cols-6 gap-6">
            {topArtists.length > 0
              ? topArtists.map((artist) => (
                  <ArtistCard
                    name={artist.name}
                    image={artist.images[0]?.url}
                    type={artist.type}
                    id={artist.id}
                    uri={artist.uri}
                  />
                ))
              : ""}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold hover:underline cursor-pointer">
            Top tracks this month
          </h1>
          <small className="text-artistColor">Only visible to you</small>
          <table className="w-full table-fixed my-4">
            <tbody>
              {topTracks.length > 0
                ? topTracks?.map((item, i) => (
                    <tr key={i} className="group hover:bg-white/10">
                      <td className="w-14">
                        <div className="flex items-center justify-center">
                          <FaPlay
                            onClick={handleSetTrack(item.uri)}
                            className="text-white hidden group-hover:flex"
                          />
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
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold">{item.name}</p>
                          {item.explicit && (
                            <div className="bg-white/40 h-5 w-5 text-[10px] flex items-center justify-center rounded-sm font-semibold text-black">
                              E
                            </div>
                          )}
                          <p className="text-sm text-artistColor">
                            {item.artists.map((artist, i) => (
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
    </div>
  );
};

export default User;
