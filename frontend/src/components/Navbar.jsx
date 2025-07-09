import React from "react";
import logo from "../assets/logo.jpg";
import OCPFR from "../assets/OCPFR.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-green-900 fixed w-full z-20 top-0 start-0 border-b border-green-200 dark:border-green-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={OCPFR} className="h-7" alt="OCP Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-600 dark:text-white">
            Digital Corner
          </span>
        </Link>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link to="LogIn">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
