
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../App';

const CartScreen: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useApp();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = subtotal > 150 ? 25 : 0;
  const total = subtotal - discount;

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-32">
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-dark/95 backdrop-blur-xl px-6 py-6 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-white hover:text-halloween-orange transition-colors">
          <span className="material-symbols-outlined font-bold">arrow_back_ios</span>
        </button>
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">
          Bolsa <span className="text-primary-purple ml-1">[{cart.reduce((s,i)=>s+i.quantity,0)}]</span>
        </h2>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 px-6 py-6 space-y-8 overflow-y-auto no-scrollbar">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
            <div className="size-28 rounded-[2rem] bg-surface-dark flex items-center justify-center border border-white/5 animate-pulse shadow-2xl">
              <span className="material-symbols-outlined text-6xl text-gray-700">shopping_cart_off</span>
            </div>
            <p className="text-white font-black text-2xl uppercase italic tracking-tighter">Bolsa Vacía</p>
            <button onClick={() => navigate('/home')} className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px]">Explorar Drops</button>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${item.selectedSize}-${idx}`} className="flex gap-5 rounded-[2rem] bg-surface-dark p-5 border border-white/5 shadow-xl animate-in slide-in-from-left duration-500">
                  <div className="size-24 rounded-2xl overflow-hidden bg-black shrink-0">
                    <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase">{item.name}</h3>
                        <p className="text-[9px] text-gray-500 uppercase mt-2">{item.selectedSize} • {item.selectedColor}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-lg">delete_sweep</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-black text-white italic tracking-tighter">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 bg-black/50 rounded-2xl px-4 py-2 border border-white/10">
                        <button onClick={() => updateCartQuantity(item.id, -1)} className="text-white opacity-40 hover:opacity-100">－</button>
                        <span className="text-xs font-black text-white">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} className="text-white opacity-40 hover:opacity-100">＋</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-[2.5rem] bg-surface-dark p-8 flex flex-col gap-5 border border-white/5 mb-12">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-medium border-t border-white/10 pt-4">
                <span className="text-gray-400 uppercase tracking-widest">Total Final</span>
                <span className="text-3xl font-black text-white italic tracking-tighter">${total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </main>

      {cart.length > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 z-40">
          <button onClick={() => navigate('/checkout-summary')} className="w-full bg-primary-purple text-white font-black h-20 rounded-[2.5rem] shadow-2xl flex items-center justify-between px-10 active:scale-95 transition-all">
            <span className="uppercase tracking-[0.3em] text-[11px] italic font-black">Proceder al Pago</span>
            <span className="material-symbols-outlined text-3xl">bolt</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
