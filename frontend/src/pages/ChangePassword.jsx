import React from "react";
import { useState, useEffect } from "react";
import OTPForm from "../components/OTPForm";
import ModifyPassword from "../components/ModifyPassword";
import api from "../api/axios";

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const role = localStorage.getItem("ROLE"); // "SUPERADMIN" or "ADMIN"
  const token = localStorage.getItem("TOKEN");
  const [administrateur, setAdministrateur] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/adminsuperadmin/get-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Profil administrateur récupéré :", response.data);
        setAdministrateur(response.data.administrateur);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);

        setAdministrateur(null);
      }
    };
    fetchProfileData();
  }, [token]);

  const handleOTPSubmit = async (code) => {
    try {
      const response = await api.post(
        `/auth/forgotpassword/verifyOTP/${code}/${administrateur.email}`
      );

      if (response.status == 200) {
        setStep(2);
      } else {
        alert("Le code est invalide ou expiré. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du code OTP :", error);
      alert(
        "Une erreur s'est produite lors de la vérification. Veuillez réessayer."
      );
    }
  };
  const handleModifyPasswordSubmit = async (password, PasswordConf) => {
    if (!administrateur || !administrateur.email) {
      alert("Les informations de l'utilisateur ne sont pas disponibles.");
      return;
    }

    try {
      if (password !== PasswordConf) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      const response = await api.post(
        `/auth/forgotpassword/modifyPassword/${administrateur.email}/${password}`
      );

      if (response.status === 200) {
        alert("Mot de passe modifié avec succès !");
        window.location.href =
          role === "SUPERADMIN" ? "/general/profile" : "/admin/profile";
      } else {
        alert("Erreur lors de la modification du mot de passe.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du mot de passe :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  if (!administrateur) return <div>Chargement du profil...</div>;

  return (
    <div>
      {step == 1 && <OTPForm onSubmit={handleOTPSubmit} />}
      {step == 2 && <ModifyPassword onSubmit={handleModifyPasswordSubmit} />}
    </div>
  );
};

export default ChangePassword;
