import { GoHomeFill, GoSearch } from "react-icons/go";
import { VscLibrary } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect, useState } from "react";
import PlaylistActions from "../redux/playlist/actions";
import AlbumActions from "../redux/album/actions";
import ArtistActions from "../redux/artist/actions";
import PlaylistCard from "./cards/PlaylistCard";
import Button from "./Button";
import { sidebarLibraryItems } from "../constants";
import AlbumCard from "./cards/AlbumCard";
import { ArtistMiniCard } from "./cards/ArtistCard";

const LoadingCard = () => {
  return (
    <div className="animate-pulse overflow-hidden p-3 flex flex-row gap-3 text-ellipsis cursor-pointer rounded-lg">
      <div className="bg-cardHover w-12 h-12 rounded-lg"></div>
      <div className="flex flex-col gap-4">
        <div className="bg-cardHover w-[230px] h-4 rounded-md"></div>
        <div className="bg-cardHover w-[130px] h-3 rounded-md">
          <span></span>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Playlists");
  const user = useAppSelector((state) => state?.user?.currentUser?.data);

  const albums = useAppSelector((state) => state?.album?.userAlbum.data);
  const albumsIsLoading = useAppSelector(
    (state) => state?.album?.userAlbum.isLoading
  );
  const playlists = useAppSelector(
    (state) => state?.playlist?.userPlaylist.data
  );
  const playlistsIsLoading = useAppSelector(
    (state) => state?.playlist?.userPlaylist.isLoading
  );
  const artists = useAppSelector((state) => state?.artist?.userArtist.data);
  const artistsIsLoading = useAppSelector(
    (state) => state?.artist?.userArtist.isLoading
  );

  const loading = playlistsIsLoading || albumsIsLoading || artistsIsLoading;

  const handleSelectLibrary = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    setSelected(value);

    switch (value) {
      case "Albums":
        dispatch(AlbumActions.getUserAlbum());
        break;
      case "Playlists":
        dispatch(PlaylistActions.getUserPlaylist());
        break;
      case "Artists":
        dispatch(ArtistActions.getUserArtist());
        break;
      default:
        dispatch(PlaylistActions.getUserPlaylist());
        break;
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(PlaylistActions.getUserPlaylist());
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

      <div
        className={`bg-base rounded-lg flex flex-col gap-2 row-span-5 ${
          !loading && "hover:overflow-y-auto"
        } group`}
      >
        <div
          className={`p-4 cursor-pointer flex items-center gap-4 transition ease-linear delay-75 hover:text-white`}
          onClick={() => navigate("/")}
        >
          <VscLibrary className="w-6 h-6" />
          <div className="font-semibold text-md">Your Library</div>
        </div>
        <div className="px-4 py-2 flex gap-2">
          {sidebarLibraryItems.map((item, index) => (
            <div key={index} onClick={(e) => handleSelectLibrary(e, item)}>
              <Button text={item} selected={selected} />
            </div>
          ))}
        </div>
        <div className="p-2 flex flex-col">
          {selected === "Playlists"
            ? playlistsIsLoading
              ? [...Array(playlists.length)].map((i) => <LoadingCard />)
              : playlists.length > 0
              ? playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    name={playlist.name}
                    image={playlist.images[0]?.url}
                    type={playlist.type}
                    owner={playlist.owner.display_name}
                    id={playlist.id}
                  />
                ))
              : ""
            : ""}
          {selected === "Albums"
            ? albumsIsLoading
              ? [...Array(albums.length)].map((i) => <LoadingCard />)
              : albums.length > 0
              ? albums.map((item) => (
                  <AlbumCard
                    name={item.album.name}
                    image={item.album.images[0].url}
                    artists={item.album.artists}
                    id={item.album.id}
                  />
                ))
              : ""
            : ""}
          {selected === "Artists"
            ? artistsIsLoading
              ? [...Array(artists.length)].map((i) => <LoadingCard />)
              : artists.length > 0
              ? artists.map((item) => (
                  <ArtistMiniCard
                    name={item.name}
                    image={item.images[0].url}
                    id={item.id}
                    type={item.type}
                  />
                ))
              : ""
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
