/* ═══════════════════════════════════════
   RETRO BREW CAFÉ — script.js
═══════════════════════════════════════ */

/* ─── INITIAL PRODUCT DATA ─── */
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Classic Espresso",
    category: "Coffee",
    price: 120,
    description: "A rich, bold shot of our house-blend espresso. Dark, velvety, and unapologetically strong — the soul of every great cup.",
    images: [
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&q=80",
      "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=600&q=80",
      "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "Perfect every morning. Nothing beats it.", date: "Jan 2025" },
      { rating: 4, text: "Strong and rich — exactly what I needed.", date: "Feb 2025" }
    ]
  },
  {
    id: 2,
    name: "Creamy Cappuccino",
    category: "Coffee",
    price: 160,
    description: "Steamed whole milk, velvety foam, and a double shot of espresso. Classic Italian comfort in a cup.",
    images: [
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80",
      "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "The foam is absolutely perfect.", date: "Mar 2025" }
    ]
  },
  {
    id: 3,
    name: "Cold Brew (Large)",
    category: "Cold Drinks",
    price: 190,
    description: "Steeped for 18 hours in cold water, our cold brew is smooth, mellow, and deeply caffeinated.",
    images: [
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "Best cold brew I've ever had!", date: "Apr 2025" },
      { rating: 4, text: "Smooth and not bitter at all.", date: "Apr 2025" }
    ]
  },
  {
    id: 4,
    name: "Butter Croissant",
    category: "Snacks",
    price: 110,
    description: "Flaky, golden, and layered with butter. Baked fresh every morning. Best enjoyed warm with a cup of coffee.",
    images: [
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
      "https://images.unsplash.com/photo-1509365390695-33aee754301f?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "Flakiest croissant in the city!", date: "Jan 2025" }
    ]
  },
  {
    id: 5,
    name: "Dark Chocolate Brownie",
    category: "Desserts",
    price: 130,
    description: "Dense, fudgy, and packed with dark chocolate. Slightly crisp on top, gooey in the middle.",
    images: [
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "Absolutely sinful. Loved every bite.", date: "Feb 2025" },
      { rating: 5, text: "Pairs perfectly with the espresso.", date: "Mar 2025" }
    ]
  },
  {
    id: 6,
    name: "Vanilla Latte",
    category: "Coffee",
    price: 175,
    description: "Smooth espresso blended with house-made vanilla syrup and steamed milk. Sweet, warm, and perfectly balanced.",
    images: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
      "https://images.unsplash.com/photo-1606796280882-ea09d5e15e34?w=600&q=80"
    ],
    reviews: [
      { rating: 4, text: "Not too sweet — just right.", date: "Mar 2025" }
    ]
  },
  {
    id: 7,
    name: "Cinnamon Roll",
    category: "Desserts",
    price: 145,
    description: "Soft, pillowy dough swirled with cinnamon sugar and drizzled with cream cheese frosting. A café classic.",
    images: [
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80",
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80"
    ],
    reviews: [
      { rating: 5, text: "Warm and gooey — heaven on a plate.", date: "Feb 2025" }
    ]
  },
  {
    id: 8,
    name: "Iced Mocha",
    category: "Cold Drinks",
    price: 210,
    description: "Chilled espresso, rich chocolate sauce, and cold milk over ice. The ultimate refresher for chocolate lovers.",
    images: [
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80",
      "https://images.unsplash.com/photo-1614710684986-dd15f0af53a8?w=600&q=80"
    ],
    reviews: [
      { rating: 4, text: "A great pick-me-up on a hot day.", date: "Apr 2025" },
      { rating: 5, text: "Creamy and chocolatey perfection.", date: "Apr 2025" }
    ]
  }
];

/* ─── STATE ─── */
let products = [];
let cart = [];
let currentProduct = null;

/* ─── INIT ─── */
function init() {
  loadProducts();
  loadCart();
  updateAuthUI();
  renderGrid();
}

/* ─── STORAGE HELPERS ─── */
function loadProducts() {
  const saved = localStorage.getItem('rbc_products');
  products = saved ? JSON.parse(saved) : [...DEFAULT_PRODUCTS];
}

function saveProducts() {
  localStorage.setItem('rbc_products', JSON.stringify(products));
}

