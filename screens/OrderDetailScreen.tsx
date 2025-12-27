
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const OrderDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-background-dark min-h-screen flex flex-col">
      <header className="p-4 border-b border-white/5 flex items-center">
        <button onClick={() => navigate(-1)} className="text-white"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="flex-1 text-center font-bold uppercase">Orden #{id}</h2>
      </header>
      <main className="p-6">
        <div className="bg-surface-dark rounded-3xl p-6 border border-white/5">
          <p className="text-primary-purple text-xs font-black uppercase tracking-widest">En Tránsito</p>
          <h3 className="text-2xl font-black italic text-white mt-2">Llega el 31 de OCT</h3>
        </div>
      </main>
    </div>
  );
};

export default OrderDetailScreen;
