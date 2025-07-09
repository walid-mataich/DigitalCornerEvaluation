import { useState } from "react";
import api from "../api/axios";

export default function SatisfactionRadioGroup(props) {
  const [selected, setSelected] = useState("");
  const [token, setToken] = useState(localStorage.getItem("TOKEN"));
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const options = [
    { label: "😄 Très satisfait", value: "tres satisfait" },
    { label: "🙂 Satisfait", value: "satisfait" },
    { label: "😐 Peu satisfait", value: "peu satisfait" },
    { label: "🙁 Pas du tout satisfait", value: "pas du tout satisfait" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async () => {
    if (!selected) {
      alert("Veuillez sélectionner un niveau de satisfaction.");
    } else {
      console.log(token);
      await api.post(
        `/superadmin/evaluations/add?avis=${selected}&idCentre=${props.codeCentre}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show success modal
      setIsSuccessModalOpen(true);

      // Wait 10 seconds then reload
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        window.location.reload();
      }, 7000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 ">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer px-8 py-6 rounded-2xl text-xl font-medium text-center shadow-md border transition-all
           

               ${
                 selected === option.value
                   ? selected == "tres satisfait"
                     ? " bg-green-600"
                     : selected == "satisfait"
                     ? " bg-green-300 "
                     : selected == "peu satisfait"
                     ? " bg-yellow-500 "
                     : selected == "pas du tout satisfait"
                     ? " bg bg-red-600"
                     : ""
                   : "bg-white "
               }
            `}
          >
            <input
              type="radio"
              name="satisfaction"
              value={option.value}
              className="hidden"
              onChange={() => setSelected(option.value)}
              checked={selected === option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-green-600 text-white px-6 py-3 m-10 rounded-full text-lg font-semibold hover:bg-green-700 transition-all"
        >
          Soumettre
        </button>
      </div>

      {isSuccessModalOpen && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(120%-1rem)] max-h-full"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="relative p-4 w-full max-w-2xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  Merci pour votre avis !
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setIsSuccessModalOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  Votre réponse a été enregistrée avec succès.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cette fenêtre se fermera automatiquement dans quelques
                  secondes.
                </p>
              </div>

              <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => setIsSuccessModalOpen(false)}
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
