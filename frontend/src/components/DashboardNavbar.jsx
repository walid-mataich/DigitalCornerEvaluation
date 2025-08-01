import React from "react";
import { Link } from "react-router-dom";
import OCPFR from "../assets/OCPFR.WebP";
import {
  MdDashboard,
  MdPlace,
  MdSpaceDashboard,
  MdPeople,
  MdPerson,
  MdAssignment,
  MdSettings,
} from "react-icons/md";

const DashboardNavbar = () => {
  const role = localStorage.getItem("ROLE"); // "superadmin" or "admin"

  const superadminLinks = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="h-6 w-6 text-slate-500" />,
      path: "/general/dashboard",
    },
    {
      label: "Feedback",
      icon: <MdAssignment className="h-6 w-6 text-slate-500" />,
      path: "/general/feedback",
    },
    {
      label: "Administrateurs",
      icon: <MdPeople className="h-6 w-6 text-slate-500" />,
      path: "/general/administrateurs",
    },
    {
      label: "Centres",
      icon: <MdSpaceDashboard className="h-6 w-6 text-slate-500" />,
      path: "/general/centres",
    },
    {
      label: "Compte",
      icon: <MdPerson className="h-7 w-7 text-slate-500 border rounded-full" />,
      path: "/general/profile",
    },
  ];

  const adminLinks = [
    {
      label: "Dashboard",
      icon: <MdDashboard className="h-6 w-6 text-slate-500" />,
      path: "/admin/dashboard",
    },
    {
      label: "Feedback",
      icon: <MdAssignment className="h-6 w-6 text-slate-500" />,
      path: "/admin/feedback",
    },

    {
      label: "Evaluation",
      icon: <MdPlace className="h-6 w-6 text-slate-500" />,
      path: "/admin/evaluation",
      state: { requestFullscreen: true },
    },
    {
      label: "Compte",
      icon: <MdPerson className="h-7 w-7 text-slate-500 border rounded-full" />,
      path: "/admin/profile",
    },
  ];

  const roleSpecificLinks =
    role === "SUPERADMIN" ? superadminLinks : adminLinks;

  return (
    <div>
      <nav className="block mb-2 px-4 py-2 bg-white shadow-md rounded-md lg:px-8 lg:py-3">
        <div className="container flex flex-wrap items-center justify-between text-slate-800">
          <Link
            to="/general/dashboard"
            className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
          >
            <img src={OCPFR} className="h-7 w-auto" alt="OCP Logo" />
          </Link>

          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {roleSpecificLinks.map((link, index) => (
                <li
                  key={index}
                  className="flex items-center p-1 text-sm gap-x-2 text-green-700"
                >
                  {link.icon}
                  <Link
                    to={link.path}
                    state={link.state}
                    className="flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNavbar;
