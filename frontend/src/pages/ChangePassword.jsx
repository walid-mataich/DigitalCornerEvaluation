import React from "react";
import { useState } from "react";
import OTPForm from "../components/OTPForm";
import ModifyPassword from "../components/ModifyPassword";

const ChangePassword = () => {
  const [step, setStep] = useState(1);
  const role = localStorage.getItem("ROLE"); // "SUPERADMIN" or "ADMIN"

  const handleOTPSubmit = async (code) => {
    // Logique pour soumettre le code OTP
    console.log("Code OTP soumis :", code);
    // Passer à l'étape suivante après la soumission réussie
    setStep(2);
  };
  const handleModifyPasswordSubmit = async (password, newPassword) => {
    console.log("role :" + role);
    // Logique pour modifier le mot de passe
    console.log("Nouveau mot de passe soumis :", newPassword);
    // Rediriger ou afficher un message de succès
    alert("Mot de passe modifié avec succès !");
    // Redirection vers la page de connexion ou autre
    window.location.href =
      role == "SUPERADMIN" ? "/general/profile" : "/admin/profile";
  };

  return (
    <div>
      {step == 1 && <OTPForm onSubmit={handleOTPSubmit} />}
      {step == 2 && <ModifyPassword onSubmit={handleModifyPasswordSubmit} />}
    </div>
  );
};

export default ChangePassword;
