import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  image: string;
  id: string;
  type: string;
  uri: string;
};

const ArtistCard = ({ name, image, id, type, uri }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 drop-shadow-xl hover:bg-cardHover "
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-50 object-cover rounded-full"
        />
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

export default ArtistCard;
