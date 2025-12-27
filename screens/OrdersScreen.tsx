
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const OrdersScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-dark min-h-screen p-6">
      <header className="flex items-center mb-8"><button onClick={() => navigate(-1)}><span className="material-symbols-outlined text-white">arrow_back</span></button><h1 className="flex-1 text-center font-bold text-xl uppercase italic">Mis Pedidos</h1></header>
      <div onClick={() => navigate('/order/9921')} className="p-4 bg-surface-dark rounded-2xl border border-primary-purple/40 flex gap-4 cursor-pointer">
        <div className="size-20 rounded-xl bg-gray-800"></div>
        <div className="flex-1"><p className="text-white font-black uppercase">#WO-9921</p><p className="text-xs text-gray-500">31 OCT • En Camino</p></div>
      </div>
    </div>
  );
};

export default OrdersScreen;
