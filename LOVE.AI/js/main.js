/**
 * A Birthday Surprise for Yash ❤️
 * Created by Heena
 * ─────────────────────────────────────────────────────
 * NOTE: All AI/ML sections are SIMULATED for romantic
 * effect. They are NOT real models.
 * ─────────────────────────────────────────────────────
 */

/* ═══════════════════════════════════════════════════════
   ──────────────────────────────────────────────────────
   TODO CONSTANTS — FILL THESE IN BEFORE SHARING
   ──────────────────────────────────────────────────────
   ═══════════════════════════════════════════════════════ */

/**
 * TODO: Set the exact start date of your relationship.
 * Format: "YYYY-MM-DDTHH:MM:SS"   (24-hour, local time)
 * Example: "2023-06-15T18:30:00"
 */
const START_DATE = "2025-02-04T00:00:00"; // ✅ Set: 4 Feb 2025

/**
 * TODO: Replace with Heena's actual WhatsApp number.
 * Format: country code + number, no spaces or dashes.
 * Example: "919876543210"  for +91 98765 43210
 * (The WhatsApp link in the HTML uses this via the <a> href — just update it there directly)
 */
const WHATSAPP_NUMBER = "919403783996"; // ✅ Set

/* ═══════════════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════════════ */
const birthdayConfig = {
  creator: "Heena",
  name:    "Yash",

  loveNotes: [
    "miss you ❤️",
    "kiss kiss 💋",
    "my person ❤️",
    "my favorite person",
    "come here 🫶🏽",
    "still choosing you ❤️",
    "love you",
    "one more kiss 💋",
    "still smiling because of you",
    "you're my favorite ❤️",
    "just thinking of you ♡",
    "happy birthday, handsome ✦"
  ]
};

/* ═══════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════ */
let kissCount    = 0;
let musicPlaying = false;
let audioElement = null;
let floatTimers  = [];
let loveNoteTimer = null;

/* ═══════════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════════ */
function initBoot() {
  const fill     = document.getElementById('boot-fill');
  const status   = document.getElementById('boot-status');
  const enterBtn = document.getElementById('boot-enter');
  const progress = document.getElementById('boot-progress');

  const statuses = [
    'Preparing something special for you...',
    'Loading all the feelings...',
    'Adding a little extra love...',
    'Almost ready ❤️'
  ];

  let pct = 0, statusIdx = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 5 + 2;
    if (pct > 100) pct = 100;
    fill.style.width = pct + '%';
    if (progress) progress.setAttribute('aria-valuenow', Math.round(pct));

    const targetIdx = Math.min(Math.floor((pct / 100) * statuses.length), statuses.length - 1);
    if (targetIdx !== statusIdx) {
      statusIdx = targetIdx;
      status.textContent = statuses[statusIdx];
    }

    if (pct >= 100) {
      clearInterval(interval);
      status.textContent = 'Ready. Just for you. ❤️';
      setTimeout(() => {
        enterBtn.style.display     = 'inline-flex';
        enterBtn.style.opacity     = '0';
        enterBtn.style.transform   = 'translateY(10px)';
        enterBtn.style.transition  = 'opacity 0.5s ease, transform 0.5s ease';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          enterBtn.style.opacity   = '1';
          enterBtn.style.transform = 'translateY(0)';
        }));
      }, 300);
    }
  }, 50);
}

/* ═══════════════════════════════════════════════════════
   CONNECTING OVERLAY
═══════════════════════════════════════════════════════ */
function showConnectingOverlay(callback) {
  const overlay = document.getElementById('connect-overlay');
  overlay.classList.add('active');

  const texts = [
    'Loading your surprise...',
    'Loading memories...',
    'Loading love...',
    'Loading kisses... 💋',
    'Loading everything I couldn\'t put into words...',
    'Ready. ❤️'
  ];

  let i = 0;
  const msg = document.getElementById('connect-msg');

  function showNext() {
    if (i < texts.length) {
      msg.textContent = texts[i];
      msg.classList.add('visible');
      setTimeout(() => {
        msg.classList.remove('visible');
        setTimeout(() => { i++; showNext(); }, 300);
      }, 900);
    } else {
      overlay.classList.add('fade-out');
      setTimeout(() => {
        overlay.classList.remove('active', 'fade-out');
        if (callback) callback();
      }, 600);
    }
  }
  setTimeout(showNext, 200);
}

