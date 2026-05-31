// ===== NAVIGATION SCROLL EFFECT =====
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
 nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
 navToggle.classList.toggle('active');
 navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
 link.addEventListener('click', () => {
  navToggle.classList.remove('active');
  navMenu.classList.remove('active');
 });
});

// Active nav link on scroll
const sections = document.querySelectorAll('.section');

function updateActiveLink() {
 const scrollPos = window.scrollY + 200;
 sections.forEach(section => {
  const top = section.offsetTop;
  const height = section.offsetHeight;
  const id = section.getAttribute('id');
  if (scrollPos >= top && scrollPos < top + height) {
   navLinks.forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === `#${id}`) {
     link.classList.add('nav__link--active');
    }
   });
  }
 });
}

window.addEventListener('scroll', updateActiveLink);

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
 cursorGlow.style.left = e.clientX + 'px';
 cursorGlow.style.top = e.clientY + 'px';
});

// ===== TYPING EFFECT =====
const typedElement = document.getElementById('typedText');
const phrases = [
 'React.js',
 'Angular',
 'TypeScript',
 'Node.js',
 'Micro Frontends',
 'CI/CD',
 'Testes Automatizados'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
 const currentPhrase = phrases[phraseIndex];

 if (isDeleting) {
  typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
  charIndex--;
  typingSpeed = 50;
 } else {
  typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
  charIndex++;
  typingSpeed = 100;
 }

 if (!isDeleting && charIndex === currentPhrase.length) {
  isDeleting = true;
  typingSpeed = 2000; // Pause before deleting
 } else if (isDeleting && charIndex === 0) {
  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  typingSpeed = 500; // Pause before typing next
 }

 setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ===== SCROLL REVEAL =====
function createRevealObserver() {
 const observer = new IntersectionObserver(
  (entries) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     entry.target.classList.add('visible');
    }
   });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
 );

 const elements = document.querySelectorAll(
  '.timeline__item, .skill-category, .education-card, .certification-card, .stat-card, .contact-card'
 );

 elements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
 });
}

createRevealObserver();

// ===== COUNTER ANIMATION =====
function animateCounters() {
 const counters = document.querySelectorAll('.stat-card__number');
 const observer = new IntersectionObserver(
  (entries) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     const counter = entry.target;
     const target = parseInt(counter.getAttribute('data-count'));
     let count = 0;
     const duration = 2000;
     const increment = target / (duration / 30);

     const updateCounter = () => {
      count += increment;
      if (count < target) {
       counter.textContent = Math.ceil(count);
       requestAnimationFrame(updateCounter);
      } else {
       counter.textContent = target;
      }
     };

     updateCounter();
     observer.unobserve(counter);
    }
   });
  },
  { threshold: 0.5 }
 );

 counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// ===== PARTICLES =====
function createParticles() {
 const container = document.getElementById('particles');
 const particleCount = 20;

 for (let i = 0; i < particleCount; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  const size = Math.random() * 4 + 2;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
  particle.style.animationDelay = (Math.random() * 10) + 's';
  container.appendChild(particle);
 }
}

createParticles();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
 anchor.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
   target.scrollIntoView({ behavior: 'smooth' });
  }
 });
});

// ===== GLASS CARD TILT EFFECT =====
document.querySelectorAll('.glass-card').forEach(card => {
 card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
 });

 card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
 });
});

