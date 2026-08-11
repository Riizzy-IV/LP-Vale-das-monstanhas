// Menu mobile
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu-itens');

  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
})();

// Lightbox da galeria
(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  const triggers = document.querySelectorAll('[data-lightbox-src]');

  if (!lightbox || !lightboxImg || !triggers.length) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();

// Modal de vídeo
(function () {
  const modal = document.getElementById('video-modal');
  const trigger = document.querySelector('[data-video-modal]');
  const closeBtn = modal ? modal.querySelector('.video-modal-close') : null;

  if (!modal || !trigger || !closeBtn) return;

  function openModal() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();

// Seletor de plantas
(function () {
  const track = document.querySelector('.planta-tabs-track');
  const tabs = document.querySelectorAll('.planta-tab');
  const prevBtn = document.querySelector('[data-planta-prev]');
  const nextBtn = document.querySelector('[data-planta-next]');

  if (!track || !tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -160, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: 160, behavior: 'smooth' });
    });
  }
})();

// Formulário de contato
(function () {
  const form = document.getElementById('contato-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  function showFeedback(message, isError) {
    feedback.textContent = message;
    feedback.hidden = false;
    feedback.classList.toggle('is-error', !!isError);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      showFeedback('Preencha todos os campos obrigatórios corretamente.', true);
      form.reportValidity();
      return;
    }

    // TODO: conectar a um endpoint/serviço de envio real.
    showFeedback('Recebemos seus dados! Em breve entraremos em contato.', false);
    form.reset();
  });
})();