/* ═══════════════════════════════════════════════════════
   ENTER EXPERIENCE
═══════════════════════════════════════════════════════ */
function enterExperience() {
  const bootScreen = document.getElementById('boot-screen');
  bootScreen.classList.add('hidden');

  // Music init happens after user gesture (browser policy)
  initMusicControl();

  showConnectingOverlay(() => {
    document.getElementById('main-nav').classList.add('visible');
    document.getElementById('main-content').style.display = 'block';
    startLoveNoteTimer();
    startParticleSystem();
    initScrollAnimations();
    initDaysCounter();
    initTypingTerminal();
    initScratchCards();    // defined in HTML <script>

    // Stagger hero elements
    setTimeout(() => {
      document.querySelectorAll('.hero-fade').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 200);
      });
    }, 300);
  });
}

/* ═══════════════════════════════════════════════════════
   DAYS TOGETHER COUNTER
═══════════════════════════════════════════════════════ */
function initDaysCounter() {
  function update() {
    const start = new Date(START_DATE);
    const now   = new Date();
    let diff    = Math.max(0, now - start); // ms

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    const mins  = Math.floor(diff / (1000 * 60));
    diff -= mins * 1000 * 60;
    const secs  = Math.floor(diff / 1000);

    const el = (id, val) => {
      const e = document.getElementById(id);
      if (e) e.textContent = val;
    };
    el('cnt-days',  days.toLocaleString());
    el('cnt-hours', String(hours).padStart(2, '0'));
    el('cnt-mins',  String(mins).padStart(2, '0'));
    el('cnt-secs',  String(secs).padStart(2, '0'));
  }
  update();
  setInterval(update, 1000);
}

/* ═══════════════════════════════════════════════════════
   TYPING TERMINAL (hero)
═══════════════════════════════════════════════════════ */
function initTypingTerminal() {
  const terminal = document.getElementById('hero-terminal');
  if (!terminal) return;

  const lines = [
    { type: 'line',    text: '> Searching for Yash...' },
    { type: 'result',  text: 'Found him. ❤️',            delay: 80 },
    { type: 'line',    text: '> Searching for reasons to love him...' },
    { type: 'error',   text: 'ERROR: Too many results.',  delay: 70 },
    { type: 'line',    text: '> Searching for someone cuter...' },
    { type: 'result',  text: 'Search returned 0 results. 🙄', delay: 80 },
  ];

  const classMap = {
    line:   'terminal-line',
    result: 'terminal-result',
    error:  'terminal-error',
    success:'terminal-success'
  };

  let lineIndex = 0;

  function typeLine(el, text, speed, onDone) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    el.appendChild(cursor);

    const iv = setInterval(() => {
      cursor.before(document.createTextNode(text[i]));
      i++;
      if (i >= text.length) {
        clearInterval(iv);
        cursor.remove();
        if (onDone) onDone();
      }
    }, speed || 60);
  }

  function showNextLine() {
    if (lineIndex >= lines.length) return;
    const cfg = lines[lineIndex++];
    const el = document.createElement('div');
    el.className = classMap[cfg.type] || 'terminal-line';
    if (lineIndex > 1) el.style.marginTop = '0.5rem';
    terminal.appendChild(el);
    typeLine(el, cfg.text, cfg.delay || 55, () => {
      setTimeout(showNextLine, 400);
    });
  }

  // Start after hero is visible (short delay)
  setTimeout(showNextLine, 800);
}

/* ═══════════════════════════════════════════════════════
   PARTICLE SYSTEM
═══════════════════════════════════════════════════════ */
const HEARTS = ['♡', '♥', '❤️', '🩷'];

