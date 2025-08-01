import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import OTPForm from "../components/OTPForm";
import Emailverification from "../components/Emailverification";
import ModifyPassword from "../components/ModifyPassword";

const ForgotPassword = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleEmailverification = async (email) => {
    try {
      setEmail(email);
      setStep1(false);
      setStep2(true);
    } catch (error) {
      console.error("Erreur de vérification e-mail", error);
    }
  };

  const handleOTPSubmit = async (code) => {
    try {
      const response = await api.post(
        `/auth/forgotpassword/verifyOTP/${code}/${email}`
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log("OTP vérifié avec succès");
        setStep2(false);
        setStep3(true);
      } else {
        alert("Erreur lors de la vérification de l'OTP");
        return;
      }
    } catch (error) {
      console.error("Erreur de vérification OTP", error);
    }
  };

  const handleModifyPassword = async (newPassword, passwordonf) => {
    try {
      if (newPassword !== passwordonf) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
      const response = await api.post(
        `/auth/forgotpassword/modifyPassword/${email}/${newPassword}`
      );
      // console.log(response);
      if (response.status === 200) {
        alert("Mot de passe modifié avec succès");
        navigate("/login");
      } else {
        alert("Erreur lors de la modification du mot de passe");
      }
    } catch (error) {
      console.error("Erreur de modification du mot de passe", error);
    }
  };

  return (
    <div>
      {" "}
      {step1 && <Emailverification onSubmit={handleEmailverification} />}
      {step2 && <OTPForm onSubmit={handleOTPSubmit} />}
      {step3 && <ModifyPassword onSubmit={handleModifyPassword} />}
    </div>
  );
};

export default ForgotPassword;
