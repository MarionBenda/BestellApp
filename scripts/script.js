const RATING = 4.5;
const COUNT = 215;
const DELIVERY_FEE = 4.99;
const BASKET = [];

let isDelivery = true;

function init() {
  Object.keys(MY_DISHES_NEW).forEach((category) => renderCategory(category));
  document.getElementById('ratingValue').textContent = RATING.toFixed(1);
  document.getElementById('ratingCount').textContent = `(${COUNT})`;
}

function renderCategory(category) {
  const container = document.getElementById(category);
  if (!container) return;
  container.innerHTML = MY_DISHES_NEW[category]
    .map((dish) => getDishTemplate(dish))
    .join('');
}

function addToBasket(name, price) {
  const item = BASKET.find((i) => i.name === name);
  item ? item.amount++ : BASKET.push({ name, price, amount: 1 });
  updateBasket();
}

function decreaseAmount(index) {
  BASKET[index].amount > 1 ? BASKET[index].amount-- : BASKET.splice(index, 1);
  updateBasket();
}

function removeFromBasket(index) {
  BASKET.splice(index, 1);
  updateBasket();
}

function updateBasket() {
  const totals = calculateTotals();
  updateBasketUI(totals);
  const itemsHTML = BASKET.map((item, i) =>
    getBasketItemTemplate(item, i),
  ).join('');

  ['', 'mobile_'].forEach((prefix) => {
    const list = document.getElementById(`${prefix}basket_items`);
    const total = document.getElementById(`${prefix}basket_total`);
    if (list) list.innerHTML = itemsHTML;
    if (total) renderTotalSection(total, totals.sub, totals.fee);
  });

  const btn = document.getElementById('total_btn_price');
  if (btn)
    btn.textContent = BASKET.length
      ? `(${totals.total.toFixed(2).replace('.', ',')} €)`
      : '';
}

function calculateTotals() {
  const sub = BASKET.reduce((sum, item) => sum + item.price * item.amount, 0);
  const count = BASKET.reduce((sum, item) => sum + item.amount, 0);
  const fee = isDelivery && BASKET.length ? DELIVERY_FEE : 0;
  return { sub, count, fee, total: sub + fee };
}

function updateBasketUI(totals) {
  const allBadges = document.querySelectorAll('.basket-badge');
  allBadges.forEach((badge) => {
    badge.textContent = totals.count;
    badge.style.display = totals.count > 0 ? 'flex' : 'none';
  });
}

function renderTotalSection(element, subtotal, fee) {
  if (!BASKET.length) {
    element.innerHTML = getEmptyBasketTemplate();
    return;
  }
  element.innerHTML = getTotalSectionTemplate(subtotal, fee, isDelivery);
}

function setDelivery(status) {
  isDelivery = status;
  document
    .getElementById('btn-delivery')
    .classList.toggle('active', isDelivery);
  document.getElementById('btn-pickup').classList.toggle('active', !isDelivery);
  updateBasket();
}

function openDelivery() {
  const dialog = document.getElementById('orderConfirmation');
  if (BASKET.length > 0 && dialog) {
    toggleBasketDisplay(false);
    dialog.showModal();
    BASKET.length = 0;
    updateBasket();
    setTimeout(() => dialog.close(), 3000);
  }
}

function toggleBasketDisplay(show) {
  const basketEL = document.getElementById('main-basket');
  const overlay = document.getElementById('basket-overlay');
  if (basketEL) basketEL.classList.toggle('show', show);
  if (overlay) overlay.style.display = show ? 'block' : 'none';
}

function closeDelivery() {
  const dialog = document.getElementById('orderConfirmation');
  if (dialog) {
    dialog.close();
  }
}

function toggleBasket() {
  const dialog = document.getElementById('media-basket');
  if (!dialog) return;

  const isMobile = window.innerWidth <= 1000;

  if (isMobile) {
    if (dialog.hasAttribute('open')) {
      dialog.close();
      document.documentElement.classList.remove('dialog-open');
      document.body.classList.remove('dialog-open');
    } else {
      dialog.show();
      document.documentElement.classList.add('dialog-open');
      document.body.classList.add('dialog-open');
    }
  }
}