function loadCart() {
  const saved = localStorage.getItem('rbc_cart');
  cart = saved ? JSON.parse(saved) : [];
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('rbc_cart', JSON.stringify(cart));
}

/* ─── VIEW ROUTING ─── */
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(name + 'View');
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'profile') loadProfile();
  if (name === 'home') renderGrid();
}

/* ─── PRODUCT GRID ─── */
function avgRating(reviews) {
  if (!reviews || reviews.length === 0) return null;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
}

function renderStars(avg) {
  if (!avg) return '☆☆☆☆☆ No reviews';
  const full = Math.round(avg);
  return '★'.repeat(full) + '☆'.repeat(5 - full) + ' ' + avg;
}

function renderGrid() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(p => {
    const avg = avgRating(p.reviews);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=60'" />
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-category">${p.category}</div>
        <div class="card-bottom">
          <span class="card-price">₹${p.price}</span>
          <span class="card-rating">${renderStars(avg)}</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openProduct(p.id));
    grid.appendChild(card);
  });
}

/* ─── PRODUCT DETAIL ─── */
function openProduct(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;
  renderProductDetail(currentProduct);
  showView('product');
}

function renderProductDetail(p) {
  const avg = avgRating(p.reviews);
  const container = document.getElementById('productDetail');
  container.innerHTML = `
    <div class="pd-top">
      <div class="pd-gallery">
        <img id="pdMainImg" class="pd-main-img" src="${p.images[0]}" alt="${p.name}" />
        <div class="pd-thumbs">
          ${p.images.map((img, i) => `
            <img class="pd-thumb ${i === 0 ? 'active' : ''}" src="${img}" alt="thumb ${i+1}"
              onclick="setMainImg(this, '${img}')" />
          `).join('')}
        </div>
      </div>
      <div class="pd-info">
        <div class="pd-cat">${p.category}</div>
        <h2>${p.name}</h2>
        <div class="pd-rating">${renderStars(avg)} (${p.reviews ? p.reviews.length : 0} reviews)</div>
        <div class="pd-price">₹${p.price}</div>
        <p class="pd-desc">${p.description}</p>
        <div class="pd-actions">
          <button class="btn-primary" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
          <button class="btn-rust" onclick="orderNow(${p.id})">⚡ Order Now</button>
        </div>
      </div>
    </div>
    <div class="review-section">
      <h3>Reviews</h3>
      <div class="review-form">
        <input type="number" id="reviewRating" min="1" max="5" placeholder="Rating (1–5)" />
        <textarea id="reviewText" placeholder="Write your review..."></textarea>
        <button class="btn-primary" onclick="submitReview(${p.id})">Submit Review</button>
      </div>
      <div class="review-list" id="reviewList">
        ${renderReviews(p.reviews)}
      </div>
    </div>`;
}

function setMainImg(thumb, src) {
  document.getElementById('pdMainImg').src = src;
  document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) return '<p style="color:var(--muted);font-style:italic">No reviews yet. Be the first!</p>';
  return reviews.slice().reverse().map(r => `
    <div class="review-item">
      <div class="r-top">
        <span class="r-rating">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)} ${r.rating}/5</span>
        <span class="r-date">${r.date || 'Recent'}</span>
      </div>
      <div class="r-text">${r.text}</div>
    </div>`).join('');
}

function submitReview(id) {
  const rating = parseInt(document.getElementById('reviewRating').value);
  const text = document.getElementById('reviewText').value.trim();
  if (!rating || rating < 1 || rating > 5) { alert('Please enter a rating between 1 and 5.'); return; }
  if (!text) { alert('Please write a review.'); return; }

  const product = products.find(p => p.id === id);
  if (!product.reviews) product.reviews = [];
  product.reviews.push({ rating, text, date: new Date().toLocaleDateString('en-IN', { month:'short', year:'numeric' }) });
  saveProducts();

  document.getElementById('reviewRating').value = '';
  document.getElementById('reviewText').value = '';
  document.getElementById('reviewList').innerHTML = renderReviews(product.reviews);

  // refresh rating in detail
  const avg = avgRating(product.reviews);
  const ratingEl = document.querySelector('.pd-rating');
  if (ratingEl) ratingEl.textContent = `${renderStars(avg)} (${product.reviews.length} reviews)`;
}

