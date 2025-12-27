
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const CheckoutSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useApp();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="bg-background-dark min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="size-36 rounded-full bg-surface-dark border-4 border-green-500/30 flex items-center justify-center mb-12">
        <span className="material-symbols-outlined text-8xl text-green-500 filled">check_circle</span>
      </div>
      <h2 className="text-4xl font-black mb-4 text-white uppercase italic tracking-tighter">¡Orden Confirmada!</h2>
      <p className="text-gray-500 mb-10 text-xs">Tu estilo está en camino.</p>
      <button onClick={() => navigate('/home')} className="w-full h-16 bg-white text-black font-black uppercase rounded-[1.8rem] mb-4">Volver al Inicio</button>
      <button onClick={() => navigate('/orders')} className="w-full h-16 bg-surface-dark text-gray-400 font-black uppercase rounded-[1.8rem]">Mis Pedidos</button>
    </div>
  );
};

export default CheckoutSuccessScreen;
