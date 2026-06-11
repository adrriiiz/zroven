/* ===========================
   ZRØVEN — main.js
   =========================== */

emailjs.init('bcQuEYzFM8WevdAz-');

document.addEventListener('DOMContentLoaded', () => {

  /* ── Email form ── */
  const form    = document.getElementById('notifyForm');
  const input   = document.getElementById('emailInput');
  const message = document.getElementById('formMessage');
  const btn     = form ? form.querySelector('.btn-notify') : null;

  const STORED_KEY = 'zroven_registered';

  if (localStorage.getItem(STORED_KEY)) {
    showMessage('Ya estás en la lista. ¡Te avisaremos!', 'success');
    if (btn) btn.disabled = true;
    if (input) input.disabled = true;
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = input.value.trim();

      if (!isValidEmail(email)) {
        showMessage('Introduce un correo válido.', 'error');
        input.focus();
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Enviando…';

      try {
        await emailjs.send('lanzamiento', 'template_aum4qeg', {
          email: email,
          date: new Date().toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })
        });

        localStorage.setItem(STORED_KEY, email);
        input.value = '';
        input.disabled = true;
        btn.textContent = '¡Listo!';
        showMessage(`Te notificaremos en ${email} cuando abramos.`, 'success');

      } catch (err) {
        console.error('EmailJS error:', err);
        btn.disabled = false;
        btn.textContent = 'Notifícame';
        showMessage('Algo salió mal. Inténtalo de nuevo.', 'error');
      }
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
