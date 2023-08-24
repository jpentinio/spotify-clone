import { GoHomeFill, GoSearch } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import Actions from "../redux/userPlaylist/actions";
import PlaylistCard from "./cards/PlaylistCard";
import Button from "./Button";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state?.userProfile?.data);
  const playlists = useAppSelector((state) => state?.userPlaylist?.data);

  useEffect(() => {
    if (user?.id) {
      dispatch(Actions.getUserPlaylist());
    }
  }, [user?.id]);

  return (
    <div className="grid grid-rows-6 gap-2 text-[#b3b3b3] max-h-[97vh] overflow-hidden w-[320px]">
      <div className="p-6 bg-base justify-center rounded-lg flex flex-col gap-6">
        <div
          className={`cursor-pointer flex items-center gap-4 ${
            location.pathname === "/" && "text-white"
          }`}
          onClick={() => navigate("/")}
        >
          <GoHomeFill className="w-6 h-6" />
          <div className="font-semibold text-md">Home</div>
        </div>
        <div
          className={`cursor-pointer flex items-center gap-4 ${
            location.pathname === "/search" && "text-white"
          }`}
          onClick={() => navigate("/search")}
        >
          <GoSearch className="w-6 h-6" />
          <div className="font-semibold text-md">Search</div>
        </div>
      </div>

      <div className="bg-base rounded-lg flex flex-col gap-2 row-span-5 hover:overflow-y-auto group">
        <div
          className={`p-4 cursor-pointer flex items-center gap-4 transition ease-linear delay-75 hover:text-white`}
          onClick={() => navigate("/")}
        >
          <VscLibrary className="w-6 h-6" />
          <div className="font-semibold text-md">Your Library</div>
        </div>
        <div className="px-4 py-2 flex gap-2">
          <Button text="Playlists" />
          <Button text="Albums" />
          <Button text="Artists" />
        </div>
        <div className="p-2 flex flex-col">
          {playlists.length > 0
            ? playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  name={playlist.name}
                  image={playlist.images[0]?.url}
                  type={playlist.type}
                  owner={playlist.owner.display_name}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
