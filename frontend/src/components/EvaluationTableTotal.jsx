import { useState } from "react";
import { Link } from "react-router-dom";

export default function EvaluationTable({ evaluations }) {
  const [filterType, setFilterType] = useState("");
  const [filterSentiment, setFilterSentiment] = useState("");

  const uniqueTypes = [...new Set(evaluations.map((e) => e.type))];
  const sentimentOptions = [
    "tres satisfait",
    "satisfait",
    "peu satisfait",
    "pas du tout satisfait",
  ];

  const filteredEvaluations = evaluations.filter((evaluation) => {
    return (
      (filterType === "" || evaluation.type === filterType) &&
      (filterSentiment === "" ||
        evaluation.avis.trim().toLowerCase() ===
          filterSentiment.trim().toLowerCase())
    );
  });

  return (
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
                      evalData.avis == "tres satisfait"
                        ? "bg-green-100 text-green-800"
                        : evalData.avis == "satisfait"
                        ? "bg-green-50 text-green-600"
                        : evalData.avis == "peu satisfait"
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
  );
}
