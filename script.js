const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const cart = [];
  
  document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');
  
    const renderProducts = () => {
      productsContainer.innerHTML = '';
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <span>${product.name} - $${product.price}</span>
          <div>
            <button onclick="addToCart(${product.id})">+</button>
            <span id="quantity-${product.id}">0</span>
            <button onclick="removeFromCart(${product.id})">-</button>
          </div>
        `;
        productsContainer.appendChild(productDiv);
      });
    };
  
    const renderCart = () => {
      cartContainer.innerHTML = '';
      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>No Product added to the cart.</p>';
      } else {
        let total = 0;
        cart.forEach(item => {
          const cartItemDiv = document.createElement('div');
          cartItemDiv.classList.add('cart-item');
          cartItemDiv.innerHTML = `
            <span>${item.name} - $${item.price} x ${item.quantity}</span>
            <span>$${item.price * item.quantity}</span>
          `;
          cartContainer.appendChild(cartItemDiv);
          total += item.price * item.quantity;
        });
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-item');
        totalDiv.innerHTML = `
          <span><strong>Total</strong></span>
          <span><strong>$${total}</strong></span>
        `;
        cartContainer.appendChild(totalDiv);
      }
    };
  
    window.addToCart = (id) => {
      const product = products.find(p => p.id === id);
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      document.getElementById(`quantity-${id}`).innerText = cartItem ? cartItem.quantity : 1;
      renderCart();
    };
  
    window.removeFromCart = (id) => {
      const cartItem = cart.find(item => item.id === id);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity -= 1;
          document.getElementById(`quantity-${id}`).innerText = cartItem.quantity;
        } else {
          cart.splice(cart.indexOf(cartItem), 1);
          document.getElementById(`quantity-${id}`).innerText = 0;
        }
      }
      renderCart();
    };
  
    renderProducts();
  });
  