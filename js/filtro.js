function sortProducts() {
    const productContainer = document.querySelector(".product-grid");
    const products = Array.from(document.querySelectorAll(".product-card"));

    // Obtener los valores de los checkboxes seleccionados
    const azChecked = document.getElementById("az").checked;
    const zaChecked = document.getElementById("za").checked;
    const retroChecked = document.getElementById("retro").checked;
    const actualesChecked = document.getElementById("actuales").checked;

    // Mostrar todos los productos antes de aplicar filtros
    products.forEach(product => {
        product.style.display = '';  // Mostrar todos
    });

    // Si se selecciona A-Z o Z-A
    if (azChecked) {
        products.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    } else if (zaChecked) {
        products.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameB.localeCompare(nameA);
        });
    }

    // Filtrar productos retro
    if (retroChecked) {
        products.forEach(product => {
            const title = product.querySelector("h3").innerText.toLowerCase();
            if (!title.includes('retro')) {
                product.style.display = 'none'; // Ocultar no retro
            }
        });
    }

    // Filtrar productos actuales
    if (actualesChecked) {
        products.forEach(product => {
            const title = product.querySelector("h3").innerText.toLowerCase();
            if (!(title.includes('24') || title.includes('24/25'))) {
                product.style.display = 'none'; // Ocultar no actuales
            }
        });
    }

    // Eliminar todos los productos del contenedor antes de añadirlos ordenados
    productContainer.innerHTML = '';

    // Volver a agregar los productos al contenedor ya ordenados/filtrados
    products.forEach(product => {
        productContainer.appendChild(product);
    });
}
