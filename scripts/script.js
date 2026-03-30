const RATING = 4.5,
  COUNT = 215,
  DELIVERY_FEE = 4.99;
let isDelivery = true,
  basket = [];

document.getElementById('ratingValue').textContent = RATING.toFixed(1);
document.getElementById('ratingCount').textContent = `(${COUNT})`;

function renderCategory(category) {
  const CONTAINER = document.getElementById(category);
  if (!CONTAINER) return;
  // MY_DISHES_NEW kommt aus der db.js
  CONTAINER.innerHTML = MY_DISHES_NEW[category]
    .map((dish) => getDishTemplate(dish))
    .join('');
}

function init() {
  Object.keys(MY_DISHES_NEW).forEach(renderCategory);
}

function addToBasket(name, price) {
  const ITEM = basket.find((i) => i.name === name);
  ITEM ? ITEM.amount++ : basket.push({ name, price, amount: 1 });
  updateBasket();
}

function decreaseAmount(index) {
  basket[index].amount > 1 ? basket[index].amount-- : basket.splice(index, 1);
  updateBasket();
}

function removeFromBasket(index) {
  basket.splice(index, 1);
  updateBasket();
}

function updateBasket() {
  const LIST_CONTAINER = document.getElementById('basket_items'),
    TOTAL_CONTAINER = document.getElementById('basket_total');

  const SUBTOTAL = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const FEE = isDelivery && basket.length ? DELIVERY_FEE : 0;

  LIST_CONTAINER.innerHTML = basket
    .map((item, i) => getBasketItemTemplate(item, i))
    .join('');

  renderTotalSection(TOTAL_CONTAINER, SUBTOTAL, FEE);
}

function renderTotalSection(element, subtotal, fee) {
  if (!basket.length) {
    element.innerHTML = `<p class="empty-msg">Dein Warenkorb ist noch leer.</p>`;
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
  const BASKET_EL = document.getElementById('main-basket'),
    OVERLAY = document.getElementById('basket-overlay'),
    DIALOG = document.getElementById('orderConfirmation');
  if (!basket.length) return alert('Dein Warenkorb ist leer!');
  if (BASKET_EL) BASKET_EL.classList.remove('show');
  if (OVERLAY) OVERLAY.style.display = 'none';
  if (DIALOG) {
    DIALOG.showModal();
    basket = [];
    updateBasket();
    setTimeout(() => DIALOG.close(), 3000);
  }
}

function closeDelivery() {
  document.getElementById('orderConfirmation').close();
}

function toggleBasket() {
  const BASKET_EL = document.getElementById('main-basket'),
    OVERLAY = document.getElementById('basket-overlay');
  BASKET_EL.classList.toggle('show');
  OVERLAY.style.display = BASKET_EL.classList.contains('show')
    ? 'block'
    : 'none';
}
