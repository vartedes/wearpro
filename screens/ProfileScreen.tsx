
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../App';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useApp();

  if (!user) return <Navigate to="/" replace />;

  const menuItems = [
    { label: 'Mis Pedidos', icon: 'inventory_2', path: '/orders', color: 'text-halloween-orange' },
    { label: 'Loyalty Hub', icon: 'loyalty', path: '/loyalty', color: 'text-halloween-purple' },
    { label: 'Direcciones', icon: 'location_on', path: '/addresses', color: 'text-primary-blue' },
    { label: 'Pagos', icon: 'credit_card', path: '/payment-methods', color: 'text-green-400' },
  ];

  return (
    <div className="bg-background-dark min-h-screen flex flex-col pb-24 text-white">
      <header className="p-6 border-b border-white/5 flex items-center justify-between">
        <h1 className="text-2xl font-black italic uppercase tracking-tighter">Shadow Profile</h1>
      </header>
      <main className="px-6 pt-8 space-y-8">
        <div className="bg-surface-dark p-8 rounded-[2.5rem] flex flex-col items-center">
          <img className="size-24 rounded-full object-cover border-4 border-primary-purple mb-4" src={user.avatar} alt={user.name} />
          <h2 className="text-xl font-bold uppercase">{user.name}</h2>
          <p className="text-xs text-gray-500 uppercase mt-1">Nivel {user.level} Society Member</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)} className="p-6 rounded-[2rem] bg-surface-dark border border-white/5 flex flex-col gap-3">
              <span className={`material-symbols-outlined text-3xl ${item.color}`}>{item.icon}</span>
              <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>
        <button onClick={() => { setUser(null); navigate('/'); }} className="w-full py-6 rounded-[2rem] border border-red-500/20 text-red-500 font-black uppercase">Cerrar Sesión</button>
      </main>
    </div>
  );
};

export default ProfileScreen;
