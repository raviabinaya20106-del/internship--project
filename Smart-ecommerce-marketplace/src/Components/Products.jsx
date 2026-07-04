import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    title: "Premium Wireless Headphones", 
    originalPrice: 12499,
    price: 11249, 
    hasDiscount: true,
    discountText: "10% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    bgColor: "#f2c94c" // Matches the yellow background from your screenshot
  },
  { 
    id: 2, 
    title: "Minimalist Smart Watch", 
    originalPrice: 18999,
    price: 17099, 
    hasDiscount: true,
    discountText: "10% OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    bgColor: "#f2f2f2"
  },
  { 
    id: 3, 
    title: "Ergonomic Mechanical Keyboard", 
    price: 8499, 
    hasDiscount: false,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    bgColor: "#f2f2f2"
  },
  { 
    id: 4, 
    title: "Ultra HDR Action Camera", 
    originalPrice: 24999,
    price: 22499, 
    hasDiscount: true,
    discountText: "10% OFF",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    bgColor: "#f2f2f2"
  },
  { 
    id: 5, 
    title: "True Wireless Earbuds", 
    price: 2499, 
    hasDiscount: false,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    bgColor: "#f2f2f2"
  },
  { 
    id: 6, 
    title: "Portable Bluetooth Speaker", 
    originalPrice: 2220,
    price: 1999, 
    hasDiscount: true,
    discountText: "10% OFF",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    bgColor: "#f2f2f2" 
  }
];

function Products({ onAddToCart, onAddToWishlist }) {
  const [products] = useState(INITIAL_PRODUCTS);
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (productId, product) => {
    setLikedItems(prev => ({ ...prev, [productId]: !prev[productId] }));
    if (onAddToWishlist) onAddToWishlist(product);
  };

  return (
    <div className="container my-4" style={{ fontFamily: 'sans-serif' }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb bg-transparent p-0 m-0" style={{ fontSize: '13px' }}>
          <li className="breadcrumb-item">
            <span className="text-primary text-decoration-none" style={{ cursor: 'pointer' }}>Home</span>
          </li>
          <li className="breadcrumb-item active text-muted" aria-current="page">All Products</li>
        </ol>
      </nav>
      
      {/* Main Heading */}
      <h2 className="fw-bold mb-4 text-center text-dark" style={{ letterSpacing: '-0.5px' }}>
        Our Catalog Marketplace
      </h2>
      
      {/* Product Responsive Grid */}
      <div className="row g-4" id="product-grid">
        {products.map(product => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 border-0 p-2 bg-white">
              
              {/* Card Image Container with Dynamic Backgrounds */}
              <div 
                className="position-relative text-center rounded-3 d-flex align-items-center justify-content-center overflow-hidden" 
                style={{ height: '200px', backgroundColor: product.bgColor || '#f8f9fa' }}
              >
                {/* Discount Badge */}
                {product.hasDiscount && (
                  <span 
                    className="position-absolute top-0 start-0 m-2 badge text-white rounded-1 font-weight-bold" 
                    style={{ zIndex: 2, backgroundColor: '#eb5757', fontSize: '10px', padding: '4px 8px' }}
                  >
                    {product.discountText}
                  </span>
                )}

                {/* Wishlist Heart Button */}
                <button 
                  onClick={() => toggleLike(product.id, product)}
                  className="btn position-absolute top-0 end-0 m-2 bg-white shadow-sm rounded-circle p-0 d-flex align-items-center justify-content-center"
                  style={{ width: '30px', height: '30px', zIndex: 2, border: 'none' }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill={likedItems[product.id] ? "#eb5757" : "none"} 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke={likedItems[product.id] ? "#eb5757" : "#b0b0b0"} 
                    style={{ width: '15px', height: '15px' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>

                {/* Product Image Element */}
                <img 
                  src={product.image} 
                  className="img-fluid object-fit-contain" 
                  alt={product.title} 
                  style={{ maxHeight: '82%', maxWidth: '82%', mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Text Description and Button UI Area */}
              <div className="card-body d-flex flex-column justify-content-between px-1 py-3">
                <div className="mb-2">
                  {/* Left-aligned Title */}
                  <h6 
                    className="fw-normal text-start mb-1 text-truncate text-muted" 
                    title={product.title}
                    style={{ fontSize: '13.5px', color: '#4f4f4f' }}
                  >
                    {product.title}
                  </h6>
                  
                  {/* Right-aligned Price elements matching screen setup */}
                  <div className="d-flex justify-content-end align-items-center gap-2 text-end">
                    {product.hasDiscount ? (
                      <>
                        <span className="text-decoration-line-through text-muted" style={{ fontSize: '11px' }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="fw-bold" style={{ color: '#eb5757', fontSize: '14px' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </>
                    ) : (
                      <span className="fw-bold" style={{ color: '#2f80ed', fontSize: '14px' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Interactive Call-To-Action Layout */}
                <div className="d-flex flex-column gap-2 mt-2">
                  <button 
                    onClick={() => onAddToCart && onAddToCart(product)}
                    className="btn btn-sm rounded-pill fw-medium py-1.5 d-flex align-items-center justify-content-center gap-1.5"
                    style={{ border: '1px solid #2f80ed', color: '#2f80ed', fontSize: '12px', backgroundColor: 'transparent' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '13px', height: '13px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button 
                    className="btn text-white btn-sm rounded-pill fw-medium py-1.5"
                    style={{ backgroundColor: '#107c41', fontSize: '12px', border: 'none' }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
