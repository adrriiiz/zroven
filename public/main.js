/* ===========================
   ZRØVEN — main.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Email form ── */
  const form    = document.getElementById('notifyForm');
  const input   = document.getElementById('emailInput');
  const message = document.getElementById('formMessage');

  const STORED_KEY = 'zroven_registered';

  // Si ya se registró antes, mostrar mensaje
  if (localStorage.getItem(STORED_KEY)) {
    showMessage('Ya estás en la lista. ¡Te avisaremos!', 'success');
    if (form) form.querySelector('.btn-notify').disabled = true;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!isValidEmail(email)) {
        showMessage('Introduce un correo válido.', 'error');
        input.focus();
        return;
      }

      // Simulación de registro (sin backend)
      localStorage.setItem(STORED_KEY, email);
      input.value = '';
      input.disabled = true;
      form.querySelector('.btn-notify').disabled = true;
      showMessage(`¡Listo! Te notificaremos en ${email} cuando abramos.`, 'success');
    });
  }

  function showMessage(text, type) {
    if (!message) return;
    message.textContent = text;
    message.className = `form-message ${type}`;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Scroll reveal ── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.feat-item, .soon-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

});
