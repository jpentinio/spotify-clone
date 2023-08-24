import logo from "../assets/spotify-white.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const authEndpoint = import.meta.env.VITE_SPOTIFY_AUTH_ENDPOINT;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const responseType = import.meta.env.VITE_SPOTIFY_RESPONSE_TYPE;
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const scope = import.meta.env.VITE_SPOTIFY_SCOPE;
  const accessToken = localStorage.getItem("access_token");

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="h-screen bg-gradient-to-t from-black to-zinc-800">
      <nav className="w-full px-14 py-8 flex items-center bg-[#121212]">
        <img src={logo} alt="logo" width={120} height={120} />
      </nav>
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-black h-[400px] p-24 w-fit rounded-lg flex flex-col gap-12 items-center">
          <h1 className="text-white font-bold text-5xl">Log in to Spotify</h1>
          <a
            href={`${authEndpoint}?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`}
            className="py-4 px-16 rounded-full text-center text-lg text-white font-bold bg-green-500"
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