function spawnFloatingHeart(x, y) {
  const el = document.createElement('div');
  el.className = 'float-heart';
  el.setAttribute('aria-hidden', 'true');
  el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  el.style.left = (x - 10 + Math.random() * 20) + 'px';
  el.style.top  = y + 'px';
  el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
  el.style.opacity  = (0.5 + Math.random() * 0.4);
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

function spawnFloatingKiss(x, y) {
  const el = document.createElement('div');
  el.className = 'float-kiss';
  el.setAttribute('aria-hidden', 'true');
  el.textContent = '💋';
  el.style.left = (x - 15 + Math.random() * 30) + 'px';
  el.style.top  = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5200);
}

function startParticleSystem() {
  function randomHeart() {
    if (!document.hidden) spawnFloatingHeart(Math.random() * window.innerWidth, window.innerHeight);
    floatTimers.push(setTimeout(randomHeart, 5000 + Math.random() * 4000));
  }
  function randomKiss() {
    if (!document.hidden) spawnFloatingKiss(Math.random() * window.innerWidth, window.innerHeight - 20);
    floatTimers.push(setTimeout(randomKiss, 18000 + Math.random() * 12000));
  }
  function randomSparkle() {
    if (!document.hidden) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = ['✨', '⭐', '✦', '✧'][Math.floor(Math.random() * 4)];
      el.style.left = (5 + Math.random() * 90) + 'vw';
      el.style.top  = (5 + Math.random() * 80) + 'vh';
      el.style.animationDuration = (1 + Math.random()) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
    setTimeout(randomSparkle, 10000 + Math.random() * 8000);
  }
  function randomPetal() {
    if (!document.hidden) {
      const el = document.createElement('div');
      el.className = 'petal';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = ['🌸', '🌺', '🌷'][Math.floor(Math.random() * 3)];
      el.style.left = Math.random() * 90 + 'vw';
      el.style.top  = '-5vh';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6200);
    }
    setTimeout(randomPetal, 25000 + Math.random() * 15000);
  }

  setTimeout(randomHeart,   2000);
  setTimeout(randomKiss,    10000);
  setTimeout(randomSparkle, 6000);
  setTimeout(randomPetal,   22000);
}

function startLoveNoteTimer() {
  function showNote() {
    if (!document.hidden) {
      const note = birthdayConfig.loveNotes[Math.floor(Math.random() * birthdayConfig.loveNotes.length)];
      const el = document.createElement('div');
      el.className = 'float-note';
      el.setAttribute('aria-hidden', 'true');
      el.textContent = note;
      el.style.left   = (10 + Math.random() * 70) + '%';
      el.style.bottom = (20 + Math.random() * 30) + '%';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 6200);
    }
    loveNoteTimer = setTimeout(showNote, 22000 + Math.random() * 15000);
  }
  setTimeout(showNote, 15000);
}

/* ═══════════════════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const section = entry.target.closest('[data-animate]');
        if (section) triggerSectionAnimation(section.dataset.animate);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in, .timeline-item, .ai-message, .dataset-list li, .reason-card').forEach(el => {
    observer.observe(el);
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        triggerSectionAnimation(entry.target.dataset.animate);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-animate]').forEach(el => sectionObserver.observe(el));
}

function triggerSectionAnimation(name) {
  switch (name) {
    case 'sentiment':       animateSentimentBars();   break;
    case 'boyfriend-model': animateBoyfriendModel();  break;
    case 'training':        startTrainingAnimation(); break;
    case 'heart-detection': startHeartDetection();    break;
    case 'final-analysis':  startFinalAnalysis();     break;
    case 'dataset':         animateDatasetList();     break;
    case 'reasons':         revealReasonCards();      break;
  }
}

/* ═══════════════════════════════════════════════════════
   PROGRESS BAR ANIMATIONS
═══════════════════════════════════════════════════════ */
function animateSentimentBars() {
  document.querySelectorAll('#sentiment-section .progress-fill').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, i * 200);
  });
}
function animateBoyfriendModel() {
  document.querySelectorAll('#boyfriend-model-section .model-row-fill').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, i * 180);
  });
}

/* ═══════════════════════════════════════════════════════
   DATASET ANIMATION
═══════════════════════════════════════════════════════ */
function animateDatasetList() {
  document.querySelectorAll('#dataset-section .dataset-list li').forEach((item, i) => {
    setTimeout(() => item.classList.add('visible'), i * 150);
  });
}

