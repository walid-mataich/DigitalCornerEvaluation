import React, { use } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import OCPFR from "../assets/OCPFR.png";
import { useEffect, useState } from "react";
import api from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";

const EvaluationsWithComments = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [token] = useState(localStorage.getItem("TOKEN"));

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
  }, []);

  const header = (
    <div className="py-3 px-6 bg-white shadow-md rounded-md ">
      <h2 className="text-2xl font-bold text-gray-800 text-center tracking-wide">
        Liste des évaluations commentées
      </h2>
    </div>
  );
  const footer = (
    <div className="bg-gray-50 border-t text-sm text-gray-600 text-right rounded-b-md">
      Total :{" "}
      <span className="font-semibold text-gray-800">{feedbackData.length}</span>{" "}
      évaluations
    </div>
  );

  const avisBodyTemplate = (rowData) => {
    const avisClass =
      {
        "trés satisfait": "text-green-600 font-semibold",
        satisfait: "text-green-700 font-semibold",
        "peu satisfait": "text-orange-300 font-semibold",
        "pas du tout satisfait": "text-red-700 font-bold",
      }[rowData.avis] || "text-gray-500";

    return <span className={avisClass}>{rowData.avis}</span>;
  };

  return (
    <>
      <DashboardNavbar />
      
      <DataTable
        value={feedbackData}
        header={header}
        footer={footer}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        sortMode="single" // ou "multiple" si tu veux permettre de trier par plusieurs colonnes
      >
        <Column field="nomCentre" header="Centre" sortable></Column>
        <Column
          field="type"
          header="Type d'evaluation"
          style={{ fontWeight: "bolder" }}
        ></Column>
        <Column field="avis" header="Avis" body={avisBodyTemplate}></Column>
        <Column
          field="commentaire"
          header="Commentaire"
          style={{ width: "800px" }}
        ></Column>
        <Column field="date" header="Date" ></Column>
      </DataTable>
    </>
  );
};

export default EvaluationsWithComments;
