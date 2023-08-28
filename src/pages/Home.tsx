import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/user/actions";
import HomeActions from "../redux/home/actions";
import TrackCard from "../components/cards/TrackCard";

const Home = () => {
  const dispatch = useAppDispatch();

  const recentlyPlayedTracks = useAppSelector(
    (state) => state?.home?.recentlyPlayedTracks.data
  );
  const newAlbumReleases = useAppSelector(
    (state) => state?.home?.newAlbumReleases.data
  );

  useEffect(() => {
    dispatch(HomeActions.getRecentlyPlayedTracks());
    dispatch(HomeActions.getNewAlbumReleases());
  }, []);
  return (
    <div className="p-6 min-h-screen w-full rounded-lg bg-gradient-to-t from-black to-zinc-800">
      <div className="mt-16 flex flex-col gap-6">
        {recentlyPlayedTracks.length > 0 ? (
          <section>
            <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
              Recently Played
            </h1>
            <div className="my-6 grid grid-cols-6 gap-6">
              {recentlyPlayedTracks.map((item, index) => (
                <TrackCard
                  key={index}
                  id={item.track.id}
                  name={item.track.name}
                  image={item.track.album.images[0]?.url}
                  artists={item.track.artists.map((item) => item)}
                  albumId={item.track.album.id}
                  uri={item.track.uri}
                />
              ))}
            </div>
          </section>
        ) : (
          ""
        )}
        {newAlbumReleases.length > 0 ? (
          <section>
            <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
              New albums & singles
            </h1>
            <div className="my-6 grid grid-cols-6 gap-6">
              {newAlbumReleases.map((item, index) => (
                <TrackCard
                  key={index}
                  name={item.name}
                  id={item.id}
                  image={item.images[0]?.url}
                  artists={item.artists.map((item) => item)}
                  albumId={item.id}
                  uri={item.uri}
                />
              ))}
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
