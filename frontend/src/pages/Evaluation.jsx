import React, { useState, useEffect } from "react";
import SatisfactionRadioGroup from "../components/SatisfactionRadioGroup";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import { Riple } from "react-loading-indicators";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function Evaluation() {
  const [user, setUser] = useState(null);
  const { codeCentre } = useParams();
  const [token] = useState(localStorage.getItem("TOKEN"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await UserService.getYourProfile(token);
        console.log("User data:", res);
        setUser(res.administrateur);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Riple color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!user || !user.villeCentre) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md border border-red-200">
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-red-700">Informations d'administrateur non disponibles.</h2>
        <p className="text-sm text-gray-500 text-center">
          Veuillez réessayer ou contacter le support technique si le problème persiste.
        </p>
      </div>
    </div>
    );
  }

  return (
    <div>
      <section className="min-h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
        <div className="space-y-4">
          
          <SatisfactionRadioGroup codeCentre={user.villeCentre.idCentre} />
          
        </div>
      </section>
    </div>
  );
}

export default Evaluation;
