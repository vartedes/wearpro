
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { PRODUCTS } from '../constants';
import { getStyleAdvice } from '../services/geminiService';

const ProductDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      
      const fetchAdvice = async () => {
        setLoadingAdvice(true);
        const advice = await getStyleAdvice(product.name, product.description);
        setAiAdvice(advice);
        setLoadingAdvice(false);
      };
      fetchAdvice();
    }
  }, [product]);

  if (!product) return <div className="p-10 text-center">Producto no encontrado</div>;

  const handleAddToCart = () => {
    setIsAnimating(true);
    addToCart({ ...product, quantity: 1, selectedSize, selectedColor });
    setTimeout(() => {
      setIsAnimating(false);
      setShowSuccessModal(true);
    }, 200);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity: 1, selectedSize, selectedColor });
    navigate('/cart');
  };

  return (
    <div className="bg-background-dark min-h-screen flex flex-col relative pb-32">
      {showSuccessModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative w-full max-w-sm bg-surface-dark border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="size-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <span className="material-symbols-outlined text-4xl filled">check_circle</span>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">¡Añadido al Vacío!</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-8">
                {product.name} ahora es parte de tu bolsa.
              </p>
              <div className="flex flex-col w-full gap-3">
                <button onClick={() => setShowSuccessModal(false)} className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px]">Seguir Explorando</button>
                <button onClick={() => navigate('/cart')} className="w-full py-4 rounded-2xl bg-primary-purple text-white font-black uppercase tracking-widest text-[10px]">Ir a la Bolsa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTryOnActive && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col animate-in fade-in duration-300">
          <div className="absolute top-10 left-6 z-[110]">
            <button onClick={() => setIsTryOnActive(false)} className="size-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            <div className="size-80 rounded-3xl border-2 border-dashed border-white/30 relative overflow-hidden flex items-center justify-center">
              <img src={product.image} alt="Overlay" className="w-full h-full object-cover scale-110 opacity-60" />
            </div>
          </div>
        </div>
      )}

      <div className="relative h-[60vh] w-full shrink-0">
        <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-6">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white border border-white/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button onClick={() => setIsTryOnActive(true)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-purple text-white border border-white/10 font-bold text-[10px] uppercase tracking-widest">
            <span className="material-symbols-outlined text-lg">view_in_ar</span> Try On
          </button>
        </div>
        <img className="h-full w-full object-cover object-top" src={product.image} alt={product.name} />
      </div>

      <div className="relative -mt-12 flex flex-1 flex-col rounded-t-[2.5rem] bg-background-dark px-6 pt-10 ring-1 ring-white/5">
        <h1 className="text-3xl font-bold leading-none text-white tracking-tight italic uppercase">{product.name}</h1>
        <p className="text-white text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>

        <div className="mt-6 mb-8 p-4 bg-primary-purple/10 border border-primary-purple/20 rounded-2xl">
          <p className="text-sm text-gray-300 italic">{loadingAdvice ? "Cargando consejos..." : aiAdvice}</p>
        </div>

        <div className="space-y-8 mb-8">
          <div>
            <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-4">Color</p>
            <div className="flex gap-4">
              {product.colors.map(color => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`size-12 rounded-full ring-offset-4 ring-offset-background-dark ${selectedColor === color ? 'ring-2 ring-primary-purple scale-110' : 'opacity-60'}`} style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-4">Tamaño</p>
            <div className="flex gap-3">
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`h-14 w-14 rounded-2xl border-2 font-black ${selectedSize === size ? 'bg-primary-purple border-primary-purple' : 'border-white/5 bg-surface-dark'}`}>{size}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full max-w-[480px] bg-background-dark/95 backdrop-blur-xl border-t border-white/5 p-5 z-50 flex gap-3">
        <button onClick={handleAddToCart} className="flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 bg-surface-dark border border-white/10 text-white">Añadir</button>
        <button onClick={handleBuyNow} className="flex-[2] bg-primary-purple py-5 rounded-2xl text-white font-bold uppercase tracking-[0.2em] text-xs">Comprar Ahora</button>
      </div>
    </div>
  );
};

export default ProductDetailScreen;
