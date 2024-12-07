document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const projectImages = document.querySelectorAll('.project-image');
    const closeLightboxButtons = document.querySelectorAll('.close');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerOffset = 75; // Adjust this value to match the height of the header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });

            navMenu.classList.remove('active');
            // Hide the currently visible lightbox modal, if any
            const visibleLightboxModal = document.querySelector('.lightbox-modal[style*="display: flex"]');
            if (visibleLightboxModal) {
                visibleLightboxModal.style.display = 'none';
            }
        });
    });

    projectImages.forEach(function (image) {
        image.addEventListener('click', function () {
            const modalId = this.dataset.modalId;
            const lightboxModal = document.getElementById(modalId);

            const lightboxImage = lightboxModal.querySelector('.lightbox-content');
            //lightboxImage.src = this.currentSrc;       // if I wanted to use the resized image on mobile view
            lightboxImage.src = this.src;               // if I wanted to use the original image

            lightboxModal.style.display = 'flex';
        });
    });

    closeLightboxButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const lightboxModal = this.closest('.lightbox-modal');
            lightboxModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('lightbox-modal')) {
            event.target.style.display = 'none';
        }
    });
});