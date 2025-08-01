import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ajout de l'import
import api from "../api/axios";

const ChooseCenter = () => {
  const [centres, setCentres] = useState([]);
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate(); // Initialisation du hook

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const res = await api.get("/superadmin/centres", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(res.data);
        setCentres(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err.message);
        setCentres([]);
      }
    };
    fetchCentres();
  }, []);

  const handleChange = (e) => {
    setSelectedCenterId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCenterId) {
      navigate(`/evaluation/${selectedCenterId}`);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
        <div className="space-y-4">
          <h1 className=" mb-10 text-4xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white text-center">
            Veuillez choisir votre centre avant d’installer les tablettes.
          </h1>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <label
              htmlFor="center-select"
              className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-200"
            >
              Choisissez un centre :
            </label>
            <select
              id="center-select"
              value={selectedCenterId}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
            >
              <option value="">-- Sélectionnez un centre --</option>
              {centres.map((centre) => (
                <option key={centre.idCentre} value={centre.idCentre}>
                  {centre.nomCentre}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition-colors duration-200"
              disabled={!selectedCenterId}
            >
              Valider
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ChooseCenter;
