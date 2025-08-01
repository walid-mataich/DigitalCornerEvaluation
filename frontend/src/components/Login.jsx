import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { Riple } from "react-loading-indicators";
import { Link } from "react-router-dom";
import { HiExclamationCircle } from "react-icons/hi";

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
      setError("");
      const userData = await UserService.login(email, password);
      // console.log(userData);
      if (userData.token) {
        localStorage.setItem("TOKEN", userData.token);
        localStorage.setItem("ROLE", userData.role);
        if (userData.idCentre) {
          // console.log("ID_CENTRE", userData.idCentre);
          localStorage.setItem("ID_CENTRE", userData.idCentre);
        }
        userData.role == "ADMIN"
          ? navigate("/admin/dashboard")
          : userData.role == "SUPERADMIN"
          ? navigate("/general/dashboard")
          : navigate("/login");
      } else {
        setError(userData.error);
        setTimeout(() => {
          setError("");
        }, 7000);
      }
    } catch (error) {
      // console.log(error);
      // console.error("Erreur lors de la connexion :", error);
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

          <form
            className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                placeholder="nom@exemple.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 px-5 py-3 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg shadow-md transition duration-200"
            >
              Se connecter
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
          {error && (
            <div
              className="mt-6 max-w-md mx-auto flex items-center gap-3 p-4 text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg shadow-sm"
              role="alert"
            >
              <HiExclamationCircle className="w-5 h-5 text-red-600" />
              <span>
                <strong className="font-semibold"></strong> {error}
              </span>
            </div>
          )}

          {loading && (
            <Riple color="#32cd32" size="medium" text="" textColor="" />
          )}
        </div>
      </section>
    </div>
  );
}

export default Form;
