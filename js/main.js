// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Dynamic Typing Effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Stats Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 20);
}

// Initialize counters when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counterElements = entry.target.querySelectorAll('.counter');
            counterElements.forEach(counter => {
                const target = counter.parentElement.dataset.count;
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelector('.stats-container') && 
observer.observe(document.querySelector('.stats-container'));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Testimonial Carousel
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');

function showSlide(n) {
    testimonials.forEach(slide => slide.style.display = 'none');
    currentSlide = (n + testimonials.length) % testimonials.length;
    testimonials[currentSlide].style.display = 'block';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Auto advance testimonials
testimonials.length > 0 && setInterval(nextSlide, 5000);

// Initialize first slide
testimonials.length > 0 && showSlide(0);

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.backgroundPositionY = `${yPos}px`;
    });
});