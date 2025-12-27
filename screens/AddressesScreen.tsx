
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const AddressesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addresses } = useApp();

  return (
    <div className="bg-background-dark min-h-screen p-6">
      <header className="mb-8"><button onClick={() => navigate(-1)}><span className="material-symbols-outlined text-white">arrow_back</span></button></header>
      <h1 className="text-2xl font-black italic uppercase mb-6">Direcciones</h1>
      {addresses.map(a => (
        <div key={a.id} className="p-6 bg-surface-dark rounded-3xl border border-white/5 mb-4">
          <p className="text-white font-bold">{a.label}</p>
          <p className="text-xs text-gray-500">{a.street}</p>
        </div>
      ))}
    </div>
  );
};

export default AddressesScreen;
