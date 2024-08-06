import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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

      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.name,
      });
    }
  }

  async function googleLogin(codeResponse) {
    try {
      console.log(codeResponse);
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
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error, "error nih pak");
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
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
      <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-200">
          <h1 className="text-3xl font-semibold text-center text-accent-focus">
            Log In
          </h1>

          <form className="space-y-4 mb-6" onSubmit={handleLogin}>
            <div>
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter email"
                className="w-full input input-bordered input-accent"
                onChange={emailOnChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
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
          <div className="mt-6 flex justify-center items-center">
            <GoogleLogin onSuccess={googleLogin} />
          </div>
        </div>
      </div>
    </>
  );
}
