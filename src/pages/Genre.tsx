import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import GenreActions from "../redux/genres/actions";
import { TrackCard, TrackCardLoading } from "../components/cards/TrackCard";

const Genre = () => {
  const { genre } = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector((state) => state.genre.tracksByGenre.data);
  const isLoading = useAppSelector(
    (state) => state.genre.tracksByGenre.isLoading
  );

  useEffect(() => {
    dispatch(GenreActions.getTracksByGenre(genre!));
  }, [genre]);

  return (
    <div className="min-h-screen w-full rounded bg-base pb-24">
      <section className="pt-44 pb-6 px-6 w-full flex items-end">
        <h1 className="capitalize text-white text-8xl font-bold">{genre}</h1>
      </section>
      <section className="p-6">
        <div className="my-6 grid grid-cols-6 gap-6">
          {isLoading
            ? [...Array(12)].map(() => <TrackCardLoading />)
            : tracks.length > 0
            ? tracks.map((item, index) => (
                <TrackCard
                  key={index}
                  name={item.name}
                  image={item.album.images[0]?.url}
                  artists={item.artists.map((item) => item)}
                  albumId={item.album.id}
                  uri={item.uri}
                />
              ))
            : ""}
        </div>
      </section>
    </div>
  );
};

export default Genre;
