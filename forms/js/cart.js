// cart.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>Preço: R$${item.price.toFixed(2)}</p>
                <p>Quantidade: ${item.quantity}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;

            cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
                removeFromCart(item.id);
            });
        });

        cartTotalElement.innerText = total.toFixed(2);
    }

    function removeFromCart(id) {
        const productIndex = cart.findIndex(item => item.id === id);
        if (productIndex !== -1) {
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity--;
            } else {
                cart.splice(productIndex, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Compra finalizada com sucesso!');
        clearCart();
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        clearCart();
    });

    renderCart();
});
