import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdministrateursListe = () => {
  const [administrateurs, setAdministrateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();

  const fetchAdministrateurs = async () => {
    if (!token) {
      setError("Aucun token d'authentification trouvé.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/superadmin/get-all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { adminList = [] } = response.data;
      setAdministrateurs(adminList);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des administrateurs :",
        err
      );
      setError("Impossible de charger la liste des administrateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdministrateurs();
  }, [token]);

  // Supprimer un administrateur par id
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet administrateur ?"))
      return;

    try {
      await api.delete(`/superadmin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Mise à jour locale sans refaire fetch complet
      setAdministrateurs((prev) =>
        prev.filter((admin) => admin.idAdministrateur !== id)
      );
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Erreur lors de la suppression de l'administrateur.");
    }
  };

  // Modifier : navigation vers page édition
  const handleEdit = (id) => {
    navigate(`/general/editadmin/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="pt-28 px-4 flex justify-center">
        <div className="w-full max-w-7xl bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-green-700">
              Liste des administrateurs
            </h2>
            <Link to="/general/newadmin">
              <button className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow transition-colors duration-200">
                + Ajouter un administrateur
              </button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-6 text-gray-500">Chargement...</div>
          ) : error ? (
            <div className="text-center py-6 text-red-500">{error}</div>
          ) : administrateurs.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              Aucun administrateur trouvé.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-green-200">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Prénom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Centre
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {administrateurs.map((admin) => (
                    <tr
                      key={admin.idAdministrateur}
                      className="hover:bg-green-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        {admin.nom}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                        {admin.prenom}
                      </td>
                      <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                        {admin.email}
                      </td>
                      <td className="px-6 py-4 text-gray-500 italic whitespace-nowrap">
                        {admin.villeCentre?.nomCentre || "Aucun centre"}
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(admin.idAdministrateur)}
                          className="cursor-pointer text-green-700 hover:text-green-900 mx-2 transition-colors duration-150"
                          aria-label="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.idAdministrateur)}
                          className="cursor-pointer text-red-600 hover:text-red-800 mx-2 transition-colors duration-150"
                          aria-label="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdministrateursListe;
