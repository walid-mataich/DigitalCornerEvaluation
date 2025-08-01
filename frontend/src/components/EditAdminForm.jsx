import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function EditAdminForm() {
  const { id } = useParams(); // id admin à modifier
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); // Optionnel, à modifier seulement si souhaité
  const [centre, setCentre] = useState("");
  const [centres, setCentres] = useState([]);

  // Charger les données de l'admin à modifier
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get(`/superadmin/get-users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("Données administrateur récupérées :", res.data);
        const admin = res.data;

        setNom(admin.administrateur.nom);

        setPrenom(admin.administrateur.prenom);
        setEmail(admin.administrateur.email);
        setRole(admin.administrateur.role || ""); // Préremplir le rôle s'il existe
        // On ne préremplit pas le password par sécurité (optionnel)
      } catch (err) {
        console.error("Erreur chargement administrateur:", err);
        alert("Administrateur introuvable.");
        navigate("/general/administrateurs"); // rediriger si erreur
      }
    };
    fetchAdmin();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("email", email);
      formData.append("role", role); // ajouter le rôle si renseigné

      // Envoi PUT pour modifier
      await api.put(`/superadmin/modify/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Administrateur modifié avec succès");
      navigate("/general/administrateurs");
    } catch (err) {
      alert("Erreur lors de la modification : " + err.message);
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-green-600 md:text-5xl lg:text-6xl">
          Modifier un administrateur
        </h1>

        <form
          className="max-w-2xl mx-auto w-full text-left"
          onSubmit={handleSubmit}
        >
          {/* Nom & Prénom */}
          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="nom"
                className="block mb-2 text-sm font-bold text-green-600 "
              >
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
              <label
                htmlFor="prenom"
                className="block mb-2 text-sm font-bold text-green-600 "
              >
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
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-green-600 "
              >
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
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-bold text-green-600 "
              >
                Role (laisser vide pour ne pas changer) :
              </label>
              <select
                id="role" // <-- corrigé ici
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white border border-green-200 text-green-700 text-sm rounded-lg focus:ring-green-700 focus:border-green-700 block w-full p-2.5"
              >
                <option value="">-- Sélectionner un rôle --</option>
                <option value="ADMIN">admin</option>
                <option value="SUPERADMIN">super admin</option>
              </select>
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
          >
            Modifier
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditAdminForm;
