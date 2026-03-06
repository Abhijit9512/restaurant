import { Link } from 'react-router-dom';
import { ChefHat, Calendar, ShoppingBag, ArrowRight, Star } from 'lucide-react';

export function Home() {
  const featuredDishes = [
    { name: 'Truffle Mushroom Risotto', price: 24.99, image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400' },
    { name: 'Grilled Salmon Fillet', price: 28.99, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
    { name: 'Chocolate Lava Cake', price: 11.99, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-amber-400">GourmetHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Experience culinary excellence with our carefully crafted dishes made from the finest ingredients
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition transform hover:scale-105"
            >
              <ShoppingBag className="w-5 h-5" />
              Order Food
            </Link>
            <Link
              to="/reservation"
              className="bg-white hover:bg-slate-100 text-slate-800 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition transform hover:scale-105"
            >
              <Calendar className="w-5 h-5" />
              Book Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose Us</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We pride ourselves on delivering exceptional dining experiences</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Expert Chefs</h3>
              <p className="text-slate-600">Our world-class chefs bring years of experience and passion to every dish</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Premium Quality</h3>
              <p className="text-slate-600">Only the freshest ingredients sourced from local and international suppliers</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Easy Booking</h3>
              <p className="text-slate-600">Reserve your table online in seconds for a seamless dining experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Featured Dishes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Discover our most popular culinary creations</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDishes.map((dish, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{dish.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-600">${dish.price.toFixed(2)}</span>
                    <Link to="/menu" className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                      View Menu <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience GourmetHub?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Whether you want to dine in or order for delivery, we've got you covered
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/menu"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold transition"
            >
              Browse Full Menu
            </Link>
            <Link
              to="/reservation"
              className="border-2 border-white hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-full font-semibold transition"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
