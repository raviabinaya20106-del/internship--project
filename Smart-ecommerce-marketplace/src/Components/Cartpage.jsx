import React from 'react';

export default function CartPage({ cartItems = [], onUpdateQuantity, onRemove, onNavigate }) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 0 : 0; 
  const totalAmount = subtotal + shippingFee;

  return (
    <div className="container my-5 min-vh-100">
      <h2 className="fw-bold mb-4">
        <i className="fas fa-shopping-basket text-primary me-2"></i>Your Basket Checkout Queue
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm border">
          <i className="fas fa-shopping-cart text-muted display-1 mb-3"></i>
          <p className="text-muted fs-5">Your shopping basket is empty.</p>
          <button 
            className="btn btn-warning rounded-pill px-4 fw-bold" 
            onClick={() => onNavigate('products')}
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="card border-0 shadow-sm rounded-3 p-3 bg-white d-flex flex-row align-items-center gap-3"
                >
                
                  <div 
                    className="p-2 bg-light rounded text-center d-flex align-items-center justify-content-center" 
                    style={{ width: '100px', height: '100px', flexShrink: 0 }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="img-fluid h-100 object-fit-contain" 
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1 text-dark">{item.title}</h6>
                    <div className="d-flex align-items-center gap-2 small">
                      {item.hasDiscount && (
                        <span className="text-decoration-line-through text-muted">
                          ₹{item.originalPrice?.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="fw-bold text-dark">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center border rounded bg-light px-1">
                    <button 
                      className="btn btn-sm btn-link text-decoration-none fw-bold text-secondary px-2 py-0"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-2 fw-medium small text-dark">{item.quantity}</span>
                    <button 
                      className="btn btn-sm btn-link text-decoration-none fw-bold text-secondary px-2 py-0"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-end ms-3" style={{ minWidth: '110px' }}>
                    <p className="fw-bold text-primary mb-1">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <button 
                      className="btn btn-link btn-sm text-danger text-decoration-none p-0 border-0 small"
                      onClick={() => onRemove(item.id)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>Remove
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-3 p-4 bg-white sticky-top" style={{ top: '90px' }}>
              <h5 className="fw-bold mb-4 text-dark border-bottom pb-2">Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-2 small text-muted">
                <span>Subtotal</span>
                <span className="text-dark fw-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3 small text-muted">
                <span>Shipping Delivery</span>
                <span className="text-success fw-medium">FREE</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between align-items-center my-3">
                <span className="fw-bold text-dark">Total Amount</span>
                <h4 className="fw-bold text-primary mb-0">₹{totalAmount.toLocaleString('en-IN')}</h4>
              </div>

              <button className="btn btn-primary w-100 rounded-pill py-2.5 fw-bold mt-2 shadow-sm">
                Proceed to Payment Gateway
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}