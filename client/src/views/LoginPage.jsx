import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      const { data } = await axios.post(
        `http://localhost:3000/login/`,
        addedData
      );

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("premium", data.premium);
      
      window.location.href = 'https://accounts.spotify.com/authorize?client_id=0cdf0fe63eaa4e9ba6294a79f2019325&redirect_uri=http://localhost:5173/dashboard&scope=user-read-playback-state user-modify-playback-state app-remote-control streaming user-follow-read user-top-read user-read-email user-read-private&response_type=token&show_dialog=true';
    } catch (error) {
      setError("Login failed. Please try again.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-black">
        <div className="w-full p-6 m-auto rounded-lg lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">
            Jutaan Lagu.
          </h1>
          <h1 className="text-3xl font-semibold text-center text-accent-focus">
            Gratis di HarmoniX.
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
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text font-bold tracking-wide">
                  Kata Sandi
                </span>
              </label>
              <input
                type="password"
                className="w-full input input-bordered input-accent"
                onChange={e => setPassword(e.target.value)}
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
            <h1 className="text-center btn hover:btn-accent hover:text-white bg-white font-bold text-black">
              Buat Akun?
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
