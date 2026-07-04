import React, { useState } from 'react';

export default function CheckoutPage({ cartItems = [], onNavigate }) {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    state: '',
    pincode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  // Calculate product details for the summary card array
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert('Order placed successfully! Securely checking your parameters...');
  
  };

  return (
    <div className="container my-5 min-vh-100">
      <div className="row g-4">
        
        {/* LEFT BLOCK: Billing & Shipping Address Setup */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
            <h4 className="fw-bold mb-4 text-dark">Billing & Delivery Address</h4>
            
            <form onSubmit={handleSubmitOrder}>
              {/* Names row */}
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label text-muted small">First name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className="form-control bg-light border-0 py-2" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted small">Last name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="form-control bg-light border-0 py-2" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              {/* Full Address */}
              <div className="mb-3">
                <label className="form-label text-muted small">Full Shipping Address</label>
                <input 
                  type="text" 
                  name="address"
                  placeholder="Apartment, Street Address, City" 
                  className="form-control bg-light border-0 py-2" 
                  value={formData.address}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              {/* State and Pincode */}
              <div className="row g-3 mb-5">
                <div className="col-md-6">
                  <label className="form-label text-muted small">State</label>
                  <input 
                    type="text" 
                    name="state"
                    className="form-control bg-light border-0 py-2" 
                    value={formData.state}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted small">Pincode</label>
                  <input 
                    type="text" 
                    name="pincode"
                    className="form-control bg-light border-0 py-2" 
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              {/* Payment Methods Wrapper */}
              <h5 className="fw-bold mb-3 text-dark">Payment Option</h5>
              
              <div className="d-flex flex-column gap-2 mb-4">
                <label className="d-flex align-items-center gap-2 small text-muted style-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod" 
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  Cash on Delivery (COD)
                </label>
                <label className="d-flex align-items-center gap-2 small text-muted style-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="credit" 
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                  />
                  Credit / Debit Card
                </label>
                <label className="d-flex align-items-center gap-2 small text-muted style-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="gpay" 
                    checked={formData.paymentMethod === 'gpay'}
                    onChange={handleInputChange}
                  />
                  Google Pay
                </label>
                <label className="d-flex align-items-center gap-2 small text-muted style-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="upi" 
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  UPI ID
                </label>
              </div>

              {/* Conditional Card inputs */}
              {formData.paymentMethod === 'credit' && (
                <div className="row g-3 mb-4 p-3 bg-light rounded-3">
                  <div className="col-12">
                    <label className="form-label text-muted small">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456" 
                      className="form-control bg-white border-0 py-2" 
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiryDate"
                      placeholder="MM/YY" 
                      className="form-control bg-white border-0 py-2" 
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">CVV</label>
                    <input 
                      type="password" 
                      name="cvv"
                      placeholder="123" 
                      className="form-control bg-white border-0 py-2" 
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Big Action Submit */}
              <button type="submit" className="btn btn-teal text-white w-100 py-2.5 fw-bold mt-3 shadow-sm rounded-2">
                Place Order (Securely)
              </button>
            </form>

          </div>
        </div>

        {/* RIGHT BLOCK: Selected Items Summary Column */}
        <div className="col-12 col-lg-4">
          <div className="card border-0 shadow-sm rounded-3 p-4 bg-white sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold mb-3 text-primary">Your Items Summary</h5>
            
            {cartItems.length === 0 ? (
              <p className="text-muted small my-3">No active items inside the queue.</p>
            ) : (
              <div className="d-flex flex-column gap-3 mb-4 border-bottom pb-3">
                {cartItems.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <h6 className="mb-0 fw-bold small text-dark">{item.title} x{item.quantity}</h6>
                      <span className="text-muted text-mini d-block" style={{ fontSize: '11px' }}>
                        Includes 10% high-value discount
                      </span>
                    </div>
                    <span className="fw-medium small text-dark">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small fw-bold">Total (INR)</span>
              <h5 className="fw-bold text-dark mb-0">₹{subtotal.toLocaleString('en-IN')}</h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}