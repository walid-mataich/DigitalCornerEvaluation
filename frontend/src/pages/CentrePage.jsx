import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import api from "../api/axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Composant pour afficher la liste des centres
 */
const CentrePage = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("TOKEN");

  /**
   * Récupère la liste des centres depuis l'API
   */
  const fetchCentres = async () => {
    if (!token) {
      setError("Aucun token d'authentification trouvé.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/superadmin/centres", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCentres(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des centres :", err);
      setError("Impossible de charger la liste des centres.");
      setCentres([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCentres();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />

      <div className="pt-28 px-4 flex justify-center">
        <div className="w-full max-w-5xl rounded-xl shadow-md ring-1 ring-green-200 bg-white">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-green-700">
                Liste des centres
              </h2>
              <Link to="/general/newcentre">
                <button className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow transition-colors duration-200">
                  + Ajouter un centre
                </button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-6 text-gray-500">Chargement...</div>
            ) : error ? (
              <div className="text-center py-6 text-red-500">{error}</div>
            ) : centres.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                Aucun centre trouvé.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-green-200">
                <table className="min-w-full divide-y divide-green-200">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-green-700 uppercase tracking-wider">
                        Centre
                      </th>
                      
                      <th className="px-6 py-3 text-center text-xs font-semibold text-green-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-green-100">
                    {centres.map((centre) => (
                      <tr
                        key={centre.idCentre}
                        className="hover:bg-green-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                          {centre.idCentre}
                        </td>
                        <td className="px-6 py-4 font-medium text-green-700 whitespace-nowrap">
                          {centre.nomCentre}
                        </td>
                        
                        <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                          <button
                            className="cursor-pointer text-green-700 hover:text-green-900 mx-2 p-1 transition-colors duration-150"
                            aria-label="Modifier"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="cursor-pointer text-red-600 hover:text-red-800 mx-2 p-1 transition-colors duration-150"
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
    </div>
  );
};

export default CentrePage;