/* ═══════════════════════════════════════════════════════
   TRAINING ANIMATION
═══════════════════════════════════════════════════════ */
let trainingStarted = false;
function startTrainingAnimation() {
  if (trainingStarted) return;
  trainingStarted = true;

  const epochDisplay = document.getElementById('epoch-display');
  const lossDisplay  = document.getElementById('loss-display');
  const trainCanvas  = document.getElementById('training-graph');
  const ctx = trainCanvas ? trainCanvas.getContext('2d') : null;

  if (ctx) {
    trainCanvas.width  = trainCanvas.offsetWidth;
    trainCanvas.height = trainCanvas.offsetHeight;
  }

  const epochs = [
    { e: 1,   loss: 0.91 },
    { e: 10,  loss: 0.74 },
    { e: 25,  loss: 0.42 },
    { e: 50,  loss: 0.18 },
    { e: 75,  loss: 0.05 },
    { e: 100, loss: 0.00 }
  ];

  const lossHistory = [];

  function drawGraph(data) {
    if (!ctx) return;
    const w = trainCanvas.width, h = trainCanvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = (h * i) / 5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    if (data.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(193,89,106,0.8)';
    ctx.lineWidth = 2.5;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(193,89,106,0.5)';
    data.forEach((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - (d * h * 0.9 + h * 0.05);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(193,89,106,0.15)');
    grad.addColorStop(1, 'rgba(193,89,106,0)');
    ctx.fillStyle = grad;
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
  }

  let epIdx = 0;
  function nextEpoch() {
    if (epIdx >= epochs.length) {
      document.getElementById('training-complete').style.display = 'block';
      spawnKissesFromBottom(6);
      return;
    }
    const { e, loss } = epochs[epIdx];
    epochDisplay.textContent = `Epoch ${String(e).padStart(3, '0')} / 100`;
    lossDisplay.textContent  = loss.toFixed(2);

    const prevLoss = epIdx > 0 ? epochs[epIdx - 1].loss : 0.91;
    const steps    = epIdx > 0 ? epochs[epIdx].e - epochs[epIdx - 1].e : 1;
    for (let s = 0; s < steps; s++) {
      const t = s / Math.max(steps - 1, 1);
      lossHistory.push(prevLoss + (loss - prevLoss) * t);
    }
    drawGraph(lossHistory);
    epIdx++;
    setTimeout(nextEpoch, epIdx < 3 ? 800 : 600);
  }
  setTimeout(nextEpoch, 500);
}

/* ═══════════════════════════════════════════════════════
   HEART DETECTION ANIMATION
═══════════════════════════════════════════════════════ */
let heartDetectionStarted = false;
function startHeartDetection() {
  if (heartDetectionStarted) return;
  heartDetectionStarted = true;

  const scanTextEl = document.getElementById('hd-scan-text');
  const scanItems  = [
    { id: 'hd-r1', scanText: 'Scanning conversations...' },
    { id: 'hd-r2', scanText: 'Scanning memories...' },
    { id: 'hd-r3', scanText: 'Scanning little moments...' },
    { id: 'hd-r4', scanText: 'Scanning feelings...' },
    { id: 'hd-r5', scanText: 'Scanning love...' },
  ];

  scanItems.forEach(({ id, scanText }, i) => {
    const delay = 800 + i * 900;
    setTimeout(() => { if (scanTextEl) scanTextEl.textContent = scanText; }, delay - 300);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('visible');
    }, delay);
  });

  const finalDelay = 800 + scanItems.length * 900 + 600;
  setTimeout(() => {
    const finalEl = document.getElementById('hd-final');
    if (finalEl) finalEl.classList.add('visible');
    if (scanTextEl) scanTextEl.textContent = 'Complete. ❤️';
    spawnKissesFromBottom(4);
  }, finalDelay);
}

/* ═══════════════════════════════════════════════════════
   FINAL ANALYSIS
═══════════════════════════════════════════════════════ */
function startFinalAnalysis() {
  const steps = document.querySelectorAll('#final-analysis-section .analysis-step');
  steps.forEach((s, i) => {
    setTimeout(() => s.classList.add('visible'), 600 + i * 700);
  });
  setTimeout(() => {
    const fr = document.getElementById('final-result');
    if (fr) fr.classList.add('visible');
    spawnKissesFromBottom(5);
  }, 600 + steps.length * 700 + 500);
}

/* ═══════════════════════════════════════════════════════
   REASONS REVEAL
═══════════════════════════════════════════════════════ */
function revealReasonCards() {
  document.querySelectorAll('.reason-card').forEach((c, i) => {
    setTimeout(() => c.classList.add('visible'), i * 300);
  });
}

/* ═══════════════════════════════════════════════════════
   KISS COUNTER
═══════════════════════════════════════════════════════ */
function sendKiss() {
  kissCount++;
  const display = document.getElementById('kiss-count-display');
  const msg     = document.getElementById('kiss-message');
  display.textContent = kissCount;
  display.classList.add('bounce');
  setTimeout(() => display.classList.remove('bounce'), 150);

  const btn  = document.getElementById('kiss-btn');
  const rect = btn.getBoundingClientRect();
  spawnFloatingKiss(rect.left + rect.width / 2, rect.top);

  if (kissCount === 10) {
    msg.textContent = "That's 10 kisses for Yash. 💋";
  } else if (kissCount === 25) {
    msg.textContent = "Still not enough honestly. 🥹";
  } else if (kissCount === 50) {
    msg.textContent = "Okay, you're really going for it. 😄";
  } else if (kissCount === 100) {
    msg.textContent = "Okay... I think you have enough kisses for now. 🤭💋";
    setTimeout(() => {
      msg.innerHTML = "Actually...<br>Never mind.<br>∞ kisses for Yash. ❤️";
    }, 2500);
  }
}

/* ═══════════════════════════════════════════════════════
   SPAWN KISSES FROM BOTTOM
═══════════════════════════════════════════════════════ */
function spawnKissesFromBottom(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = 100 + Math.random() * (window.innerWidth - 200);
      spawnFloatingKiss(x, window.innerHeight - 20);
    }, i * 300);
  }
}

