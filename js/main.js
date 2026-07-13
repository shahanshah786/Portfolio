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

// ============ 3D TILT ON HERO CARD (mouse move) with layered parallax ============
const tiltCard = document.querySelector('[data-tilt]');
const tiltPhoto = tiltCard ? tiltCard.querySelector('.photo-frame img') : null;
const tiltChips = tiltCard ? tiltCard.querySelectorAll('.float-chip') : [];
if (tiltCard) {
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    // deeper layer moves opposite for parallax depth
    if (tiltPhoto) {
      tiltPhoto.style.transform = `translate(${rotateY * -1.5}px, ${rotateX * -1.5}px) scale(1.06)`;
    }
    // chips float even closer to the viewer
    tiltChips.forEach(chip => {
      chip.style.transform = `translate(${rotateY * 2.5}px, ${rotateX * 2.5}px)`;
    });
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = '';
    if (tiltPhoto) tiltPhoto.style.transform = '';
    tiltChips.forEach(chip => { chip.style.transform = ''; });
  });
}

// ============ FLOATING "LET'S CONNECT" 3D BUTTON (all pages) ============
const floatingConnect = document.getElementById('floatingConnect');
if (floatingConnect) {
  floatingConnect.addEventListener('click', (e) => {
    const href = floatingConnect.getAttribute('href');
    floatingConnect.classList.add('opening');
    setTimeout(() => floatingConnect.classList.remove('opening'), 260);
    if (href.indexOf('#') !== 0) {
      // Points to another page (e.g. index.html#contact) — do the 3D press first, then navigate
      e.preventDefault();
      setTimeout(() => { window.location.href = href; }, 220);
    }
    // same-page anchor (#contact) navigates immediately via native smooth scroll
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
