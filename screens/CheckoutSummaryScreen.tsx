
import React, { useState, useMemo } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../App';
import { PaymentMethod } from '../types';

const CheckoutSummaryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, notify, addresses, paymentMethods, setPaymentMethods, user } = useApp();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: addresses.find(a => a.isDefault)?.street || '',
    city: addresses.find(a => a.isDefault)?.city || '',
    postalCode: ''
  });

  const [selectedMethodId, setSelectedMethodId] = useState(paymentMethods.find(m => m.isDefault)?.id || paymentMethods[0]?.id || '');
  const [altMethod, setAltMethod] = useState<'transfer' | 'crypto' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingNewCard, setIsAddingNewCard] = useState(false);
  const [newCard, setNewCard] = useState({ type: 'visa' as 'visa' | 'mastercard', lastFour: '', expiry: '' });

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const shippingCost = 5.00;
  const total = subtotal + shippingCost;
  const orderId = useMemo(() => `WO-${Math.floor(1000 + Math.random() * 9000)}-2025`, []);

  const handleFinalize = () => {
    if (!formData.name || !formData.address || !formData.email) {
      notify("⚠️ Completa los datos de envío");
      return;
    }
    if (!selectedMethodId && !altMethod) {
      notify("⚠️ Selecciona un método de pago");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      if (altMethod === 'transfer') {
        const msg = encodeURIComponent(`¡Hola Wear One! 👋 Pedido #${orderId}. Total: $${total.toFixed(2)}.`);
        window.open(`https://wa.me/573000000000?text=${msg}`, '_blank');
      }
      navigate('/checkout-success');
      setIsProcessing(false);
    }, 2500);
  };

  const handleAddCard = () => {
    if (newCard.lastFour.length !== 4) return;
    const id = Date.now().toString();
    setPaymentMethods([...paymentMethods, { ...newCard, id, isDefault: false }]);
    setSelectedMethodId(id);
    setIsAddingNewCard(false);
  };

  if (cart.length === 0) return <Navigate to="/cart" />;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col relative text-white">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-10 text-center">
          <div className="size-20 rounded-full border-4 border-primary-purple/20 border-t-primary-purple animate-spin mb-6"></div>
          <h2 className="text-2xl font-black uppercase italic">Procesando Orden...</h2>
        </div>
      )}

      <header className="flex items-center justify-between p-4 sticky top-0 bg-background-dark/95 border-b border-white/5 z-50">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="text-xs font-black uppercase tracking-[0.4em] italic text-primary-purple">Checkout Seguro</h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-10 overflow-y-auto pb-48 no-scrollbar">
        <section className="space-y-6">
          <h2 className="text-xl font-black italic uppercase">Datos de Entrega</h2>
          <div className="space-y-3">
             <input placeholder="Nombre" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5" />
             <input placeholder="Dirección" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full h-14 bg-surface-dark border border-white/5 rounded-2xl px-5" />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-black italic uppercase">Método de Pago</h2>
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div key={method.id} onClick={() => { setSelectedMethodId(method.id); setAltMethod(null); }} className={`p-5 rounded-[2rem] border cursor-pointer flex items-center justify-between ${selectedMethodId === method.id && !altMethod ? 'bg-surface-dark border-primary-purple' : 'bg-black/20 border-white/5 opacity-60'}`}>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">{method.type === 'visa' ? 'credit_card' : 'payments'}</span>
                  <p className="text-xs font-black uppercase italic text-white">{method.type} •••• {method.lastFour}</p>
                </div>
                {selectedMethodId === method.id && !altMethod && <span className="material-symbols-outlined text-primary-purple">check_circle</span>}
              </div>
            ))}
            <div onClick={() => setAltMethod('transfer')} className={`p-5 rounded-[2rem] border cursor-pointer flex items-center justify-between ${altMethod === 'transfer' ? 'bg-[#25D366]/10 border-[#25D366]' : 'bg-black/20 border-white/5 opacity-60'}`}>
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-[#25D366]">send_to_mobile</span>
                <p className="text-xs font-black uppercase italic text-white">WhatsApp Transfer</p>
              </div>
              {altMethod === 'transfer' && <span className="material-symbols-outlined text-[#25D366]">check_circle</span>}
            </div>
          </div>
        </section>

        <section className="bg-surface-dark/40 p-6 rounded-[2rem] border border-white/5">
          <div className="flex justify-between items-end">
            <span className="text-xs font-black uppercase text-gray-400">Total Final</span>
            <span className="text-3xl font-black italic text-white">${total.toFixed(2)}</span>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-8 bg-background-dark/95 border-t border-white/5 z-40">
        <button onClick={handleFinalize} disabled={isProcessing} className={`w-full h-20 rounded-[2.5rem] flex items-center justify-between px-10 font-black uppercase text-sm ${altMethod === 'transfer' ? 'bg-[#25D366] text-white' : 'bg-white text-black'}`}>
          <span>{altMethod === 'transfer' ? 'Abrir WhatsApp' : 'Completar Compra'}</span>
          <span className="material-symbols-outlined text-2xl">bolt</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummaryScreen;
