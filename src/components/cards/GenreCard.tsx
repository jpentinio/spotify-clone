import { useNavigate } from "react-router-dom";
import { hexcodeColors } from "../../constants";

const GenreCard = ({ genre, index }: { genre: string; index: number }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/genre/${genre}`)}
      className={`cursor-pointer p-6 h-48 rounded-lg `}
      style={{ backgroundColor: hexcodeColors[index % hexcodeColors.length] }}
    >
      <h4 className="capitalize font-bold text-xl">{genre}</h4>
    </div>
  );
};

export default GenreCard;
