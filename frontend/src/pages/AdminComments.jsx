import React from "react";
import EvaluationTableTotal from "../components/EvaluationTableTotal";
import { useState, useEffect } from "react";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

const AdminComments = () => {
  const [data, setData] = useState(null);
  const idCentre = localStorage.getItem("ID_CENTRE");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/adminsuperadmin/centres/data`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        });
        console.log("Data fetched for center:", response.data[0]);
        setData(response.data[0]);
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
    <>
      <DashboardNavbar />
      <div className="min-h-screen  p-4 md:p-6">
        <div className="max-w-8xl mx-auto space-y-8">
          {/* Recent Evaluations */}
          <EvaluationTableTotal evaluations={data.evaluations} />
        </div>
      </div>
    </>
  );
};

export default AdminComments;
