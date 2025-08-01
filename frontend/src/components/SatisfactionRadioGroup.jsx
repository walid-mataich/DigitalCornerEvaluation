import { useState } from "react";
import api from "../api/axios";

export default function SatisfactionStepper({ codeCentre }) {
  // État pour le commentaire

  // 1. Définition des 3 catégories et des 4 niveaux
  const categories = [
    { key: "qualiteDeLaSolution", label: "Qualité de service" },
    { key: "tempsDeReponse", label: "Temps de reponse" },
    { key: "comportement", label: "Comportement" },
  ];

  const [comments, setComments] = useState(() =>
    Object.fromEntries(categories.map((c) => [c.key, ""]))
  );

  const options = [
    { label: "😄 Très satisfait", value: "tres satisfait" },
    { label: "🙂 Satisfait", value: "satisfait" },
    { label: "😐 Peu satisfait", value: "peu satisfait" },
    { label: "🙁 Pas du tout satisfait", value: "pas du tout satisfait" },
  ];

  // 2. États
  const [step, setStep] = useState(0); // étape courante
  const [ratings, setRatings] = useState(() =>
    Object.fromEntries(categories.map((c) => [c.key, ""]))
  );
  const [token] = useState(localStorage.getItem("TOKEN"));
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // 3. Couleurs selon le choix
  const color = (value, selected) =>
    selected !== value
      ? "bg-white"
      : value === "tres satisfait"
      ? "bg-green-600 text-white"
      : value === "satisfait"
      ? "bg-green-300"
      : value === "peu satisfait"
      ? "bg-yellow-500 text-white"
      : "bg-red-600 text-white";

  // 4. Gestion du clic « Suivant / Soumettre »
  const handleNext = async () => {
    const currentKey = categories[step].key;
    if (!ratings[currentKey]) {
      alert("Veuillez sélectionner un niveau de satisfaction.");
      return;
    }

    // Si on est sur la dernière étape ⇒ soumission
    if (step === categories.length - 1) {
      // exemple : une requête par catégorie
      try {
        for (const [type, avis] of Object.entries(ratings)) {
          const comment = comments[type] || "";
          await api.post(
            `/adminsuperadmin/evaluations/add?avis=${avis}&idCentre=${codeCentre}&type=${type}&comment=${
              comment || ""
            }`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        setIsSuccessModalOpen(true);
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          window.location.reload();
        }, 7000);
      } catch (error) {
        console.error(
          "Erreur lors de la soumission des évaluations :",
          error.message
        );
      }
    } else {
      // Sinon, on passe à l’étape suivante
      setStep((s) => s + 1);
    }
  };

  // 5. Rendu
  const { key, label } = categories[step];
  const selected = ratings[key];

  return (
    <div className="w-full max-w-xl mx-auto p-3">
      <p className="text-center text-gray-800 dark:text-gray-300 text-base sm:text-lg mb-10">
        Merci de prendre un moment pour évaluer votre satisfaction. <br />
        Ce questionnaire rapide comporte <strong>3 étapes</strong> portant sur
        la qualité de notre service. Vos réponses nous aideront à nous
        améliorer.
      </p>
      {/* ——— En‑tête de progression ——— */}
      <div className="relative flex justify-between items-center mb-10   px-2 sm:px-10">
        {categories.map((cat, index) => (
          <div
            key={cat.key}
            className="flex-1 flex flex-col items-center relative z-10"
          >
            {/* Step Circle */}
            <div
              className={`w-14 h-14 text-lg rounded-full font-bold flex items-center justify-center transition-colors duration-300 ${
                index < step
                  ? "bg-blue-600 text-white"
                  : index === step
                  ? `${
                      step === categories.length - 1
                        ? "bg-blue-500 text-white"
                        : "bg-blue-500 animate-pulse text-white"
                    }`
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>

            {/* Step Label */}
            <div className="mt-3 text-center text-base font-medium text-gray-800 dark:text-gray-300 w-24 sm:w-auto">
              {cat.label}
            </div>

            {/* Connecting Line */}
            {index < categories.length - 1 && (
              <div
                className={`absolute top-7 left-1/2 w-full h-1 ${
                  index < step ? "bg-blue-600" : "bg-gray-300"
                }`}
                style={{ right: "-50%", zIndex: -1 }}
              ></div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-gray-800 dark:text-gray-300 text-base sm:text-lg mb-10">
        <strong>Vous êtes :</strong>
      </p>

      {/* ——— Options de satisfaction ——— */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`cursor-pointer  py-6 rounded-2xl text-lg font-medium text-center shadow-md border transition-all ${color(
              opt.value,
              selected
            )}`}
          >
            <input
              type="radio"
              name={key}
              value={opt.value}
              className="hidden"
              checked={selected === opt.value}
              onChange={() => setRatings((r) => ({ ...r, [key]: opt.value }))}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="mb-10">
        <label
          htmlFor="comment"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Votre commentaire (optionnel)
        </label>
        <textarea
          id="comment"
          rows={4}
          placeholder="Laissez votre commentaire ici..."
          value={comments[key] || ""}
          onChange={(e) =>
            setComments((prev) => ({ ...prev, [key]: e.target.value }))
          }
          className="
      block
      w-full
      h-15
      rounded-md
      border
      border-gray-300
      bg-white
      p-2
      text-gray-900
      placeholder-gray-400
      focus:border-green-500
      focus:ring
      focus:ring-green-300
      focus:ring-opacity-50
      dark:bg-green-800
      dark:border-green-700
      dark:text-white
      dark:placeholder-green-400
      transition
      duration-150
      ease-in-out
    "
        />
      </div>

      {/* ——— Bouton suivant / soumettre ——— */}
      <div className="text-center">
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          disabled={!selected && step !== categories.length - 1}
        >
          {step === categories.length - 1 ? "Soumettre" : "Suivant"}
        </button>
      </div>

      {/* ——— Modal de succès (inchangé) ——— */}
      {isSuccessModalOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-600 rounded-t">
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  Merci pour votre avis !
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Vos réponses ont été enregistrées avec succès.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cette fenêtre se fermera automatiquement dans quelques
                  secondes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
