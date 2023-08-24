import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Actions from "../redux/userProfile/actions";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

const UserIconModal = ({
  open,
  logout,
}: {
  open: boolean;
  logout: () => void;
}) => {
  return (
    <div
      className={`absolute w-[200px] bg-base p-4 right-8 top-20 text-sm rounded-lg shadow-lg ${
        !open && "hidden"
      }`}
    >
      <div onClick={logout} className="cursor-pointer w-full">
        Log out
      </div>
    </div>
  );
};

const Navbar = ({ positionTop }: { positionTop: number }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const user = useAppSelector((state) => state?.userProfile?.data);

  const logout = () => {
    dispatch(Actions.userLogout());
    navigate("/login");
  };

  return (
    <div
      className={`fixed px-6 py-2 bg-transparent flex justify-between items-center left-[330px] right-[18px] ${
        positionTop >= 100 ? "bg-zinc-800" : "bg-transparent"
      }`}
    >
      <div className="flex gap-2">
        <button className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
          <GoChevronLeft className="w-5 h-5" />
        </button>
        <button className="bg-black w-8 h-8 rounded-full flex items-center justify-center">
          <GoChevronRight className="w-5 h-5" />
        </button>
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
        content={user?.displayName}
        style={{ backgroundColor: "#121212", zIndex: 3 }}
      />
      <UserIconModal open={open} logout={logout} />
    </div>
  );
};

export default Navbar;
