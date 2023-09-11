import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useState } from "react";
import BottomNavigation from "./components/BottomNavigation";
import Actions from "./redux/user/actions";
import HomeActions from "./redux/home/actions";
import { getRandomColorFromArray } from "./utils/utils";

export function PrivateRoutes() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user?.currentUser);
  const accessToken = localStorage.getItem("access_token") || "";
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.hash);
  const color = getRandomColorFromArray();

  useEffect(() => {
    if (queryParameters.get("#access_token")) {
      localStorage.setItem(
        "access_token",
        queryParameters.get("#access_token") || ""
      );
      localStorage.setItem(
        "expires_in",
        queryParameters.get("expires_in") || ""
      );
      navigate("/");
    }
  }, []);

  const myElementRef = useRef<HTMLDivElement | null>(null);
  const [positionTop, setPositionTop] = useState(0);

  useEffect(() => {
    dispatch(Actions.getCurrentUserProfile(accessToken));
    if (accessToken) {
      const handleScroll = () => {
        const el: any = myElementRef.current;
        setPositionTop(el.scrollTop);
      };

      const element: any = myElementRef.current;
      element.addEventListener("scroll", handleScroll);

      return () => {
        element.removeEventListener("scroll", handleScroll);
      };
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(HomeActions.setColorTheme(color));
    if (myElementRef.current) {
      myElementRef.current.scrollTo({ top: 0 });
    }
  }, [location.pathname]);

  return accessToken === "" ||
    user?.error.message === "The access token expired" ||
    user?.error.message === "Invalid access token" ? (
    <Navigate to="/login" />
  ) : (
    <div className="flex flex-row gap-2 bg-black p-2 max-h-[93vh] overflow-hidden">
      <Sidebar />
      <div
        ref={myElementRef}
        className="relative max-h-screen h-screen overflow-y-auto flex-1"
      >
        <Navbar positionTop={positionTop} />
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}
