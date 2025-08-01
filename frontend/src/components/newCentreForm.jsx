import React, { useState } from "react";
import api from "../api/axios";

function NewCentreForm() {
  const [codeCentre, setCodeCentre] = useState("");
  const [nomCentre, setNomCentre] = useState("");
  const token = localStorage.getItem("TOKEN");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        codeCentre,
        nomCentre,
      };

      await api.post("/adminsuperadmin/centres/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Centre ajouté avec succès.");
      setCodeCentre("");
      setNomCentre("");
    } catch (err) {
      alert("Erreur lors de l'ajout du centre : " + err.message);
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-green-600 md:text-5xl lg:text-6xl">
          Ajouter un centre
        </h1>

        <form
          className="max-w-xl mx-auto w-full text-left"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label
              htmlFor="codeCentre"
              className="block mb-2 text-sm font-bold text-green-600"
            >
              Code du centre :
            </label>
            <input
              type="text"
              id="codeCentre"
              required
              value={codeCentre}
              onChange={(e) => setCodeCentre(e.target.value)}
              className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
              placeholder="Ex : 87588"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="nomCentre"
              className="block mb-2 text-sm font-bold text-green-600"
            >
              Nom du centre :
            </label>
            <input
              type="text"
              id="nomCentre"
              required
              value={nomCentre}
              onChange={(e) => setNomCentre(e.target.value)}
              className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
              placeholder="Ex : Mine Benguerir - si"
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
          >
            Ajouter
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewCentreForm;
