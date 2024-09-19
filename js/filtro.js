function sortProducts() { 
    const productContainer = document.querySelector(".product-grid");
    const products = Array.from(document.querySelectorAll(".product-card"));

    // Obtener los valores de los checkboxes seleccionados
    const azCheckbox = document.getElementById("az");
    const zaCheckbox = document.getElementById("za");
    const retroCheckbox = document.getElementById("retro");
    const actualesCheckbox = document.getElementById("actuales");
    const seleccionCheckbox = document.getElementById("selecciones");
    const argentinaCheckbox = document.getElementById("afa");
    const clubesCheckbox = document.getElementById("clubes");
    const europaCheckbox = document.getElementById("europa");
    const latinoCheckbox = document.getElementById("latinoamerica");

    const azChecked = azCheckbox?.checked || false;
    const zaChecked = zaCheckbox?.checked || false;
    const retroChecked = retroCheckbox?.checked || false;
    const actualesChecked = actualesCheckbox?.checked || false;
    const seleccionChecked = seleccionCheckbox?.checked || false;
    const argentinaChecked = argentinaCheckbox?.checked || false;
    const clubesChecked = clubesCheckbox?.checked || false;
    const europaChecked = europaCheckbox?.checked || false;
    const latinoChecked = latinoCheckbox?.checked || false;

    // Mostrar todos los productos antes de aplicar filtros
    products.forEach(product => {
        product.style.display = '';  // Mostrar todos
    });

    // Ordenar productos A-Z o Z-A
    if (azChecked && !zaChecked) {
        products.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    } else if (zaChecked && !azChecked) {
        products.sort((a, b) => {
            const nameA = a.querySelector("h3").innerText.toUpperCase();
            const nameB = b.querySelector("h3").innerText.toUpperCase();
            return nameB.localeCompare(nameA);
        });
    }

    // Filtrar por categorías
    products.forEach(product => {
        const categories = product.dataset.categories
            .split(',')
            .map(cat => cat.trim().toLowerCase());  // Normalizamos a minúsculas y eliminamos espacios

        let matchesFilter = true; // Inicialmente asumimos que el producto coincide con el filtro

        if (seleccionChecked && !categories.includes('seleccion')) matchesFilter = false;
        if (clubesChecked && !categories.includes('club')) matchesFilter = false;
        if (europaChecked && !categories.includes('europeo')) matchesFilter = false;
        if (latinoChecked && !categories.includes('latinoamericano')) matchesFilter = false;
        if (argentinaChecked && !categories.includes('afa')) matchesFilter = false;

        if (!matchesFilter) {
            product.style.display = 'none';
        }
    });

    // Filtrar productos retro
    if (retroChecked && !actualesChecked) {
        products.forEach(product => {
            const title = product.querySelector("h3").innerText.toLowerCase();
            if (!title.includes('retro')) {
                product.style.display = 'none'; // Ocultar no retro
            }
        });
    }

    // Filtrar productos actuales
    if (actualesChecked && !retroChecked) {
        products.forEach(product => {
            const title = product.querySelector("h3").innerText.toLowerCase();
            if (!(title.includes('24') || title.includes('24/25'))) {
                product.style.display = 'none'; // Ocultar no actuales
            }
        });
    }

    // Si ambos filtros están seleccionados, mostrar todos los productos
    if (retroChecked && actualesChecked) {
        products.forEach(product => {
            product.style.display = ''; // Mostrar todos
        });
    }

    // Eliminar todos los productos del contenedor antes de añadirlos ordenados
    productContainer.innerHTML = '';

    // Volver a agregar los productos al contenedor ya ordenados/filtrados
    products.forEach(product => {
        productContainer.appendChild(product);
    });
}

function handleCheckboxChange(checkbox, groupName) {
    if (groupName === 'sort-order') {
        const checkboxes = document.querySelectorAll(`input[name="sort-order"]`);
        checkboxes.forEach(cb => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });
    }
    
    // Llamar a la función que ordena los productos después de cambiar el filtro
    sortProducts();
}
