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
    function estaLogado() {
        return !!sessionStorage.getItem("userId");
    }
    
    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    document.getElementById('checkout').addEventListener('click', () => {
        if (estaLogado()) {
            alert('Compra finalizada com sucesso!');
            clearCart();
        } else {
            // Constrói a URL com a mensagem para o usuário
            const loginUrl = './login.html?message=Loge%20para%20continuar';
            window.location.href = loginUrl; // Redireciona para a página de login com a mensagem
        }
    });

    document.getElementById('clear-cart').addEventListener('click', () => {
        clearCart();
    });

    renderCart();
});
