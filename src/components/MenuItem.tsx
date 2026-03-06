import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import type { MenuItem as MenuItemType } from '../services/supabaseClient';

interface MenuItemProps {
  item: MenuItemType;
}

export function MenuItem({ item }: MenuItemProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ ...item, quantity });
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{item.category}</span>
            <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
          </div>
          <span className="text-xl font-bold text-amber-600">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-slate-200 rounded-l-lg transition"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-slate-200 rounded-r-lg transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
