document.addEventListener('DOMContentLoaded', function () {
    const cartPopup = document.getElementById('cart-popup');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItemsContainer = document.getElementById('cart-items');

    // Mostrar carrito cuando se hace clic en el ícono
    cartIcon.addEventListener('click', function (e) {
        e.preventDefault();
        toggleCartPopup();
    });

    function toggleCartPopup() {
        cartPopup.style.display = (cartPopup.style.display === 'none' || cartPopup.style.display === '') ? 'block' : 'none';
        updateCartDisplay();
    }

    function addToCart() {
        const productName = document.getElementById('product-name')?.innerText || 'Producto desconocido';
        const productPriceText = document.querySelector('.price')?.innerText || '0';
        const productPrice = parseFloat(productPriceText.replace(/[^0-9,-]/g, '').replace(',', '.')) || 0;
        const productSize = document.getElementById('size')?.value || 'No especificado';
        const productQuantity = parseInt(document.getElementById('quantity')?.value, 10) || 1;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar si el producto ya está en el carrito
        const existingItemIndex = cart.findIndex(item => item.name === productName && item.size === productSize);
        if (existingItemIndex > -1) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            cart[existingItemIndex].quantity += productQuantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            cart.push({ name: productName, price: productPrice, size: productSize, quantity: productQuantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        alert(`${productName} (${productSize}) - ${productQuantity} unidades han sido agregadas al carrito.`);
    }

    function updateCartDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.innerText = cart.length;

        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - Talle: ${item.size} - ${item.quantity} x $${item.price.toLocaleString()} = $${itemTotal.toLocaleString()}</p>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += itemTotal;
        });

        cartTotal.innerText = `$${total.toLocaleString()}`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                removeCartItem(button.dataset.index);
            });
        });
    }

    function removeCartItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let message = 'Hola, quisiera comprar los siguientes productos:\n\n';

            cart.forEach(item => {
                message += `${item.name} - Talle: ${item.size} - Cantidad: ${item.quantity} - Precio: $${(item.price * item.quantity).toLocaleString()}\n`;
            });

            message += `\nTotal a pagar: $${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString()}`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/+5491124559650?text=${encodedMessage}`; // Reemplaza +5491124559650 con tu número de WhatsApp

            window.location.href = whatsappUrl;
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    updateCartDisplay();
});
