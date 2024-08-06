import Swal from "sweetalert2";
import axios from "axios";
import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Carousel from "./Carousel";

const Sidebar = () => {
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
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>

                <span className="cursor-pointer flex-1 ms-3 whitespace-nowrap">
                  Sign Up
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

        <div className="h-screen mt-2 ml-5 px-3 py-4 overflow-y-auto bg-gray-500 dark:bg-neutral-900 rounded-xl">
          <Carousel />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
