import { useNavigate } from "react-router-dom";
import { ArtistType } from "../../types/home.actionTypes";

const AlbumCard = ({
  name,
  image,
  artists,
  id,
}: {
  name: string;
  image: string;
  artists: ArtistType;
  id: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="overflow-hidden p-3 flex flex-row gap-3 text-ellipsis cursor-pointer hover:bg-card rounded-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-2">
        <div className="text-white font-semibold truncate w-[230px]">
          {name}
        </div>
        <div className="text-sm capitalize truncate w-[230px] group-hover:w-auto">
          {artists.map((artist) => artist.name).join(", ")}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
