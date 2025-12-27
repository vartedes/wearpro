
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const LoyaltyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, notify } = useApp();
  const [claimed, setClaimed] = useState(false);

  if (!user) return null;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 text-white">
      <header className="p-4 border-b border-white/5 flex items-center justify-between">
        <button onClick={() => navigate(-1)}><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-lg font-bold uppercase">Loyalty Hub</h2>
        <div className="w-6"></div>
      </header>
      <main className="p-6">
        <div className="bg-surface-dark rounded-[2rem] p-8 mb-8 border border-white/5">
          <p className="text-[10px] uppercase text-gray-500 mb-2">Experiencia Actual</p>
          <p className="text-4xl font-black text-primary-purple">{user.xp} XP</p>
          <div className="h-4 w-full bg-black/40 rounded-full mt-4 overflow-hidden"><div className="h-full bg-primary-purple" style={{width: `${(user.xp/2000)*100}%`}}></div></div>
          <button onClick={() => {setClaimed(true); notify("+50 XP Reclamados");}} disabled={claimed} className="w-full py-4 mt-6 bg-white text-black rounded-xl font-bold uppercase tracking-widest">{claimed ? "Ya reclamado" : "Reclamar +50 XP"}</button>
        </div>
      </main>
    </div>
  );
};

export default LoyaltyScreen;
