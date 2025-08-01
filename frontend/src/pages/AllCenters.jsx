import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import SatisfactionChart from "../components/SatisfactionChart";
import DashboardNavbar from "../components/DashboardNavbar";

const AllCenters = () => {
  const [centersData, setCentersData] = useState([]);
  const [token] = useState(localStorage.getItem("TOKEN"));

  useEffect(() => {
    const fetchCentresData = async () => {
      try {
        const res = await api.get("/adminsuperadmin/centres/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCentersData(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err.message);
        setCentersData([]);
      }
    };
    fetchCentresData();
  }, [token]);
  const buildChartData = (center) => {
    const now = new Date();
    const currentYear = now.getFullYear().toString();

    const monthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const currentMonthName = monthNames[now.getMonth()]; // e.g., "juillet"

    const monthlyData = center.yearlyMonthly?.[currentYear]?.[currentMonthName];

    if (!monthlyData) {
      // Fallback to 0s if no data for this month
      return [
        { name: "Très satisfait", value: 0 },
        { name: "Satisfait", value: 0 },
        { name: "Peu satisfait", value: 0 },
        { name: "Pas du tout satisfait", value: 0 },
        { id: center.villeCentreId, name: center.villeCentreNom },
      ];
    }

    const result = [
      { name: "Très satisfait", value: monthlyData.tresSatisfaitNb },
      { name: "Satisfait", value: monthlyData.satisfaitNb },
      { name: "Pas satisfait", value: monthlyData.peuSatisfaitNb },
      {
        name: "Pas satisfait du tout",
        value: monthlyData.pasDuToutSatisfaitNb,
      },
      { id: center.villeCentreId, name: center.villeCentreNom },
    ];

    // console.log("Chart data for center:", result);

    return result;
  };
  return (
    <>
      <DashboardNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centersData.map((center, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <SatisfactionChart
              data={buildChartData(center)}
              centerName={center.villeCentreNom}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCenters;
