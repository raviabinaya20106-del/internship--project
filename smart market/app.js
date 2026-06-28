let cart = JSON.parse(localStorage.getItem('smart_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('smart_wishlist')) || [];

const masterProducts = [
    { id: 1, name: "Premium Wireless Headphones", price: 12499, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: 2, name: "Minimalist Smart Watch", price: 18999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
    { id: 3, name: "Ergonomic Mechanical Keyboard", price: 8499, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80" },
    { id: 4, name: "Ultra HDR Action Camera", price: 24999, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80" },
    { id: 5, name: "Noise Cancelling Earbuds", price: 6999, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80" },
    { id: 6, name: "4K Ultra-Wide Monitor", price: 34999, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
    { id: 7, name: "Wireless Charging Dock", price: 2999, image: "https://thf.bing.com/th/id/OIP.Ll2dWVVXDjurKKIb2nRSAAHaHa?w=176&h=170&c=7&r=0&o=7&cb=thfc1falcon3&pid=1.6&rm=2" },
    { id: 8, name: "Portable Bluetooth Speaker", price: 4499, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80" },
    { id: 9, name: "Smart RGB Desk Lamp", price: 3299, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80" },
    { id: 10, name: "Full HD Stream Webcam", price: 5499, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80" },
    { id: 11, name: "Ergonomic Office Chair", price: 14999, image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500&q=80" },
    { id: 12, name: "High-Speed External SSD (1TB)", price: 9999, image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80" }
];

document.addEventListener('DOMContentLoaded', () => {
    updateBadges();

    if(document.getElementById('product-grid')) renderCatalog();
    if(document.getElementById('cart-items-container')) renderCartPage();
    if(document.getElementById('wishlist-container')) renderWishlistPage();
    if(document.getElementById('checkout-summary')) renderCheckoutPage();
});
function getEffectivePrice(product) {
    if (product.price > 10000) {
        return {
            isDiscounted: true,
            originalPrice: product.price,
            finalPrice: Math.round(product.price * 0.90) // 10% OFF
        };
    }
    return {
        isDiscounted: false,
        originalPrice: product.price,
        finalPrice: product.price
    };
}

function updateBadges() {
    const cartCount = document.getElementById('cart-count');
    const wishlistCount = document.getElementById('wishlist-count');
    if(cartCount) cartCount.innerText = cart.reduce((acc, item) => acc + item.qty, 0);
    if(wishlistCount) wishlistCount.innerText = wishlist.length;
}

function renderCatalog() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = masterProducts.map(p => {
        const pricing = getEffectivePrice(p);
        const priceHTML = pricing.isDiscounted 
            ? `<span class="text-decoration-line-through text-muted fs-7 me-2">₹${pricing.originalPrice.toLocaleString('en-IN')}</span><span class="text-danger fw-bold">₹${pricing.finalPrice.toLocaleString('en-IN')}</span>`
            : `<span class="text-primary fw-bold">₹${pricing.finalPrice.toLocaleString('en-IN')}</span>`;

        return `
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                <div class="card product-card">
                    <div class="img-container">
                        ${pricing.isDiscounted ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">10% OFF</span>' : ''}
                        <button class="wishlist-btn-float" onclick="toggleWishlist(${p.id})">
                            <i class="${wishlist.includes(p.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <img src="${p.image}" alt="${p.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title fs-6">${p.name}</h5>
                        <p class="card-text text-end">${priceHTML}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-animated btn-sm" onclick="addToCart(${p.id})">
                                <i class="fas fa-shopping-cart me-1"></i> Add to Cart
                            </button>
                            <button class="btn btn-success btn-animated btn-sm" onclick="directBuy(${p.id})">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(id) {
    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.qty++;
    } else {
        cart.push({ id: id, qty: 1 });
    }
    saveState();
}

function directBuy(id) {
    addToCart(id);
    window.location.href = 'checkout.html';
}

function toggleWishlist(id) {
    if(wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
    } else {
        wishlist.push(id);
    }
    saveState();
    if(document.getElementById('product-grid')) renderCatalog();
    if(document.getElementById('wishlist-container')) renderWishlistPage();
}

function saveState() {
    localStorage.setItem('smart_cart', JSON.stringify(cart));
    localStorage.setItem('smart_wishlist', JSON.stringify(wishlist));
    updateBadges();
}

function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if(cart.length === 0) {
        container.innerHTML = `<div class="text-center py-5"><h3>Your cart is empty!</h3><a href="product.html" class="btn btn-primary mt-3">Shop Now</a></div>`;
        document.getElementById('cart-total-box').style.display = 'none';
        return;
    }
    document.getElementById('cart-total-box').style.display = 'block';
    
    let subtotal = 0;
    container.innerHTML = cart.map(item => {
        const prod = masterProducts.find(p => p.id === item.id);
        if(!prod) return '';
        
        const pricing = getEffectivePrice(prod);
        subtotal += pricing.finalPrice * item.qty;

        return `
            <div class="card p-3 mb-3 shadow-sm border-0">
                <div class="row align-items-center g-3">
                    <div class="col-4 col-md-2"><img src="${prod.image}" class="img-fluid rounded" style="max-height:80px; object-fit:cover;"></div>
                    <div class="col-8 col-md-4">
                        <h5>${prod.name}</h5>
                        <p class="text-muted mb-0">
                            ${pricing.isDiscounted ? `<span class="text-decoration-line-through me-1">₹${pricing.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                            ₹${pricing.finalPrice.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <div class="col-6 col-md-3 d-flex align-items-center">
                        <button class="btn btn-sm btn-light border" onclick="changeQty(${item.id}, -1)">-</button>
                        <span class="mx-3 fw-bold">${item.qty}</span>
                        <button class="btn btn-sm btn-light border" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="col-6 col-md-3 text-end">
                        <p class="fw-bold text-primary mb-0">₹${(pricing.finalPrice * item.qty).toLocaleString('en-IN')}</p>
                        <button class="btn text-danger btn-sm p-0 mt-1" onclick="removeCartItem(${item.id})"><i class="fas fa-trash-alt"></i> Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('subtotal-price').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('final-price').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) removeCartItem(id);
        else saveState();
    }
    renderCartPage();
}

function removeCartItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveState();
    renderCartPage();
}

function renderWishlistPage() {
    const container = document.getElementById('wishlist-container');
    if(wishlist.length === 0) {
        container.innerHTML = `<div class="text-center py-5"><h3>Your wishlist is empty!</h3><a href="product.html" class="btn btn-primary mt-3">Discover Products</a></div>`;
        return;
    }
    
    container.innerHTML = wishlist.map(id => {
        const prod = masterProducts.find(p => p.id === id);
        if(!prod) return '';
        
        const pricing = getEffectivePrice(prod);
        const priceHTML = pricing.isDiscounted 
            ? `<span class="text-decoration-line-through text-muted fs-7 me-2">₹${pricing.originalPrice.toLocaleString('en-IN')}</span><span class="text-danger fw-bold">₹${pricing.finalPrice.toLocaleString('en-IN')}</span>`
            : `<span class="text-primary fw-bold">₹${pricing.finalPrice.toLocaleString('en-IN')}</span>`;

        return `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="card product-card">
                    <div class="img-container">
                        ${pricing.isDiscounted ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">10% OFF</span>' : ''}
                        <img src="${prod.image}" alt="${prod.name}">
                    </div>
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title fs-6">${prod.name}</h5>
                        <p class="card-text">${priceHTML}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-animated btn-sm" onclick="wishlistToCart(${prod.id})">Move to Cart</button>
                            <button class="btn btn-outline-danger btn-sm" onclick="toggleWishlist(${prod.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function wishlistToCart(id) {
    addToCart(id);
    wishlist = wishlist.filter(item => item !== id);
    saveState();
    renderWishlistPage();
}

function renderCheckoutPage() {
    const container = document.getElementById('checkout-summary');
    let total = 0;
    
    if(cart.length === 0) {
        container.innerHTML = `<li class="list-group-item">No items selected</li>`;
        return;
    }

    container.innerHTML = cart.map(item => {
        const prod = masterProducts.find(p => p.id === item.id);
        if(!prod) return '';
        
        const pricing = getEffectivePrice(prod);
        total += pricing.finalPrice * item.qty;

        return `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${prod.name} <span class="text-muted">x${item.qty}</span></h6>
                    ${pricing.isDiscounted ? `<small class="text-danger">Includes 10% high-value discount</small>` : ''}
                </div>
                <span class="text-muted">₹${(pricing.finalPrice * item.qty).toLocaleString('en-IN')}</span>
            </li>
        `;
    }).join('') + `
        <li class="list-group-item d-flex justify-content-between bg-light">
            <span class="text-success font-weight-bold">Total (INR)</span>
            <strong class="text-success">₹${total.toLocaleString('en-IN')}</strong>
        </li>
    `;
}
function showPaymentFields() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    const cardFields = document.getElementById('cardFields');
    const gpayFields = document.getElementById('gpayFields');
    const upiFields = document.getElementById('upiFields');

    cardFields.style.display = 'none';
    gpayFields.style.display = 'none';
    upiFields.style.display = 'none';

    toggleRequiredAttributes('.card-input', false);
    toggleRequiredAttributes('.gpay-input', false);
    toggleRequiredAttributes('.upi-input', false);

    if (selectedMethod === 'Card') {
        cardFields.style.display = 'block';
        toggleRequiredAttributes('.card-input', true);
    } else if (selectedMethod === 'GPay') {
        gpayFields.style.display = 'block';
        toggleRequiredAttributes('.gpay-input', true);
    } else if (selectedMethod === 'UPI') {
        upiFields.style.display = 'block';
        toggleRequiredAttributes('.upi-input', true);
    }
}

function toggleRequiredAttributes(selector, shouldBeRequired) {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        if (shouldBeRequired) {
            input.setAttribute('required', 'true');
        } else {
            input.removeAttribute('required');
        }
    });
}

function handleCheckoutForm(event) {
    event.preventDefault();
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    if (selectedMethod === 'COD') {
        alert("🎉 Order placed successfully via Cash on Delivery!");
    } else if (selectedMethod === 'GPay') {
        alert("🔒 Verifying your Google Pay transaction! Your order setup will update shortly once manual payment verification clears.");
    } else {
        alert(`🔒 Processing transaction securely via standard gateway: ${selectedMethod}`);
    }
}
