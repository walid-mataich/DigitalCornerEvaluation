import axios from "axios";
import React, { useEffect, useState } from "react";

function NewAdminForm() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [centre, setCentre] = useState("");

  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        //const res = await axios.get(""); // Remplace par ton URL réelle
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
      formData.append("centre_id", centre);

      //await axios.post("", formData); 
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
    <section className="bg-white dark:bg-green-900 min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Ajouter un nouvel administrateur
        </h1>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="mb-5">
            <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nom :
            </label>
            <input
              type="text"
              id="nom"
              placeholder="Nom"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>

          {/* Prénom */}
          <div className="mb-5">
            <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Prénom :
            </label>
            <input
              type="text"
              id="prenom"
              placeholder="Prénom"
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email :
            </label>
            <input
              type="email"
              id="email"
              placeholder="nom@exemple.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>

          {/* Mot de passe */}
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mot de passe :
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
            />
          </div>

          {/* Centre */}
          <div className="mb-5">
            <label htmlFor="centre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ville :
            </label>
            <select
              id="centre"
              required
              value={centre}
              onChange={(e) => setCentre(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-50 dark:border-green-300 dark:text-gray-900 dark:focus:ring-green-500 dark:focus:border-green-500"
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
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 w-full"
          >
            Ajouter
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewAdminForm;
