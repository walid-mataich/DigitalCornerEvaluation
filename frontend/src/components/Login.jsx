import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { Riple } from "react-loading-indicators";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);

    try {
      const userData = await UserService.login(email, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("TOKEN", userData.token);
        localStorage.setItem("ROLE", userData.role);
        userData.role == "ADMIN"
          ? navigate("/admin/dashboard")
          : userData.role == "SUPERADMIN"
          ? navigate("/general/dashboard")
          : navigate("/login");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-green-900 min-h-screen flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Connexion à votre espace
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Accédez aux données et visualiser les statistiques.
          </p>

          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Votre email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:placeholder-gray-500 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="nom@exemple.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Votre mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:placeholder-gray-500 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 w-full"
            >
              Se connecter
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </form>
          {loading && (
            <Riple color="#32cd32" size="medium" text="" textColor="" />
          )}
        </div>
      </section>
    </div>
  );
}

export default Form;
