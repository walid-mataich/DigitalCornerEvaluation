import React from "react";

const ModifyPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <div className="w-full p-8 bg-white rounded-2xl shadow-lg sm:max-w-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Modifier le mot de passe
        </h2>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

        

          <button
            type="submit"
            className="w-full py-3 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg transition duration-200"
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyPassword;
