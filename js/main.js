
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       nav.classList.toggle('show-menu')
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

const dropdownItems = document.querySelectorAll('.dropdown__item')

dropdownItems.forEach((item) =>{
    const dropdownButton = item.querySelector('.dropdown__button') 

    dropdownButton.addEventListener('click', () =>{
        const showDropdown = document.querySelector('.show-dropdown')
        
        toggleItem(item)

        if(showDropdown && showDropdown!== item){
            toggleItem(showDropdown)
        }
    })
})

const toggleItem = (item) =>{
    const dropdownContainer = item.querySelector('.dropdown__container')

    if(item.classList.contains('show-dropdown')){
        dropdownContainer.removeAttribute('style')
        item.classList.remove('show-dropdown')
    } else{
        dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
        item.classList.add('show-dropdown')
    }
}

const mediaQuery = matchMedia('(min-width: 1118px)'),
      dropdownContainer = document.querySelectorAll('.dropdown__container')

const removeStyle = () =>{
    if(mediaQuery.matches){
        dropdownContainer.forEach((e) =>{
            e.removeAttribute('style')
        })

        dropdownItems.forEach((e) =>{
            e.classList.remove('show-dropdown')
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const totalImages = images.length;
    let index = 0;

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        const offset = -index * 100; // Mueve el carrusel basado en el índice
        carouselImages.style.transform = `translateX(${offset}vw)`;
    }

    // Función para mover las imágenes automáticamente
    function autoMove() {
        index = (index < totalImages - 1) ? index + 1 : 0; // Avanza al siguiente slide o vuelve al primero
        updateCarousel();
    }

    // Configura el movimiento automático cada 3 segundos (3000 ms)
    setInterval(autoMove, 3000);
});

