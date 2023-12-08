document.addEventListener('DOMContentLoaded', function () {
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
    }, { threshold: 0.5 });

    fadeInSection.forEach(section => {
        observer.observe(section);
    });

    fadeOutSection.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
