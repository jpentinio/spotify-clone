import { useNavigate } from "react-router-dom";
import { TrackCard } from "../components/cards/TrackCard";
import { useAppSelector } from "../hooks";
import moment from "moment";
import { ArtistCard } from "../components/cards/ArtistCard";
import { PlaylistCard } from "../components/cards/PlaylistCard";
import { getRandomColorFromArray } from "./Album";

const Search = () => {
  const navigate = useNavigate();
  const data = useAppSelector((state) => state?.search?.data);
  const isLoading = useAppSelector((state) => state?.search?.isLoading);

  return (
    <div className={`min-h-screen w-full rounded bg-base p-6`}>
      <div className="pt-16 flex flex-col gap-6">
        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            Songs
          </h1>
          <table className="w-full table-fixed my-4">
            <tbody>
              {isLoading
                ? [...Array(data?.tracks.length)].map(() => (
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
                  ))
                : data?.tracks.length > 0
                ? data?.tracks.map((item, i) => (
                    <tr key={i} className="group hover:bg-white/10">
                      <td className="p-2 flex items-center gap-4">
                        <img
                          src={item.album.images[0].url}
                          alt={item.album.name}
                          className="w-12 h-12"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold">{item.name}</p>
                          <div className="flex items-center gap-2">
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
                        onClick={() => navigate(`/album/${item.album.id}`)}
                        className="cursor-pointer text-sm text-artistColor font-semibold hover:underline hover:text-white"
                      >
                        {item.album.name}
                      </td>
                      <td className="w-28 p-2 text-right text-sm text-artistColor font-semibold">
                        {moment(item.duration_ms).format("m:ss")}
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </section>
        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            Artists
          </h1>
          <div className="my-6 grid grid-cols-6 gap-6">
            {isLoading
              ? [...Array(data?.artists.length)].map(() => (
                  <div className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg">
                    <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="bg-cardHover w-full h-6 rounded-md"></div>
                      <div className="bg-cardHover w-24 h-4 rounded-md"></div>
                    </div>
                  </div>
                ))
              : data?.artists.map((artist, index) => (
                  <ArtistCard
                    key={index}
                    name={artist.name}
                    image={artist.images[0]?.url}
                    type={artist.type}
                    id={artist.id}
                  />
                ))}
          </div>
        </section>
        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            Albums
          </h1>
          <div className="my-6 grid grid-cols-6 gap-6">
            {isLoading
              ? [...Array(data?.albums.length)].map(() => (
                  <div className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg">
                    <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="bg-cardHover w-full h-6 rounded-md"></div>
                      <div className="bg-cardHover w-24 h-4 rounded-md"></div>
                    </div>
                  </div>
                ))
              : data?.albums.map((item, index) => (
                  <TrackCard
                    key={index}
                    name={item.name}
                    image={item.images[0]?.url}
                    artists={item.artists.map((item) => item)}
                    albumId={item.id}
                    uri={item.uri}
                  />
                ))}
          </div>
        </section>
        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            Playlists
          </h1>
          <div className="my-6 grid grid-cols-6 gap-6">
            {isLoading
              ? [...Array(data?.playlists.length)].map(() => (
                  <div className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg">
                    <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="bg-cardHover w-full h-6 rounded-md"></div>
                      <div className="bg-cardHover w-24 h-4 rounded-md"></div>
                    </div>
                  </div>
                ))
              : data?.playlists.map((item, index) => (
                  <PlaylistCard
                    key={index}
                    id={item.id}
                    name={item.name}
                    image={item.images[0]?.url}
                    owner={item.owner.display_name}
                    uri={item.uri}
                  />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;
