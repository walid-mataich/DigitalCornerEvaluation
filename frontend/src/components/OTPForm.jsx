import { useRef, useState } from "react";
import api from "../api/axios";


export default function OTPForm({ onSubmit, onResend }) {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value.charAt(value.length - 1);
    setOtp(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    
    if (code.length === 6) {
      if (onSubmit) onSubmit(code);
      else alert(`Code soumis : ${code}`);
    } else {
      alert("Veuillez saisir les 6 chiffres du code.");
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
        <div className="flex justify-center">
          <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
            <header className="mb-8">
              <h1 className="text-2xl font-bold mb-1">
                Vérification d’adresse e-mail
              </h1>
              <p className="text-[15px] text-slate-500">
                Saisissez le code de vérification à 6 chiffres qui a été envoyé
                à votre adresse e-mail.
              </p>
            </header>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center justify-center gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-green-400 focus:ring-2 focus:ring-green-100"
                  />
                ))}
              </div>

              <div className="max-w-[260px] mx-auto mt-4">
                <button
                  type="submit"
                  className="cursor-pointer w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-green-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-green-950/10 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 focus-visible:outline-none focus-visible:ring transition-colors duration-150"
                >
                  Vérifier
                </button>
              </div>
            </form>

            <div className="text-sm text-slate-500 mt-4">
              Vous n’avez pas reçu le code ?{" "}
              <button
                type="button"
                onClick={onResend}
                className="cursor-pointer font-medium text-green-800 hover:text-green-600"
              >
                Renvoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
