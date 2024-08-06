import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import { CiLogout } from "react-icons/ci";


const Sidebar = () => {
    const navigate = useNavigate()
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`,
    },
  };

  function logout() {
    localStorage.clear()
    navigate('/')
  }

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
          window.location.reload();
        },
        onPending: function () {
          Swal.fire({
            icon: "warning",
            title: "Waiting your payment!",
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

  return (
    <div>
      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-96 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-neutral-900 rounded-xl  mt-4 ml-5">
          <ul className="space-y-2 font-medium">
            <li className="hover:font-bold transition-all">
              <a
                href="#"
                className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white group"
              >
                <IoHomeOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="cursor-pointer flex-1 ms-3 whitespace-nowrap">
                  Home
                </span>
              </a>
            </li>
            <li className="hover:font-bold transition-all">
              <a
                href="#"
                className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white group"
              >
                <FiSearch className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="cursor-pointer flex-1 ms-3 whitespace-nowrap">
                  Search
                </span>
              </a>
            </li>
            <li className="hover:font-bold transition-all">
              <a
                href="#"
                className="flex items-center p-4 text-gray-900 rounded-lg dark:text-white group"
              >
                <CiLogout className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span onClick={() => logout()} className="cursor-pointer flex-1 ms-3 whitespace-nowrap">
                 Logout 
                </span>
              </a>
            </li>
          </ul>

          {localStorage.premium === "false" && (
            <>
              <div
                id="dropdown-cta"
                onClick={handleBuy}
                className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-neutral-800 cursor-pointer"
                role="alert"
              >
                <div className="flex items-center mb-3 cursor-pointer">
                  <span className="bg-neutral-700 flex text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-white justify-between dark:text-black">
                    <MdOutlineWorkspacePremium className="text-lg" />
                    Explore Premium
                  </span>
                </div>
                <p className="mb-3 text-sm text-blue-800 dark:text-white">
                  Unlock the Full Music Experience! Upgrade to our Premium Plan
                  and dive into a world of unlimited music. For just
                  $9.99/month, enjoy exclusive benefits that will elevate your
                  listening experience.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="h-screen mt-4 ml-5 px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-neutral-900 rounded-xl">
         <Carousel />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
