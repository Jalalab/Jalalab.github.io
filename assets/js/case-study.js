// progress bar
const prog = document.getElementById('progress');
addEventListener('scroll', () => {
  const h = document.body.scrollHeight - innerHeight;
  prog.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
});

// scroll reveal (also triggers the bar chart animation)
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// count-up numbers: <b data-count="31.7" data-suffix="%" data-decimals="1">
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, dec = +(el.dataset.decimals || 0);
  const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1200;
  (function tick(t) {
    const p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
    el.textContent = pre + v.toFixed(dec) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
  co.unobserve(el);
}), { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => co.observe(el));
