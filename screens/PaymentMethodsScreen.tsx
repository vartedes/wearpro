
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const PaymentMethodsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { paymentMethods } = useApp();

  return (
    <div className="bg-background-dark min-h-screen p-6">
      <header className="mb-8"><button onClick={() => navigate(-1)}><span className="material-symbols-outlined text-white">arrow_back</span></button></header>
      <h1 className="text-2xl font-black italic uppercase mb-6">Métodos de Pago</h1>
      {paymentMethods.map(m => (
        <div key={m.id} className="p-6 bg-surface-dark rounded-3xl border border-white/5 mb-4">
          <p className="text-white font-bold uppercase">{m.type} •••• {m.lastFour}</p>
          <p className="text-xs text-gray-500">Vence: {m.expiry}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsScreen;
