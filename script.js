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

const fps = 15;
const frameInterval = 1000 / fps;
let lastDrawTime = 0;

const draw = (currentTime) => {
    requestAnimationFrame(draw);

    if (!currentTime) currentTime = performance.now();
    const deltaTime = currentTime - lastDrawTime;

    if (deltaTime < frameInterval) return;
    lastDrawTime = currentTime - (deltaTime % frameInterval);

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

requestAnimationFrame(draw);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    goToSlide(currentIndex); // Recalculate slide positioning for active carousel card width 
});

// --- Projects Data & Carousel Logic --- //
const projectsData = [
    {
        title: "Ford GoBike Interactive Dashboard",
        description: "An end-to-end Interactive Dashboard to analyze and visualize the Ford GoBike urban mobility data using Plotly and Dash, transforming raw trip data into a dynamic web application.",
        tech: ["Python", "Plotly", "Dash", "EDA", "Data Engineering"],
        image: "Projects/Ford GoBike Interactive Dashboard/Dashboard.png",
        link: "#"
    },
    {
        title: "Face Mask Detection",
        description: "Automated surveillance system using CNNs to detect face masks in real-time video feeds for safety compliance.",
        tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
        image: "Projects/Face Mask Detection/Face Mask Detection screenshot.jpg",
        link: "#"
    },
    {
        title: "SmartResolve AI",
        description: "An AI-powered platform utilizing Advanced NLP to automatically classify, prioritize, and route complaints and suggestions based on sentiment analysis and topic detection.",
        tech: ["Python", "NLP", "LLMs", "Sentiment Analysis"],
        image: "Projects/SmartResolve AI/SmartResolve AI screenshot.jpg",
        link: "#"
    },
    {
        title: "Hospital Management System",
        description: "Desktop application for managing hospital departments, staff, and patients with JSON data persistence.",
        tech: ["Python", "OOP", "JSON", "CLI"],
        image: "Projects/Hospital Management System/HMS screenshot.jpg",
        link: "#"
    }
];

const track = document.getElementById('projects-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

// Render Projects
if (track) {
    projectsData.forEach(project => {
        const techSpans = project.tech.map(t => `<span>${t}</span>`).join('');
        const slideHTML = `
            <div class="carousel-slide">
                <div class="slide-visual">
                    <img src="${project.image}" alt="${project.title}" class="slide-img">
                </div>
                <div class="slide-info">
                    <h3 class="slide-title">${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${techSpans}
                    </div>
                </div>
            </div>
        `;
        track.insertAdjacentHTML('beforeend', slideHTML);
    });
}

const slides = document.querySelectorAll('.carousel-slide');
let currentIndex = 0;
const numSlides = slides.length;

// Create dots
function createDots() {
    if (!dotsContainer) return;
    for (let i = 0; i < numSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

// Update dots active state
function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

// Go to a specific slide
function goToSlide(index) {
    if (numSlides === 0) return;
    if (index < 0) index = numSlides - 1;
    if (index >= numSlides) index = 0;
    currentIndex = index;

    const allSlides = document.querySelectorAll('.carousel-slide');

    // Clear old classes
    allSlides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });

    // Circular calculations
    const prevIndex = (currentIndex - 1 + numSlides) % numSlides;
    const nextIndex = (currentIndex + 1) % numSlides;

    // Apply classes for 3D Circle effect
    if (allSlides[currentIndex]) allSlides[currentIndex].classList.add('active');

    // Only apply prev/next if we have more than 1 slide
    if (numSlides > 1) {
        if (allSlides[prevIndex]) allSlides[prevIndex].classList.add('prev');
        // Only apply next if we have more than 2 slides to avoid overlapping with prev
        if (numSlides > 2 && allSlides[nextIndex]) allSlides[nextIndex].classList.add('next');
    }

    updateDots();
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

// Initialize
createDots();
goToSlide(0); // Trigger first visual positioning

// Auto-play (optional - subtle, every 6 seconds)
let autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);

// Pause auto-play on hover
const carousel = document.querySelector('.projects-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 6000);
    });
}

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
