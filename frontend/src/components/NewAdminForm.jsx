import api from "../api/axios";
import React, { useEffect, useState } from "react";

function NewAdminForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [centre, setCentre] = useState("");
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));

  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const res = await api.get("/adminsuperadmin/centres", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCentres(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des centres :", err.message);
        setCentres([]);
      }
    };
    fetchCentres();
  }, []);

  const uploadAdmin = async () => {
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("email", email);
      formData.append("password", password);

      await api.post(`/auth/register/${centre}`, formData);
      alert("Administrateur ajouté");

      // Réinitialisation du formulaire
      setNom("");
      setPrenom("");
      setEmail("");
      setPassword("");
      setCentre("");
    } catch (err) {
      alert("Erreur lors de l’ajout : " + err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadAdmin();
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
  <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-green-600 md:text-5xl lg:text-6xl">
      Ajouter un nouvel administrateur
    </h1>

    <form className="max-w-2xl mx-auto w-full text-left" onSubmit={handleSubmit}>
      {/* Nom & Prénom */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block mb-2 text-sm font-bold text-green-600 ">
            Nom :
          </label>
          <input
            type="text"
            id="nom"
            placeholder="Nom"
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
          />
        </div>

        <div>
          <label htmlFor="prenom" className="block mb-2 text-sm font-bold text-green-600 ">
            Prénom :
          </label>
          <input
            type="text"
            id="prenom"
            placeholder="Prénom"
            required
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 "
          />
        </div>
      </div>

      {/* Email & Mot de passe */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-bold text-green-600 ">
            Email :
          </label>
          <input
            type="email"
            id="email"
            placeholder="nom@exemple.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5 "
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-bold text-green-600 ">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
          />
        </div>
      </div>

      {/* Centre / Ville */}
      <div className="mb-8">
        <label htmlFor="centre" className="block mb-2 text-sm font-bold text-green-600 ">
          Ville :
        </label>
        <select
          id="centre"
          required
          value={centre}
          onChange={(e) => setCentre(e.target.value)}
          className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
        >
          <option value="">-- Sélectionner une ville --</option>
          {centres.map((c) => (
            <option key={c.idCentre} value={c.idCentre}>
              {c.nomCentre}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton */}
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

export default NewAdminForm;
