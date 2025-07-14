import React, { useEffect, useState } from "react";
import Chart1 from "../components/Chart1";
import DashboardNavbar from "../components/DashboardNavbar";
import LowestSatisfactionCard from "../components/LowestSatisfactionCard";
import SatisfactionChart from "../components/SatisfactionChart";
import api from "../api/axios";
import { Riple } from "react-loading-indicators";

const SuperAdminDashboard = () => {
  const [centersData, setCentersData] = useState([]);
  const [token] = useState(localStorage.getItem("TOKEN"));

  useEffect(() => {
    const fetchCentresData = async () => {
      try {
        const res = await api.get("/superadmin/centres/data", {
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

  const buildChartData = (center) => [
    { name: "Très satisfait", value: center.tresSatisfaitNb },
    { name: "Satisfait", value: center.satisfaitNb },
    { name: "Pas satisfait", value: center.peuSatisfaitNb },
    { name: "Pas satisfait du tout", value: center.pasDuToutSatisfaitNb },
  ];

  return (
    <>
      {centersData.length >= 2 ? (
        <>
          <DashboardNavbar />
          <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-min">
            <div className="lg:col-span-4 lg:row-span-4">
              <Chart1 />
            </div>

            <div className="lg:col-span-2 lg:row-span-4">
              <LowestSatisfactionCard
                badPercentage={(
                  (centersData[0]?.pasDuToutSatisfaitNb /
                    (centersData[0]?.tresSatisfaitNb +
                      centersData[0]?.satisfaitNb +
                      centersData[0]?.peuSatisfaitNb +
                      centersData[0]?.pasDuToutSatisfaitNb)) *
                  100
                ).toFixed(2)}
                centerName={centersData[0]?.villeCentreNom}
              />
            </div>

            <div className="flex flex-col sm:flex-row  sm:items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-6 pl-4">
              <h2 className="text-lg font-semibold text-green-700 text-left">
                Taux de satisfaction pour ce mois
              </h2>

              <button className="flex items-center text-center rounded-md cursor-pointer border border-green-600 py-1 px-4 text-sm transition-all shadow-sm hover:shadow-lg text-green-600 hover:text-white hover:bg-green-600 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Afficher plus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 ml-1.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {centersData.slice(0, 3).map((center, index) => (
              <div key={index} className="lg:col-span-2 lg:row-span-3">
                <SatisfactionChart
                  data={buildChartData(center)}
                  centerName={center.villeCentreNom}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <Riple color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
    </>
  );
};

export default SuperAdminDashboard;
