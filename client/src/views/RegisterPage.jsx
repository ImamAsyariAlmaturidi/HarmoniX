import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function googleLogin(codeResponse) {
        try {
            console.log(codeResponse);
            const { data } = await axios.post(
                `http://localhost:3000/login/google`, null, {
                headers: {
                    token: codeResponse.credential
                }
            });
            localStorage.setItem("access_token", data.access_token)
            window.location.href =
                "https://accounts.spotify.com/authorize?client_id=0cdf0fe63eaa4e9ba6294a79f2019325&redirect_uri=http://localhost:5173/dashboard&scope=user-read-playback-state user-follow-modify user-modify-playback-state app-remote-control streaming user-follow-read user-top-read user-read-email user-read-private&response_type=token&show_dialog=true";

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    }


    async function handleRegister(e) {
        e.preventDefault();
        try {
            const addedData = { email, password, phone,lastName, firstName };

            const response =  await axios.post(
                `http://localhost:3000/register/`,
                addedData
            );

            console.log(response)

            const { data } =  await axios.post(
                `http://localhost:3000/login/`,
                {
                    email, password
                }
            );
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("premium", data.premium);

            window.location.href =
                "https://accounts.spotify.com/authorize?client_id=0cdf0fe63eaa4e9ba6294a79f2019325&redirect_uri=http://localhost:5173/dashboard&scope=user-read-playback-state user-follow-modify user-modify-playback-state app-remote-control streaming user-follow-read user-top-read user-read-email user-read-private&response_type=token&show_dialog=true";
        } catch (error) {
            setError("Register failed. Please try again.");
            console.log(error);
        }
    }

    return (
        <div>
            <div className="relative flex flex-col justify-center h-screen overflow-hidden ">
                <div className="w-full p-6 m-auto rounded-lg lg:max-w-lg">
                    <h1 className="text-5xl tracking-wide font-bold text-white text-center text-accent-focus ">
                        Sign up to start
                    </h1>
                    <h1 className="text-5xl mb-3 tracking-wide font-bold text-white text-center text-accent-focus">
                        listening
                    </h1>

                    <form className="space-y-4 mb-6" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-10">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-bold tracking-wide">
                                        First Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full input input-bordered input-accent"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    value={firstName}
                                />
                            </div>


                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-bold tracking-wide">
                                        Last Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full input input-bordered input-accent"
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                />
                            </div>

                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text font-bold tracking-wide">
                                    Phone
                                </span>
                            </label>
                            <input
                                type="text"
                                inputMode="tel"
                                className="w-full input input-bordered input-accent"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text font-bold tracking-wide">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
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
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="divider px-10">OR</div>
                    <div className="my-6 flex justify-center">

                        <GoogleLogin onSuccess={googleLogin} />
                    </div>
                    <div className="flex text-center justify-center">
                        <div>
                            <div className="flex">
                                <h1 className="text-center">
                                    Already have an account ?
                                </h1>
                                <Link to="/">
                                    <button className="underline ml-1 font-bold text-white">
                                        Log in here
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-xs flex justify-around" >
                    <p>This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.</p>
                </div>
            </div>

        </div>
    );
}
