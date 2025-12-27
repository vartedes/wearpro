
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';
import { MOCK_USER } from '../constants';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...MOCK_USER, name: form.name, email: form.email });
    navigate('/home');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark p-6">
      <h1 className="text-white text-3xl font-extrabold uppercase italic mb-8 text-center">Crear Cuenta</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input placeholder="Usuario" className="w-full h-14 rounded-xl bg-surface-dark p-4 text-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" className="w-full h-14 rounded-xl bg-surface-dark p-4 text-white" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Contraseña" type="password" className="w-full h-14 rounded-xl bg-surface-dark p-4 text-white" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" className="w-full h-14 bg-primary-blue rounded-xl text-white font-bold uppercase mt-4">Registrarme</button>
        <Link to="/" className="text-center text-sm text-gray-500 mt-4">¿Ya tienes cuenta? Inicia Sesión</Link>
      </form>
    </div>
  );
};

export default RegisterScreen;
