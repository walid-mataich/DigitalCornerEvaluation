import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import api from "../api/axios";

function CentrePage() {
  const [centres, setCentres] = useState([]);
  const token = localStorage.getItem("TOKEN"); // Pas besoin de useState ici

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const res = await api.get("/superadmin/centres", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCentres(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err.message);
        setCentres([]);
      }
    };

    if (token) {
      fetchCentres();
    }
  }, [token]);

  return (
    <div>
      <DashboardNavbar />
      <div className="pt-28 flex justify-center px-4">
        <div className="w-full max-w-5xl overflow-x-auto rounded-xl shadow-md ring-1 ring-green-200">
          <table className="min-w-full border border-green-200 bg-white rounded-xl overflow-hidden">
            <thead className="bg-green-50 dark:bg-green-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  Centre
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-600 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-center text-xs font-bold text-green-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-200">
              {centres.length > 0 ? (
                centres.map((c) => (
                  <tr key={c.idCentre} className="hover:bg-green-50 transition">
                    <td className="px-6 py-4 text-green-700 font-medium whitespace-nowrap">
                      {c.nomCentre}
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {c.codeCentre}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="px-4 py-1 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-full">
                        Modifier
                      </button>
                      <button className="px-4 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-full">
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Aucun centre trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CentrePage;
