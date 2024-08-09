import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        `http://54.253.134.153/login/google`, null, {
        headers: {
          token: codeResponse.credential
        }
      });
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("premium", data.premium)
      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=0cdf0fe63eaa4e9ba6294a79f2019325&redirect_uri=https://harmoni-x-weld.vercel.app/dashboard&scope=user-read-playback-state user-follow-modify user-modify-playback-state app-remote-control streaming user-follow-read user-top-read user-read-email user-read-private&response_type=token&show_dialog=true";

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }


  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(
        `http://54.253.134.153/login/`,
        addedData
      );

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("premium", data.premium);

      window.location.href =
        "https://accounts.spotify.com/authorize?client_id=0cdf0fe63eaa4e9ba6294a79f2019325&redirect_uri=https://harmoni-x-weld.vercel.app/dashboard&scope=user-read-playback-state user-follow-modify user-modify-playback-state app-remote-control streaming user-follow-read user-top-read user-read-email user-read-private&response_type=token&show_dialog=true";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
    });
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-lg lg:max-w-lg">
          <h1 className="text-5xl  tracking-wide font-bold text-white text-center text-accent-focus">
          Millions of Songs.
          </h1>
          <h1 className="text-5xl  tracking-wide font-bold text-white text-center text-accent-focus">
          Free at HarmoniX.
          </h1>

          <form className="space-y-4 mb-6" onSubmit={handleLogin}>
            <div>
              <label className="label">
                <span className="text-base label-text font-bold tracking-wide">
                  Email
                </span>
              </label>
              <input
                type="text"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text font-bold tracking-wide">
                  Password
                </span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered input-accent"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button type="submit" className="btn btn-accent w-full">
                Log In
              </button>
            </div>
          </form>
          <div className="divider px-10">OR</div>
          <div className="flex text-center justify-center">
            <div>
              <div className="my-6">
                <GoogleLogin onSuccess={googleLogin} />
              </div>
              <Link to="/register" className="text-center btn hover:btn-accent hover:text-white bg-white font-bold text-black">
                Crate Account?
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center text-xs flex justify-around" >
          <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.</p>
        </div>
      </div>
    </>
  );
}
