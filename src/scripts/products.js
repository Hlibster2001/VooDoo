import { sendRequest, cartLocal } from '../index.js'; // Припустимо, що функція sendRequest визначена в файлі api.js

let products = []; // Ініціалізація змінної products

export function loadProducts(page) {
    const API = `https://voodoo-sandbox.myshopify.com/products.json?limit=24&page=${page}`;
  
    sendRequest(API)
      .then((response) => response.json())
      .then((data) => {
        products = data.products;
  
        let cardList = document.getElementById("product-list");
  
        cardList.innerHTML = "";
  
        products.forEach(({ id, title, images, variants }) => {
          const cardDiv = document.createElement("div");
          cardDiv.className = "h-402 w-300 mb-10 content-between flex flex-col";
  
          const prices = [];
  
          variants.forEach((variant) => {
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
  
          const imageSrc =
            images && images[0]
              ? `<img src="${images[0].src}" alt="" class="w-full h-300 object-fill	" />`
              : `<div class="w-full h-300 bg-white flex justify-center items-center">There is no image yet(</div>`;
  
          cardDiv.innerHTML = `
            ${imageSrc}
            <div class="flex justify-between my-2.5 h-60">
              <span class="flex flex-col font-bold text-sm"><span class="flex flex-wrap w-160"> ${title} </span> <span >${price()} KR</span></span>
              <span class="flex flex-col font-medium text-sm">Condition <span class="font-normal">Used</span></span>
            </div>
            <button data-product-id=${id} class="add-to-cart-button w-full bg-black text-white uppercase h-10  rounded">add to cart</button>
          `;
  
          cardList.appendChild(cardDiv);
        });
      });
  }

 export function addToCart(productId) {
    const selectedProduct = products.find((product) => product.id == productId);
  
    if (selectedProduct) {
      const isProductInCart = cartLocal.some(
        (product) => product.id == productId
      );
  
      if (!isProductInCart) {
        selectedProduct.quantity = 1;
        cartLocal.push(selectedProduct);
        localStorage.setItem("cartLocal", JSON.stringify(cartLocal));
      }
    }
  }