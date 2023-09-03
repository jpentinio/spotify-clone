import { LuMusic4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const PlaylistCard = ({
  name,
  image,
  owner,
  id,
  uri,
}: {
  name: string;
  image: string;
  owner: string;
  id: string;
  uri: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/playlist/${id}`)}
      className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 drop-shadow-xl hover:bg-cardHover "
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-48 h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-bold truncate text-md">{name}</div>
        <div className="text-sm text-artistColor capitalize font-semibold">
          By {owner}
        </div>
      </div>
    </div>
  );
};

export const PlaylistMiniCard = ({
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
