const RATING = 4.5;
const COUNT = 215;
const DELIVERY_FEE = 4.99;
const basket = [];

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
  const item = basket.find((i) => i.name === name);
  item ? item.amount++ : basket.push({ name, price, amount: 1 });
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
  const listContainer = document.getElementById('basket_items');
  const totalContainer = document.getElementById('basket_total');
  const btnPriceContainer = document.getElementById('total_btn_price');

  const allBadges = document.querySelectorAll('.basket-badge');

  const subTotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const totalCount = basket.reduce((sum, item) => sum + item.amount, 0);
  const fee = isDelivery && basket.length ? DELIVERY_FEE : 0;
  const total = subTotal + fee;

  allBadges.forEach((badge) => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  listContainer.innerHTML = basket
    .map((item, i) => getBasketItemTemplate(item, i))
    .join('');

  renderTotalSection(totalContainer, subTotal, fee);

  if (btnPriceContainer) {
    btnPriceContainer.textContent =
      basket.length > 0 ? `(${total.toFixed(2).replace('.', ',')} €)` : '';
  }
}

function renderTotalSection(element, subtotal, fee) {
  if (!basket.length) {
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
  const basketEL = document.getElementById('main-basket');
  const overlay = document.getElementById('basket-overlay');
  const dialog = document.getElementById('orderConfirmation');
  if (!basket.length) return alert('Dein Warenkorb ist leer!');
  if (basketEL) basketEL.classList.remove('show');
  if (overlay) overlay.style.display = 'none';
  if (dialog) {
    dialog.showModal();
    basket.length = 0;
    updateBasket();
    setTimeout(() => dialog.close(), 3000);
  }
}

function closeDelivery() {
  document.getElementById('orderConfirmation').close();
}

function toggleBasket() {
  const basketEL = document.getElementById('main-basket'),
    overlay = document.getElementById('basket-overlay');

  basketEL.classList.toggle('show');

  if (overlay) {
    overlay.style.display = basketEL.classList.contains('show')
      ? 'block'
      : 'none';
  }
}
