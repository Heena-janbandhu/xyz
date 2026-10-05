/**
 * A Birthday Surprise for Yash ✨
 * Made with love by Heena
 * ─────────────────────────────────────────────────────────
 * Journey: Opening → Hello → Us → Letter → Reasons →
 *          Little gifts → The wish → Night-sky finale
 * ─────────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════════════
   CONFIG — edit these if anything changes
═══════════════════════════════════════════════════════ */
const CONFIG = {
  startDate: '2025-02-04T00:00:00',                  // when "us" began
  music: 'assets/music/Ed Sheeran - Perfect.mp3',    // background song
  musicFallback: 'assets/music/background.mp3',
  musicVolume: 0.45,
};

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const IS_SMALL = () => window.innerWidth < 640;
const DPR = () => Math.min(window.devicePixelRatio || 1, 1.5);

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const clamp01 = v => Math.max(0, Math.min(1, v));

const PALETTE = ['#f3d9a4', '#f6bfd0', '#ec8fae', '#c8b8f4', '#ffcfb0', '#fff6e6'];

/* ═══════════════════════════════════════════════════════
   1 · LIVING SKY (fixed background canvas)
═══════════════════════════════════════════════════════ */
const Sky = (() => {
  const canvas = $('#sky');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, stars = [], shooting = null, running = true, raf;
  let nextShoot = performance.now() + rand(4000, 9000);

  function build() {
    const count = Math.min(IS_SMALL() ? 90 : 190, Math.round((W * H) / 8500));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() < 0.08 ? rand(1.1, 1.7) : rand(0.3, 1),
      a: rand(0.25, 0.9),
      sp: rand(0.4, 1.6),
      ph: Math.random() * Math.PI * 2,
      depth: rand(0.2, 1),
      tint: Math.random() < 0.18 ? 'pink' : Math.random() < 0.3 ? 'gold' : 'white',
    }));
  }

  function resize() {
    dpr = DPR();
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  const colorOf = (t, a) =>
    t === 'pink' ? `rgba(246,191,208,${a})` : t === 'gold' ? `rgba(243,217,164,${a})` : `rgba(255,250,244,${a})`;

  function frame(now) {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    const sy = window.scrollY;
    const t = now / 1000;

    for (const s of stars) {
      const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
      const a = s.a * tw;
      let y = (s.y - sy * 0.04 * s.depth) % H;
      if (y < 0) y += H;
      ctx.beginPath();
      ctx.arc(s.x, y, s.r, 0, 6.283);
      ctx.fillStyle = colorOf(s.tint, a);
      ctx.fill();
      // occasional glint on the bigger stars
      if (s.r > 1.05 && tw > 0.93) {
        const g = (tw - 0.93) / 0.07;
        ctx.strokeStyle = colorOf(s.tint, 0.5 * g);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(s.x - 6 * g, y); ctx.lineTo(s.x + 6 * g, y);
        ctx.moveTo(s.x, y - 6 * g); ctx.lineTo(s.x, y + 6 * g);
        ctx.stroke();
      }
    }

    // shooting star
    if (!REDUCED && !shooting && now > nextShoot) {
      shooting = { x: rand(W * 0.1, W * 0.8), y: rand(0, H * 0.4), vx: rand(5, 8), vy: rand(2, 3.5), life: 1 };
    }
    if (shooting) {
      const s = shooting;
      s.x += s.vx; s.y += s.vy; s.life -= 0.014;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
      grad.addColorStop(0, `rgba(255,246,230,${0.9 * s.life})`);
      grad.addColorStop(1, 'rgba(255,246,230,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
      ctx.stroke();
      if (s.life <= 0 || s.x > W + 100 || s.y > H + 100) {
        shooting = null;
        nextShoot = now + rand(7000, 14000);
      }
    }
    raf = requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) raf = requestAnimationFrame(frame); else cancelAnimationFrame(raf);
  });

  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
  resize();
  raf = requestAnimationFrame(frame);
})();

