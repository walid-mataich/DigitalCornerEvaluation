import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CenterDashboard({ data }) {
  const monthlyData = useMemo(() => {
    const year = Object.keys(data.yearlyMonthly)[0];
    const months = data.yearlyMonthly[year];
    return Object.entries(months).map(([month, values]) => ({
      month,
      ...values,
    }));
  }, [data]);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          Dashboard - {data.villeCentreNom}
        </h1>
        <p className="text-green-600 mt-1">Centre ID: {data.villeCentreId}</p>
      </header>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Très Satisfaits" value={data.tresSatisfaitNb} color="bg-green-200" />
        <StatCard label="Satisfaits" value={data.satisfaitNb} color="bg-green-100" />
        <StatCard label="Peu Satisfaits" value={data.peuSatisfaitNb} color="bg-yellow-100" />
        <StatCard label="Pas du tout Satisfaits" value={data.pasDuToutSatisfaitNb} color="bg-red-100" />
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Évolution Mensuelle (2025)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tresSatisfaitNb" fill="#16a34a" name="Très satisfait" />
            <Bar dataKey="satisfaitNb" fill="#4ade80" name="Satisfait" />
            <Bar dataKey="peuSatisfaitNb" fill="#facc15" name="Peu satisfait" />
            <Bar dataKey="pasDuToutSatisfaitNb" fill="#f87171" name="Pas du tout satisfait" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Latest Evaluations */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Dernières évaluations
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2">Date</th>
                <th className="p-2">Heure</th>
                <th className="p-2">Type</th>
                <th className="p-2">Avis</th>
                <th className="p-2">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {data.evaluations.slice(-10).reverse().map((evalItem) => (
                <tr key={evalItem.idEvaluation} className="border-t">
                  <td className="p-2">{evalItem.date}</td>
                  <td className="p-2">{evalItem.time}</td>
                  <td className="p-2 capitalize">{evalItem.type}</td>
                  <td className="p-2 capitalize font-medium text-green-700">
                    {evalItem.avis}
                  </td>
                  <td className="p-2 text-gray-600 max-w-md">
                    {evalItem.comment ? evalItem.comment.slice(0, 100) + "..." : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div
      className={`rounded-xl shadow-md ${color} p-4 text-center flex flex-col items-center justify-center`}
    >
      <span className="text-xl font-bold text-green-800">{value}</span>
      <span className="text-sm text-green-700">{label}</span>
    </div>
  );
}
