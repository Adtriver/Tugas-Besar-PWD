// ===========================
// 1. HAMBURGER MENU TOGGLE
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animate hamburger icon
    const icon = document.getElementById('hamburger-icon');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    } else {
        icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    }
});

// Close mobile menu when link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.getElementById('hamburger-icon').setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });
});

// ===========================
// 2. SMOOTH SCROLL
// ===========================
const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// 3. ACTIVE MENU HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===========================
// 4. NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===========================
// 5. TYPING ANIMATION
// ===========================
const typingText = document.getElementById('typing-text');
const phrases = [
    'Membangun Masa Depan Digital',
    'Inovasi dalam Teknologi Informasi',
    'Menghasilkan Lulusan Berkompeten'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ===========================
// 6. FADE IN ON SCROLL
// ===========================
const fadeElements = document.querySelectorAll('.fade-in-section');

function checkFadeIn() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('is-visible');
        }
    });
}

window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

// ===========================
// 7. COUNTER ANIMATION
// ===========================
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function animateCounters() {
    if (counterAnimated) return;
    
    const counterSection = document.querySelector('.counter').closest('section');
    const sectionTop = counterSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        counterAnimated = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===========================
// 8. DOSEN MODAL
// ===========================
const dosenCards = document.querySelectorAll('.dosen-card');
const dosenModal = document.getElementById('dosen-modal');
const closeModal = document.getElementById('close-modal');
const modalName = document.getElementById('modal-name');
const modalField = document.getElementById('modal-field');
const modalEmail = document.getElementById('modal-email');

dosenCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.getAttribute('data-name');
        const field = card.getAttribute('data-field');
        const email = card.getAttribute('data-email');
        
        modalName.textContent = name;
        modalField.textContent = field;
        modalEmail.textContent = email;
        
        dosenModal.classList.remove('hidden');
        dosenModal.classList.add('show');
    });
});

closeModal.addEventListener('click', () => {
    dosenModal.classList.add('hidden');
    dosenModal.classList.remove('show');
});

// Close modal when clicking outside
dosenModal.addEventListener('click', (e) => {
    if (e.target === dosenModal) {
        dosenModal.classList.add('hidden');
        dosenModal.classList.remove('show');
    }
});

// ===========================
// 9. FORM VALIDATION
// ===========================
const contactForm = document.getElementById('contact-form');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const pesanInput = document.getElementById('pesan');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('[id$="-error"]').forEach(error => {
        error.classList.add('hidden');
    });
    
    // Validate nama
    if (namaInput.value.trim() === '') {
        document.getElementById('nama-error').classList.remove('hidden');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    }
    
    // Validate pesan
    if (pesanInput.value.trim() === '') {
        document.getElementById('pesan-error').classList.remove('hidden');
        isValid = false;
    }
    
    // If valid, show success message
    if (isValid) {
        alert('Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.');
        contactForm.reset();
    }
});

// ===========================
// 10. BACK TO TOP BUTTON
// ===========================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.add('hidden');
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});