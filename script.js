// Interacciones simples: menú móvil, envío de formulario simulado, año en el pie.
document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
  }

  // Formulario (simulación) 
  const form = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');
  const formMsg = document.getElementById('formMsg');
  if(form){
    sendBtn.addEventListener('click', function(e){
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      if(!nombre || !email || !mensaje){
        formMsg.textContent = 'Por favor rellena todos los campos.';
        return;
      }
      formMsg.textContent = 'Enviando...';
      // Simular envío
      setTimeout(function(){
        formMsg.textContent = 'Gracias, tu pedido/consulta ha sido recibido. Te contactaremos pronto.';
        form.reset();
      }, 900);
    });
  }

  // Año actual en footer
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Efecto: minimizar la imagen de la Alhambra y dejarla fija como fondo arriba al hacer scroll
  const hero = document.querySelector('.hero');
  if(hero){
    let ticking = false;
  // Histéresis: dos umbrales para evitar parpadeos cuando el scroll está cerca del límite.
  // Aumentamos la diferencia entre umbrales para reducir aún más la posibilidad de encendido/apagado rápido.
  const SHRINK_THRESHOLD = 260; // pasar a shrink
  const EXPAND_THRESHOLD = 120; // volver a estado normal

    const spacerId = 'hero-spacer';

    const addSpacer = () => {
      if(document.getElementById(spacerId)) return;
      const spacer = document.createElement('div');
      spacer.id = spacerId;
      // reservar el alto actual del hero para evitar saltos de layout
      spacer.style.height = hero.getBoundingClientRect().height + 'px';
      hero.parentNode.insertBefore(spacer, hero.nextSibling);
    };

    const removeSpacer = () => {
      const sp = document.getElementById(spacerId);
      if(sp) sp.parentNode.removeChild(sp);
    };

    const onScroll = () => {
      if(!ticking){
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset;
          if(y > SHRINK_THRESHOLD){
            // fijar el hero en la parte superior y crear un spacer para mantener el flujo
            if(!hero.classList.contains('fixed')){
              addSpacer();
              hero.classList.add('fixed');
            }
          } else if(y < EXPAND_THRESHOLD){
            if(hero.classList.contains('fixed')){
              hero.classList.remove('fixed');
              removeSpacer();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // comprobar estado inicial
    onScroll();
  }

  // Modal de producto: abrir con más detalles al clicar una tarjeta
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  const openModal = (title, imgSrc, desc) => {
    if(!modal) return;
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalDesc.textContent = desc;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
    modalClose.focus();
  };

  const closeModal = () => {
    if(!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  };

  // Delegación: añadir listener a todas las tarjetas (productos, sin gluten y tartas)
  document.querySelectorAll('.producto, .gf-card, .tarta-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';
      const img = card.querySelector('img') ? card.querySelector('img').src : '';
      openModal(title, img, desc);
    });
  });

  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
});