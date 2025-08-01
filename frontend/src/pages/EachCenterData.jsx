import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Chart2 from "../components/chart2";
import SatisfactionChart2 from "../components/SatisfactionChart2";
import EvaluationTable from "../components/EvaluationTable";
import DashboardNavbar from "../components/DashboardNavbar";

const EachCenterData = () => {
  const [data, setData] = useState(null);
  const { idCentre } = useParams();

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

  return (
    <div>
      <DashboardNavbar />
      <div className="grid grid-cols-5 grid-rows-6 gap-x-4 gap-y-1">
        <div className="col-span-3 row-span-3">
          <Chart2 idCentre={idCentre} nomCentre={data.villeCentreNom} />
        </div>
        <div className="col-span-2 row-span-3 col-start-4">
          <SatisfactionChart2 idCentre={idCentre} />
        </div>
        <div className="col-span-5 row-span-3 row-start-4">
          {/* Recent Evaluations */}
          <EvaluationTable evaluations={data.evaluations} idCentre={idCentre} />
        </div>
      </div>
    </div>
  );
};

export default EachCenterData;
