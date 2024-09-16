function sortProducts() {
    const sortBy = document.getElementById("sort").value;
    const products = document.querySelectorAll(".product-card");
    const productContainer = document.querySelector(".product-grid");

    // Convertir NodeList a array
    const productArray = Array.from(products);

    // Ordenar por el valor seleccionado
    if (sortBy === "az") {
        productArray.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    } else if (sortBy === "za") {
        productArray.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameB.localeCompare(nameA);
        });
    } else if (sortBy === "retro") {
        // Filtrar productos que son retro
        productArray.sort((a, b) => {
            return a.querySelector("h3").innerText.includes('retro') ? -1 : 1;
        });
    } else if (sortBy === "actuales") {
        // Filtrar productos actuales
        productArray.sort((a, b) => {
            return a.querySelector("h3").innerText.includes('2024') ? -1 : 1;
        });
    }

    // Eliminar productos actuales
    productContainer.innerHTML = "";

    // Insertar los productos ordenados
    productArray.forEach(product => {
        productContainer.appendChild(product);
    });
}
    document.getElementById('sort-products').addEventListener('change', function () {
        const sortBy = this.value;
        const productGrid = document.getElementById('product-grid');
        const products = Array.from(productGrid.getElementsByClassName('product-card'));

        // Función para ordenar
        let sortedProducts;
        if (sortBy === 'az') {
            sortedProducts = products.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        } else if (sortBy === 'za') {
            sortedProducts = products.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        } else if (sortBy === 'retro') {
            sortedProducts = products.filter(product => product.dataset.category === 'retro');
        } else if (sortBy === 'actual') {
            sortedProducts = products.filter(product => product.dataset.category === 'actual');
        }

        // Limpiamos la lista actual
        productGrid.innerHTML = '';
        // Añadimos los productos ordenados
        sortedProducts.forEach(product => productGrid.appendChild(product));
    });
