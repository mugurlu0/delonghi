

const toggleButton = document.querySelector('.toggle-button')
const navbarLinks = document.querySelector('.navbar-links')

toggleButton.addEventListener('click', () => {
navbarLinks.classList.contains('d-block')? navbarLinks.classList.remove('d-block'):navbarLinks.classList.add('d-block')
})

