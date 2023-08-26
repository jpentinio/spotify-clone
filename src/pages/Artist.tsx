import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import Actions from "../redux/artist/actions";
import { useParams } from "react-router-dom";
import { getRandomColorFromArray } from "./Album";
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import moment from "moment";

const Artist = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state?.artist?.artistDetails.data);
  const tracks = useAppSelector((state) => state?.artist?.artistTopTracks.data);

  useEffect(() => {
    dispatch(Actions.getArtistDetails(id!));
    dispatch(Actions.getArtistTopTracks(id!));
  }, []);

  console.log(data.images[0]?.url);
  return (
    <div
      className={`min-h-screen w-full rounded bg-gradient-to-t from-black ${getRandomColorFromArray()}`}
    >
      <section
        style={{
          backgroundImage: `url(${data?.images[0]?.url})`,
          backgroundPositionY: "23%",
          boxShadow: "inset 0 0 8em 10px #000",
        }}
        className={`w-full pt-52 pb-6 px-6 bg-cover flex flex-col opacity-90`}
      >
        <p className="capitalize">{data.type}</p>
        <h1 className="text-7xl font-bold pt-4 drop-shadow-sm">{data.name}</h1>
        <p className="text-md font-semibold mt-8">
          {data.followers.total.toLocaleString() + " followers"}
        </p>
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
            Follow
          </button>
          <button>
            <SlOptions className="text-base w-6 h-6 text-white/80" />
          </button>
        </div>

        <div className="py-7">
          <h1 className="text-2xl font-bold">Popular</h1>
          <div className="flex flex-col gap-4 my-4">
            {tracks.length > 0
              ? tracks.map((item, i) => (
                  <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="text-center text-artistColor text-sm">
                      {i + 1}
                    </div>
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.album.images[0].url}
                        alt={item.album.name}
                        className="w-10 h-10"
                      />
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">{item.name}</p>
                        {item.explicit && (
                          <div className="bg-gray-400 h-5 w-5 text-[10px] flex items-center justify-center rounded-sm font-semibold text-black">
                            E
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-5 text-sm text-artistColor">
                      {item.album.name}
                    </div>
                    <div className="text-artistColor text-sm">
                      {moment(item.duration_ms).format("m:ss")}
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Artist;
