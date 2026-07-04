import React from 'react';

const Home = ({ products = [], wishlistItems = [], onAddToCart, onToggleWishlist, onNavigate }) => {
  // Grab the first product for the trending list section display fallback if needed
  const trendingProduct = products[0] || {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 12499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
  };

  const isProductWishlisted = wishlistItems.some(item => item.id === trendingProduct.id);

  return (
    <div className="home-page-content">
      
      <header className="hero-section text-white py-5" style={{ backgroundColor: '#5c7ee6', background: 'linear-gradient(135deg, #7391f0 0%, #4a6fd8 100%)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">

            <div className="col-md-6 text-start">
              <h1 className="display-4 fw-bold mb-3 text-white">
                Future of Smart Living & Tech Upgrades
              </h1>
              <p className="lead mb-4 opacity-90 text-white-50">
                Discover curated high-tier gear optimized for efficiency. Seamless integrations await your space.
              </p>
              <button 
                onClick={() => onNavigate('products')} 
                className="btn btn-warning btn-lg fw-bold px-4 rounded-pill shadow"
              >
                Explore Marketplace
              </button>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <img 
                src="https://thf.bing.com/th/id/OIP.iBTL8h1C4vKxIZTgQHlN4AHaFj?w=248&h=186&c=7&r=0&o=7&cb=thfc1falcon3&pid=1.7&rm=3" 
                className="img-fluid rounded-4 shadow-lg" 
                alt="Smart Shop Banner" 
                style={{ maxHeight: '320px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">Trending Hot Deals</h2>
          <button 
            onClick={() => onNavigate('products')} 
            className="btn btn-link text-primary text-decoration-none fw-bold p-0"
          >
            View All <i className="fas fa-arrow-right ms-1"></i>
          </button>
        </div>
        
        <div className="row g-4" id="product-grid">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card product-card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="img-container position-relative bg-light p-3 text-center">
                <button 
                  className="btn btn-link p-0 position-absolute top-0 end-0 m-3 text-decoration-none" 
                  onClick={() => onToggleWishlist(trendingProduct)}
                  style={{ border: 'none', background: 'transparent', zIndex: 10 }}
                >
                  <i className={`${isProductWishlisted ? "fas" : "far"} fa-heart text-danger fs-5`}></i>
                </button>
                <img 
                  src={trendingProduct.image} 
                  alt={trendingProduct.title}
                  className="img-fluid object-fit-contain"
                  style={{ height: '200px' }}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                  <span className="badge bg-danger rounded-pill px-2.5 mb-2">HOT DEAL</span>
                  <h5 className="card-title fs-6 fw-bold text-dark mb-1">{trendingProduct.title}</h5>
                  <p className="card-text fw-bold text-primary fs-5 mb-3">₹{trendingProduct.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-outline-primary btn-sm rounded-pill fw-semibold" 
                    onClick={() => onAddToCart(trendingProduct)}
                  >
                    <i className="fas fa-shopping-cart me-1"></i> Add to Cart
                  </button>
                  <button 
                    className="btn btn-success btn-sm rounded-pill fw-semibold" 
                    onClick={() => onNavigate('cart')}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;