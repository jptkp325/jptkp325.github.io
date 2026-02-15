document.addEventListener('DOMContentLoaded', function () {
    // --- Fade-in/out animation via IntersectionObserver ---
    const fadeInSection = document.querySelectorAll('.fade-in-section');
    const fadeOutSection = document.querySelectorAll('.fade-out-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, { threshold: 0.4 });

    fadeInSection.forEach(section => {
        observer.observe(section);
    });

    fadeOutSection.forEach(section => {
        observer.observe(section);
    });

    // --- Smooth scroll to anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            closeMobileMenu();
        });
    });

    // --- Mobile menu ---
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const rightMenu = document.querySelector('.right-menu');

    function openMobileMenu() {
        rightMenu.classList.add('show');
        mobileMenuIcon.setAttribute('aria-expanded', 'true');
    }

    function closeMobileMenu() {
        rightMenu.classList.remove('show');
        mobileMenuIcon.setAttribute('aria-expanded', 'false');
    }

    function toggleMobileMenu() {
        if (rightMenu.classList.contains('show')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    mobileMenuIcon.addEventListener('click', toggleMobileMenu);

    // Keyboard support: Enter and Space to toggle menu
    mobileMenuIcon.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });

    // Escape key closes the menu from anywhere
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});
