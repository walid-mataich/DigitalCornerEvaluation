import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/axios";
import DashboardNavbar from "./DashboardNavbar";

export default function EvaluationTable() {
  const [filterType, setFilterType] = useState("");
  const [filterSentiment, setFilterSentiment] = useState("");
  const { idCentre } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/adminsuperadmin/centres/data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        });

        // console.log("Data fetched for center:", response.data[0]);

        setData(
          response.data.filter((item) => item.villeCentreId == idCentre)[0]
        );

      //  console.log (
      //     "Data for center:",
      //     response.data.filter((item) => item.villeCentreId == idCentre)[0]
      //   );
      
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du centre :",
          error
        );
        setData(null);
      }
    };
    fetchData();
  }, []);

  if (data === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">
          Chargement des données du centre...
        </p>
      </div>
    );
  }
  const uniqueTypes = [...new Set(data.evaluations.map((e) => e.type))];
  const sentimentOptions = [
    "tres satisfait",
    "satisfait",
    "peu satisfait",
    "pas du tout satisfait",
  ];

  const filteredEvaluations = data.evaluations.filter((evaluation) => {
    return (
      (filterType === "" || evaluation.type === filterType) &&
      (filterSentiment === "" ||
        evaluation.avis.trim().toLowerCase() ===
          filterSentiment.trim().toLowerCase())
    );
  });

  return (
    <>
      <DashboardNavbar />
      <div className="bg-white rounded-xl shadow-md px-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Evaluations
        </h3>

        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filtrer par Type</option>
            {uniqueTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value)}
          >
            <option value="">Filtrer par sentiment</option>
            {sentimentOptions.map((sentiment, idx) => (
              <option key={idx} value={sentiment}>
                {sentiment}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Sentiment</th>

                <th className="px-4 py-2">Commentaire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEvaluations

                .filter((e) => e.comment != null)

                .map((evalData) => (
                  <tr key={evalData.idEvaluation} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{evalData.date}</td>
                    <td className="px-4 py-3 capitalize">
                      {evalData.type.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                    ${
                      evalData.avis.includes("tres satisfait")
                        ? "bg-green-100 text-green-800"
                        : evalData.avis.includes("satisfait")
                        ? "bg-green-50 text-green-700"
                        : evalData.avis.includes("peu satisfait")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                      >
                        {evalData.avis}
                      </span>
                    </td>

                    <td className="px-4 py-3 max-w-xs truncate">
                      {evalData.comment || (
                        <span className="text-gray-400">No comment</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
