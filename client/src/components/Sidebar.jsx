import Swal from "sweetalert2";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import Following from "./Following";
const Sidebar = ({ article }) => {
  const [premium, setPremium] = useState(localStorage.premium);
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  };

  async function handleBuy() {
    try {
      const { data } = await axios.get(`http://localhost:3000/subs`, config);

      window.snap.pay(data.token, {
        onSuccess: async function () {
          const response = await axios.patch(
            `http://localhost:3000/subs/update`,
            { order_id: data.order_id, token: data.token },
            config
          );

          Swal.fire({
            icon: "success",
            title: response.data.message,
          });
          localStorage.removeItem("premium");
          localStorage.setItem("premium", true);

          setPremium(localStorage.premium);
        },
        onPending: function () {
          Swal.fire({
            icon: "warning",
            title: "Waiting for your payment!",
          });
        },
        onError: function () {
          Swal.fire({
            icon: "error",
            title: "Payment failed!",
          });
        },
        onClose: function () {
          Swal.fire({
            icon: "question",
            title: "Cancel payment?",
          });
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
      });
    }
  }

  useEffect(() => {}, [premium, article]);

  return (
    <div>
      <aside
        id="cta-button-sidebar"
        className="fixed top-1 h-[96vh] left-0 z-40 w-96 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-neutral-900 rounded-xl mt-4 ml-5">
          <div className="text-center font-mono font-bold text-white">
            Your Library
            <div className="ml-5">
              <Following />
            </div>
          </div>
          {premium === "false" && (
            <div
              id="dropdown-cta"
              onClick={handleBuy}
              className="p-4 mt-4 rounded-lg bg-blue-50 dark:bg-neutral-800 cursor-pointer"
            >
              <div className="flex items-center mb-3 cursor-pointer">
                <span className="bg-neutral-700 flex text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-white justify-between dark:text-black">
                  <MdOutlineWorkspacePremium className="text-lg" />
                  Explore Premium
                </span>
              </div>
              <p className="mb-3 text-sm text-blue-800 dark:text-white">
                Unlock the Full Music Experience! Upgrade to our Premium Plan
                and dive into a world of unlimited music. For just $9.99/month,
                enjoy exclusive benefits that will elevate your listening
                experience.
              </p>
            </div>
          )}
          <h5 className="text-3xl my-6 text-white tracking-widest text-center">
            Artis History
          </h5>
          <div className="text-sm text-center p-10">
            <Typewriter
              key={article}
              text={article}
              words={[article]}
              cursor
              cursorStyle="_"
              typeSpeed={20}
              deleteSpeed={500}
              delaySpeed={1000}
              loop={false}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