/* ─── CART ─── */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.images[0], qty: 1 });
  }
  saveCart();
  updateCartCount();
  showCartFeedback();
}

function showCartFeedback() {
  const btn = document.querySelector('.cart-btn');
  if (!btn) return;
  btn.style.background = 'var(--caramel)';
  setTimeout(() => btn.style.background = '', 400);
}

function orderNow(id) {
  addToCart(id);
  toggleCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  const total = cart.reduce((a, c) => a + (c.qty || 1), 0);
  document.getElementById('cartCount').textContent = total;
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  const isOpen = sidebar.classList.contains('open');
  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  if (!isOpen) renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Browse the menu and add something delicious!</div>';
    totalEl.textContent = '₹0';
    return;
  }
  let total = 0;
  container.innerHTML = cart.map(item => {
    const subtotal = item.price * (item.qty || 1);
    total += subtotal;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&q=60'" />
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-price">₹${item.price} × ${item.qty || 1} = ₹${subtotal}</div>
        </div>
        <button class="ci-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>`;
  }).join('');
  totalEl.textContent = '₹' + total;
}

function placeOrder() {
  if (cart.length === 0) return;
  const user = JSON.parse(localStorage.getItem('rbc_user') || 'null');
  if (!user) {
    toggleCart();
    showView('login');
    return;
  }
  alert('✅ Order placed successfully! Thank you for choosing Retro Brew Café.');
  cart = [];
  saveCart();
  updateCartCount();
  toggleCart();
}

/* ─── AUTH ─── */
const VALID_EMAIL    = 'kkmenon@gmail.com';
const VALID_PASSWORD = '123456789';

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const errEl = document.getElementById('loginError');

  if (!email || !pass) { errEl.textContent = 'Please fill in all fields.'; return; }
  if (email !== VALID_EMAIL || pass !== VALID_PASSWORD) {
    errEl.textContent = 'Invalid email or password.'; return;
  }

  errEl.textContent = '';
  localStorage.setItem('rbc_user', JSON.stringify({ email, name: 'Kiran K. Menon' }));
  updateAuthUI();
  showView('profile');
}

function handleLogout() {
  localStorage.removeItem('rbc_user');
  updateAuthUI();
  showView('home');
}

function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem('rbc_user') || 'null');
  const loginBtn   = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');
  if (user) {
    loginBtn.style.display   = 'none';
    profileBtn.style.display = '';
  } else {
    loginBtn.style.display   = '';
    profileBtn.style.display = 'none';
  }
}

function loadProfile() {
  const user = JSON.parse(localStorage.getItem('rbc_user') || 'null');
  if (user) {
    document.getElementById('profileName').textContent  = user.name  || 'Guest';
    document.getElementById('profileEmail').textContent = user.email || '—';
  } else {
    showView('login');
  }
}

/* ─── SELLER ─── */
function addProduct() {
  const name  = document.getElementById('sellerName').value.trim();
  const price = parseFloat(document.getElementById('sellerPrice').value);
  const cat   = document.getElementById('sellerCategory').value;
  const desc  = document.getElementById('sellerDesc').value.trim();
  const img1  = document.getElementById('sellerImg1').value.trim();
  const img2  = document.getElementById('sellerImg2').value.trim();
  const img3  = document.getElementById('sellerImg3').value.trim();
  const errEl = document.getElementById('sellerError');
  const sucEl = document.getElementById('sellerSuccess');

  errEl.textContent = '';
  sucEl.textContent = '';

  if (!name || !price || !desc || !img1) {
    errEl.textContent = 'Name, price, description and at least one image are required.'; return;
  }
  if (isNaN(price) || price <= 0) {
    errEl.textContent = 'Please enter a valid price.'; return;
  }

  const images = [img1, img2, img3].filter(Boolean);
  const newProduct = {
    id: Date.now(),
    name, price, category: cat, description: desc,
    images, reviews: []
  };

  products.push(newProduct);
  saveProducts();
  sucEl.textContent = `✅ "${name}" added to the menu!`;

  // clear fields
  ['sellerName','sellerPrice','sellerDesc','sellerImg1','sellerImg2','sellerImg3']
    .forEach(id => document.getElementById(id).value = '');
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', init);