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
});