
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useApp } from '../App';

const SearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, searchCategory, setSearchCategory } = useApp();

  const searchResults = useMemo(() => {
    return PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="bg-background-dark min-h-screen pb-24">
      <header className="p-4 bg-background-dark/95 border-b border-white/5">
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-14 bg-surface-dark rounded-xl px-4 text-white outline-none border border-white/5 focus:border-primary-purple" placeholder="Buscar..." />
      </header>
      <main className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {searchResults.map(p => (
            <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="bg-surface-dark rounded-2xl overflow-hidden p-2">
              <img src={p.image} className="w-full aspect-square object-cover rounded-xl" />
              <p className="text-white text-xs font-bold mt-2 uppercase">{p.name}</p>
              <p className="text-primary-purple font-black">${p.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchScreen;
