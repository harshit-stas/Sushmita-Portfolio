/* ── Section switching ── */
  function showSection(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(triggerReveals, 80);
  }

  /* ── Scroll reveal ── */
  function triggerReveals() {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  /* ── Counter animation ── */
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const step = () => {
        start++;
        el.textContent = start + suffix;
        if (start < target) requestAnimationFrame(step);
      };
      setTimeout(() => requestAnimationFrame(step), 700);
    });
  }

  /* ── Char counter ── */
  function updateCount(el) {
    document.getElementById('charCount').textContent = el.value.length + ' / 1000';
  }

  /* ── Form submit ── */
  function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending…';
    btn.classList.add('loading');
    const form = e.target;
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
    .finally(() => {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    });
  }

  /* ── Init ── */
  window.addEventListener('DOMContentLoaded', () => {
    triggerReveals();
    animateCounters();
  });
