
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark min-h-screen p-6 flex flex-col items-center">
      <header className="w-full mb-10"><button onClick={() => navigate(-1)} className="text-white"><span className="material-symbols-outlined">arrow_back</span></button></header>
      <h1 className="text-3xl font-extrabold uppercase italic text-white mb-4">Recuperar Acceso</h1>
      <input className="w-full h-14 bg-surface-dark rounded-xl px-4 text-white mb-4" placeholder="Email" type="email" />
      <button onClick={() => alert("Enlace enviado")} className="w-full bg-primary-blue h-14 rounded-xl text-white font-bold">Enviar Enlace</button>
    </div>
  );
};

export default ForgotPasswordScreen;
