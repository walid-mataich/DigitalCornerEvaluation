import { useState, useEffect } from "react";
import { FaEnvelope, FaEdit, FaKey, FaSignOutAlt } from "react-icons/fa";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [administrateur, setAdministrateur] = useState(null);
  const [token] = useState(localStorage.getItem("TOKEN"));
  const [role] = useState(localStorage.getItem("ROLE"));
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/adminsuperadmin/get-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Profil administrateur récupéré :", response.data);
        setAdministrateur(response.data.administrateur);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);

        setAdministrateur(null);
      }
    };
    fetchProfileData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("ROLE");
    window.location.href = "/login"; // Redirige vers la page de connexion
  };

  if (!administrateur) return null;
  if (isSending) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-md">
        <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-16 w-16 mb-6"></div>
        <p className="text-lg font-semibold text-green-700">
          Envoi de l'e-mail de vérification...
        </p>
      </div>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <div className="min-h-[calc(100vh-5rem)] pt-6 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl  p-6 m-auto">
          {/* Header modifié avec avatar et statut */}
          <div className="flex items-center space-x-6 border-b pb-6">
            <div className="h-20 w-20 rounded-full bg-green-600 flex items-center justify-center text-white text-xl font-bold">
              {administrateur.nom.charAt(0)}
              {administrateur.prenom.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {`${administrateur.nom} ${administrateur.prenom}`}
              </h2>
              <p className="text-sm text-gray-500">{administrateur.email}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                {administrateur.role}
              </span>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full flex-shrink-0 ${
                administrateur.enabled
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {administrateur.enabled ? "Actif" : "Inactif"}
            </span>
          </div>

          {/* Corps du profil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-gray-500 text-sm">Nom</label>
              <p className="text-lg font-medium">{administrateur.nom}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Prénom</label>
              <p className="text-lg font-medium">{administrateur.prenom}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <p className="text-lg font-medium flex items-center gap-2">
                <FaEnvelope /> {administrateur.email}
              </p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Rôle</label>
              <p className="text-lg font-medium text-blue-700">
                {administrateur.role}
              </p>
            </div>

            {administrateur.villeCentre && (
              <div>
                <label className="text-gray-500 text-sm">Ville / Centre</label>
                <p className="text-lg font-medium">
                  {administrateur.villeCentre.nomCentre}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <button
              onClick={async () => {
                setIsSending(true);
                try {
                  await api.post(
                    `/auth/forgotpassword/verifyMail/${administrateur.email}`
                  );
                  alert(
                    "Un lien de vérification a été envoyé à votre adresse e-mail."
                  );

                  role === "ADMIN"
                    ? navigate("/admin/reset")
                    : navigate("/general/reset");
                } catch (err) {
                  setIsSending(false);
                  console.error("Erreur lors de l'envoi de l'e-mail :", err);
                  alert("Une erreur est survenue lors de l'envoi de l'e-mail.");
                }
              }}
              className=" duration-300 ease-in-out  border border-yellow-500 hover:bg-yellow-600 text-yellow-600 cursor-pointer hover:text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaKey /> Changer le mot de passe
            </button>
            <button
              onClick={handleLogout}
              className=" duration-300 ease-in-out  cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 ml-auto"
            >
              <FaSignOutAlt /> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
