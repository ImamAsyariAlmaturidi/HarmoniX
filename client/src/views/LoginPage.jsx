import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    //   const response = await axios.get("http://localhost/spotify-login");
    //   console.log(response)
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/login/google`,
        null,
        {
          headers: {
            token: codeResponse.credential,
          },
        }
      );
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("premium", data.premium);
      await axios.get("http://localhost/spotify-login");
    } catch (error) {
      console.log(error);
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
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
                onChange={emailOnChange}
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
                onChange={passwordOnChange}
              />
            </div>
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
      <Sidebar />
    </>
  );
}
