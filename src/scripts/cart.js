import {  cartLocal, cartList } from '../index.js'; // Припустимо, що функція sendRequest визначена в файлі api.js

export function renderCart() {
  cartList.innerHTML = "";
  let total = 0;
  cartLocal.forEach((element) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("h-76", "flex", "justify-between", "mb-5");

    const prices = [];

    element.variants.forEach((variant) => {
      prices.push(variant.price);
    });

    prices.sort((a, b) => a - b);

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];

    const price = () => {
      if (parseFloat(firstPrice) === 0) {
        return lastPrice;
      } else {
        return firstPrice;
      }
    };

    total += parseFloat(price()) * parseFloat(element.quantity);
    const imageCart =
      element.images && element.images[0]
        ? `<img src="${element.images[0].src}" alt="" class="h-full w-76 mr-5 border border-cart-text rounded" />`
        : `<div class="h-full w-76 mr-5 justify-center items-center border border-cart-text rounded">There is no image yet(</div>`;

    const itemContent = `
      <span class="flex w-3/4">
        ${imageCart}
        <span class="flex flex-col font-bold text-sm justify-around">
          <p>${element.title}</p>
          <p>${price()} KR</p>
          <span class="flex w-8 justify-between">
          <button class="decrease-button cursor-pointer" data-product-id="${
            element.id
          }">-</button>
  
          <p>${element.quantity || 1}</p>
          <button class="increase-button cursor-pointer" data-product-id="${
            element.id
          }">+</button>
        
          </span>
        </span>
      </span>
      <img id="remove" src="./img/removeFromCart.svg" alt="remove" class="w-5 h-5 cursor-pointer" />
    `;

    cartItem.innerHTML = itemContent;
    cartList.appendChild(cartItem);

    const increaseButton = cartItem.querySelector(".increase-button");
    increaseButton.addEventListener("click", (event) => {
      event.stopPropagation();
      increaseQuantity(element.id);
    });

    const decreaseButton = cartItem.querySelector(".decrease-button");
    decreaseButton.addEventListener("click", (event) => {
      event.stopPropagation();
      decreaseQuantity(element.id);
    });

    const removeButton = cartItem.querySelector("#remove");
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeFromCart(element.id);
    });

    function removeFromCart(productId) {
      const index = cartLocal.findIndex((product) => product.id == productId);

      if (index !== -1) {
        cartLocal.splice(index, 1);

        localStorage.setItem("cartLocal", JSON.stringify(cartLocal));

        renderCart();
      }
    }
  });
  document.getElementById("total").innerHTML = `${parseFloat(total)} KR`;
}

export function increaseQuantity(productId) {
  const product = cartLocal.find((product) => product.id == productId);

  if (product) {
    product.quantity++;
    localStorage.setItem("cartLocal", JSON.stringify(cartLocal));
    renderCart();
  }
}

export function decreaseQuantity(productId) {
  const product = cartLocal.find((product) => product.id == productId);

  if (product && product.quantity > 1) {
    product.quantity--;
    localStorage.setItem("cartLocal", JSON.stringify(cartLocal));
    renderCart();
  }
}