/* ═══════════════════════════════════════════════════════
   2 · FX — particle bursts (stars / hearts / sparkles)
═══════════════════════════════════════════════════════ */
const FX = (() => {
  const canvas = $('#fx');
  const ctx = canvas.getContext('2d');
  let W, H, dpr, parts = [], raf = null;

  function resize() {
    dpr = DPR();
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', resize);
  resize();

  function sparkle(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.fill();
  }

  function heart(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + r * 0.9);
    ctx.bezierCurveTo(x - r * 1.6, y - r * 0.2, x - r * 0.7, y - r * 1.4, x, y - r * 0.45);
    ctx.bezierCurveTo(x + r * 0.7, y - r * 1.4, x + r * 1.6, y - r * 0.2, x, y + r * 0.9);
    ctx.fill();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.vx *= p.drag; p.vy = p.vy * p.drag + p.g;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr;
      p.life -= p.decay;
      const a = Math.min(1, p.life * 1.6);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = p.glow;
      if (p.shape === 'heart') heart(p.x, p.y, p.size);
      else if (p.shape === 'spark') sparkle(p.x, p.y, p.size * (0.7 + 0.3 * Math.sin(p.rot * 3)));
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.45, 0, 6.283); ctx.fill(); }
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    if (parts.length) raf = requestAnimationFrame(loop);
    else { raf = null; ctx.clearRect(0, 0, W, H); }
  }

  function add(p) {
    parts.push(Object.assign({
      vx: 0, vy: 0, g: 0.04, drag: 0.985, rot: 0, vr: rand(-0.1, 0.1),
      life: 1, decay: rand(0.008, 0.016), size: rand(2, 5), glow: 8,
      color: pick(PALETTE), shape: 'spark',
    }, p));
    if (!raf) raf = requestAnimationFrame(loop);
  }

  /** radial burst from a point */
  function burst(x, y, { count = 40, power = 6, shapes = ['spark', 'dot', 'heart'], g = 0.05, colors = PALETTE } = {}) {
    if (REDUCED) count = Math.round(count / 3);
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp = rand(power * 0.3, power);
      add({ x, y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - power * 0.25, g, color: pick(colors), shape: pick(shapes), size: rand(2.5, 6) });
    }
  }

  /** soft particles drifting upward from a point (wish release) */
  function rise(x, y, count = 70) {
    if (REDUCED) count = 20;
    for (let i = 0; i < count; i++) {
      setTimeout(() => add({
        x: x + rand(-40, 40), y: y + rand(-10, 10),
        vx: rand(-0.8, 0.8), vy: rand(-3.5, -1.2), g: -0.03, drag: 0.992,
        decay: rand(0.004, 0.009), shape: pick(['spark', 'dot', 'dot', 'heart']),
        color: pick(['#f3d9a4', '#fff1d2', '#f6bfd0', '#ec8fae']), size: rand(2, 5), glow: 14,
      }), i * 25);
    }
  }

  /** gentle shimmer falling from the top of the screen */
  function shower(count = 70) {
    if (REDUCED) count = 20;
    for (let i = 0; i < count; i++) {
      setTimeout(() => add({
        x: rand(0, W), y: rand(-40, -5), vx: rand(-0.4, 0.4), vy: rand(0.6, 1.8), g: 0.006, drag: 0.999,
        decay: rand(0.003, 0.006), shape: pick(['spark', 'dot', 'heart']), size: rand(2, 5), glow: 12,
      }), i * 40);
    }
  }

  return { burst, rise, shower };
})();

