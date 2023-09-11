import { GoChevronLeft, GoChevronRight, GoSearch } from "react-icons/go";
import Actions from "../redux/user/actions";
import SearchActions from "../redux/search/actions";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Tooltip } from "react-tooltip";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { getRandomColorFromArray } from "../utils/utils";

const UserIconModal = ({
  open,
  logout,
  userId,
}: {
  open: boolean;
  logout: () => void;
  userId: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col gap-4 absolute w-[200px] bg-base p-4 right-8 top-16 text-sm rounded-lg shadow-lg ${
        !open && "hidden"
      }`}
    >
      <div
        onClick={() => navigate(`/user/${userId}`)}
        className="cursor-pointer w-full"
      >
        Profile
      </div>
      <div onClick={logout} className="cursor-pointer w-full">
        Log out
      </div>
    </div>
  );
};

const Searchfield = () => {
  const dispatch = useAppDispatch();
  let [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchParams({ q: encodeURI(e.target.value) });
    dispatch(SearchActions.setSearchParams(e.target.value));
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(SearchActions.getSearch(decodeURI(searchQuery)));
    }
    const timer = setTimeout(() => {
      if (searchQuery) {
        dispatch(SearchActions.setSearchParams(searchQuery));
        fetchData();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="w-[380px] relative flex bg-cardHover rounded-full px-4 py-3 items-center gap-3 focus-within:outline focus-within:outline-[2px] focus-within:outline-white">
      <GoSearch className="w-5 h-5" />
      <input
        type="search"
        value={decodeURI(searchQuery)}
        placeholder="What do you want to listen to?"
        className="w-full bg-inherit text-sm placeholder-artistColor/50 focus:outline-none"
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

const Navbar = ({ positionTop }: { positionTop: number }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state?.user?.currentUser.data);
  const theme = useAppSelector((state) => state?.home?.theme);

  const logout = () => {
    dispatch(Actions.userLogout());
    navigate("/login");
  };

  return (
    <div
      className={`fixed z-20 px-6 py-2 bg-transparent flex justify-between items-center left-[330px] right-[18px]`}
      style={{
        backgroundColor:
          positionTop >= 100
            ? location.pathname === "/"
              ? "#27272A"
              : location.pathname.includes("/search")
              ? "#121212"
              : theme.hexcode
            : "transparent",
      }}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-black w-8 h-8 rounded-full flex items-center justify-center"
        >
          <GoChevronLeft className="w-5 h-5" />
        </button>
        <button className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
          <GoChevronRight className="w-5 h-5" />
        </button>
        {location.pathname.includes("/search") && <Searchfield />}
      </div>
      <div
        id="profileAnchor"
        className="cursor-pointer bg-black p-[8px] rounded-full"
        onClick={() => setOpen((prev) => (prev === true ? false : true))}
      >
        <img
          src={user?.images[0]?.url}
          alt="user profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <Tooltip
        anchorSelect="#profileAnchor"
        content={user?.display_name}
        style={{ backgroundColor: "#121212", zIndex: 3 }}
      />
      <UserIconModal open={open} logout={logout} userId={user?.id || ""} />
    </div>
  );
};

export default Navbar;