/* ═══════════════════════════════════════════════════════
   SEARCH FOR BETTER BOYFRIEND
═══════════════════════════════════════════════════════ */
function searchBetterBoyfriend() {
  const btn    = document.getElementById('search-bf-btn');
  const result = document.getElementById('search-bf-result');

  btn.disabled = true;
  btn.textContent = 'Searching...';
  result.innerHTML = '';
  result.style.display = 'block';

  const messages = [
    { text: '> Initiating global search...',                    delay: 500 },
    { text: '> Scanning 8 billion humans...',                   delay: 1200 },
    { text: '> Searching...',                                   delay: 1900 },
    { text: '> Applying: Heena\'s person filter ✓',            delay: 3200 },
    { text: '> 0 results found.',                               delay: 4000, class: 'terminal-error' },
    { text: '> Better boyfriend not found.',                    delay: 4700, class: 'terminal-error' },
    { text: '> Reason: Yash already occupies the position. ❤️', delay: 5500, class: 'terminal-success' },
    { text: '> Search cancelled.',                              delay: 6100 }
  ];

  messages.forEach(({ text, delay, class: cls }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.textContent = text;
      if (cls) line.classList.add(cls);
      result.appendChild(line);
    }, delay);
  });

  setTimeout(() => {
    btn.disabled = false;
    btn.textContent = 'SEARCH FOR A BETTER BOYFRIEND';
  }, 7000);
}

/* ═══════════════════════════════════════════════════════
   MUSIC CONTROL
   Song file: assets/music/background.mp3
   — Starts automatically on enterExperience() (user gesture)
   — Fades in over 2 s to volume 0.4
   — Toggle 🔇/🔊 button pauses / resumes
   — Pauses when tab is hidden, resumes when visible again
   — Fails silently if the file is missing
═══════════════════════════════════════════════════════ */
let _musicUserMuted = false; // true only when user explicitly clicked mute