/* ═══════════════════════════════════════════════════════
   3 · OPENING SEQUENCE
═══════════════════════════════════════════════════════ */
const Intro = (() => {
  const intro = $('#intro');
  const phrases = $$('.intro-phrase', intro);
  const gift = $('#intro-gift');
  const skip = $('#intro-skip');
  const envelope = $('#envelope');
  const openBtn = $('#open-btn');
  const timers = [];
  let giftShown = false, opened = false;

  // split phrases into words
  phrases.forEach(p => {
    const nodes = Array.from(p.childNodes);
    p.innerHTML = '';
    let i = 0;
    nodes.forEach(n => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok.trim()) { if (tok) p.appendChild(document.createTextNode(' ')); return; }
          const s = document.createElement('span');
          s.className = 'w'; s.textContent = tok; s.style.transitionDelay = (i++ * 0.16) + 's';
          p.appendChild(s);
        });
      } else {
        const s = document.createElement('span');
        s.className = 'w'; s.style.transitionDelay = (i++ * 0.16) + 's';
        s.appendChild(n);
        p.appendChild(s);
      }
    });
  });

  const at = (ms, fn) => timers.push(setTimeout(fn, ms));

  function showGift() {
    if (giftShown) return;
    giftShown = true;
    timers.forEach(clearTimeout);
    phrases.forEach(p => { p.classList.remove('show'); p.classList.add('hide'); });
    intro.classList.add('glow-on');
    skip.classList.add('hidden');
    setTimeout(() => gift.classList.add('show'), REDUCED ? 0 : 500);
  }

  function play() {
    if (REDUCED) { showGift(); return; }
    let t = 700;
    phrases.forEach((p, i) => {
      at(t, () => { p.classList.add('show'); if (i === 1) intro.classList.add('glow-on'); });
      t += 2300;
      at(t, () => { p.classList.remove('show'); p.classList.add('hide'); });
      t += 750;
    });
    at(t, showGift);
  }

  function open() {
    if (opened) return;
    opened = true;
    Music.start();
    envelope.classList.add('open');
    openBtn.disabled = true;

    const r = envelope.getBoundingClientRect();
    setTimeout(() => FX.burst(r.left + r.width / 2, r.top + r.height * 0.3, { count: 70, power: 7 }), 650);

    setTimeout(() => {
      intro.classList.add('gone');
      window.scrollTo(0, 0);
      document.body.classList.remove('locked');
      document.body.classList.add('is-live');
      App.start();
    }, 1800);
    setTimeout(() => intro.remove(), 3400);
  }

  skip.addEventListener('click', showGift);
  intro.addEventListener('click', e => { if (!giftShown && !e.target.closest('button')) showGift(); });
  envelope.addEventListener('click', open);
  openBtn.addEventListener('click', open);

  return { play };
})();

/* ═══════════════════════════════════════════════════════
   4 · MUSIC (only because a song is included)
═══════════════════════════════════════════════════════ */
const Music = (() => {
  const btn = $('#music-btn');
  let audio = null, playing = false, userMuted = false, triedFallback = false;

  function setUI(on) {
    playing = on;
    btn.classList.toggle('muted', !on);
    btn.classList.toggle('playing', on);
    btn.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
    btn.title = on ? 'Pause music' : 'Play music';
  }

  function fadeTo(target, ms = 2200) {
    if (!audio) return;
    const start = audio.volume, steps = 40;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (!audio) return clearInterval(iv);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * (i / steps)));
      if (i >= steps) clearInterval(iv);
    }, ms / steps);
  }

  function start() {
    if (audio) return;
    audio = new Audio(encodeURI(CONFIG.music));
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audio.addEventListener('error', () => {
      if (!triedFallback) {
        triedFallback = true;
        audio.src = CONFIG.musicFallback;
        audio.play().then(() => { setUI(true); fadeTo(CONFIG.musicVolume); }).catch(() => { });
        return;
      }
      btn.hidden = true;
      audio = null;
    });
    btn.hidden = false;
    audio.play().then(() => { setUI(true); fadeTo(CONFIG.musicVolume); }).catch(() => setUI(false));
  }

  btn.addEventListener('click', () => {
    if (!audio) return;
    if (playing) { audio.pause(); setUI(false); userMuted = true; }
    else { audio.play().catch(() => { }); if (audio.volume < 0.05) fadeTo(CONFIG.musicVolume, 1200); setUI(true); userMuted = false; }
  });

  document.addEventListener('visibilitychange', () => {
    if (!audio) return;
    if (document.hidden) audio.pause();
    else if (playing && !userMuted) audio.play().catch(() => { });
  });

  return { start };
})();

