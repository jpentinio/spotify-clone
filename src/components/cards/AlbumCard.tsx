import { FaPlay } from "react-icons/fa";

const AlbumCard = ({
  name,
  image,
  artists,
}: {
  name: string;
  image: string;
  artists: string[];
}) => {
  return (
    <div className="group bg-card p-5 flex flex-col gap-4 rounded-lg cursor-pointer transition ease-in-out delay-75 hover:bg-cardHover shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-50 object-cover rounded-lg"
        />
        <button className="bg-primaryGreen p-3 w-fit rounded-full shadow-xl absolute bottom-2 right-2 hidden group-hover:flex">
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

export default AlbumCard;
