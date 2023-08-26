import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import Actions from "../../redux/track/actions";

const TrackCard = ({
  name,
  id,
  image,
  artists,
  albumId,
  uri,
}: {
  name: string;
  id: string;
  image: string;
  artists: string[];
  albumId: string;
  uri: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSetTrack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(Actions.setTrack(uri));
  };

  return (
    <div
      onClick={() => navigate(`/album/${albumId}`)}
      className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 hover:bg-cardHover shadow-lg"
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-50 object-cover rounded-lg"
        />
        <button
          onClick={handleSetTrack}
          className="bg-primaryGreen p-3 w-fit rounded-full shadow-xl absolute bottom-2 right-2 hidden z-10 group-hover:flex"
        >
          <FaPlay className="text-base" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold truncate text-md">{name}</div>
        <div className="text-xs font-semibold text-artistColor truncate">
          {artists.map((artist) => artist).join(", ")}
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
