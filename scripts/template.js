function getDishTemplate(dish) {
  return `
    <div class="burger-card">
      <img src="${dish.image}" alt="${dish.name}" class="burger_img">
      <div class="card-body">
        <div class="card-header">
          <h3>${dish.name}</h3>
          <p class="price">${dish.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
        </div>
        <p class="menu_description">${dish.description}</p>
        <button class="add-btn" onclick="addToBasket('${dish.name}', ${dish.price})">Add to basket</button>
      </div>
    </div>`;
}

function getBasketItemTemplate(item, i) {
  return `
    <div class="basket-item">
      <div class="basket-item-name">${item.amount}x ${item.name}</div>
      <div class="basket-item-controls">
        <div class="quantity-group">
          <button onclick="removeFromBasket(${i})" class="delete-btn"></button>
          <div class="quantity-select">
            <button onclick="decreaseAmount(${i})" class="remove-btn">-</button>
            <span>${item.amount}</span>
            <button onclick="addToBasket('${item.name}', ${item.price})" class="remove-btn">+</button>
          </div>
        </div>
        <div class="basket-item-price">${(item.price * item.amount).toFixed(2).replace('.', ',')} €</div>
      </div>
    </div>`;
}

function getTotalSectionTemplate(subtotal, fee, isDelivery) {
  return `
    <div class="total-details">
      <div class="total-row"><span>Zwischensumme</span><span>${subtotal.toFixed(2).replace('.', ',')} €</span></div>
      ${isDelivery ? `<div class="total-row"><span>Lieferkosten</span><span>${fee.toFixed(2).replace('.', ',')} €</span></div>` : ''}
      <hr>
      <div class="total-row total-final"><h3>Gesamt</h3><h3>${(subtotal + fee).toFixed(2).replace('.', ',')} €</h3></div>
    </div>`;
}

function getEmptyBasketTemplate() {
  return `<p class="empty-msg">Dein Warenkorb ist noch leer.</p>`;
}
