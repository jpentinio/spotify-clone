import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import HomeActions from "../redux/home/actions";
import { TrackCard } from "../components/cards/TrackCard";

const Home = () => {
  const dispatch = useAppDispatch();

  const recentlyPlayedTracks = useAppSelector(
    (state) => state?.home?.recentlyPlayedTracks.data
  );
  const recentlyPlayedTracksLoading = useAppSelector(
    (state) => state?.home?.recentlyPlayedTracks.isLoading
  );
  const newAlbumReleases = useAppSelector(
    (state) => state?.home?.newAlbumReleases.data
  );
  const newAlbumReleasesLoading = useAppSelector(
    (state) => state?.home?.newAlbumReleases.isLoading
  );

  useEffect(() => {
    dispatch(HomeActions.getRecentlyPlayedTracks());
    dispatch(HomeActions.getNewAlbumReleases());
  }, []);
  return (
    <div className="p-6 min-h-screen w-full rounded-lg bg-gradient-to-t from-black to-zinc-800">
      <div className="mt-16 flex flex-col gap-6">
        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            Recently Played
          </h1>
          <div className="my-6 grid grid-cols-6 gap-6">
            {recentlyPlayedTracksLoading
              ? [...Array(11)].map(() => (
                  <div className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg">
                    <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="bg-cardHover w-full h-6 rounded-md"></div>
                      <div className="bg-cardHover w-24 h-4 rounded-md"></div>
                    </div>
                  </div>
                ))
              : recentlyPlayedTracks.length > 0
              ? recentlyPlayedTracks.map((item, index) => (
                  <TrackCard
                    key={index}
                    name={item.track.name}
                    image={item.track.album.images[0]?.url}
                    artists={item.track.artists.map((item) => item)}
                    albumId={item.track.album.id}
                    uri={item.track.uri}
                  />
                ))
              : ""}
          </div>
        </section>

        <section>
          <h1 className="cursor-pointer text-2xl font-bold hover:underline w-fit">
            New albums & singles
          </h1>
          <div className="my-6 grid grid-cols-6 gap-6">
            {newAlbumReleasesLoading
              ? [...Array(11)].map((i) => (
                  <div
                    key={i}
                    className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg"
                  >
                    <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
                    <div className="animate-pulse flex flex-col gap-2">
                      <div className="bg-cardHover w-full h-6 rounded-md"></div>
                      <div className="bg-cardHover w-24 h-4 rounded-md"></div>
                    </div>
                  </div>
                ))
              : newAlbumReleases.length > 0
              ? newAlbumReleases.map((item, index) => (
                  <TrackCard
                    key={index}
                    name={item.name}
                    image={item.images[0]?.url}
                    artists={item.artists.map((item) => item)}
                    albumId={item.id}
                    uri={item.uri}
                  />
                ))
              : ""}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
