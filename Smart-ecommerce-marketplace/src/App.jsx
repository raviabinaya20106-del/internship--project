import React, { useState } from 'react';
import Home from './Components/Home';
import Products from './Components/Products'; 
import WishlistPage from './Components/WishPage'; 
import CartPage from './Components/Cartpage';    
import CheckoutPage from './Components/CheckoutPage'; 

const GLOBAL_PRODUCTS = [
  { 
    id: 1, 
    title: "Premium Wireless Headphones", 
    originalPrice: 12499,
    price: 11249, 
    hasDiscount: true,
    discountText: "10% OFF",
    rating: 4.5, 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", 
    inStock: true, 
    desc: "High-fidelity sound with Active Noise Cancelling." 
  },
  { 
    id: 2, 
    title: "Minimalist Smart Watch", 
    originalPrice: 18999,
    price: 17099, 
    hasDiscount: true,
    discountText: "10% OFF",
    rating: 4.2, 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", 
    inStock: true, 
    desc: "AMOLED display with advanced sleep tracking metrics." 
  },
  { 
    id: 3, 
    title: "Ergonomic Mechanical Keyboard", 
    price: 8499, 
    hasDiscount: false,
    rating: 4.8, 
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80", 
    inStock: true, 
    desc: "Tactile mechanical switches with customizable backlighting." 
  },
  { 
    id: 4, 
    title: "Ultra HDR Action Camera", 
    originalPrice: 24999,
    price: 22499, 
    hasDiscount: true,
    discountText: "10% OFF",
    rating: 4.0, 
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", 
    inStock: true, 
    desc: "Precision ultra-lightweight high resolution layout sensor lens." 
  },
  { 
    id: 5, 
    title: "True Wireless Earbuds", 
    price: 2499, 
    hasDiscount: false,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    inStock: true,
    desc: "Crystal clear calls with deep rich bass response."
  },
  { 
    id: 6, 
    title: "Portable Bluetooth Speaker", 
    originalPrice: 2220,
    price: 1999, 
    hasDiscount: true,
    discountText: "10% OFF",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", 
    inStock: true,
    desc: "Waterproof outer shell with massive 24-hour runtime."
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistCount = wishlistItems.length;

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleUpdateCartQuantity = (id, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (id) => {
    const item = wishlistItems.find(i => i.id === id);
    if (item) {
      handleAddToCart(item);
      handleRemoveFromWishlist(id);
    }
  };

  const NavigationWrapper = ({ children }) => (
    <div className="app-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
        <div className="container">
          <button 
            className="navbar-brand btn btn-link text-warning p-0 border-0 fw-bold text-decoration-none" 
            onClick={() => setCurrentPage('home')}
          >
            <i className="fas fa-bolt me-2"></i>SmartMarket
          </button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContainer">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navContainer">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button 
                  className={"nav-link btn btn-link border-0 " + (currentPage === 'home' ? 'active fw-bold text-warning' : 'text-white-50')} 
                  onClick={() => setCurrentPage('home')}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={"nav-link btn btn-link border-0 " + (currentPage === 'products' ? 'active fw-bold text-warning' : 'text-white-50')} 
                  onClick={() => setCurrentPage('products')}
                >
                  Shop Products
                </button>
              </li>
            </ul>
            <div className="d-flex gap-3">
              <button onClick={() => setCurrentPage('wishlist')} className="btn btn-outline-light btn-sm rounded-pill px-3">
                <i className="fas fa-heart text-danger me-1"></i>
                <span className="badge bg-secondary">{totalWishlistCount}</span>
              </button>
              <button onClick={() => setCurrentPage('cart')} className="btn btn-warning btn-sm rounded-pill px-3">
                <i className="fas fa-shopping-cart text-dark me-1"></i>
                <span className="badge bg-danger">{totalCartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {children}

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">&copy; 2026 SmartMarket E-Commerce Framework. All Rights Reserved.</p>
      </footer>
    </div>
  );

  switch (currentPage) {
    case 'home':
      return (
        <NavigationWrapper>
          <Home 
            products={GLOBAL_PRODUCTS}
            wishlistItems={wishlistItems}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={setCurrentPage}
          />
        </NavigationWrapper>
      );
    case 'products':
      return (
        <NavigationWrapper>
          <Products 
            products={GLOBAL_PRODUCTS}
            wishlistItems={wishlistItems}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleToggleWishlist}
            onNavigate={setCurrentPage}
          />
        </NavigationWrapper>
      );
    case 'wishlist':
      return (
        <NavigationWrapper>
          <WishlistPage 
            wishlistItems={wishlistItems}
            onRemove={handleRemoveFromWishlist}
            onMoveToCart={handleMoveToCart}
            onNavigate={setCurrentPage}
          />
        </NavigationWrapper>
      );
    case 'cart':
      return (
        <NavigationWrapper>
          <CartPage 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemove={handleRemoveFromCart}
            onNavigate={setCurrentPage}
          />
        </NavigationWrapper>
      );
    default:
      return <div>Page Not Found</div>;
  }
}

export default App;