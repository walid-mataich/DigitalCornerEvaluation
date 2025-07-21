// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../api/axios"; // make sure your API import is correct

const Dashboard = () => {
  const [data, setData] = useState(null);
  const idCentre = localStorage.getItem("ID_CENTRE");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/adminsuperadmin/centres/centreData/${idCentre}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
          }
        );

        setData(response.data); // assuming response.data is an array
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setData(null);
      }
    };

    fetchData();
  }, [idCentre]);

  if (data === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">
          Chargement des données du centre...
        </p>
      </div>
    );
  }

  const convertToChartData = (monthlyData) => {
    return Object.entries(monthlyData).map(([month, values]) => ({
      name: month,
      Satisfait: values.satisfaitNb,
      TrèsSatisfait: values.tresSatisfaitNb,
      PeuSatisfait: values.peuSatisfaitNb,
      PasDuToutSatisfait: values.pasDuToutSatisfaitNb,
    }));
  };

  const stats = data.generalTotalMonthlyAvis;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-8">
        Tableau de bord - Satisfaction Mensuelle
      </h1>

      {!stats ? (
        <p className="text-gray-600">Aucune donnée disponible...</p>
      ) : (
        Object.entries(stats).map(([year, monthlyData]) => (
          <div key={year} className="bg-white shadow-md rounded-2xl p-6 mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Année {year}
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={convertToChartData(monthlyData)}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="TrèsSatisfait" stackId="a" fill="#22c55e" />
                <Bar dataKey="Satisfait" stackId="a" fill="#86efac" />
                <Bar dataKey="PeuSatisfait" stackId="a" fill="#facc15" />
                <Bar dataKey="PasDuToutSatisfait" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
