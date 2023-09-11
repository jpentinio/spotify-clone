import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/album/actions";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaPlay } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import { TracksTable } from "../components/TracksTable";
import { createHandleSetTrack } from "../utils/utils";

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state?.album.album.data);
  const isLoading = useAppSelector((state) => state?.album.album.isLoading);
  const theme = useAppSelector((state) => state.home.theme);
  const handleSetTrack = createHandleSetTrack(dispatch);

  useEffect(() => {
    dispatch(Actions.getAlbum(id!));
  }, [id]);

  return (
    !isLoading && (
      <div
        className={`min-h-screen w-full rounded bg-gradient-to-t from-black ${theme.gradient}`}
      >
        <section className="pt-20 pb-6 px-6 w-full flex flex-row items-end gap-6">
          {isLoading ? (
            <div className="w-60 h-60 animate-pulse bg-cardHover"></div>
          ) : (
            <img
              src={data.images[0]?.url}
              alt={data.name}
              className="w-60 h-60 shadow-2xl"
              loading="lazy"
            />
          )}

          <div className="flex flex-col gap-3">
            <p className="capitalize text-sm">{data.albumType}</p>
            <h1 className="text-5xl font-bold drop-shadow-2xl">{data.name}</h1>
            <div className="flex gap-1 text-sm font-semibold">
              <span>
                {data.artists.map((artist, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    <span
                      onClick={() => navigate(`/artist/${artist.id}`)}
                      className="cursor-pointer hover:underline"
                    >
                      {artist.name}
                    </span>
                  </span>
                ))}
              </span>
              •<span>{moment(data?.releaseDate).format("YYYY")}</span>•
              <span>{data.totalTracks} songs</span>
            </div>
          </div>
        </section>
        <section className="p-6 min-h-screen bg-gradient-to-t from-card to-black/20">
          <div className="flex gap-6">
            <button
              onClick={handleSetTrack(data.uri)}
              className="bg-primaryGreen w-14 h-14 flex items-center justify-center rounded-full shadow-xl"
            >
              <FaPlay className="text-base w-5 h-5" />
            </button>
            <button>
              <HiHeart className="text-base w-8 h-8 text-primaryGreen" />
            </button>
            <button>
              <SlOptions className="text-base w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="py-4">
            <TracksTable data={data.tracks.items} />
          </div>
          <div className="mt-4 text-artistColor">
            <div className="text-sm mb-2 font-semibold">
              {moment(data.releaseDate).format("MMMM DD, YYYY")}
            </div>
            <div className="text-xs flex flex-col gap-1">
              {data.copyrights.map((copyright, index) => (
                <p key={index}>{copyright.text}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default Album;
