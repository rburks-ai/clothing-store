'use client';

import { useState } from 'react';
import { ShoppingCart, Menu, X, Search, Heart, User, Trash2, Plus, Minus, Star, TrendingUp, Sparkles } from 'lucide-react';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: 'Classic White Tee', price: 29.99, oldPrice: 39.99, category: 'tops', rating: 4.5, reviews: 128, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Gray'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', tag: 'Best Seller' },
    { id: 2, name: 'Denim Jacket', price: 89.99, oldPrice: 129.99, category: 'outerwear', rating: 4.8, reviews: 94, sizes: ['S', 'M', 'L', 'XL'], colors: ['Blue', 'Black'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop', tag: 'Sale' },
    { id: 3, name: 'Black Skinny Jeans', price: 69.99, oldPrice: null, category: 'bottoms', rating: 4.6, reviews: 203, sizes: ['26', '28', '30', '32', '34'], colors: ['Black', 'Dark Blue'], image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop', tag: null },
    { id: 4, name: 'Leather Boots', price: 149.99, oldPrice: null, category: 'shoes', rating: 4.9, reviews: 67, sizes: ['7', '8', '9', '10', '11'], colors: ['Brown', 'Black'], image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=500&fit=crop', tag: 'Trending' },
    { id: 5, name: 'Striped Sweater', price: 59.99, oldPrice: 79.99, category: 'tops', rating: 4.3, reviews: 156, sizes: ['S', 'M', 'L', 'XL'], colors: ['Navy', 'Gray', 'Burgundy'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', tag: 'Sale' },
    { id: 6, name: 'Summer Dress', price: 79.99, oldPrice: null, category: 'dresses', rating: 4.7, reviews: 89, sizes: ['XS', 'S', 'M', 'L'], colors: ['Floral', 'Solid Black', 'Red'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop', tag: 'New' },
    { id: 7, name: 'Wool Coat', price: 199.99, oldPrice: 279.99, category: 'outerwear', rating: 4.9, reviews: 45, sizes: ['S', 'M', 'L'], colors: ['Camel', 'Black', 'Gray'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop', tag: 'Sale' },
    { id: 8, name: 'Running Sneakers', price: 89.99, oldPrice: null, category: 'shoes', rating: 4.4, reviews: 312, sizes: ['7', '8', '9', '10', '11', '12'], colors: ['White', 'Black', 'Gray'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop', tag: 'Best Seller' },
  ];

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes'];

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product, size, color) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.size === size && item.color === color
    );
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, size, color }]);
    }
    showNotification(`${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const removeFromCart = (productId, size, color) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size && item.color === color)));
    showNotification('Item removed from cart');
  };

  const updateQuantity = (productId, size, color, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.size === size && item.color === color) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showNotification('Removed from wishlist');
    } else {
      setWishlist([...wishlist, product]);
      showNotification('Added to wishlist!');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cart.reduce((sum, item) => sum + ((item.oldPrice || item.price) - item.price) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {notification}
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-indigo-600" size={24} />
                STYLEHAUS
              </h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition font-medium">New Arrivals</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition font-medium">Men</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition font-medium">Women</a>
              <a href="#" className="text-red-600 hover:text-red-700 transition font-medium">Sale</a>
            </nav>

            <div className="flex items-center space-x-2">
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button 
                className="p-2 text-gray-700 hover:text-red-600 transition relative"
                onClick={() => wishlist.length > 0 && showNotification(`${wishlist.length} items in wishlist`)}
              >
                <Heart size={20} fill={wishlist.length > 0 ? "currentColor" : "none"} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-700 hover:text-indigo-600 transition">
                <User size={20} />
              </button>
              <button 
                className="p-2 text-gray-700 hover:text-indigo-600 transition relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">New Arrivals</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Men</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600">Women</a>
              <a href="#" className="block py-2 text-red-600 hover:text-red-700">Sale</a>
            </div>
          </div>
        )}
      </header>

      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shopping Cart ({totalItems})</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">Size: {item.size} | Color: {item.color}</p>
                        <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.id, item.size, item.color)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save:</span>
                    <span className="font-semibold">${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProduct(null)} />
            <div className="relative bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(selectedProduct.rating) ? "gold" : "none"}
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold text-indigo-600">${selectedProduct.price.toFixed(2)}</span>
                    {selectedProduct.oldPrice && (
                      <span className="text-xl text-gray-400 line-through">${selectedProduct.oldPrice.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Size:</label>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProduct.sizes.map(size => (
                        <button 
                          key={size}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block font-semibold mb-2">Color:</label>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProduct.colors.map(color => (
                        <button 
                          key={color}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition"
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => addToCart(selectedProduct, selectedProduct.sizes[0], selectedProduct.colors[0])}
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="p-3 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition"
                    >
                      <Heart fill={wishlist.find(w => w.id === selectedProduct.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">Winter Collection 2024</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">New Arrivals Are Here</h2>
            <p className="text-xl mb-8 text-gray-100">Discover the latest trends with up to 40% off</p>
            <div className="flex gap-4">
              <button className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition">
                View Sale
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          {searchQuery && <span> for "<span className="font-semibold text-indigo-600">{searchQuery}</span>"</span>}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">No products found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
                {product.tag && (
                  <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold ${
                    product.tag === 'Sale' ? 'bg-red-600 text-white' :
                    product.tag === 'New' ? 'bg-green-600 text-white' :
                    product.tag === 'Trending' ? 'bg-purple-600 text-white' :
                    'bg-yellow-400 text-gray-900'
                  }`}>
                    {product.tag}
                  </div>
                )}
                
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                >
                  <Heart 
                    size={18} 
                    className={wishlist.find(w => w.id === product.id) ? "text-red-600" : "text-gray-600"}
                    fill={wishlist.find(w => w.id === product.id) ? "currentColor" : "none"}
                  />
                </button>

                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < Math.floor(product.rating) ? "gold" : "none"}
                          className="text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{product.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <>
                        <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                          {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition text-sm"
                    >
                      Quick View
                    </button>
                    <button 
                      onClick={() => addToCart(product, product.sizes[0], product.colors[0])}
                      className="p-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

          <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} STYLEHAUS. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
