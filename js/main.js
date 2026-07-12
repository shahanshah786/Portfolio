// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ============ SKILL BARS FILL ON VIEW ============
const bars = document.querySelectorAll('.bar i');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.getAttribute('data-level');
      entry.target.style.width = level + '%';
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barObserver.observe(bar));

// ============ PARALLAX BACKGROUND (scroll) ============
const parallaxEls = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    el.style.transform = `translateY(${y * 0.15}px)`;
  });
}, { passive: true });

// ============ 3D TILT ON HERO CARD (mouse move) ============
const tiltCard = document.querySelector('[data-tilt]');
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
}

// ============ BIO READ MORE ============
const bioText = document.getElementById('bioText');
const readMoreBtn = document.getElementById('readMoreBtn');
if (bioText && readMoreBtn) {
  readMoreBtn.addEventListener('click', () => {
    const expanded = bioText.classList.toggle('expanded');
    readMoreBtn.textContent = expanded ? 'Read less ↑' : 'Read more ↓';
  });
}

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.side nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });
