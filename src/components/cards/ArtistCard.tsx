import { FaPlay, FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { createHandleSetTrack } from "../../utils/utils";

type Props = {
  name: string;
  image: string;
  id: string;
  type: string;
  uri: string;
};

export const ArtistCard = ({ name, image, id, type, uri }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSetTrack = createHandleSetTrack(dispatch);

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 drop-shadow-xl hover:bg-cardHover "
    >
      <div className="relative">
        {!image ? (
          <div className="w-48 h-48 bg-zinc-800 rounded-full flex items-center justify-center">
            <FaRegUser className="w-12 h-12" />
          </div>
        ) : (
          <div>
            <img
              src={image}
              alt={name}
              className="object-cover rounded-full w-48 h-48"
            />
            <button
              onClick={handleSetTrack(uri)}
              className="bg-primaryGreen p-3 w-fit rounded-full shadow-xl absolute bottom-2 right-2 hidden z-10 group-hover:flex"
            >
              <FaPlay className="text-base" />
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold truncate text-md">{name}</div>
        <div className="text-sm text-artistColor capitalize font-semibold">
          {type}
        </div>
      </div>
    </div>
  );
};

export const ArtistMiniCard = ({
  name,
  image,
  id,
}: {
  name: string;
  image: string;
  id: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="overflow-hidden p-3 flex flex-row gap-3 text-ellipsis cursor-pointer hover:bg-card rounded-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex flex-col justify-center gap-2">
        <div className="text-white font-semibold truncate w-[230px]">
          {name}
        </div>
      </div>
    </div>
  );
};
