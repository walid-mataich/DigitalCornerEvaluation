import React from "react";
import { useState, useEffect } from "react";
import api from "../api/axios";

const Test = ({}) => {
  const [administrateur, setAdministrateur] = useState(null);
  const [token] = useState(localStorage.getItem("TOKEN"));

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/adminsuperadmin/get-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profil administrateur récupéré :", response.data);
        setAdministrateur(response.data.administrateur);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
        setAdministrateur(null);
      }
    };
    fetchProfileData();
  }, []);

  if (!administrateur) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-10">
      {/* Header */}
      <div className="flex items-center space-x-6 border-b pb-6">
        <div className="h-20 w-20 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          {administrateur.nom.charAt(0)}
          {administrateur.prenom.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{`${administrateur.nom} ${administrateur.prenom}`}</h2>
          <p className="text-sm text-gray-500">{administrateur.email}</p>
          <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full">
            {administrateur.role}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Personal Info
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-500">ID:</span>
              <span className="font-medium">
                {administrateur.idAdministrateur}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium">{administrateur.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Username:</span>
              <span className="font-medium">{administrateur.username}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="font-medium text-green-500">Active</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Account Status
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-500">Enabled:</span>
              <span className="font-medium">
                {administrateur.enabled ? "Yes" : "No"}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Account Expired:</span>
              <span className="font-medium">
                {administrateur.accountNonExpired ? "No" : "Yes"}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Credentials Expired:</span>
              <span className="font-medium">
                {administrateur.credentialsNonExpired ? "No" : "Yes"}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-500">Account Locked:</span>
              <span className="font-medium">
                {administrateur.accountNonLocked ? "No" : "Yes"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end space-x-4">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Test;
