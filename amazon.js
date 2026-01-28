// simple cart logic + small interactive behaviors

const cart = {};
const cartCountEl = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const cartList = document.getElementById('cartList');
const closeCart = document.getElementById('closeCart');
const clearCart = document.getElementById('clearCart');

// add-to-cart buttons
document.querySelectorAll('.product-card .add').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const id = card.dataset.id;
    const title = card.querySelector('h4').innerText;
    const price = card.querySelector('.price').innerText;

    if (!cart[id]) cart[id] = { id, title, price, qty: 0 };
    cart[id].qty += 1;
    updateCartUI();
  });
});

function updateCartUI() {
  // update count
  const totalQty = Object.values(cart).reduce((s, it) => s + it.qty, 0);
  cartCountEl.innerText = totalQty;

  // update modal list
  cartList.innerHTML = '';
  Object.values(cart).forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.title} x ${item.qty}</span><strong>${item.price}</strong>`;
    cartList.appendChild(li);
  });
}

// open cart
cartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

// close cart
closeCart.addEventListener('click', () => cartModal.classList.add('hidden'));

// clear cart
clearCart.addEventListener('click', () => {
  for (let k in cart) delete cart[k];
  updateCartUI();
  cartModal.classList.add('hidden');
});

// search demo (no backend)
document.getElementById('searchBtn').addEventListener('click', () => {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) { alert('Type something to search'); return; }
  alert('Search demo: ' + q);
});

// small UX: clicking feature links / hero cta
document.querySelectorAll('.feature .link, .cta, .menu-items a').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    alert('Demo link — UI only');
  });
});
