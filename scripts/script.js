const rating = 4.5;
const count = 215;

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
          </div>
      </div>
    `;
  });
}
