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

  document.querySelectorAll('[data-lightbox-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const slide = trigger.closest('.carousel-slide');
      const img = slide ? slide.querySelector('img') : null;
      if (img) openLightbox(img.src, img.alt);
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

// Carrossel da galeria (scroll nativo, sangrando à direita)
(function () {
  document.querySelectorAll('[data-carousel]').forEach(function (media) {
    const track = media.querySelector('.carousel-track');
    const slides = media.querySelectorAll('.carousel-slide');
    const prevBtn = media.querySelector('[data-carousel-prev]');
    const nextBtn = media.querySelector('[data-carousel-next]');
    const bleed = media.closest('.galeria-bleed');

    if (!track || slides.length < 2 || !prevBtn || !nextBtn) return;

    function sizeTrack() {
      const bleedRect = bleed.getBoundingClientRect();
      const gutter = parseFloat(getComputedStyle(bleed).paddingLeft) || 0;
      const available = bleedRect.width - gutter;
      const cardWidth = window.innerWidth <= 640
        ? available - gutter * 0.5
        : available * 0.62;

      slides.forEach(function (slide) {
        slide.style.width = cardWidth + 'px';
      });

      const peekWidth = Math.max(available - cardWidth, 24);
      track.style.paddingRight = peekWidth + 'px';

      prevBtn.style.left = '16px';
      prevBtn.style.right = 'auto';
      nextBtn.style.right = (peekWidth + 16) + 'px';
      nextBtn.style.left = 'auto';
    }

    function getStep() {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function scrollByStep(direction) {
      const step = getStep() * direction;
      const maxScroll = track.scrollWidth - track.clientWidth;
      let target = track.scrollLeft + step;

      if (target > maxScroll - 2) target = 0;
      else if (target < 0) target = maxScroll;

      track.scrollTo({ left: target, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', function () { scrollByStep(-1); });
    nextBtn.addEventListener('click', function () { scrollByStep(1); });

    let timer = null;

    function start() {
      stop();
      timer = setInterval(function () { scrollByStep(1); }, 4000);
    }

    function stop() {
      if (timer) clearInterval(timer);
    }

    media.addEventListener('mouseenter', stop);
    media.addEventListener('mouseleave', start);

    window.addEventListener('resize', sizeTrack);

    sizeTrack();
    start();
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
