function init() {
  renderDishes();
}

function renderDishes() {
  let dishesContainer = document.getElementById('dishes');
  if (!dishesContainer) return;

  dishesContainer.innerHTML = '';

  MY_DISHES.forEach((burger) => {
    dishesContainer.innerHTML += `
      <div class="burger-card">
   <img src="${burger.image}" alt="${burger.name}" class="burger-img">
          <h3>${burger.name}</h3>
          <p class="description">${burger.description}</p>
          <p class="price">${burger.price.toFixed(2).replace('.', ',')} €</p>
      </div>
    `;
  });
}

// Manuelle Ausführung am Ende der Datei
init();
