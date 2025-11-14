'use client';

import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Heart, User } from 'lucide-react';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'Classic White Tee', price: 29.99, category: 'tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop' },
    { id: 2, name: 'Denim Jacket', price: 89.99, category: 'outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop' },
    { id: 3, name: 'Black Skinny Jeans', price: 69.99, category: 'bottoms', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop' },
    { id: 4, name: 'Leather Boots', price: 149.99, category: 'shoes', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=500&fit=crop' },
    { id: 5, name: 'Striped Sweater', price: 59.99, category: 'tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop' },
    { id: 6, name: 'Summer Dress', price: 79.99, category: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop' },
  ];

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">STYLEHAUS</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900">New Arrivals</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Men</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Women</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Sale</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900">
                <User size={20} />
              </button>
              <button className="p-2 text-gray-700 hover:text-gray-900 relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              <a href="#" className="block py-2 text-gray-700">New Arrivals</a>
              <a href="#" className="block py-2 text-gray-700">Men</a>
              <a href="#" className="block py-2 text-gray-700">Women</a>
              <a href="#" className="block py-2 text-gray-700">Sale</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">New Collection</h2>
          <p className="text-xl mb-8">Discover the latest trends in fashion</p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-96 object-cover group-hover:scale-105 transition duration-300"
                />
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition hover:bg-gray-100"
                >
                  Add to Cart
                </button>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cart */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 md:hidden z-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Cart Total</p>
              <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold">
              Checkout ({totalItems})
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">STYLEHAUS</h3>
              <p className="text-gray-400">Your destination for contemporary fashion</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 STYLEHAUS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
