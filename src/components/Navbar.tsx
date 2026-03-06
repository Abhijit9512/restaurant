import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, ChefHat, LayoutDashboard, Home, Utensils, Calendar, LogOut, User } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const location = useLocation();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const isAdmin = location.pathname.startsWith('/admin') && !location.pathname.includes('/login');
  const isKitchen = location.pathname.startsWith('/kitchen');

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  if (isAdmin) {
    return (
      <nav className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/admin" className="flex items-center gap-2 text-xl font-bold">
              <LayoutDashboard className="w-6 h-6" />
              <span>Admin Panel</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/admin" className="hover:text-amber-400 transition">Dashboard</Link>
              <Link to="/admin/menu" className="hover:text-amber-400 transition">Menu</Link>
              <Link to="/admin/orders" className="hover:text-amber-400 transition">Orders</Link>
              <Link to="/admin/tables" className="hover:text-amber-400 transition">Tables</Link>
              <Link to="/admin/reservations" className="hover:text-amber-400 transition">Reservations</Link>
              <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
                <div className="flex items-center gap-2 text-slate-400">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (isKitchen) {
    return (
      <nav className="bg-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/kitchen" className="flex items-center gap-2 text-xl font-bold">
              <ChefHat className="w-6 h-6" />
              <span>Kitchen Display</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-white hover:text-orange-200 transition">
                Admin Panel
              </Link>
              <Link to="/" className="text-white hover:text-orange-200 transition">
                View Site
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <ChefHat className="w-8 h-8 text-amber-600" />
            <span>Gourmet<span className="text-amber-600">Hub</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link to="/menu" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1">
              <Utensils className="w-4 h-4" />
              <span>Menu</span>
            </Link>
            <Link to="/reservation" className="text-slate-600 hover:text-amber-600 transition flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Reserve</span>
            </Link>
            <Link to="/admin" className="text-slate-600 hover:text-amber-600 transition text-sm">
              Staff Login
            </Link>
            <Link to="/cart" className="relative text-slate-600 hover:text-amber-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
