// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
function closeMobile() {
    mobileMenu.classList.remove('open');
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
let counted = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.innerText = Math.ceil(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else counter.innerText = target;
        };
        requestAnimationFrame(update);
    });
}

// Trigger counters when stats section enters viewport
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !counted) {
        counted = true;
        animateCounters();
    }
}, { threshold: 0.4 });
if (statsSection) statsObserver.observe(statsSection);

// ===== SCROLL REVEAL =====
const aosEls = document.querySelectorAll('[data-aos]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 120);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
aosEls.forEach(el => revealObserver.observe(el));

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${current}` ? '#ffbe2e' : '';
    });
});