
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { PaymentMethod } from '../types';

const CheckoutPaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, notify, paymentMethods, setPaymentMethods, user } = useApp();
  
  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods.find(m => m.isDefault)?.id || paymentMethods[0]?.id || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = useMemo(() => cart.reduce((a, b) => a + (b.price * b.quantity), 0), [cart]);
  const total = subtotal + 5.00;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/checkout-success');
      setIsProcessing(false);
      notify("🔥 ¡Transacción Procesada!");
    }, 2800);
  };

  if (cart.length === 0) return <button onClick={() => navigate('/home')}>Volver</button>;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col text-white">
      <header className="p-6 border-b border-white/5">
        <h1 className="text-xs font-black uppercase tracking-[0.4em] text-primary-purple">Pasarela de Pago</h1>
      </header>
      <main className="p-6 flex-1 space-y-6">
        <div className="p-6 bg-surface-dark rounded-[2rem]">
          <p className="text-xs text-gray-500 uppercase font-black">Total a pagar</p>
          <p className="text-4xl font-black italic">${total.toFixed(2)}</p>
        </div>
        <button onClick={handlePay} className="w-full h-20 bg-white text-black rounded-[2rem] font-black uppercase">Pagar Ahora</button>
      </main>
    </div>
  );
};

export default CheckoutPaymentScreen;