function initMusicControl() {
  const btn = document.getElementById('music-btn');
  if (!btn || audioElement) return; // guard: only run once

  audioElement = new Audio();
  audioElement.src    = 'assets/music/background.mp3';
  audioElement.loop   = true;
  audioElement.volume = 0;          // start silent, fade in
  audioElement.preload = 'auto';

  // ── Silent failure if file missing ──────────────────
  audioElement.addEventListener('error', () => {
    console.info('Birthday: Music file not found. Add assets/music/background.mp3 to enable music.');
    if (btn) btn.style.display = 'none';
    audioElement = null;
  });

  // ── Auto-start (called inside enterExperience, so gesture is satisfied) ──
  audioElement.play().then(() => {
    musicPlaying = true;
    btn.textContent = '🔊';
    btn.setAttribute('aria-label', 'Pause music');
    btn.title = 'Pause music';
    // Gentle fade-in to 0.4 over 2 seconds
    const target = 0.4;
    const steps  = 40;
    const inc    = target / steps;
    let step     = 0;
    const fade   = setInterval(() => {
      step++;
      audioElement.volume = Math.min(target, step * inc);
      if (step >= steps) clearInterval(fade);
    }, 2000 / steps);
  }).catch(() => {
    // Browser blocked autoplay even after gesture — set up for manual start
    btn.textContent = '🔇';
    btn.setAttribute('aria-label', 'Play music');
    btn.title = 'Play music';
    musicPlaying = false;
  });

  // ── Toggle button ────────────────────────────────────
  btn.addEventListener('click', () => {
    if (!audioElement) return;
    if (musicPlaying) {
      audioElement.pause();
      btn.textContent = '🔇';
      btn.setAttribute('aria-label', 'Play music');
      btn.title = 'Play music';
      musicPlaying = false;
      _musicUserMuted = true;
    } else {
      audioElement.play().catch(() => {});
      btn.textContent = '🔊';
      btn.setAttribute('aria-label', 'Pause music');
      btn.title = 'Pause music';
      musicPlaying = true;
      _musicUserMuted = false;
    }
  });

  // ── Pause / resume on tab visibility ────────────────
  document.addEventListener('visibilitychange', () => {
    if (!audioElement) return;
    if (document.hidden) {
      if (musicPlaying) audioElement.pause();
    } else {
      if (musicPlaying && !_musicUserMuted) {
        audioElement.play().catch(() => {});
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE CURSOR HEARTS (click anywhere)
═══════════════════════════════════════════════════════ */
document.addEventListener('click', (e) => {
  if (e.target.closest('#boot-screen') || e.target.closest('#connect-overlay')) return;
  if (Math.random() > 0.4) spawnFloatingHeart(e.clientX, e.clientY);
});

/* ═══════════════════════════════════════════════════════
   GLOBAL AMBIENT PARTICLE CANVAS
═══════════════════════════════════════════════════════ */
function initGlobalBgCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'global-bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.55;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;
  const pts = [];
  let bgRaf, bgRunning = true;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Dot {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * (W || window.innerWidth);
      this.y  = init ? Math.random() * (H || window.innerHeight) : (H || window.innerHeight) + 10;
      this.r  = 0.5 + Math.random() * 1.4;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(0.15 + Math.random() * 0.35);
      this.a  = 0.08 + Math.random() * 0.35;
      this.da = (Math.random() - 0.5) * 0.003;
      this.c  = Math.random() > 0.5 ? `rgba(193,89,106,${this.a})` : `rgba(196,168,212,${this.a})`;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.a = Math.max(0, this.a + this.da);
      if (this.y < -10 || this.a <= 0) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c;
      ctx.fill();
    }
  }

  function build() { for (let i = 0; i < 55; i++) pts.push(new Dot()); }

  function loop() {
    if (!bgRunning) return;
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => { p.update(); p.draw(); });
    bgRaf = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { bgRunning = false; cancelAnimationFrame(bgRaf); }
    else { bgRunning = true; loop(); }
  });

  window.addEventListener('resize', resize);
  resize(); build(); loop();
}

/* ═══════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initBoot();

  document.querySelectorAll('.hero-fade').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.15) + 's';
  });

  initGlobalBgCanvas();
});
