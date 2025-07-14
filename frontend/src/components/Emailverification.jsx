import { useState } from "react";
import api from "../api/axios";
import { Riple } from "react-loading-indicators";

const EmailVerification = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setErrorMessage("");

    try {
      const response = await api.post(
        `/auth/forgotpassword/verifyMail/${email}`
      );

      if (response.status === 200) {
        setLoading(false);
        if (onSubmit) {
          onSubmit(email);
        }
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 403) {
        setErrorMessage("Adresse e-mail non reconnue ");
      } else {
        setErrorMessage(
          "Une erreur s’est produite. Veuillez réessayer plus tard."
        );
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto  p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Récupération de mot de passe
        </h2>
        <p className="text-sm text-center text-gray-600">
          Veuillez saisir votre adresse e-mail pour recevoir un code de
          vérification.
        </p>
        {errorMessage && (
          <div className="text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md text-sm">
            {errorMessage}
          </div>
        )}

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
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nom@exemple.com"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-5 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg shadow-md transition duration-200"
        >
          Envoyer le code
        </button>
      </form>
      {loading && <Riple color="#32cd32" size="medium" text="" textColor="" />}
    </div>
  );
};

export default EmailVerification;
