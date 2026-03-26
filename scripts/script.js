const rating = 4.5;
const count = 215;

let isDelivery = true;
const DELIVERY_FEE = 4.99;

document.getElementById('ratingValue').textContent = rating.toFixed(1);
document.getElementById('ratingCount').textContent = `(${count})`;

function init() {
  renderBurger();
  renderPizza();
  renderSalad();
  renderSideDishes();
  renderDesserts();
}

function renderBurger() {
  let dishesContainer = document.getElementById('burger');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES_NEW.burger.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
          <img src="${burger.image}" alt="${burger.name}" class="burger_img">
          
          <div class="card-body">
              <div class="card-header">
                  <h3>${burger.name}</h3>
                  <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
              </div>
              <p class="menu_description">${burger.description}</p>
              <button class="add_btn" onclick="addToBasket('${burger.name}', ${burger.price})">Add to basket</button>
          </div>
      </div>
    `;
  });
}
function renderPizza() {
  let dishesContainer = document.getElementById('pizza');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES_NEW.pizza.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
          <img src="${burger.image}" alt="${burger.name}" class="burger_img">
          
          <div class="card-body">
              <div class="card-header">
                  <h3>${burger.name}</h3>
                  <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
              </div>
              <p class="menu_description">${burger.description}</p>
               <button class="add_btn" onclick="addToBasket('${burger.name}', ${burger.price})">Add to basket</button>
          </div>
      </div>
    `;
  });
}
function renderSalad() {
  let dishesContainer = document.getElementById('salad');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES_NEW.salad.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
          <img src="${burger.image}" alt="${burger.name}" class="burger_img">
          
          <div class="card-body">
              <div class="card-header">
                  <h3>${burger.name}</h3>
                  <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
              </div>
              <p class="menu_description">${burger.description}</p>
               <button class="add_btn" onclick="addToBasket('${burger.name}', ${burger.price})">Add to basket</button>
          </div>
      </div>
    `;
  });
}
function renderSideDishes() {
  let dishesContainer = document.getElementById('sideDishes');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES_NEW.sideDishes.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
          <img src="${burger.image}" alt="${burger.name}" class="burger_img">
          
          <div class="card-body">
              <div class="card-header">
                  <h3>${burger.name}</h3>
                  <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
              </div>
              <p class="menu_description">${burger.description}</p>
               <button class="add_btn" onclick="addToBasket('${burger.name}', ${burger.price})">Add to basket</button>
          </div>
      </div>
    `;
  });
}
function renderDesserts() {
  let dishesContainer = document.getElementById('desserts');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES_NEW.desserts.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
          <img src="${burger.image}" alt="${burger.name}" class="burger_img">
          
          <div class="card-body">
              <div class="card-header">
                  <h3>${burger.name}</h3>
                  <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
              </div>
              <p class="menu_description">${burger.description}</p>
               <button class="add_btn" onclick="addToBasket('${burger.name}', ${burger.price})">Add to basket</button>
          </div>
      </div>
    `;
  });
}

let basket = [];

function addToBasket(name, price) {
  let index = basket.findIndex((item) => item.name === name);

  if (index === -1) {
    basket.push({ name: name, price: price, amount: 1 });
  } else {
    basket[index].amount++;
  }

  updateBasket();
}

//delete function Basket

function removeFromBasket(index) {
  basket.splice(index, 1);
  updateBasket();
}

function updateBasket() {
  let basketContainer = document.getElementById('basket_items');
  let totalContainer = document.getElementById('basket_total');
  basketContainer.innerHTML = '';

  let subtotal = 0;

  basket.forEach((item, index) => {
    let itemTotal = item.price * item.amount;
    subtotal += itemTotal;

    basketContainer.innerHTML += `
            <div class="basket-item">
                <div class="basket-item-name">${item.amount}x ${item.name}</div>
                <div class="basket-item-controls">
                    <div class="quantity-group">
                        <button onclick="removeFromBasket(${index})" class="delete-btn"></button>
                        <div class="quantity-select">
                            <button onclick="decreaseAmount(${index})" class="remove_btn">-</button>
                            <span>${item.amount}</span>
                            <button onclick="addToBasket('${item.name}', ${item.price})" class="remove_btn">+</button>
                        </div>
                    </div>
                    <div class="basket-item-price">${itemTotal.toFixed(2).replace('.', ',')} €</div>
                </div>
            </div>`;
  });

  let deliveryCost = isDelivery ? DELIVERY_FEE : 0;
  let finalTotal = subtotal + deliveryCost;

  totalContainer.innerHTML = `
        <div class="total-details">
            <div class="total-row">
                <span>Zwischensumme</span>
                <span>${subtotal.toFixed(2).replace('.', ',')} €</span>
            </div>
            <div class="total-row">
                <span>Lieferkosten</span>
                <span>${deliveryCost.toFixed(2).replace('.', ',')} €</span>
            </div>
            <hr>
            <div class="total-row total-final">
                <h3>Gesamt</h3>
                <h3>${finalTotal.toFixed(2).replace('.', ',')} €</h3>
            </div>
        </div>
    `;
}

function decreaseAmount(index) {
  if (basket[index].amount > 1) {
    basket[index].amount--;
  } else {
    removeFromBasket(index);
  }

  updateBasket();
}

function removeFromBasket(index) {
  basket.splice(index, 1);
  updateBasket();
}

//Abholung und Lieferung
function setDelivery(status) {
  isDelivery = status;
  document
    .getElementById('btn-delivery')
    .classList.toggle('active', isDelivery);
  document.getElementById('btn-pickup').classList.toggle('active', !isDelivery);

  updateBasket();
}
