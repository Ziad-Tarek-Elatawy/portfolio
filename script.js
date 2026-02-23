const typingText = document.querySelector(".typing-text");
const words = [
    "AI & Data Science Engineer",
    "NLP & LLM Engineer",
    "GenAI & Multi-Agent Architect",
    "Arabic NLP Specialist"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex--);
    } else {
        typingText.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 100 : 200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});


// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Custom Cursor (Optional - Simple Dot Follower)
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Optional: remove class to re-animate when scrolling back up
            // entry.target.classList.remove('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden, .fade-in-left, .fade-in-right, .fade-in-up');
hiddenElements.forEach((el) => observer.observe(el));

// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const tech = '<>{}[]/\\|;:"!@#$%^&*()_+~`';
const robots = '🤖👾'; // Added robots/aliens

const alphabet = katakana + latin + nums + tech + robots;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    ctx.fillStyle = 'rgba(11, 13, 23, 0.05)'; // Fade effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#a855f7'; // Purple text
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

setInterval(draw, 70);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- Projects 3D Wheel Logic --- //
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentAngle = 0;
const numSlides = slides.length;
// We assign a 360 degree space divided by the number of projects.
// e.g., 3 slides = 120deg difference.
const angleStep = 360 / numSlides;

// Radius calculation: Distance from the center of the wheel to the slides.
// We use a base width of 450px. You can adjust this for wider screens.
let radius = Math.round((450 / 2) / Math.tan(Math.PI / numSlides));

function initWheel() {
    // If there's only 1 or 2 slides, the math can look flat, but we add a default radius.
    if (numSlides <= 2) {
        radius = 450;
    }

    slides.forEach((slide, index) => {
        const slideAngle = index * angleStep;
        slide.style.transform = `rotateY(${slideAngle}deg) translateZ(${radius}px)`;
        // Set the first slide as active
        if (index === 0) slide.classList.add('active');
    });

    // Reset track rotation
    track.style.transform = `translateZ(-${radius}px) rotateY(0deg)`;
}

function rotateWheel(direction) {
    if (numSlides === 0) return;

    if (direction === 'next') {
        currentAngle -= angleStep;
    } else if (direction === 'prev') {
        currentAngle += angleStep;
    }

    // Apply the rotation
    track.style.transform = `translateZ(-${radius}px) rotateY(${currentAngle}deg)`;

    // Calculate active slide index
    // currentAngle might be negative, so we use modulo math to find the positive index
    let activeIndex = Math.round((currentAngle / angleStep) % numSlides);
    if (activeIndex < 0) {
        activeIndex += numSlides; // Handle negative wrapping
    }
    // Because rotating "next" means negative angle, the actual slide index moves forward
    activeIndex = (numSlides - activeIndex) % numSlides;

    slides.forEach((slide, index) => {
        if (index === activeIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

// Event Listeners for global buttons
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => rotateWheel('next'));
    prevBtn.addEventListener('click', () => rotateWheel('prev'));
}

// Initialize on load
initWheel();

// Optional: Re-calculate on resize if we want the wheel to be responsive
window.addEventListener('resize', () => {
    // Basic responsive implementation: shrink radius on small screens
    const width = window.innerWidth;
    let cardWidth = width < 768 ? 320 : 450;

    // Update CSS card width
    document.documentElement.style.setProperty('--wheel-card-width', cardWidth + 'px');
    slides.forEach(slide => slide.style.width = cardWidth + 'px');
    track.style.width = cardWidth + 'px';

    // Recalculate
    radius = Math.round((cardWidth / 2) / Math.tan(Math.PI / numSlides));
    if (numSlides <= 2) radius = cardWidth;

    initWheel();
});

// --- Image Modal Logic --- //
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.querySelector(".close-modal");
const projectImages = document.querySelectorAll(".slide-img");

// When the user clicks on the image, open the modal
projectImages.forEach(img => {
    // Adding cursor pointer via JS to indicate clickability
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
        modal.classList.add("show");
        modalImg.src = img.src;
    });
});

// When the user clicks on <span> (x), close the modal
if (closeModal) {
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });
}

// When the user clicks anywhere outside of the image, close it
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
});
