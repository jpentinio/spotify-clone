import { LuMusic4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const PlaylistCard = ({
  name,
  image,
  type,
  owner,
  id,
}: {
  name: string;
  image: string;
  type: string;
  owner: string;
  id: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/playlist/${id}`)}
      className="overflow-hidden p-3 flex flex-row gap-3 text-ellipsis cursor-pointer hover:bg-card rounded-lg"
    >
      {!image ? (
        <div className="bg-[#282828] p-3 rounded-lg">
          <LuMusic4 className="w-6 h-6" />
        </div>
      ) : (
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-lg object-cover"
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="text-white font-semibold truncate w-[230px]">
          {name}
        </div>
        <div className="text-sm capitalize truncate w-[230px] group-hover:w-auto">
          {type}
          {" • "}
          <span>{owner}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
