(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =====================================================
     1. BẦU TRỜI ĐÊM NHÌN TỪ TRÁI ĐẤT (màn hình mở đầu)
     ===================================================== */
  const sky = $('#skyCanvas');
  const sctx = sky.getContext('2d');
  let SW = 0, SH = 0, skyStars = [], shoot = null, skyRunning = true;

  function sizeSky() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    SW = window.innerWidth; SH = window.innerHeight;
    sky.width = SW * dpr; sky.height = SH * dpr;
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    skyStars = [];
    const n = Math.round((SW * SH) / 3800);
    for (let i = 0; i < n; i++) {
      skyStars.push({ x: Math.random() * SW, y: Math.random() * SH * 0.8, r: Math.random() * 1.4 + 0.3, p: Math.random() * 6.28, s: 0.6 + Math.random() * 1.6 });
    }
  }

  // Chòm sao Gấu Lớn (hình cái gáo)
  const DIPPER = [[0, 0], [.05, -.01], [.1, .005], [.14, .035], [.21, .05], [.2, .1], [.135, .085]];

  function hillY(x, base, amp, f, ph) { return base + Math.sin(x * f + ph) * amp + Math.sin(x * f * 2.3 + ph * 2) * amp * 0.35; }

  function drawSky(t) {
    const g = sctx.createLinearGradient(0, 0, 0, SH);
    g.addColorStop(0, '#04041a'); g.addColorStop(0.6, '#15154f'); g.addColorStop(1, '#3b2a73');
    sctx.fillStyle = g; sctx.fillRect(0, 0, SW, SH);

    for (const s of skyStars) {
      const a = REDUCED ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(t * 0.001 * s.s + s.p));
      sctx.globalAlpha = a; sctx.fillStyle = '#fff';
      sctx.beginPath(); sctx.arc(s.x, s.y, s.r, 0, 6.283); sctx.fill();
    }
    sctx.globalAlpha = 1;

    // Gấu Lớn
    const sc = Math.min(SW, SH * 1.5) * 0.9, ox = SW * 0.08, oy = SH * 0.13;
    sctx.strokeStyle = 'rgba(255, 193, 59, .55)'; sctx.lineWidth = 2; sctx.setLineDash([2, 6]); sctx.lineCap = 'round';
    sctx.beginPath();
    DIPPER.forEach((p, i) => { const x = ox + p[0] * sc, y = oy + p[1] * sc; i ? sctx.lineTo(x, y) : sctx.moveTo(x, y); });
    sctx.lineTo(ox + DIPPER[3][0] * sc, oy + DIPPER[3][1] * sc);
    sctx.stroke(); sctx.setLineDash([]);
    sctx.fillStyle = '#ffd77a';
    for (const p of DIPPER) { sctx.beginPath(); sctx.arc(ox + p[0] * sc, oy + p[1] * sc, 3.2, 0, 6.283); sctx.fill(); }
    sctx.fillStyle = 'rgba(255, 215, 122, .85)'; sctx.font = '700 15px Nunito, sans-serif';
    sctx.fillText('Gấu Lớn', ox, oy + 0.15 * sc);

    // Mặt Trăng
    const mr = Math.min(SW, SH) * 0.075, mx = SW * 0.8, my = SH * 0.2;
    const glow = sctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 3.2);
    glow.addColorStop(0, 'rgba(255, 244, 218, .35)'); glow.addColorStop(1, 'rgba(255, 244, 218, 0)');
    sctx.fillStyle = glow; sctx.fillRect(mx - mr * 3.2, my - mr * 3.2, mr * 6.4, mr * 6.4);
    sctx.fillStyle = '#fff4da'; sctx.beginPath(); sctx.arc(mx, my, mr, 0, 6.283); sctx.fill();
    sctx.fillStyle = 'rgba(190, 175, 150, .55)';
    [[-.3, -.2, .22], [.25, .1, .3], [-.1, .4, .16], [.35, -.35, .12]].forEach((c) => {
      sctx.beginPath(); sctx.arc(mx + c[0] * mr, my + c[1] * mr, c[2] * mr, 0, 6.283); sctx.fill();
    });

    // Sao băng
    if (!REDUCED) {
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * SW * 0.7, y: Math.random() * SH * 0.25, life: 0 };
      if (shoot) {
        shoot.life += 1; shoot.x += 9; shoot.y += 4;
        const a = 1 - shoot.life / 45;
        const tg = sctx.createLinearGradient(shoot.x, shoot.y, shoot.x - 110, shoot.y - 48);
        tg.addColorStop(0, `rgba(255,255,255,${a})`); tg.addColorStop(1, 'rgba(255,255,255,0)');
        sctx.strokeStyle = tg; sctx.lineWidth = 3;
        sctx.beginPath(); sctx.moveTo(shoot.x, shoot.y); sctx.lineTo(shoot.x - 110, shoot.y - 48); sctx.stroke();
        if (shoot.life > 45) shoot = null;
      }
    }

    // Đồi núi và ngôi nhà
    const layers = [['#1d1a58', 0.82, 22, 0.006, 1], ['#0e0c33', 0.9, 26, 0.004, 4]];
    layers.forEach((L, li) => {
      sctx.fillStyle = L[0]; sctx.beginPath(); sctx.moveTo(0, SH);
      for (let x = 0; x <= SW; x += 8) sctx.lineTo(x, hillY(x, SH * L[1], L[2], L[3], L[4]));
      sctx.lineTo(SW, SH); sctx.fill();
      if (li === 1) {
        const hx = SW * 0.14, hy = hillY(hx, SH * L[1], L[2], L[3], L[4]) + 4, w = Math.max(44, SW * 0.035);
        sctx.fillStyle = '#05051a';
        sctx.fillRect(hx - w / 2, hy - w * 0.7, w, w * 0.7);
        sctx.beginPath(); sctx.moveTo(hx - w * 0.65, hy - w * 0.7); sctx.lineTo(hx, hy - w * 1.25); sctx.lineTo(hx + w * 0.65, hy - w * 0.7); sctx.fill();
        sctx.fillStyle = '#ffc13b'; sctx.fillRect(hx - w * 0.12, hy - w * 0.5, w * 0.24, w * 0.24);
      }
    });
  }

  function skyLoop(t) {
    if (!skyRunning) return;
    drawSky(t);
    requestAnimationFrame(skyLoop);
  }
  sizeSky();
  window.addEventListener('resize', () => { if (skyRunning) sizeSky(); });
  requestAnimationFrame(skyLoop);

  /* =====================================================
     2. TẠO TEXTURE HÀNH TINH BẰNG CODE
     ===================================================== */
  function hash(x, y, z) {
    let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(z, 1274126177);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  const sm = (t) => t * t * (3 - 2 * t);
  const lerp = (a, b, t) => a + (b - a) * t;
  function noise3(x, y, z) {
    const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
    const fx = sm(x - xi), fy = sm(y - yi), fz = sm(z - zi);
    const c = (a, b, d) => hash(xi + a, yi + b, zi + d);
    return lerp(
      lerp(lerp(c(0, 0, 0), c(1, 0, 0), fx), lerp(c(0, 1, 0), c(1, 1, 0), fx), fy),
      lerp(lerp(c(0, 0, 1), c(1, 0, 1), fx), lerp(c(0, 1, 1), c(1, 1, 1), fx), fy), fz);
  }
  function fbm(x, y, z, oct) {
    let a = 0.5, f = 1, s = 0, n = 0;
    for (let i = 0; i < oct; i++) { s += a * noise3(x * f, y * f, z * f); n += a; a *= 0.5; f *= 2; }
    return s / n;
  }
  const hexRgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  function palette(stops, t) {
    t = Math.max(0, Math.min(0.9999, t)) * (stops.length - 1);
    const i = Math.floor(t), f = t - i;
    const a = stops[i], b = stops[i + 1];
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f)];
  }
  const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
  const step = (a, b, x) => sm(Math.max(0, Math.min(1, (x - a) / (b - a))));

  function makeTexture(def, seedBase) {
    const W = 512, H = 256;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(W, H), d = img.data;
    const sc = def.scale || 2, seed = def.seed + (seedBase || 0);
    const stops = def.pal ? def.pal.map(hexRgb) : null;
    for (let py = 0; py < H; py++) {
      const v = py / H, lat = Math.abs(v - 0.5) * 2;
      for (let px = 0; px < W; px++) {
        const ang = (px / W) * 6.2832;
        const nx = Math.cos(ang) * sc + seed, ny = Math.sin(ang) * sc, nz = v * 3.1416 * sc;
        let col;
        if (def.type === 'earth') {
          const h = fbm(nx, ny, nz, 5);
          if (h < 0.5) {
            col = mix([10, 52, 140], [30, 128, 220], step(0.28, 0.5, h));
          } else {
            col = mix([58, 150, 72], [168, 146, 86], step(0.52, 0.68, fbm(nx * 2 + 7, ny * 2, nz * 2, 3)));
            if (h > 0.62) col = mix(col, [236, 240, 240], step(0.62, 0.72, h) * 0.6);
          }
          if (lat > 0.84) col = mix(col, [245, 250, 255], step(0.84, 0.9, lat));
          const cl = fbm(nx * 1.4 + 9, ny * 1.4, nz * 1.4 + 3, 4);
          col = mix(col, [255, 255, 255], step(0.52, 0.72, cl) * 0.85);
        } else if (def.type === 'gas') {
          const warp = fbm(nx * 0.5, ny * 0.5, nz * 1.4, 4);
          const amp = def.soft ? 0.7 : 2.6;
          let t = 0.5 + 0.5 * Math.sin(v * def.bands * 6.2832 + warp * amp * 3.0);
          t = t * 0.75 + fbm(nx * 1.2 + 4, ny * 1.2, nz * 5, 3) * 0.25;
          col = palette(stops, t);
        } else if (def.type === 'swirl') {
          const w1 = fbm(nx, ny, nz, 4);
          const t = fbm(nx + w1 * 2.2, ny + w1 * 2.2, nz * 1.2 + w1 * 2.2, 4);
          col = palette(stops, (t - 0.25) * 2);
        } else {
          let t = fbm(nx, ny, nz, 5);
          if (def.craters) t = t * 0.7 + noise3(nx * 6, ny * 6, nz * 6) * 0.3;
          col = palette(stops, (t - 0.2) * 1.8);
          if (def.cap && lat > 0.88) col = mix(col, [250, 250, 255], step(0.88, 0.94, lat));
        }
        const o = (py * W + px) * 4;
        d[o] = col[0]; d[o + 1] = col[1]; d[o + 2] = col[2]; d[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    if (def.spot) { // Vết đỏ lớn của Sao Mộc
      ctx.fillStyle = 'rgba(190, 70, 40, .85)';
      ctx.beginPath(); ctx.ellipse(W * 0.3, H * 0.62, 26, 13, 0, 0, 6.283); ctx.fill();
      ctx.strokeStyle = 'rgba(240, 200, 150, .6)'; ctx.lineWidth = 3; ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = 4;
    return tex;
  }

  function glowTexture(inner, outer) {
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const c = cv.getContext('2d'), g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, inner); g.addColorStop(0.35, outer); g.addColorStop(1, 'rgba(255,160,0,0)');
    c.fillStyle = g; c.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(cv);
  }

  function ringTexture() {
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 4;
    const c = cv.getContext('2d');
    for (let x = 0; x < 512; x++) {
      const t = x / 512, n = noise3(x * 0.09, 3, 5);
      let a = 0.15 + n * 0.7;
      if (t < 0.12 || (t > 0.55 && t < 0.6)) a *= 0.15; // khe trống
      if (t > 0.93) a *= 0.3;
      const l = 190 + n * 50;
      c.fillStyle = `rgba(${l + 25},${l},${l - 50},${a})`; c.fillRect(x, 0, 1, 4);
    }
    return new THREE.CanvasTexture(cv);
  }

  /* =====================================================
     3. CẢNH 3D
     ===================================================== */
  const canvas = $('#scene');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch (e) {
    $('#nowebgl').hidden = false;
    $('#startBtn').textContent = 'Không mở được 3D';
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.05, 3000);

  scene.add(new THREE.AmbientLight(0x6a78b8, 0.65));
  const sunLight = new THREE.PointLight(0xfff0d0, 1.7, 0, 0);
  scene.add(sunLight);

  // Sao nền
  (function () {
    const n = 2600, pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * 6.2832, r = Math.sqrt(1 - u * u), R = 1200;
      pos[i * 3] = Math.cos(a) * r * R; pos[i * 3 + 1] = u * R; pos[i * 3 + 2] = Math.sin(a) * r * R;
      const k = Math.random();
      const c = k < 0.15 ? [1, 0.85, 0.6] : k < 0.3 ? [0.7, 0.85, 1] : [1, 1, 1];
      col.set(c, i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 2.4, sizeAttenuation: false, vertexColors: true, fog: false })));
  })();

  const bodies = {};   // id -> { data, group, mesh, angle, omega, label }
  const pickables = [];
  const orbitLines = [];
  let moon = null;

  // Mặt Trời
  (function () {
    const grp = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(SUN.r, 48, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    grp.add(mesh);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,240,170,1)', 'rgba(255,170,40,.45)'), blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.scale.set(SUN.r * 5.2, SUN.r * 5.2, 1);
    grp.add(glow);
    scene.add(grp);
    mesh.userData.id = 'sun';
    pickables.push(mesh);
    bodies.sun = { data: SUN, group: grp, mesh, angle: 0, omega: 0, fixed: true };
  })();

  // Hành tinh
  PLANETS.forEach((p, i) => {
    const grp = new THREE.Group();
    const tilt = new THREE.Group();
    tilt.rotation.z = THREE.MathUtils.degToRad(p.tilt);
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(p.r, 48, 32),
      new THREE.MeshStandardMaterial({ roughness: 0.95, metalness: 0 })
    );
    mesh.userData.id = p.id;
    tilt.add(mesh);
    if (p.ring) {
      const inner = p.r * 1.4, outer = p.r * 2.4;
      const geo = new THREE.RingGeometry(inner, outer, 128);
      const pos = geo.attributes.position, uv = geo.attributes.uv;
      for (let k = 0; k < pos.count; k++) {
        const l = Math.hypot(pos.getX(k), pos.getY(k));
        uv.setXY(k, (l - inner) / (outer - inner), 0.5);
      }
      const ring = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: ringTexture(), transparent: true, side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = Math.PI / 2;
      tilt.add(ring);
      bodies._ring = ring;
    }
    grp.add(tilt);
    scene.add(grp);

    const orb = new THREE.Mesh(
      new THREE.RingGeometry(p.d - 0.04, p.d + 0.04, 192),
      new THREE.MeshBasicMaterial({ color: 0x8aa0ff, transparent: true, opacity: 0.28, side: THREE.DoubleSide })
    );
    orb.rotation.x = -Math.PI / 2;
    scene.add(orb);
    orbitLines.push(orb);

    pickables.push(mesh);
    bodies[p.id] = {
      data: p, group: grp, mesh,
      angle: p.id === 'earth' ? 0.9 : i * 1.7 + 0.3,
      omega: (6.2832 / 60) * Math.sqrt(365 / p.period)
    };
  });

  // Mặt Trăng
  (function () {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 24, 16),
      new THREE.MeshStandardMaterial({ color: 0xcfc8bd, roughness: 1 })
    );
    scene.add(mesh);
    moon = { mesh, angle: 0 };
  })();

  /* ---------- Gán texture (chạy dần để trang không đơ) ---------- */
  const texJobs = [SUN, ...PLANETS];
  function buildTextures(done) {
    let i = 0;
    (function next() {
      if (i >= texJobs.length) return done();
      const d = texJobs[i++];
      const tex = makeTexture(d.tex);
      const b = bodies[d.id];
      if (d.id === 'sun') b.mesh.material.map = tex; else b.mesh.material.map = tex;
      b.mesh.material.needsUpdate = true;
      setTimeout(next, 0);
    })();
  }
  buildTextures(() => {
    const btn = $('#startBtn');
    btn.disabled = false; btn.textContent = 'Bay vào vũ trụ';
    btn.focus({ preventScroll: true });
  });

  /* =====================================================
     4. CAMERA: xoay, zoom, bay theo hành tinh
     ===================================================== */
  const cam = {
    theta: 0, phi: 1.4, dist: 2.6,
    desDist: 2.6, desPhi: 1.4,
    target: new THREE.Vector3(), focus: null, minDist: 3, ease: 0.07
  };
  const OVERVIEW_DIST = 110, OVERVIEW_PHI = 1.0;

  function bodyPos(id) { return bodies[id].group.position; }

  function placeCamera() {
    const sp = Math.sin(cam.phi);
    camera.position.set(
      cam.target.x + cam.dist * sp * Math.cos(cam.theta),
      cam.target.y + cam.dist * Math.cos(cam.phi),
      cam.target.z + cam.dist * sp * Math.sin(cam.theta)
    );
    camera.lookAt(cam.target);
  }

  function setFocus(id, dist) {
    cam.focus = id;
    if (id) {
      const r = bodies[id].data.r;
      cam.minDist = r * 1.9;
      cam.desDist = dist || Math.max(r * 4.5, 4.5);
    } else {
      cam.minDist = 20;
      cam.desDist = dist || OVERVIEW_DIST;
    }
  }

  // Điều khiển bằng chuột / cảm ứng
  const pointers = new Map();
  let downPos = null, pinch0 = 0, moved = 0;
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    downPos = { x: e.clientX, y: e.clientY }; moved = 0;
    if (pointers.size === 2) pinch0 = pinchDist();
    hideHint();
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    if (pointers.size === 1) {
      cam.theta -= dx * 0.006;
      cam.phi = Math.max(0.12, Math.min(3.02, cam.phi - dy * 0.006));
      cam.desPhi = cam.phi;
    } else if (pointers.size === 2) {
      const nd = pinchDist();
      if (pinch0 > 0) zoomBy(pinch0 / nd);
      pinch0 = nd;
    }
  });
  function endPointer(e) {
    const wasSingle = pointers.size === 1;
    pointers.delete(e.pointerId);
    if (e.type === 'pointerup' && wasSingle && moved < 6) pick(e.clientX, e.clientY);
  }
  canvas.addEventListener('pointerup', endPointer);
  canvas.addEventListener('pointercancel', endPointer);
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); zoomBy(Math.exp(e.deltaY * 0.0012)); hideHint(); }, { passive: false });
  function pinchDist() {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  }
  function zoomBy(f) { cam.desDist = Math.max(cam.minDist, Math.min(260, cam.desDist * f)); }

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  function pick(cx, cy) {
    ndc.set((cx / window.innerWidth) * 2 - 1, -(cy / window.innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickables, false)[0];
    if (hit) selectBody(hit.object.userData.id);
  }

  /* =====================================================
     5. GIAO DIỆN: dock, nhãn, thẻ thông tin
     ===================================================== */
  const ALL = [SUN, ...PLANETS];
  const dock = $('#dock'), labelsEl = $('#labels'), panel = $('#panel');

  function gradFor(d) {
    return `radial-gradient(circle at 32% 30%, #ffffffaa, ${d.color} 45%, #00000066 130%), ${d.color}`;
  }

  ALL.forEach((d) => {
    const b = document.createElement('button');
    b.className = 'dock-item'; b.dataset.id = d.id;
    b.innerHTML = `<span class="dot" style="background:${gradFor(d)}"></span><span>${d.vi}</span>`;
    b.addEventListener('click', () => selectBody(d.id));
    dock.appendChild(b);

    const l = document.createElement('button');
    l.className = 'label'; l.textContent = d.vi; l.dataset.id = d.id;
    l.addEventListener('click', () => selectBody(d.id));
    labelsEl.appendChild(l);
    bodies[d.id].label = l;
  });

  function markDock(id) {
    dock.querySelectorAll('.dock-item').forEach((b) => {
      if (b.dataset.id === id) { b.setAttribute('aria-current', 'true'); b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); }
      else b.removeAttribute('aria-current');
    });
  }

  let stars = 0;
  const won = new Set();
  try { const s = JSON.parse(localStorage.getItem('solar-stars') || '[]'); s.forEach((x) => won.add(x)); stars = won.size; } catch (e) { /* bỏ qua */ }
  const starEl = $('#starCount'); starEl.textContent = stars;

  function ball(d, px) {
    return `<div class="ball" style="width:${px}px;height:${px}px;background:${gradFor(d)}"></div>`;
  }

  function selectBody(id) {
    const d = bodies[id].data;
    setFocus(id);
    markDock(id);
    stopSpeech();
    hideHint();

    const earth = PLANETS.find((p) => p.id === 'earth');
    let versus = '';
    if (id !== 'earth' && id !== 'sun') {
      const m = Math.max(d.size, 1), k = 96 / m;
      versus = `<h3>So với Trái Đất</h3><div class="versus">
        <figure>${ball(earth, Math.max(10, Math.round(k)))}Trái Đất</figure>
        <figure>${ball(d, Math.max(10, Math.round(d.size * k)))}${d.vi}</figure></div>`;
    }
    const q = d.quiz;
    panel.hidden = false;
    panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = '';
    panel.innerHTML = `
      <button class="btn sm p-close" id="pClose">Đóng</button>
      <h2>${d.vi}</h2><p class="en">${d.en}</p>
      <p class="lead">${d.lead}</p>
      <button class="btn sm speak" id="pSpeak">Nghe đọc</button>
      <dl class="stats">
        <div><dt>Cách Mặt Trời</dt><dd>${d.dist}</dd></div>
        <div><dt>Một năm dài</dt><dd>${d.year}</dd></div>
        <div><dt>Một ngày dài</dt><dd>${d.day}</dd></div>
        <div><dt>Nhiệt độ</dt><dd>${d.temp}</dd></div>
        <div><dt>Vệ tinh</dt><dd>${d.moons}</dd></div>
        <div><dt>Kích thước</dt><dd>${d.sizeText}</dd></div>
      </dl>
      ${versus}
      <h3>Bạn có biết?</h3>
      <ul class="facts">${d.facts.map((f) => `<li>${f}</li>`).join('')}</ul>
      <div class="quiz">
        <h3>Đố bạn: ${q.q}</h3>
        <div class="opts">${q.opts.map((o, i) => `<button class="btn opt" data-i="${i}">${o}</button>`).join('')}</div>
        <p class="msg" id="qMsg">${won.has(id) ? 'Bạn đã nhận sao ở đây rồi.' : ''}</p>
      </div>`;
    $('#pClose').addEventListener('click', closePanel);
    $('#pSpeak').addEventListener('click', () => speak(d));
    panel.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => answer(d, b)));
    panel.scrollTop = 0;
  }

  function closePanel() { panel.hidden = true; stopSpeech(); markDock(null); }

  function answer(d, btn) {
    const ok = +btn.dataset.i === d.quiz.a, msg = $('#qMsg');
    if (ok) {
      btn.classList.add('right');
      panel.querySelectorAll('.opt').forEach((b) => { b.disabled = true; });
      if (!won.has(d.id)) {
        won.add(d.id); stars = won.size; starEl.textContent = stars;
        try { localStorage.setItem('solar-stars', JSON.stringify([...won])); } catch (e) { /* bỏ qua */ }
        msg.textContent = 'Đúng rồi! Bạn nhận được 1 sao.';
      } else msg.textContent = 'Đúng rồi!';
    } else {
      btn.classList.add('wrong');
      msg.textContent = 'Chưa đúng. Thử lại nhé!';
    }
  }

  // Giọng đọc
  function speak(d) {
    if (!('speechSynthesis' in window)) return;
    stopSpeech();
    const u = new SpeechSynthesisUtterance(`${d.vi}. ${d.lead} ${d.facts.join(' ')}`);
    u.lang = 'vi-VN'; u.rate = 0.9;
    speechSynthesis.speak(u);
  }
  function stopSpeech() { if ('speechSynthesis' in window) speechSynthesis.cancel(); }

  // Nút công cụ
  const goOverview = () => { closePanel(); setFocus(null); cam.desPhi = OVERVIEW_PHI; };
  $('#overviewBtn').addEventListener('click', goOverview);
  $('#homeBtn').addEventListener('click', () => selectBody('earth'));

  let showOrbits = true;
  $('#orbitBtn').addEventListener('click', (e) => {
    showOrbits = !showOrbits;
    e.currentTarget.setAttribute('aria-pressed', showOrbits);
    orbitLines.forEach((o) => { o.visible = showOrbits; });
  });

  let speedMul = 1;
  document.querySelectorAll('[data-speed]').forEach((b) => b.addEventListener('click', () => {
    speedMul = +b.dataset.speed;
    document.querySelectorAll('[data-speed]').forEach((x) => x.setAttribute('aria-pressed', x === b));
  }));

  // So sánh kích thước
  const cmp = $('#compare');
  $('#compareRow').innerHTML = [...PLANETS].sort((a, b) => a.size - b.size).map((p) =>
    `<figure>${ball(p, Math.max(8, Math.round(p.size * 14)))}${p.vi}<small>${p.sizeText}</small></figure>`).join('');
  $('#compareBtn').addEventListener('click', () => { cmp.hidden = false; $('#compareClose').focus(); });
  $('#compareClose').addEventListener('click', () => { cmp.hidden = true; });
  cmp.addEventListener('click', (e) => { if (e.target === cmp) cmp.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { cmp.hidden = true; } });

  // Nhạc nền nhẹ nhàng (tạo bằng WebAudio, bật khi bé bấm)
  let audio = null;
  function toggleMusic(on) {
    if (on && !audio) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ctx = new AC(), master = ctx.createGain();
      master.gain.value = 0; master.connect(ctx.destination);
      [130.8, 196, 261.6, 329.6, 392].forEach((f, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
        o.type = 'sine'; o.frequency.value = f;
        g.gain.value = 0.05;
        lfo.frequency.value = 0.07 + i * 0.03; lg.gain.value = 0.03;
        lfo.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(master); o.start(); lfo.start();
      });
      audio = { ctx, master };
    }
    if (!audio) return;
    audio.ctx.resume();
    audio.master.gain.linearRampToValueAtTime(on ? 0.7 : 0, audio.ctx.currentTime + 1);
  }
  $('#musicBtn').addEventListener('click', (e) => {
    const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
    e.currentTarget.setAttribute('aria-pressed', on);
    toggleMusic(on);
  });

  const hint = $('#hint');
  function hideHint() { hint.classList.add('gone'); }

  /* =====================================================
     6. VÒNG LẶP
     ===================================================== */
  const v3 = new THREE.Vector3();
  let last = performance.now(), flying = false;

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  function updateOrbits(dt) {
    PLANETS.forEach((p) => {
      const b = bodies[p.id];
      b.angle += b.omega * dt * speedMul;
      b.group.position.set(Math.cos(b.angle) * p.d, 0, Math.sin(b.angle) * p.d);
      b.mesh.rotation.y += p.spin * dt * Math.max(speedMul, 0.5);
    });
    bodies.sun.mesh.rotation.y += 0.05 * dt;
    moon.angle += 0.9 * dt * speedMul;
    moon.mesh.position.set(
      bodies.earth.group.position.x + Math.cos(moon.angle) * 2.3,
      0.12 * Math.sin(moon.angle),
      bodies.earth.group.position.z + Math.sin(moon.angle) * 2.3
    );
  }

  function updateLabels() {
    const w = window.innerWidth, h = window.innerHeight;
    for (const id in bodies) {
      const b = bodies[id];
      if (!b.label) continue;
      v3.copy(b.group.position); v3.y += b.data.r * 1.25;
      const dc = camera.position.distanceTo(b.group.position);
      v3.project(camera);
      const hide = flying || id === cam.focus || v3.z > 1 || dc < b.data.r * 3 || dc > 260;
      b.label.style.visibility = hide ? 'hidden' : 'visible';
      if (!hide) {
        const x = (v3.x * 0.5 + 0.5) * w, y = (-v3.y * 0.5 + 0.5) * h;
        b.label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      }
    }
  }

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    updateOrbits(dt);

    if (cam.focus) cam.target.lerp(bodyPos(cam.focus), 0.12);
    else cam.target.lerp(v3.set(0, 0, 0), 0.08);
    cam.dist += (cam.desDist - cam.dist) * cam.ease;
    cam.phi += (cam.desPhi - cam.phi) * Math.min(1, cam.ease * 1.2);
    placeCamera();
    updateLabels();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  /* =====================================================
     7. BẮT ĐẦU: bay từ Trái Đất ra vũ trụ
     ===================================================== */
  $('#startBtn').addEventListener('click', () => {
    const earthP = bodies.earth.group.position;
    updateOrbits(0);
    // Đặt camera sát Trái Đất, nhìn về phía mặt có nắng
    cam.focus = 'earth'; cam.target.copy(earthP);
    cam.theta = Math.atan2(-earthP.z, -earthP.x) + 0.7;
    cam.phi = 1.35; cam.desPhi = 1.35;
    cam.dist = 2.4; cam.desDist = 2.4; cam.ease = 0.07;
    flying = true;

    $('#space').hidden = false;
    requestAnimationFrame(() => $('#space').classList.add('on'));
    $('#intro').classList.add('leaving');
    setTimeout(() => { skyRunning = false; $('#intro').hidden = true; }, 1000);

    last = performance.now();
    requestAnimationFrame(frame);

    // Giữ một chút để bé ngắm Trái Đất, rồi lùi ra xa
    setTimeout(() => {
      cam.ease = REDUCED ? 0.2 : 0.018;
      cam.focus = null; cam.minDist = 20;
      cam.desDist = OVERVIEW_DIST; cam.desPhi = OVERVIEW_PHI;
      setTimeout(() => { cam.ease = 0.07; flying = false; }, REDUCED ? 800 : 5200);
    }, REDUCED ? 100 : 1800);
  });

  // Phím tắt cho người dùng bàn phím
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || $('#space').hidden) return;
    if (e.key === '+' || e.key === '=') zoomBy(0.8);
    if (e.key === '-') zoomBy(1.25);
  });
})();
