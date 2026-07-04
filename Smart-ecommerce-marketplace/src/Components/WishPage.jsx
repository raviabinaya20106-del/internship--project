import React from 'react';

export default function WishPage({ wishlistItems = [], onRemove, onMoveToCart, onNavigate }) {
  return (
    <div className="container my-5 min-vh-100">
      <h2 className="fw-bold mb-4">
        <i className="fas fa-heart text-danger me-2"></i>Saved Wishlist Collection
      </h2>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm border">
          <i className="far fa-heart text-muted display-1 mb-3"></i>
          <p className="text-muted fs-5">Your wishlist collection is empty.</p>
          <button 
            className="btn btn-warning rounded-pill px-4 fw-bold" 
            onClick={() => onNavigate('products')}
          >
            Discover Products
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100 bg-white">
            
                <div 
                  className="p-3 bg-light text-center position-relative d-flex align-items-center justify-content-center" 
                  style={{ height: '200px' }}
                >
                  {item.hasDiscount && (
                    <span className="position-absolute top-0 start-0 m-3 badge bg-danger text-white rounded-1 small px-2 py-1">
                      {item.discountText}
                    </span>
                  )}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="img-fluid h-100 object-fit-contain" 
                  />
                </div>

                {/* Wishlist Item Details & Action Panel */}
                <div className="card-body p-3 text-center d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <h6 className="fw-normal text-muted mb-2 text-truncate" title={item.title}>
                      {item.title}
                    </h6>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      {item.hasDiscount ? (
                        <>
                          <span className="text-decoration-line-through text-muted small">
                            ₹{item.originalPrice?.toLocaleString('en-IN')}
                          </span>
                          <span className="fw-bold text-danger">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </>
                      ) : (
                        <span className="fw-bold text-dark">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <button 
                      className="btn btn-primary btn-sm w-100 rounded-pill fw-medium py-2" 
                      onClick={() => onMoveToCart(item.id)}
                    >
                      Move to Cart
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm w-100 rounded-pill fw-medium py-2" 
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}