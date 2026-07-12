// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{ threshold:0.15 });
revealEls.forEach(el=> io.observe(el));

// ---------- skill bars fill on view ----------
const bars = document.querySelectorAll('.bar i');
const barIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target = e.target.dataset.level || 0;
      e.target.style.width = target + '%';
      barIo.unobserve(e.target);
    }
  });
},{ threshold:0.4 });
bars.forEach(b=> barIo.observe(b));

// ---------- 3D tilt on hero card ----------
const tiltCard = document.querySelector('.tilt-card');
if(tiltCard){
  const stage = tiltCard.closest('.tilt-stage');
  const strength = 10; // degrees
  stage.addEventListener('mousemove', (e)=>{
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const rx = (0.5 - py) * strength * 2;
    const ry = (px - 0.5) * strength * 2;
    tiltCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  stage.addEventListener('mouseleave', ()=>{
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// ---------- tilt on project / cert cards (subtler) ----------
document.querySelectorAll('.project-card, .cert-card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 6;
    const ry = (px - 0.5) * 6;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = '';
  });
});

// ---------- active nav link on scroll (index page sections) ----------
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.side nav a, .topbar nav a');
if(sections.length){
  const navIo = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a=>{
          a.classList.toggle('active', a.getAttribute('href') === '#'+id || a.getAttribute('href') === 'index.html#'+id);
        });
      }
    });
  },{ rootMargin:'-45% 0px -45% 0px' });
  sections.forEach(s=> navIo.observe(s));
}

// ---------- parallax glow drift on hero ----------
const hero = document.querySelector('.hero');
if(hero){
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    hero.style.setProperty('--scrollY', y+'px');
  }, { passive:true });
}
