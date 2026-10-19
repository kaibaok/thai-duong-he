(() => {
  'use strict';
  const INK = '#12331f';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ================= Hình vẽ (mỗi bạn là một symbol 120x120) ================= */
  const E = (x, y, r = 6) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x}" cy="${y + .5}" r="${r * .52}" fill="${INK}" stroke="none"/>` +
    `<circle cx="${x + r * .25}" cy="${y - r * .2}" r="${r * .2}" fill="#fff" stroke="none"/>`;
  const blush = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#ff8fb1" opacity=".65" stroke="none"/>`;
  const flower = (cx, cy, r, fill, mid = '#ffc13b') => {
    let p = '';
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
      p += `<circle cx="${cx + Math.cos(a) * r}" cy="${cy + Math.sin(a) * r}" r="${r * .85}" fill="${fill}"/>`;
    }
    return p + `<circle cx="${cx}" cy="${cy}" r="${r * .7}" fill="${mid}"/>`;
  };

  const ART = {
    jaguar: `
      <circle cx="28" cy="34" r="13" fill="#f2b233"/><circle cx="28" cy="34" r="6" fill="#ffd9a0" stroke="none"/>
      <circle cx="92" cy="34" r="13" fill="#f2b233"/><circle cx="92" cy="34" r="6" fill="#ffd9a0" stroke="none"/>
      <circle cx="60" cy="64" r="38" fill="#f2b233"/>
      <g fill="${INK}" stroke="none"><circle cx="38" cy="42" r="3.5"/><circle cx="52" cy="34" r="3"/><circle cx="68" cy="34" r="3"/><circle cx="82" cy="42" r="3.5"/><circle cx="29" cy="60" r="3"/><circle cx="91" cy="60" r="3"/></g>
      <ellipse cx="60" cy="80" rx="19" ry="14" fill="#fff4da"/>
      ${E(45, 58, 7)}${E(75, 58, 7)}
      <path d="M54 70h12l-6 7z" fill="#ff8fb1"/><path d="M60 77v4M52 84q8 6 16 0" fill="none"/>${blush(34, 74)}${blush(86, 74)}`,
    pink: `
      <path d="M96 62q14-22 20-26-2 22 2 40-10-12-22-8z" fill="#ff8fb1"/>
      <path d="M58 44l10-18 10 20z" fill="#ff8fb1"/>
      <rect x="2" y="66" width="36" height="11" rx="5.5" fill="#ff9cbc"/>
      <ellipse cx="62" cy="66" rx="40" ry="24" fill="#ff9cbc"/>
      <ellipse cx="64" cy="77" rx="30" ry="10" fill="#ffd0df" stroke="none"/>
      <path d="M58 82l-8 20 24-14z" fill="#ff8fb1"/>
      ${E(40, 58, 6.5)}<path d="M8 73q14 4 26 0" fill="none"/>${blush(48, 68)}
      <circle cx="14" cy="50" r="3.5" fill="#fff"/><circle cx="24" cy="40" r="2.5" fill="#fff"/>`,
    sloth: `
      <rect x="2" y="6" width="116" height="12" rx="6" fill="#8a5a3a"/>
      <path d="M30 18Q20 46 38 72" fill="none" stroke-width="14"/><path d="M90 18Q100 46 82 72" fill="none" stroke-width="14"/>
      <path d="M30 18Q20 46 38 72" fill="none" stroke="#b48a5e" stroke-width="7"/><path d="M90 18Q100 46 82 72" fill="none" stroke="#b48a5e" stroke-width="7"/>
      <ellipse cx="60" cy="102" rx="32" ry="16" fill="#b48a5e"/>
      <circle cx="60" cy="66" r="30" fill="#b48a5e"/>
      <ellipse cx="60" cy="66" rx="24" ry="20" fill="#ecd9ae" stroke="none"/>
      <ellipse cx="46" cy="64" rx="9" ry="6.5" fill="#6b4a2c" stroke="none" transform="rotate(-22 46 64)"/>
      <ellipse cx="74" cy="64" rx="9" ry="6.5" fill="#6b4a2c" stroke="none" transform="rotate(22 74 64)"/>
      ${E(46, 64, 4.5)}${E(74, 64, 4.5)}
      <ellipse cx="60" cy="73" rx="5" ry="3.5" fill="${INK}"/><path d="M50 81q10 8 20 0" fill="none"/>`,
    macaw: `
      <path d="M40 78L12 112l22 4 24-30z" fill="#2a7de1"/><path d="M46 80L26 116l16-2 20-28z" fill="#e8453c"/>
      <ellipse cx="62" cy="68" rx="26" ry="34" fill="#e8453c"/>
      <path d="M52 50q36 6 32 50-26-4-36-34z" fill="#2a7de1"/>
      <path d="M52 66q24 4 30 20" fill="none" stroke="#ffc13b" stroke-width="6"/>
      <circle cx="64" cy="32" r="21" fill="#e8453c"/>
      <ellipse cx="70" cy="33" rx="12" ry="11" fill="#fff" stroke="none"/>
      ${E(70, 31, 6)}
      <path d="M80 20q26 2 22 26-4-10-18-8z" fill="#f3ead2"/><path d="M84 40q10 0 16 6-8 4-16-6z" fill="#4a4a4a"/>
      <rect x="40" y="106" width="52" height="9" rx="4.5" fill="#8a5a3a"/>`,
    anaconda: `
      <path d="M22 92C14 62 58 66 60 88S100 110 98 76C96 52 72 54 78 40" fill="none" stroke-width="24"/>
      <path d="M22 92C14 62 58 66 60 88S100 110 98 76C96 52 72 54 78 40" fill="none" stroke="#5aa845" stroke-width="17"/>
      <g fill="#2f6a2a" stroke="none"><circle cx="22" cy="82" r="3.5"/><circle cx="40" cy="70" r="3.5"/><circle cx="60" cy="90" r="3.5"/><circle cx="84" cy="102" r="3.5"/><circle cx="98" cy="80" r="3.5"/><circle cx="88" cy="58" r="3.5"/></g>
      <path d="M78 52v8M78 60l-4 4M78 60l4 4" stroke="#e8453c" fill="none" stroke-width="2.5"/>
      <ellipse cx="78" cy="34" rx="19" ry="15" fill="#5aa845"/>
      ${E(70, 30, 5.5)}${E(86, 30, 5.5)}<path d="M70 42q8 5 16 0" fill="none"/>`,
    piranha: `
      <path d="M92 62l24-22v44z" fill="#f0883a"/>
      <path d="M44 38q16-14 34-2z" fill="#7aa8c4"/>
      <ellipse cx="56" cy="62" rx="42" ry="28" fill="#7aa8c4"/>
      <ellipse cx="56" cy="78" rx="32" ry="11" fill="#f0883a" stroke="none"/>
      ${E(34, 54, 8)}<path d="M22 42l22 8" stroke-width="4" fill="none"/>
      <path d="M14 70q10 8 26 4" fill="none"/><path d="M17 70l3 6 3-5 4 6 3-5 4 5" fill="#fff" stroke-width="2"/>${blush(48, 68)}`,
    frog: `
      <circle cx="40" cy="42" r="13" fill="#1fa3d9"/><circle cx="80" cy="42" r="13" fill="#1fa3d9"/>
      <ellipse cx="26" cy="98" rx="16" ry="11" fill="#1fa3d9"/><ellipse cx="94" cy="98" rx="16" ry="11" fill="#1fa3d9"/>
      <ellipse cx="60" cy="76" rx="36" ry="30" fill="#1fa3d9"/>
      <ellipse cx="60" cy="88" rx="22" ry="14" fill="#9fe0f5" stroke="none"/>
      <g fill="${INK}" stroke="none"><circle cx="36" cy="72" r="4"/><circle cx="86" cy="68" r="5"/><circle cx="60" cy="58" r="3"/><circle cx="26" cy="98" r="3"/><circle cx="96" cy="96" r="3"/></g>
      ${E(40, 41, 9)}${E(80, 41, 9)}<path d="M44 66q16 12 32 0" fill="none"/>${blush(34, 62)}${blush(86, 62)}`,
    harpy: `
      <path d="M18 62q-6 30 18 44l8-34z" fill="#6c7886"/><path d="M102 62q6 30-18 44l-8-34z" fill="#6c7886"/>
      <ellipse cx="60" cy="88" rx="28" ry="24" fill="#f4f4f4"/>
      <path d="M44 76q16 10 32 0" fill="none" stroke="#3d4651" stroke-width="6"/>
      <path d="M44 112l-3 8M52 112l1 8M68 112l-1 8M76 112l3 8" stroke="#ffc13b" stroke-width="4" fill="none"/>
      <path d="M36 28L26 6l22 14 12-18 12 18 22-14-10 22z" fill="#5d6978"/>
      <circle cx="60" cy="48" r="26" fill="#aab4c0"/>
      <ellipse cx="60" cy="52" rx="18" ry="16" fill="#e4e9ee" stroke="none"/>
      ${E(48, 46, 7)}${E(72, 46, 7)}<path d="M51 54h18l-9 18z" fill="#ffc13b"/>`,
    otter: `
      <circle cx="28" cy="40" r="8" fill="#8a5a3a"/><circle cx="92" cy="40" r="8" fill="#8a5a3a"/>
      <ellipse cx="60" cy="62" rx="36" ry="34" fill="#8a5a3a"/>
      <ellipse cx="60" cy="76" rx="22" ry="15" fill="#e6c9a0"/>
      <path d="M52 66h16l-8 9z" fill="${INK}"/><path d="M60 75v6M52 84q8 5 16 0" fill="none"/>
      ${E(44, 54, 6)}${E(76, 54, 6)}
      <g fill="#fff4da" stroke="none"><circle cx="46" cy="78" r="1.6"/><circle cx="50" cy="82" r="1.6"/><circle cx="74" cy="78" r="1.6"/><circle cx="70" cy="82" r="1.6"/></g>
      <path d="M0 98q15-10 30 0t30 0 30 0 30 0V120H0z" fill="#2aa6c9"/>`,
    arapaima: `
      <path d="M98 62Q112 42 117 44 112 62 117 80 112 82 98 66z" fill="#e8453c"/>
      <ellipse cx="60" cy="62" rx="46" ry="20" fill="#7f9a86"/>
      <ellipse cx="86" cy="62" rx="17" ry="13" fill="#e8756a" stroke="none"/>
      <path d="M30 56q4 4 8 0M40 63q4 4 8 0M50 56q4 4 8 0M60 63q4 4 8 0M70 56q4 4 8 0" fill="none" stroke-width="2"/>
      <path d="M58 78l8 14 8-14z" fill="#7f9a86"/>
      ${E(24, 56, 6)}<path d="M13 66q8 6 19 2" fill="none"/>${blush(34, 66)}`,
    ant: `
      <g fill="none" stroke-width="3"><path d="M26 86l-10 14M42 90l-4 16M58 88l6 16M70 82l16 8M88 74l14-12M96 56l8-14"/></g>
      <circle cx="30" cy="78" r="15" fill="#c0452c"/><circle cx="58" cy="72" r="11" fill="#c0452c"/><circle cx="86" cy="64" r="14" fill="#c0452c"/>
      ${E(90, 62, 5.5)}<path d="M96 52q6-14 16-14M90 50q-2-14 6-20" fill="none"/>`,
    leaf: `<path d="M6 100C10 40 60 6 112 14 108 66 70 112 6 100z" fill="#2a8446"/><path d="M10 98C40 70 70 44 104 20" fill="none" stroke-width="3"/><path d="M40 76l4-18M60 58l2-16M26 88l-10-8" fill="none" stroke-width="2.5"/>`,
    /* thực vật */
    lily: `
      <ellipse cx="60" cy="86" rx="54" ry="24" fill="#3aa655"/><ellipse cx="60" cy="82" rx="54" ry="19" fill="#58c26b" stroke="none"/>
      <path d="M6 82q-2-14 10-18M114 82q2-14-10-18" fill="none"/>
      <g fill="#ff8fb1"><ellipse cx="60" cy="48" rx="8" ry="22"/><ellipse cx="60" cy="48" rx="8" ry="22" transform="rotate(-42 60 70)"/><ellipse cx="60" cy="48" rx="8" ry="22" transform="rotate(42 60 70)"/></g>
      ${E(42, 88, 5)}${E(78, 88, 5)}<path d="M52 96q8 6 16 0" fill="none"/>`,
    kapok: `
      <path d="M46 118q8-8 8-52h12q0 44 8 52z" fill="#a8896a"/>
      <g fill="#3aa655"><circle cx="60" cy="34" r="27"/><circle cx="32" cy="52" r="21"/><circle cx="88" cy="52" r="21"/></g>
      <g fill="#58c26b" stroke="none"><circle cx="50" cy="24" r="9"/><circle cx="26" cy="46" r="6"/></g>
      ${E(48, 46, 5.5)}${E(72, 46, 5.5)}<path d="M52 58q8 6 16 0" fill="none"/>
      <path d="M52 86l-6 4M68 86l6 4M54 100l-6 4M66 100l6 4" fill="none" stroke-width="3"/>`,
    brazilnut: `
      <g fill="#e0b97a"><ellipse cx="46" cy="28" rx="7" ry="11" transform="rotate(-20 46 28)"/><ellipse cx="62" cy="22" rx="7" ry="11"/><ellipse cx="78" cy="28" rx="7" ry="11" transform="rotate(20 78 28)"/></g>
      <circle cx="60" cy="72" r="38" fill="#8a5a3a"/>
      <ellipse cx="60" cy="40" rx="18" ry="7" fill="#5c3b22"/>
      <path d="M26 66q10-8 22-6M92 80q-10 8-22 6" fill="none" stroke="#6b4527" stroke-width="3"/>
      ${E(46, 72, 6.5)}${E(74, 72, 6.5)}<path d="M52 86q8 7 16 0" fill="none"/>${blush(36, 82)}${blush(84, 82)}`,
    acai: `
      <path d="M56 118Q50 80 66 44" fill="none" stroke-width="13"/><path d="M56 118Q50 80 66 44" fill="none" stroke="#b89a6a" stroke-width="7"/>
      <g fill="#3aa655"><ellipse cx="66" cy="22" rx="8" ry="26" transform="rotate(-72 66 44)"/><ellipse cx="66" cy="22" rx="8" ry="26" transform="rotate(-36 66 44)"/><ellipse cx="66" cy="22" rx="8" ry="26"/><ellipse cx="66" cy="22" rx="8" ry="26" transform="rotate(36 66 44)"/><ellipse cx="66" cy="22" rx="8" ry="26" transform="rotate(72 66 44)"/></g>
      <g fill="#6a2c91"><circle cx="78" cy="58" r="8"/><circle cx="92" cy="64" r="8"/><circle cx="84" cy="74" r="8"/><circle cx="98" cy="78" r="8"/><circle cx="72" cy="72" r="8"/></g>
      <g fill="#fff" stroke="none" opacity=".7"><circle cx="76" cy="55" r="2"/><circle cx="90" cy="61" r="2"/><circle cx="82" cy="71" r="2"/></g>`,
    orchid: `
      <path d="M60 118Q54 70 72 28" fill="none" stroke-width="9"/><path d="M60 118Q54 70 72 28" fill="none" stroke="#3aa655" stroke-width="4"/>
      <path d="M58 112Q28 104 14 80 44 80 58 112z" fill="#3aa655"/>
      ${flower(76, 26, 10, '#c77dff')}${flower(54, 54, 10, '#e9a8ff')}${flower(76, 78, 10, '#c77dff')}
      ${E(54, 54, 3.5)}`,
    cacao: `
      <path d="M20 34q22-20 38-4-18 20-38 4z" fill="#3aa655"/>
      <g transform="rotate(20 60 64)"><path d="M60 14C98 30 100 92 60 114 20 92 22 30 60 14z" fill="#f2b233"/>
      <path d="M60 18v92M44 30q-9 34 0 68M76 30q9 34 0 68" fill="none" stroke="#d98a1e" stroke-width="2.5"/></g>
      ${E(48, 62, 6)}${E(72, 62, 6)}<path d="M52 76q8 7 16 0" fill="none"/>`
  };

  const sprite = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    Object.entries(ART).map(([k, v]) =>
      `<symbol id="a-${k}" viewBox="0 0 120 120"><g stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">${v}</g></symbol>`).join('') +
    '</defs></svg>';
  document.body.insertAdjacentHTML('afterbegin', sprite);
  const use = (k, cls = '') => `<svg class="art ${cls}" viewBox="0 0 120 120" aria-hidden="true"><use href="#a-${k}"/></svg>`;

  /* ================= Hero ================= */
  const title = $('#title');
  let idx = 0;
  $$('.ln', title).forEach(line => {
    const t = line.textContent;
    line.innerHTML = '';
    [...t].forEach(c => {
      const s = document.createElement('span');
      s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.textContent = c;
      s.style.setProperty('--i', idx++);
      line.appendChild(s);
    });
  });

  const ridge = (el, color, n, seed, base) => {
    let s = seed; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    let c = '';
    for (let i = 0; i < n; i++) c += `<circle cx="${(i * 1600 / n + r() * 30).toFixed(0)}" cy="${(base + r() * 30).toFixed(0)}" r="${(46 + r() * 34).toFixed(0)}"/>`;
    el.innerHTML = `<svg viewBox="0 0 1600 260" preserveAspectRatio="none"><g fill="${color}" stroke="${INK}" stroke-width="4">${c}</g><rect x="0" y="${base + 50}" width="1600" height="260" fill="${color}"/></svg>`;
  };
  ridge($('#ridge1'), '#2a8446', 15, 7, 80);
  ridge($('#ridge2'), '#3aa655', 11, 19, 110);

  $('#flyMacaw').innerHTML = use('macaw');
  $('#dolphin').innerHTML = use('pink');
  $('#lilyBase').innerHTML = use('lily');
  $('#leafL').innerHTML = use('leaf');
  $('#leafR').innerHTML = use('leaf');
  $$('.critter[data-k]').forEach(b => { b.insertAdjacentHTML('afterbegin', use(b.dataset.k)); });
  $$('.fish').forEach(f => { f.innerHTML = use(f.dataset.fish); });

  if (!reduce) {
    const hero = $('.hero');
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      $$('.px', hero).forEach(el => {
        const d = +el.dataset.d || 8;
        el.style.transform = `translate(${(-x * d).toFixed(1)}px, ${(-y * d).toFixed(1)}px)`;
      });
    });
  }

  const bubble = $('#bubble');
  let bt;
  const say = (el, text) => {
    bubble.textContent = text;
    const r = el.getBoundingClientRect();
    bubble.classList.add('show');
    const w = bubble.offsetWidth, h = bubble.offsetHeight;
    let left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let top = r.top - h - 12;
    if (top < 70) top = r.bottom + 12;
    bubble.style.left = left + 'px'; bubble.style.top = top + 'px';
    clearTimeout(bt); bt = setTimeout(() => bubble.classList.remove('show'), 4800);
  };
  $$('.critter[data-say]').forEach(b => b.addEventListener('click', () => say(b, b.dataset.say)));
  addEventListener('scroll', () => bubble.classList.remove('show'), { passive: true });

  /* ================= Số liệu ================= */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = reduce ? 0 : 1400;
    const step = t => {
      const p = dur ? Math.min((t - t0) / dur, 1) : 1;
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('vi-VN');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => io.observe(el));

  const flagSvg = '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#da251d"/><polygon fill="#ffcd00" points="15,5.5 16.18,8.88 19.76,8.96 16.9,11.12 17.94,14.55 15,12.5 12.06,14.55 13.1,11.12 10.24,8.96 13.82,8.88"/></svg>';
  const vnGrid = $('#vnGrid'), vnBtn = $('#vnBtn'), vnCount = $('#vnCount');
  let vnN = 0, vnTimer;
  vnBtn.addEventListener('click', () => {
    if (vnTimer) return;
    if (vnN >= 17) { vnN = 0; vnGrid.innerHTML = ''; }
    vnTimer = setInterval(() => {
      vnGrid.insertAdjacentHTML('beforeend', flagSvg);
      vnN++;
      vnCount.textContent = `Đã xếp: ${vnN} / 17 nước Việt Nam`;
      if (vnN >= 17) {
        clearInterval(vnTimer); vnTimer = null;
        vnBtn.textContent = 'Xếp lại';
        vnCount.textContent = 'Đầy rồi! Cần khoảng 17 nước Việt Nam mới bằng Amazon.';
      }
    }, reduce ? 0 : 130);
    vnBtn.textContent = 'Đang xếp...';
  });

  /* ================= Sông ================= */
  const scene = $('#riverScene'), trees = $('#trees');
  [[7, 120, 90], [19, 160, 110], [31, 130, 96], [45, 170, 120], [58, 140, 100], [70, 165, 112], [82, 125, 94], [93, 155, 104]].forEach(([l, h, w]) => {
    trees.insertAdjacentHTML('beforeend',
      `<div class="tree" style="left:${l}%"><div class="trunk" style="height:${h}px"></div><div class="crown" style="--cw:${w}px;bottom:${h - 10}px"></div></div>`);
  });
  $('#boat').innerHTML = `<svg viewBox="0 0 150 100" aria-hidden="true"><g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <path d="M8 60h134l-18 28H28z" fill="#e8453c"/><path d="M14 68h122" stroke-width="3" fill="none" stroke="#fff4da"/>
    <rect x="62" y="40" width="26" height="22" rx="4" fill="#3aa655"/>
    <circle cx="75" cy="26" r="13" fill="#f6cfa0"/><ellipse cx="75" cy="16" rx="22" ry="5" fill="#ffc13b"/><path d="M62 16q13-18 26 0z" fill="#ffc13b"/>
    ${E(70, 28, 3.6)}${E(82, 28, 3.6)}<path d="M70 35q5 4 10 0" fill="none" stroke-width="3"/>
    <path d="M88 48l20-14" fill="none"/></g></svg>`;
  const seasonText = {
    dry: 'Mùa khô: nước rút xuống, bãi cát nổi lên và các bạn cá tụ lại ở những vùng nước sâu.',
    wet: 'Mùa mưa: nước dâng cao hàng chục mét, ngập cả thân cây. Cá bơi lượn giữa các cành cây, và thuyền đi được vào tận trong rừng!'
  };
  const setSeason = s => {
    scene.dataset.season = s;
    $('#seasonNote').textContent = seasonText[s];
    $$('.seasons .pill').forEach(b => { const on = b.dataset.s === s; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
  };
  $$('.seasons .pill').forEach(b => b.addEventListener('click', () => setSeason(b.dataset.s)));
  setSeason('dry');

  /* ================= Các tầng rừng ================= */
  const LAYERS = [
    { n: 'Tầng vượt tán', h: 'cao hơn 40 m', d: 'Đỉnh của những cây khổng lồ nhô lên khỏi mặt rừng. Ở đây nắng chói chang và gió thổi lồng lộng. Chỉ những bạn bay giỏi mới dám ở nơi cao thế này.', a: [['harpy', 'Đại bàng harpy'], ['macaw', 'Vẹt macaw']] },
    { n: 'Tầng tán', h: '30 – 40 m', d: 'Lá dày đan vào nhau như một mái nhà xanh. Đây là nơi có nhiều hoa, quả và nhiều cư dân nhất. Các bạn leo trèo sống ở đây như ở nhà mình.', a: [['sloth', 'Lười ba ngón'], ['macaw', 'Vẹt macaw']] },
    { n: 'Tầng dưới tán', h: '5 – 20 m', d: 'Tối và ẩm vì tán lá che gần hết ánh nắng. Lá ở đây thường rất to để đón từng chút nắng lọt xuống. Một nơi lý tưởng để ẩn nấp.', a: [['jaguar', 'Báo đốm'], ['frog', 'Ếch phi tiêu độc']] },
    { n: 'Tầng đất rừng', h: 'sát mặt đất', d: 'Rất tối, chỉ còn lại một chút nắng. Lá rụng ở đây được nấm và kiến biến thành đất màu mỡ để nuôi cây. Vùng đất ngập nước gần đó là nhà của trăn anaconda.', a: [['ant', 'Kiến'], ['anaconda', 'Trăn anaconda']] }
  ];
  const T = (k, x, y, w, extra = '') => `<use href="#a-${k}" x="${x}" y="${y}" width="${w}" height="${w}" ${extra}/>`;
  $('#treeWrap').innerHTML = `<svg class="tree-svg" id="treeSvg" viewBox="0 0 320 560" role="img" aria-label="Mặt cắt rừng Amazon với bốn tầng: vượt tán, tán, dưới tán và đất rừng">
    <g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
      <g class="band b0" data-i="0"><rect x="0" y="0" width="320" height="122" fill="#bfe9ff"/><ellipse cx="270" cy="30" rx="30" ry="10" fill="#fff" stroke="none"/></g>
      <g class="band b1" data-i="1"><rect x="0" y="120" width="320" height="132" fill="#3aa655"/></g>
      <g class="band b2" data-i="2"><rect x="0" y="250" width="320" height="152" fill="#2a8446"/></g>
      <g class="band b3" data-i="3"><rect x="0" y="400" width="320" height="160" fill="#6e4a2e"/></g>
      <path d="M144 20l-6 540h46l-8-540z" fill="#a0724c"/>
      <path d="M138 560q-24-24-56-26M184 560q24-24 56-26" fill="none" stroke-width="9"/>
      <g fill="#58c26b"><circle cx="160" cy="52" r="40"/><circle cx="114" cy="72" r="26"/><circle cx="206" cy="72" r="26"/></g>
      <g fill="#58c26b"><circle cx="46" cy="172" r="38"/><circle cx="116" cy="154" r="42"/><circle cx="200" cy="158" r="44"/><circle cx="276" cy="176" r="38"/></g>
      ${T('leaf', 96, 296, 74)}${T('leaf', 206, 276, 84)}
      <g fill="#e8453c"><path d="M80 540a18 18 0 0 1 36 0z"/><path d="M252 548a14 14 0 0 1 28 0z"/></g>
      <g fill="#fff4da"><rect x="92" y="540" width="12" height="14"/><rect x="259" y="548" width="14" height="10"/></g>
    </g>
    <g class="macaw-fly">${T('macaw', 10, 10, 60)}</g>${T('harpy', 232, 4, 70)}
    ${T('sloth', 228, 152, 84)}${T('jaguar', 196, 296, 82)}${T('frog', 18, 336, 60)}
    ${T('ant', 24, 450, 56)}${T('anaconda', 200, 432, 80)}
    <text x="10" y="112">40 m +</text><text x="10" y="244">30 – 40 m</text><text x="10" y="272" fill="#fff" style="fill:#fff">5 – 20 m</text><text x="10" y="424" style="fill:#fff">mặt đất</text>
  </svg>`;
  const tabsEl = $('#tabs'), panel = $('#panel'), treeSvg = $('#treeSvg');
  tabsEl.innerHTML = LAYERS.map((l, i) => `<button class="pill" role="tab" id="tab${i}" data-i="${i}" aria-selected="false">${l.n}<small>${l.h}</small></button>`).join('');
  let cur = -1;
  const showLayer = i => {
    cur = i;
    treeSvg.dataset.on = i;
    $$('.pill', tabsEl).forEach((b, j) => b.setAttribute('aria-selected', j === i));
    const l = LAYERS[i];
    panel.setAttribute('aria-labelledby', 'tab' + i);
    panel.innerHTML = `<h3>${l.n}</h3><span class="meta">${l.h}</span><p>${l.d}</p>` +
      `<div class="chips">${l.a.map(([k, n]) => `<div class="chip">${use(k)}${n}</div>`).join('')}</div>`;
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
  };
  tabsEl.addEventListener('click', e => { const b = e.target.closest('.pill'); if (b) showLayer(+b.dataset.i); });
  tabsEl.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (cur + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + 4) % 4;
    showLayer(n); $('#tab' + n).focus();
  });
  $$('.band', treeSvg).forEach(g => g.addEventListener('click', () => showLayer(+g.dataset.i)));
  showLayer(0);

  /* ================= Thẻ lật: thú và cây ================= */
  const ANIMALS = [
    { k: 'jaguar', n: 'Báo đốm', c: '#ffd36b', w: 'Rừng và ven sông', f: 'Mèo lớn nhất châu Mỹ! Báo đốm không sợ nước và bơi rất giỏi.', i: 'wiggle' },
    { k: 'pink', n: 'Cá heo hồng', c: '#ffc2d6', w: 'Sông Amazon', f: 'Cổ rất mềm nên uốn lượn được giữa các thân cây ngập nước. Càng lớn càng hồng đó!', i: 'glide' },
    { k: 'sloth', n: 'Lười ba ngón', c: '#e8d6b0', w: 'Tầng tán', f: 'Chậm đến nỗi rêu mọc trên lông. Mỗi tuần mới xuống đất một lần.', i: 'sway-s' },
    { k: 'macaw', n: 'Vẹt macaw đỏ', c: '#ffb4a8', w: 'Tầng tán', f: 'Bay thành đàn và hay liếm đất sét trên vách sông.', i: 'wiggle' },
    { k: 'anaconda', n: 'Trăn anaconda', c: '#c8eaa4', w: 'Đầm và sông', f: 'Một trong những loài rắn nặng nhất thế giới. Nó rất thích ngâm mình dưới nước.', i: 'sway-s' },
    { k: 'piranha', n: 'Cá piranha', c: '#aedbf2', w: 'Sông Amazon', f: 'Nhiều người đồn chúng dữ lắm, nhưng chúng ăn cả cá, côn trùng, hạt và quả.', i: 'glide' },
    { k: 'frog', n: 'Ếch phi tiêu độc', c: '#a6e3f7', w: 'Đất rừng, tầng thấp', f: 'Nhỏ xíu mà màu rực rỡ, như đèn báo: "Đừng ăn tớ, tớ có độc!"', i: 'bounce' },
    { k: 'harpy', n: 'Đại bàng harpy', c: '#d3d9e0', w: 'Tầng vượt tán', f: 'Vuốt dài và rất khỏe. Nó bay trên cao để tìm khỉ và lười.', i: 'wiggle' },
    { k: 'otter', n: 'Rái cá khổng lồ', c: '#e6c9a0', w: 'Sông, hồ', f: 'Sống cả gia đình, cùng đi bắt cá. Có bạn dài gần 2 mét.', i: 'bounce' },
    { k: 'arapaima', n: 'Cá arapaima', c: '#c5dcc9', w: 'Sông, hồ', f: 'Một trong những cá nước ngọt lớn nhất, dài 2–3 mét. Biết nổi lên hớp không khí để thở.', i: 'glide' }
  ];
  const PLANTS = [
    { k: 'lily', n: 'Sen khổng lồ', c: '#c6efc0', w: 'Hồ và vùng nước lặng', f: 'Lá rộng gần 3 mét, nổi như chiếc bè tròn. Hoa nở về đêm, hôm đầu trắng, hôm sau chuyển hồng.', i: 'sway-s' },
    { k: 'kapok', n: 'Cây gạo kapok', c: '#d5f0b5', w: 'Tầng vượt tán', f: 'Một trong những cây cao nhất rừng, có thể cao hơn 60 mét. Quả chứa sợi bông mềm nhẹ.', i: 'sway-s' },
    { k: 'brazilnut', n: 'Hạt dẻ Brazil', c: '#f0d9b5', w: 'Tầng vượt tán', f: 'Quả cứng như quả dừa nhỏ, bên trong có nhiều hạt. Chỉ chuột agouti mới gặm nổi vỏ!', i: 'bounce' },
    { k: 'acai', n: 'Quả açaí', c: '#e3c9f5', w: 'Vùng đất ngập nước', f: 'Quả tím nhỏ mọc thành chùm trên cây cọ cao. Người dân Amazon ăn từ rất lâu rồi.', i: 'sway-s' },
    { k: 'orchid', n: 'Hoa lan', c: '#f7d4ff', w: 'Bám trên cành cây', f: 'Lan sống bám trên cành cao để đón nắng, không cần rễ cắm xuống đất.', i: 'wiggle' },
    { k: 'cacao', n: 'Quả ca cao', c: '#ffe3a0', w: 'Tầng dưới tán', f: 'Hạt ca cao được làm thành sô-cô-la! Quả mọc thẳng ra từ thân cây.', i: 'bounce' }
  ];
  const mkCards = (list, host) => {
    host.innerHTML = list.map(a => `<li><button class="card" data-anim style="--c:${a.c};--idle:${a.i}" aria-pressed="false">
      <span class="flip">
        <span class="face front">${use(a.k)}<b>${a.n}</b><i>Chạm để lật thẻ</i></span>
        <span class="face back"><b>${a.n}</b><span>${a.f}</span><em>Ở: ${a.w}</em></span>
      </span></button></li>`).join('');
    host.addEventListener('click', e => {
      const c = e.target.closest('.card'); if (!c) return;
      const on = c.classList.toggle('flipped');
      c.setAttribute('aria-pressed', on);
      c.classList.remove('boing'); void c.offsetWidth; c.classList.add('boing');
    });
  };
  mkCards(ANIMALS, $('#animalCards'));
  mkCards(PLANTS, $('#plantCards'));

  /* ================= Đố vui ================= */
  const QS = [
    { q: 'Ai là mèo lớn nhất châu Mỹ, sống ở rừng Amazon?', o: ['Sư tử', 'Báo đốm', 'Hổ'], a: 1, k: 'jaguar', w: 'Đúng rồi! Báo đốm còn bơi rất giỏi nữa.' },
    { q: 'Bạn nào di chuyển rất chậm và hay treo mình trên cây?', o: ['Rái cá', 'Cá heo hồng', 'Lười ba ngón'], a: 2, k: 'sloth', w: 'Lười ba ngón chậm đến mức rêu mọc cả trên lông.' },
    { q: 'Cá heo hồng sống ở đâu?', o: ['Sông Amazon', 'Sa mạc', 'Biển băng'], a: 0, k: 'pink', w: 'Cá heo hồng bơi giữa các thân cây ngập nước ở sông Amazon.' },
    { q: 'Màu rực rỡ của ếch phi tiêu độc để làm gì?', o: ['Để trốn trong lá', 'Báo hiệu: "Tớ có độc!"', 'Để trông cho đẹp'], a: 1, k: 'frog', w: 'Màu sặc sỡ như đèn báo nguy hiểm cho kẻ đi săn.' },
    { q: 'Rừng Amazon có mấy tầng như bé vừa học?', o: ['2 tầng', '4 tầng', '7 tầng'], a: 1, k: 'macaw', w: 'Bốn tầng: vượt tán, tán, dưới tán và đất rừng.' },
    { q: 'Mùa mưa, nước sông Amazon sẽ thế nào?', o: ['Dâng cao, ngập cả rừng', 'Biến mất', 'Đóng băng'], a: 0, k: 'arapaima', w: 'Nước dâng cao hàng chục mét, cá bơi lượn giữa các cành cây.' }
  ];
  const quiz = $('#quiz');
  let qi = 0, score = 0;
  const confetti = () => {
    if (reduce) return;
    const col = ['#ffc13b', '#3aa655', '#ff8fb1', '#2aa6c9', '#e8453c'];
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('i');
      s.className = 'conf';
      s.style.cssText = `left:${Math.random() * 100}%;background:${col[i % 5]};animation-delay:${Math.random() * .5}s;--dx:${(Math.random() - .5) * 160}px`;
      quiz.appendChild(s); setTimeout(() => s.remove(), 2600);
    }
  };
  const renderQ = () => {
    const q = QS[qi];
    quiz.innerHTML = `<div class="quiz-top"><span>Câu ${qi + 1} / ${QS.length}</span><div class="dots" aria-hidden="true">${QS.map((_, i) => `<i class="${i < qi ? 'done' : i === qi ? 'now' : ''}"></i>`).join('')}</div></div>
      <div class="quiz-body">${use(q.k)}<div><h3>${q.q}</h3>
      <div class="opts">${q.o.map((t, i) => `<button class="opt" data-i="${i}">${t}</button>`).join('')}</div>
      <p class="fb" aria-live="polite"></p><button class="pill" id="qNext" hidden>${qi === QS.length - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}</button></div></div>`;
    $$('.opt', quiz).forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i, ok = i === q.a;
      $$('.opt', quiz).forEach(x => x.disabled = true);
      b.classList.add(ok ? 'right' : 'wrong');
      if (!ok) $$('.opt', quiz)[q.a].classList.add('right');
      if (ok) { score++; confetti(); }
      $('.fb', quiz).textContent = (ok ? 'Giỏi quá! ' : 'Gần đúng rồi! ') + q.w;
      const n = $('#qNext'); n.hidden = false; n.focus();
      n.addEventListener('click', () => { qi++; qi < QS.length ? renderQ() : renderEnd(); });
    }));
  };
  const renderEnd = () => {
    const st = score >= 5 ? 3 : score >= 3 ? 2 : 1;
    quiz.innerHTML = `<div class="quiz-body">${use(score >= 5 ? 'jaguar' : 'sloth')}<div>
      <h3>Bé đúng ${score} / ${QS.length} câu!</h3><p class="stars" aria-label="${st} sao">${'★'.repeat(st)}${'☆'.repeat(3 - st)}</p>
      <p>${score >= 5 ? 'Bé đúng là nhà thám hiểm Amazon tài ba!' : 'Bé khám phá lại các phần phía trên rồi thử lần nữa nhé.'}</p>
      <button class="pill" id="qAgain">Chơi lại</button></div></div>`;
    if (score >= 5) confetti();
    $('#qAgain').addEventListener('click', () => { qi = 0; score = 0; renderQ(); });
  };
  renderQ();

  /* ================= Sông bay ================= */
  const ft = $('#flyTrees');
  [[60, 1], [130, .85], [200, 1.1], [270, .9], [340, 1]].forEach(([x, s]) => {
    ft.insertAdjacentHTML('beforeend', `<g transform="translate(${x} 214) scale(${s})"><rect x="-6" y="-26" width="12" height="28" fill="#8a5a3a"/><circle cx="0" cy="-42" r="26" fill="#3aa655"/></g>`);
  });
  $('#drops').innerHTML = [60, 130, 200, 270, 340].map((x, i) => `<ellipse class="drop" cx="${x + (i % 2 ? 8 : -8)}" cy="150" rx="5" ry="7" style="animation-delay:${i * .7}s"/>`).join('');
  $('#rainLines').innerHTML = [90, 150, 210, 270].map((x, i) =>
    `<line class="rain-line" x1="${x}" y1="100" x2="${x - 6}" y2="118" style="animation-delay:${i * .3}s"/>`).join('');

  /* ================= Lời hứa & cây lớn ================= */
  const PLEDGES = ['Dùng giấy tiết kiệm, không bỏ phí', 'Nhặt rác bỏ đúng thùng', 'Trồng hoặc chăm một chậu cây', 'Kể cho bạn bè nghe một điều mới về Amazon', 'Nhắc cả nhà tắt đèn, tắt nước khi không dùng'];
  const MSG = ['Mỗi lời hứa làm cây lớn thêm một chút.', 'Hạt giống nảy mầm rồi!', 'Hai chiếc lá đầu tiên đã mọc.', 'Cây cao lên trông thấy.', 'Tán lá xanh um rồi!', 'Cây nở hoa rồi! Cảm ơn bé đã bảo vệ rừng.'];
  $('#pledgeList').innerHTML = PLEDGES.map((p, i) => `<li><label><input type="checkbox" data-i="${i}">${p}</label></li>`).join('');
  $('#grow').innerHTML = `<svg viewBox="0 0 200 230"><g stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="100" cy="196" rx="86" ry="22" fill="#8a5a3a"/>
    <ellipse cx="100" cy="168" rx="12" ry="9" fill="#c79a63"/>${E(95, 167, 3)}${E(106, 167, 3)}
    <g class="st" data-n="1"><path d="M100 172V146" fill="none"/><path d="M100 150q-16-4-16-16 14 0 16 16zM100 150q16-4 16-16-14 0-16 16z" fill="#58c26b"/></g>
    <g class="st" data-n="2"><path d="M100 146V116" fill="none"/><path d="M100 124q-26-2-30-22 22 2 30 22zM100 124q26-2 30-22-22 2-30 22z" fill="#3aa655"/></g>
    <g class="st" data-n="3"><path d="M100 116V84" fill="none"/><path d="M100 96q-30 0-38-22 26 4 38 22zM100 96q30 0 38-22-26 4-38 22z" fill="#58c26b"/></g>
    <g class="st" data-n="4"><circle cx="100" cy="62" r="30" fill="#3aa655"/><circle cx="72" cy="78" r="20" fill="#58c26b"/><circle cx="128" cy="78" r="20" fill="#58c26b"/></g>
    <g class="st" data-n="5">${flower(100, 34, 8, '#ff8fb1')}${E(100, 66, 5)}${E(86, 66, 5)}</g>
  </g></svg>`;
  const boxes = $$('#pledgeList input');
  boxes.forEach(b => b.addEventListener('change', () => {
    const n = boxes.filter(x => x.checked).length;
    $$('.st').forEach(g => g.classList.toggle('on', +g.dataset.n <= n));
    $('#pledgeMsg').textContent = MSG[n];
    if (n === 5) { confettiIn($('.pledge')); }
  }));
  function confettiIn(host) {
    if (reduce) return;
    const col = ['#ffc13b', '#3aa655', '#ff8fb1', '#2aa6c9', '#e8453c'];
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('i');
      s.className = 'conf';
      s.style.cssText = `left:${Math.random() * 100}%;background:${col[i % 5]};animation-delay:${Math.random() * .5}s;--dx:${(Math.random() - .5) * 160}px`;
      host.appendChild(s); setTimeout(() => s.remove(), 2600);
    }
  }
})();