/* ═══════════════════════════════════════════════════════
   5 · MAIN EXPERIENCE
═══════════════════════════════════════════════════════ */
const App = (() => {
  let started = false;

  function start() {
    if (started) return;
    started = true;
    const hero = $('#hero');
    requestAnimationFrame(() => hero.classList.add('in'));
    initReveals();
    initChaptersAndMood();
    initProgress();
    initCounter();
    initReasons();
    initOpenWhen();
    initCoupons();
    initKeep();
    initKisses();
    initWish();
    Finale.init();
    initPointerMagic();
  }

  /* ─── scroll reveals ─── */
  function initReveals() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));

    // stagger reason cards
    $$('#reasons-grid .reason').forEach((c, i) => c.style.setProperty('--d', (i % 3) * 0.12 + 's'));
  }

  /* ─── chapter dots + background mood ─── */
  function initChaptersAndMood() {
    const links = $$('#chapters a');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        document.body.dataset.mood = e.target.dataset.mood || '';
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-48% 0px -48% 0px' });
    $$('main section[id]').forEach(s => io.observe(s));
  }

  /* ─── progress bar ─── */
  function initProgress() {
    const fill = $('#progress-fill');
    const nav = $('#nav');
    let ticking = false;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      fill.style.transform = `scaleX(${clamp01(p)})`;
      nav.classList.toggle('scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ─── together counter ─── */
  function initCounter() {
    const start = new Date(CONFIG.startDate);
    const set = (id, v) => { const el = document.getElementById(id); if (el && el.textContent !== v) el.textContent = v; };
    function tick() {
      let d = Math.max(0, Date.now() - start);
      const days = Math.floor(d / 864e5); d -= days * 864e5;
      const h = Math.floor(d / 36e5); d -= h * 36e5;
      const m = Math.floor(d / 6e4); d -= m * 6e4;
      const s = Math.floor(d / 1e3);
      set('cnt-days', days.toLocaleString());
      set('cnt-hours', String(h).padStart(2, '0'));
      set('cnt-mins', String(m).padStart(2, '0'));
      set('cnt-secs', String(s).padStart(2, '0'));
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ─── reasons: spotlight + tap ─── */
  function initReasons() {
    const cards = $$('.reason');
    cards.forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      card.addEventListener('click', () => {
        const was = card.classList.contains('touched');
        cards.forEach(c => c.classList.remove('touched'));
        if (!was) card.classList.add('touched');
      });
    });
  }

  /* ─── open-when letters ─── */
  function initOpenWhen() {
    const items = $$('.ow');
    items.forEach(item => {
      const btn = $('.ow-btn', item);
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => { i.classList.remove('open'); $('.ow-btn', i).setAttribute('aria-expanded', 'false'); });
        if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
  }

  /* ─── scratch coupons ─── */
  function initCoupons() {
    $$('.coupon').forEach(card => {
      const canvas = $('canvas', card);
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      let w = 0, h = 0, dpr = 1, drawing = false, last = null, moves = 0, started = false;

      function paint() {
        const r = card.getBoundingClientRect();
        if (!r.width) return;
        dpr = DPR();
        w = r.width; h = r.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = 'source-over';

        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#e9c98d');
        g.addColorStop(0.35, '#f6dcb0');
        g.addColorStop(0.65, '#e8a7bd');
        g.addColorStop(1, '#b9a3e6');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        // foil speckles
        for (let i = 0; i < 160; i++) {
          ctx.fillStyle = `rgba(255,255,255,${rand(0.05, 0.35)})`;
          ctx.fillRect(rand(0, w), rand(0, h), rand(0.5, 1.6), rand(0.5, 1.6));
        }
        // diagonal sheen
        const s = ctx.createLinearGradient(0, 0, w, 0);
        s.addColorStop(0.3, 'rgba(255,255,255,0)');
        s.addColorStop(0.5, 'rgba(255,255,255,0.28)');
        s.addColorStop(0.7, 'rgba(255,255,255,0)');
        ctx.fillStyle = s;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(70,30,60,0.75)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '500 11px Outfit, sans-serif';
        ctx.fillText('S C R A T C H   M E', w / 2, h / 2 - 12);
        ctx.font = '26px "Great Vibes", cursive';
        ctx.fillText('for you ♡', w / 2, h / 2 + 14);
      }

      function pos(e) {
        const r = canvas.getBoundingClientRect();
        const pt = e.touches ? e.touches[0] : e;
        return { x: pt.clientX - r.left, y: pt.clientY - r.top };
      }

      function scratch(p) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = Math.max(34, w * 0.13);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo((last || p).x, (last || p).y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        last = p;
        if (++moves % 8 === 0) check();
      }

      function check() {
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let clear = 0, total = 0;
        for (let i = 3; i < data.length; i += 4 * 24) { total++; if (data[i] < 40) clear++; }
        if (clear / total > 0.45) finish();
      }

      function finish() {
        if (card.classList.contains('done')) return;
        card.classList.add('done');
        const r = card.getBoundingClientRect();
        FX.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 34, power: 5 });
      }

      const down = e => { e.preventDefault(); drawing = true; started = true; last = null; scratch(pos(e)); };
      const move = e => { if (!drawing) return; e.preventDefault(); scratch(pos(e)); };
      const up = () => { drawing = false; last = null; };

      canvas.addEventListener('mousedown', down);
      canvas.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
      canvas.addEventListener('touchstart', down, { passive: false });
      canvas.addEventListener('touchmove', move, { passive: false });
      canvas.addEventListener('touchend', up);

      paint();
      // fonts may arrive later — repaint once if untouched
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!started) paint(); });
      let lastW = w;
      window.addEventListener('resize', () => {
        const nw = card.getBoundingClientRect().width;
        if (!started && Math.abs(nw - lastW) > 2) { lastW = nw; paint(); }
      });
    });
  }

  /* ─── will you keep me forever? ─── */
  function initKeep() {
    const arena = $('#keep-arena');
    const yes = $('#keep-yes-btn');
    const no = $('#keep-no-btn');
    const msg = $('#keep-msg');

    function run(e) {
      if (e) e.preventDefault();
      const a = arena.getBoundingClientRect();
      const b = no.getBoundingClientRect();
      const y = yes.getBoundingClientRect();
      if (!no.classList.contains('running')) {
        no.style.left = (b.left - a.left) + 'px';
        no.style.top = (b.top - a.top) + 'px';
        no.classList.add('running');
      }
      let x, yy, tries = 0;
      do {
        x = rand(0, Math.max(0, a.width - b.width));
        yy = rand(0, Math.max(0, a.height - b.height));
        tries++;
      } while (tries < 12 &&
        x + a.left < y.right + 10 && x + a.left + b.width > y.left - 10 &&
        yy + a.top < y.bottom + 10 && yy + a.top + b.height > y.top - 10);
      requestAnimationFrame(() => { no.style.left = x + 'px'; no.style.top = yy + 'px'; });
    }

    no.addEventListener('pointerenter', run);
    no.addEventListener('touchstart', run, { passive: false });
    no.addEventListener('click', run);

    yes.addEventListener('click', () => {
      msg.style.display = 'block';
      no.style.display = 'none';
      const r = yes.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2, { count: 50, power: 6, shapes: ['heart', 'spark'] });
    });
  }

  /* ─── kisses ─── */
  function initKisses() {
    let n = 0;
    const out = $('#kiss-count');
    const msg = $('#kiss-msg');
    const btn = $('#kiss-btn');
    const lines = {
      1: 'Received. ♡',
      10: "That's ten. I'm counting every one.",
      25: 'Still not enough, honestly. 🥹',
      50: "Okay, you're really going for it.",
      100: 'One hundred kisses. Fine… ∞ more later. ❤️',
    };
    btn.addEventListener('click', () => {
      n++;
      out.textContent = n;
      out.classList.add('pop');
      setTimeout(() => out.classList.remove('pop'), 180);
      if (lines[n]) msg.textContent = lines[n];
      const r = btn.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top, { count: 10, power: 4, shapes: ['heart'], g: -0.02, colors: ['#ec8fae', '#f6bfd0', '#ff9e8f'] });
    });
  }

  /* ─── the wish (climax) ─── */
  function initWish() {
    const section = $('#wish');
    const text = $('#wish-text');
    const accents = (text.dataset.accent || '').split(',');
    const words = text.textContent.trim().split(/\s+/);
    text.innerHTML = words.map((w, i) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      const cls = accents.includes(clean) ? 'w accent' : 'w';
      return `<span class="${cls}" style="--i:${i}">${w}</span>`;
    }).join(' ');
    section.querySelector('.wish-sign').style.setProperty('--sd', (words.length * 0.09 + 0.8) + 's');

    // floating hearts & sparkles
    const host = $('#wish-floaters');
    const n = REDUCED ? 0 : IS_SMALL() ? 10 : 18;
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'wf';
      const size = rand(8, 18);
      el.style.cssText = `left:${rand(2, 98)}%;width:${size}px;height:${size}px;color:${pick(PALETTE)};` +
        `animation-duration:${rand(14, 24)}s;animation-delay:${-rand(0, 20)}s;` +
        `--o:${rand(0.3, 0.75).toFixed(2)};--sway:${rand(-60, 60)}px;--rot:${rand(-40, 40)}deg;`;
      el.innerHTML = `<svg><use href="#${pick(['i-heart', 'i-spark', 'i-spark', 'i-star'])}"/></svg>`;
      host.appendChild(el);
    }

    let fired = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired) {
        fired = true;
        section.classList.add('in');
        setTimeout(() => FX.shower(IS_SMALL() ? 50 : 90), words.length * 90 + 400);
        io.disconnect();
      }
    }, { threshold: 0.45 });
    io.observe(section);
  }

  /* ─── cursor sparkle trail + tap hearts ─── */
  function initPointerMagic() {
    if (REDUCED) return;
    if (FINE_POINTER) {
      let lastT = 0;
      window.addEventListener('pointermove', e => {
        const now = performance.now();
        if (now - lastT < 45) return;
        lastT = now;
        const d = document.createElement('span');
        d.className = 'trail';
        d.style.left = e.clientX + 'px';
        d.style.top = e.clientY + 'px';
        d.style.setProperty('--tx', rand(-10, 10) + 'px');
        d.style.setProperty('--ty', rand(6, 20) + 'px');
        document.body.appendChild(d);
        setTimeout(() => d.remove(), 900);
      }, { passive: true });
    }

    document.addEventListener('click', e => {
      if (e.target.closest('button, a, canvas, .reason, #intro')) return;
      const h = document.createElement('span');
      h.className = 'tap-heart';
      h.style.left = e.clientX + 'px';
      h.style.top = e.clientY + 'px';
      h.innerHTML = '<svg width="18" height="18"><use href="#i-heart"/></svg>';
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1400);
    });
  }

  return { start };
})();

