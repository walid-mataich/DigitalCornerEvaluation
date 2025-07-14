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

  const handleEmailverification = async (email) => {
    try {
      // const response = await api.post(
      //   `/auth/forgotpassword/verifyMail/${email}`
      // );
      // const result = await response.text();
      setStep1(false);
      setStep2(true);

      // if (response.ok) {
      //   alert(result);
      //   setStep1(false);
      //   setStep2(true);
      // } else {
      //   alert("err : " + result);
      // }
    } catch (error) {
      console.error("Erreur de vérification e-mail", error);
    }
  };

  const handleOTPSubmit = async (otp) => {
    try {
      setStep2(false);
      setStep3(true);
      // const response = await api.post(
      //   `/auth/forgotpassword/verifyOTP/${otp}`
      // );
      // const result = await response.text();

      // if (response.ok) {
      //   alert(result);
      //   setStep2(false);
      //   setStep3(true);
      // } else {
      //   alert("err : " + result);
      // }
    } catch (error) {
      console.error("Erreur de vérification OTP", error);
    }
  };

  return (
    <div>
      {" "}
      {step1 && <Emailverification onSubmit={handleEmailverification} />}
      {step2 && <OTPForm onSubmit={handleOTPSubmit} />}
      {step3 && <ModifyPassword />}
    </div>
  );
};

export default ForgotPassword;
