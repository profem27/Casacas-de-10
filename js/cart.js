document.addEventListener('DOMContentLoaded', function () {
    // Función para mostrar el carrito flotante
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

    // Función para agregar productos al carrito
    function addToCart() {
        // Obtener nombre y precio del producto
        const productName = document.getElementById('product-name').innerText;
        const productPriceText = document.querySelector('.price').innerText;
        const productPrice = parseFloat(productPriceText.replace(/[^0-9,-]/g, '').replace(',', '.'));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Agregar nuevo producto
        cart.push({ name: productName, price: productPrice });

        // Guardar carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar conteo del carrito
        updateCartDisplay();
        alert(`${productName} ha sido agregado al carrito.`);
    }

    // Función para actualizar el contenido del carrito en el HTML
    function updateCartDisplay() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.innerText = cart.length;

        // Limpiar lista de productos
        cartItemsContainer.innerHTML = '';

        let total = 0;
        cart.forEach((item, index) => {
            let itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price.toLocaleString()}</p>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });

        cartTotal.innerText = total.toLocaleString();

        // Añadir evento a los botones de eliminar
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                removeCartItem(button.dataset.index);
            });
        });
    }

    // Función para eliminar un producto del carrito
    function removeCartItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Eliminar producto por índice
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Inicializar carrito en el DOM
    updateCartDisplay();

    // Botón de checkout
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function () {
            window.location.href = 'Casacas de 10 Final/Carrito/cart.html'; // Redirigir al carrito completo
        });
    }

    // Asignar la función addToCart a los botones de agregar al carrito en la página del producto
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
});
