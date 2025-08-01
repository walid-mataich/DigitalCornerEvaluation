import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

export default function EvaluationsWithComments() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [token] = useState(localStorage.getItem("TOKEN"));
  const [filterType, setFilterType] = useState("");
  const [filterSentiment, setFilterSentiment] = useState("");

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await api.get("/superadmin/evaluationswithcomments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        setFeedbackData([]);
      }
    };
    fetchFeedbackData();
  }, [token]);

  const uniqueTypes = [...new Set(feedbackData.map((e) => e.type))];
  const sentimentOptions = [
    "trés satisfait",
    "satisfait",
    "peu satisfait",
    "pas du tout satisfait",
  ];

  const filteredData = feedbackData.filter(
    (evaluation) =>
      (filterType === "" || evaluation.type === filterType) &&
      (filterSentiment === "" ||
        evaluation.avis.trim().toLowerCase() ===
          filterSentiment.trim().toLowerCase()) &&
      evaluation.commentaire != null
  );

  return (
    <>
      <DashboardNavbar />

      <div className="py-3 px-6 bg-white shadow-md rounded-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center tracking-wide">
          Liste des évaluations commentées
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md px-4 md:p-6">
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <th className="px-4 py-2">Centre</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Avis</th>
                <th className="px-4 py-2">Commentaire</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((evalData) => (
                <tr key={evalData.idEvaluation} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{evalData.nomCentre}</td>
                  <td className="px-4 py-3">{evalData.type}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                      ${
                        evalData.avis === "trés satisfait"
                          ? "bg-green-100 text-green-800"
                          : evalData.avis === "satisfait"
                          ? "bg-green-50 text-green-600"
                          : evalData.avis === "peu satisfait"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {evalData.avis}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {evalData.commentaire || (
                      <span className="text-gray-400">Aucun commentaire</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{evalData.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 border-t text-sm text-gray-600 text-right p-3 rounded-b-md mt-2">
          Total :{" "}
          <span className="font-semibold text-gray-800">
            {filteredData.length}
          </span>{" "}
          évaluations
        </div>
      </div>
    </>
  );
}
