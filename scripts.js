document.addEventListener('DOMContentLoaded', function () {
    // --- Fade-in animation via IntersectionObserver ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeInSections.forEach(section => {
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

    // --- Active nav link highlighting ---
    const currentPath = window.location.pathname;
    document.querySelectorAll('.right-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath ||
            (currentPath.endsWith('/') && href === '/') ||
            (currentPath.endsWith('index.html') && href === '/') ||
            currentPath.endsWith(href)) {
            link.classList.add('current');
            link.setAttribute('aria-current', 'page');
        }
    });
});
