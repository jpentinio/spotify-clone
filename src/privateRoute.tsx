import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";
import { useAppSelector } from "./hooks";
import { useState } from "react";
import BottomNavigation from "./components/BottomNavigation";

export function PrivateRoutes() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userProfile);
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.hash);

  console.log(queryParameters);

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

  const myElementRef = useRef(null);
  const [positionTop, setPositionTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el: any = myElementRef.current;
      setPositionTop(el.scrollTop);
    };

    const element: any = myElementRef.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return accessToken === null || user?.error === "The access token expired" ? (
    <Navigate to="/login" />
  ) : (
    <div className="flex flex-row gap-2 bg-black p-2 max-h-[93vh] overflow-hidden">
      <Sidebar />
      <div
        ref={myElementRef}
        className="relative max-h-screen overflow-y-auto flex-1"
      >
        <Navbar positionTop={positionTop} />
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}
