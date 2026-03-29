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

// Close menu when a link is clicked (Mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach((navLink) => {
                navLink.style.animation = '';
            });
        }
    });
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

// --- Neural Network Animation ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Build layered neuron network ---
function buildNetwork() {
    const layers = [];
    const layerCount = 6;
    const nodesPerLayer = [4, 6, 8, 8, 6, 4];
    const margin = { x: canvas.width * 0.1, y: canvas.height * 0.15 };
    const usableW = canvas.width - margin.x * 2;
    const usableH = canvas.height - margin.y * 2;

    for (let l = 0; l < layerCount; l++) {
        const layerNodes = [];
        const count = nodesPerLayer[l];
        const x = margin.x + (usableW / (layerCount - 1)) * l;
        for (let n = 0; n < count; n++) {
            const y = margin.y + (usableH / (count - 1)) * n;
            const colors = [
                'rgba(168, 85, 247,',
                'rgba(216, 180, 254,',
                'rgba(236, 72, 153,',
                'rgba(192, 132, 252,',
            ];
            layerNodes.push({
                x, y,
                baseX: x,
                baseY: y,
                radius: Math.random() * 2 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                glow: 0,
                pulseOffset: Math.random() * Math.PI * 2,
                // small drift
                driftX: (Math.random() - 0.5) * 18,
                driftY: (Math.random() - 0.5) * 18,
            });
        }
        layers.push(layerNodes);
    }
    return layers;
}

let layers = buildNetwork();

// --- Signals that travel along edges ---
const signals = [];

function spawnSignal() {
    // Pick a random layer (not last) and random node
    const l = Math.floor(Math.random() * (layers.length - 1));
    const fromNode = layers[l][Math.floor(Math.random() * layers[l].length)];
    const toNode = layers[l + 1][Math.floor(Math.random() * layers[l + 1].length)];
    const colors = ['rgba(168,85,247,', 'rgba(236,72,153,', 'rgba(216,180,254,'];
    signals.push({
        fromX: fromNode.x, fromY: fromNode.y,
        toX: toNode.x, toY: toNode.y,
        progress: 0,
        speed: Math.random() * 0.008 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
        targetNode: toNode,
    });
}

// Spawn initial signals
for (let i = 0; i < 12; i++) spawnSignal();

let animTime = 0;

function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    animTime += 0.012;

    // --- Drift nodes gently ---
    layers.forEach(layer => {
        layer.forEach(node => {
            node.x = node.baseX + Math.sin(animTime + node.pulseOffset) * node.driftX * 0.4;
            node.y = node.baseY + Math.cos(animTime * 0.7 + node.pulseOffset) * node.driftY * 0.4;
            node.glow = Math.max(0, node.glow - 0.04); // fade glow
        });
    });

    // --- Draw connections between adjacent layers ---
    for (let l = 0; l < layers.length - 1; l++) {
        for (let a = 0; a < layers[l].length; a++) {
            for (let b = 0; b < layers[l + 1].length; b++) {
                const nA = layers[l][a];
                const nB = layers[l + 1][b];
                const alpha = 0.07 + nA.glow * 0.1 + nB.glow * 0.1;

                const grad = ctx.createLinearGradient(nA.x, nA.y, nB.x, nB.y);
                grad.addColorStop(0, `${nA.color}${alpha})`);
                grad.addColorStop(1, `${nB.color}${alpha})`);

                ctx.beginPath();
                ctx.moveTo(nA.x, nA.y);
                ctx.lineTo(nB.x, nB.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.6 + nA.glow * 0.8;
                ctx.stroke();
            }
        }
    }

    // --- Draw neurons ---
    layers.forEach(layer => {
        layer.forEach(node => {
            const glowIntensity = 8 + node.glow * 20;
            ctx.shadowBlur = glowIntensity;
            ctx.shadowColor = `${node.color}1)`;

            // Outer ring (dim)
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 2, 0, Math.PI * 2);
            ctx.strokeStyle = `${node.color}${0.15 + node.glow * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Core
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `${node.color}${0.5 + node.glow * 0.5})`;
            ctx.fill();

            ctx.shadowBlur = 0;
        });
    });

    // --- Draw & update signals ---
    for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;

        const x = s.fromX + (s.toX - s.fromX) * s.progress;
        const y = s.fromY + (s.toY - s.fromY) * s.progress;

        // Glowing dot traveling along edge
        ctx.shadowBlur = 18;
        ctx.shadowColor = `${s.color}1)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}1)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trail behind the signal
        ctx.beginPath();
        ctx.moveTo(s.fromX + (s.toX - s.fromX) * Math.max(0, s.progress - 0.15),
            s.fromY + (s.toY - s.fromY) * Math.max(0, s.progress - 0.15));
        ctx.lineTo(x, y);
        ctx.strokeStyle = `${s.color}0.5)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (s.progress >= 1) {
            // Activate target node
            s.targetNode.glow = 1;
            signals.splice(i, 1);
            spawnSignal();
        }
    }

    requestAnimationFrame(drawNetwork);
}

drawNetwork();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    goToSlide(currentIndex); // Recalculate slide positioning for active carousel card width 
});

// --- Projects Data & Carousel Logic --- //
const projectsData = [
    {
        title: "SmartResolve AI",
        description: "An AI-powered platform utilizing Advanced NLP to automatically classify, prioritize, and route complaints and suggestions based on sentiment analysis and topic detection.",
        tech: ["Python", "NLP", "LLMs", "Sentiment Analysis"],
        image: "Projects/SmartResolve AI/SmartResolve AI screenshot.jpg",
        link: "#"
    },
    {
        title: "Mostaql Smart Monitor",
        description: "An autonomous web-monitoring pipeline using n8n that acts as a 24/7 lead sniper, silently scraping platforms and dispatching real-time Telegram alerts for new projects.",
        tech: ["n8n", "Automation", "Web Scraping", "Telegram API"],
        image: "Projects/Mostaql Smart Monitor/🔍 Mostaql Smart Monitor [Ziad AI].png",
        link: "#"
    },
    {
        title: "Ford GoBike Interactive Dashboard",
        description: "An end-to-end Interactive Dashboard to analyze and visualize the Ford GoBike urban mobility data using Plotly and Dash, transforming raw trip data into a dynamic web application.",
        tech: ["Python", "Plotly", "Dash", "EDA", "Data Engineering"],
        image: "Projects/Ford GoBike Interactive Dashboard/Dashboard.png",
        link: "#"
    },
    {
        title: "Boston Housing Predictor",
        description: "An end-to-end Machine Learning web app to predict Boston housing prices using a fine-tuned Decision Tree Regressor and a lightning-fast FastAPI REST API.",
        tech: ["Python", "Machine Learning", "FastAPI", "Scikit-Learn"],
        image: "Projects/Boston Housing Predictor/Boston Housing Predictor.png",
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
