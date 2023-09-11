import { FaPause, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ArtistType } from "../../types/home.actionTypes";
import { createHandleSetTrack, setPlaybackState } from "../../utils/utils";

export const TrackCard = ({
  name,
  image,
  artists,
  albumId,
  uri,
}: {
  name: string;
  image: string;
  artists: ArtistType;
  albumId: string;
  uri: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedTrack = useAppSelector((state) => state.track.selectedTrack);
  const spotifyCallBack = useAppSelector(
    (state) => state.track.spotifyCallback
  );
  const handleSetTrack = createHandleSetTrack(dispatch);
  const handleSetPlaybackState = setPlaybackState(dispatch);

  return (
    <div
      onClick={() => navigate(`/album/${albumId}`)}
      className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 hover:bg-cardHover shadow-lg"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-48 h-48 object-cover rounded-lg"
        />
        {spotifyCallBack.track.uri === uri && spotifyCallBack.isPlaying ? (
          <button
            onClick={handleSetPlaybackState("pause")}
            className="bg-primaryGreen p-3 w-fit rounded-full shadow-xl absolute bottom-2 right-2 hidden z-10 group-hover:flex"
          >
            <FaPause className="text-base" />
          </button>
        ) : (
          <button
            onClick={
              !selectedTrack || uri !== spotifyCallBack.track.uri
                ? handleSetTrack(uri)
                : handleSetPlaybackState("play")
            }
            className="bg-primaryGreen p-3 w-fit rounded-full shadow-xl absolute bottom-2 right-2 hidden z-10 group-hover:flex"
          >
            <FaPlay className="text-base" />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold truncate text-md">{name}</div>
        <div className="text-xs font-semibold text-artistColor truncate">
          {artists.map((artist, i) => (
            <span key={i}>
              {i > 0 && ", "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/artist/${artist.id}`);
                }}
                className="cursor-pointer hover:underline"
              >
                {artist.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TrackCardLoading = () => {
  return (
    <div className="bg-card p-5 flex flex-col gap-4 rounded-lg shadow-lg">
      <div className="animate-pulse bg-cardHover w-full h-48 rounded-md"></div>
      <div className="animate-pulse flex flex-col gap-2">
        <div className="bg-cardHover w-full h-6 rounded-md"></div>
        <div className="bg-cardHover w-24 h-4 rounded-md"></div>
      </div>
    </div>
  );
};
