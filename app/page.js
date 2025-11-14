'use client';

import React, { useState, useEffect } from 'react';
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
      {/* Rest of the component code from the artifact... */}
    </div>
  );
}