/* ═══════════════════════════════════════════════════════
   6 · FINALE — a night sky that lights up, then a wish
═══════════════════════════════════════════════════════ */
const Finale = (() => {
  const section = $('#finale');
  const canvas = $('#finale-sky');
  const ctx = canvas.getContext('2d');
  const wishBtn = $('#wish-btn');
  const wishMade = $('#wish-made');
  const replay = $('#replay-btn');

  let W = 0, H = 0, dpr = 1, stars = [], heart = [];
  let litAt = 0, visible = false, raf = null, rising = false, riseAt = 0, inited = false;

  function heartPoints(cx, cy, scale, n) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push({ x: cx + x * scale, y: cy - y * scale });
    }
    return pts;
  }

  function build(base = 0) {
    const count = Math.min(IS_SMALL() ? 240 : 440, Math.round((W * H) / 2600));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() < 0.1 ? rand(1, 1.8) : rand(0.3, 1),
      a: rand(0.35, 1),
      sp: rand(0.5, 2),
      ph: Math.random() * 6.28,
      on: base + rand(0, 3200),
      vy: 0,
      c: Math.random() < 0.2 ? '246,191,208' : Math.random() < 0.35 ? '243,217,164' : '255,250,244',
    }));
    const scale = Math.min(W * 0.4, H * 0.42) / 17;
    heart = heartPoints(W / 2, H * 0.47, scale, IS_SMALL() ? 26 : 34).map((p, i, arr) => ({
      x: p.x, y: p.y, r: rand(1.2, 1.9), a: 1, sp: rand(0.8, 1.6), ph: Math.random() * 6.28,
      on: base + 2600 + (i / arr.length) * 1600, vy: 0, c: '243,217,164',
    }));
  }

  function resize() {
    const r = section.getBoundingClientRect();
    dpr = DPR();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build(litAt ? -99999 : 0);
  }

  function drawStar(s, t, el) {
    const k = litAt ? clamp01((el - s.on) / 900) : 0;
    if (k <= 0) return;
    if (rising) {
      s.vy -= 0.12 + s.r * 0.05;
      s.y += s.vy;
    }
    const tw = 0.6 + 0.4 * Math.sin(t * s.sp + s.ph);
    const a = s.a * k * tw;
    if (rising && s.vy < -1.5) {
      const g = ctx.createLinearGradient(s.x, s.y, s.x, s.y - s.vy * 6);
      g.addColorStop(0, `rgba(${s.c},${a})`);
      g.addColorStop(1, `rgba(${s.c},0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = s.r;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x, s.y - s.vy * 6); ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 6.283);
    ctx.fillStyle = `rgba(${s.c},${a})`;
    ctx.fill();
  }

  function frame(now) {
    if (!visible) { raf = null; return; }
    const t = now / 1000;
    const el = now - litAt;
    ctx.clearRect(0, 0, W, H);

    for (const s of stars) drawStar(s, t, el);

    // heart constellation lines
    if (litAt && !rising) {
      const p = clamp01((el - 4300) / 2200);
      if (p > 0) {
        const n = Math.floor(heart.length * p);
        ctx.strokeStyle = `rgba(243,217,164,${0.22 * p})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let i = 0; i <= n && i < heart.length; i++) {
          const pt = heart[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
        }
        if (p >= 1) ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.shadowColor = 'rgba(243,217,164,0.9)';
    ctx.shadowBlur = 8;
    for (const s of heart) drawStar(s, t, el);
    ctx.shadowBlur = 0;

    // after the wish rises, refill the sky softly
    if (rising && now - riseAt > 4200) {
      rising = false;
      build(el + 300);
    }

    raf = requestAnimationFrame(frame);
  }

  function makeWish() {
    if (rising) return;
    wishBtn.disabled = true;
    const r = wishBtn.getBoundingClientRect();
    FX.rise(r.left + r.width / 2, r.top + r.height / 2, IS_SMALL() ? 60 : 100);
    rising = true;
    riseAt = performance.now();
    stars.forEach(s => (s.vy = -rand(0, 1)));
    heart.forEach(s => (s.vy = -rand(0.5, 1)));

    setTimeout(() => {
      wishMade.innerHTML = 'Close your eyes…<br/>your wish is already on its way to the stars.';
      wishMade.classList.add('show');
    }, 1300);
    setTimeout(() => {
      replay.classList.add('show');
      wishBtn.disabled = false;
      wishBtn.firstChild.textContent = 'Make another wish ';
    }, 4600);
  }

  function init() {
    if (inited) return;
    inited = true;
    resize();
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 200); });

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && !document.hidden;
      if (e.isIntersecting && e.intersectionRatio > 0.35 && !litAt) {
        litAt = performance.now();
        section.classList.add('lit');
      }
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }, { threshold: [0, 0.35] });
    io.observe(section);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) visible = false;
      else {
        const r = section.getBoundingClientRect();
        visible = r.top < window.innerHeight && r.bottom > 0;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      }
    });

    wishBtn.addEventListener('click', makeWish);
    replay.addEventListener('click', () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      location.reload();
    });
  }

  return { init };
})();

/* ═══════════════════════════════════════════════════════
   7 · BOOT
═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // today's date for the hero
  const d = new Date();
  const label = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const heroDate = $('#hero-date');
  if (heroDate) heroDate.textContent = `${label} · your day`;

  // split hero headline into letters for a soft stagger
  $$('[data-split]').forEach(el => {
    const txt = el.textContent;
    el.setAttribute('aria-label', txt);
    el.innerHTML = Array.from(txt).map((c, i) =>
      `<span class="ch" aria-hidden="true" style="--i:${i}">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  });

  Intro.play();
});
