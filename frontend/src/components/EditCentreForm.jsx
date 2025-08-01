import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditCentreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nomCentre, setNomCentre] = useState("");
  const [codeCentre, setCodeCentre] = useState("");
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    const fetchCentre = async () => {
      try {
        const res = await api.get(`/adminsuperadmin/centres/getCentre/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNomCentre(res.data.nomCentre);
        setCodeCentre(res.data.codeCentre);
      } catch (err) {
        alert("Erreur lors du chargement du centre.");
        navigate("/general/centres");
      }
    };
    fetchCentre();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/adminsuperadmin/centres/modify/${id}`,
        {
          nomCentre,
          codeCentre,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Centre modifié !");
      navigate("/general/centres");
    } catch (err) {
      alert("Erreur lors de la modification.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Modifier Centre
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1 text-green-700">
            Nom :
          </label>
          <input
            type="text"
            value={nomCentre}
            onChange={(e) => setNomCentre(e.target.value)}
            required
            className="w-full p-2 border border-green-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1 text-green-700">
            Code :
          </label>
          <input
            type="text"
            value={codeCentre}
            onChange={(e) => setCodeCentre(e.target.value)}
            required
            className="w-full p-2 border border-green-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}

export default EditCentreForm;
