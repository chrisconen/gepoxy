/* G-Epoxy — site.js (no dependencies) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header + mobile nav ---------- */
  const hdr = $('[data-hdr]');
  const onScroll = () => hdr && hdr.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const burger = $('.burger'), nav = $('#nav');
  const setNav = (open) => {
    burger.setAttribute('aria-expanded', open);
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  };
  burger?.addEventListener('click', () => setNav(burger.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', (e) => e.target.closest('a') && setNav(false));
  addEventListener('keydown', (e) => e.key === 'Escape' && nav?.classList.contains('open') && setNav(false));

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  $$('[data-reveal], [data-map], .proc li').forEach((el) => io.observe(el));

  /* ---------- gloss highlight follows pointer ---------- */
  addEventListener('pointermove', (e) => {
    const g = e.target.closest && e.target.closest('.gloss');
    if (!g) return;
    const r = g.getBoundingClientRect();
    g.style.setProperty('--mx', `${e.clientX - r.left}px`);
    g.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- floor-system configurator ---------- */
  $$('[data-cfg]').forEach((cfg) => {
    const tabs = $$('[role=tab]', cfg), panels = $$('[role=tabpanel]', cfg);
    const show = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', i === j); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      const st = $('.stack', panels[i]);
      st.classList.remove('exploded');
      requestAnimationFrame(() => requestAnimationFrame(() => st.classList.add('exploded')));
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(i));
      t.addEventListener('keydown', (e) => {
        const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (k) { e.preventDefault(); show((i + k + tabs.length) % tabs.length, true); }
      });
    });
    panels.forEach((p) => {
      const slabs = $$('.slab', p);
      $$('.layers li', p).forEach((li) => {
        const s = slabs[+li.dataset.i];
        li.addEventListener('pointerenter', () => s.classList.add('hl'));
        li.addEventListener('pointerleave', () => s.classList.remove('hl'));
      });
    });
    new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting) return;
      $$('.stack', cfg).forEach((s) => s.classList.add('exploded'));
      o.disconnect();
    }, { threshold: 0.25 }).observe(cfg);
  });

  /* ---------- project anatomy (sticky image follows steps) ---------- */
  $$('[data-anat]').forEach((a) => {
    const imgs = $$('.anat-media img', a), steps = $$('.anat-steps li', a);
    const bar = $('.anat-prog span', a), cnt = $('.anat-count b', a);
    const set = (i) => {
      imgs.forEach((im, j) => im.classList.toggle('on', i === j));
      steps.forEach((s, j) => s.classList.toggle('on', i === j));
      bar.style.width = `${((i + 1) / steps.length) * 100}%`;
      cnt.textContent = String(i + 1).padStart(2, '0');
    };
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && set(+e.target.dataset.step)), { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => o.observe(s));
    set(0);
  });

  /* ---------- before / after ---------- */
  $$('[data-ba]').forEach((f) => {
    const r = $('input', f);
    const u = () => f.style.setProperty('--p', `${r.value}%`);
    r.addEventListener('input', () => { f.style.animation = 'none'; u(); });
    u();
  });

  /* ---------- service-area map ---------- */
  $$('[data-map]').forEach((m) => {
    const tip = $('.smap-tip', m);
    const set = (i, on) => {
      $$(`[data-town="${i}"]`, m).forEach((el) => el.classList.toggle('on', on));
      if (on) tip.textContent = `${$(`g.tw[data-town="${i}"]`, m).getAttribute('aria-label')} · Bágyogszovátról`;
      tip.classList.toggle('show', on);
    };
    const hit = (e) => e.target.closest && e.target.closest('[data-town]');
    m.addEventListener('pointerover', (e) => { const t = hit(e); t && set(t.dataset.town, true); });
    m.addEventListener('pointerout', (e) => { const t = hit(e); t && set(t.dataset.town, false); });
    m.addEventListener('focusin', (e) => { const t = hit(e); t && set(t.dataset.town, true); });
    m.addEventListener('focusout', (e) => { const t = hit(e); t && set(t.dataset.town, false); });
    $$('[data-focus-btn]', m).forEach((b, _, all) => b.addEventListener('click', () => {
      m.dataset.focus = b.dataset.focusBtn;
      all.forEach((x) => x.setAttribute('aria-pressed', x === b));
    }));
  });

  /* ---------- reference filter + lightbox ---------- */
  $$('[data-filters]').forEach((fl) => {
    const g = fl.nextElementSibling;
    fl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const apply = () => {
        $$('button', fl).forEach((x) => x.setAttribute('aria-pressed', x === b));
        $$('.ref', g).forEach((r) => r.classList.toggle('hide', b.dataset.f !== 'all' && !r.dataset.cat.split(' ').includes(b.dataset.f)));
      };
      document.startViewTransition && !RM ? document.startViewTransition(apply) : apply();
    });
  });
  const lb = $('[data-lb]');
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.ref-btn');
    if (!b || !lb) return;
    const im = $('img', lb);
    im.src = b.dataset.full; im.alt = b.dataset.cap;
    $('p', lb).textContent = b.dataset.cap;
    lb.showModal();
  });
  lb?.addEventListener('click', (e) => e.target === lb && lb.close());

  /* ---------- quote form ---------- */
  const form = $('[data-form]');
  if (form) {
    const sys = new URLSearchParams(location.search).get('rendszer');
    if (sys && form.elements.rendszer.querySelector(`option[value="${CSS.escape(sys)}"]`)) form.elements.rendszer.value = sys;
    const msg = $('.f-msg', form), btn = $('button[type=submit]', form);
    if (new URLSearchParams(location.search).has('ok')) { msg.classList.add('ok'); msg.textContent = 'Köszönjük! Hamarosan jelentkezünk.'; }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      btn.disabled = true; msg.className = 'f-msg'; msg.textContent = 'Küldés…';
      try {
        // Web3Forms answers {success: true|false, message}
        const r = await fetch(form.action, { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(form))), headers: { 'Content-Type': 'application/json', Accept: 'application/json' } });
        const j = await r.json();
        if (!r.ok || String(j.success) !== 'true') throw new Error('Az üzenet küldése nem sikerült.');
        form.reset();
        msg.classList.add('ok');
        msg.textContent = 'Köszönjük! Hamarosan jelentkezünk.';
      } catch (err) {
        msg.classList.add('err');
        msg.textContent = `${err instanceof SyntaxError || err.name === 'TypeError' ? 'Az üzenet küldése nem sikerült.' : err.message} Kérjük, hívjon: +36 20 407 8064`;
      } finally { btn.disabled = false; }
    });
  }

  /* ---------- hero: wet epoxy floor (WebGL) ---------- */
  const hero = $('[data-hero]');
  // wait for fonts + the title's intro animation, so the reflection texture matches the settled text
  if (hero) (document.fonts ? document.fonts.ready : Promise.resolve())
    .then(() => Promise.all(($('[data-hero-title]', hero).getAnimations?.({ subtree: true }) || []).map((a) => a.finished.catch(() => {}))))
    .then(() => initHero(hero));

  function initHero(hero) {
    const cv = $('.hero-gl', hero), title = $('[data-hero-title]', hero);
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const VS = 'attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    const FS = `precision highp float;
varying vec2 vUv;
uniform vec2 uRes; uniform float uTime, uHor, uFill; uniform sampler2D uText; uniform vec4 uDrops[12];
const float F = .7;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.07; a*=.5; } return v; }
float height(vec2 P){
  float h = .01*sin(P.x*1.7+uTime*.7)*sin(P.y*1.1-uTime*.5);
  for(int i=0;i<12;i++){
    vec4 d = uDrops[i]; float age = uTime-d.z;
    if(d.w <= 0. || age < 0. || age > 5.) continue;
    float r = length(P-d.xy); float x = r-age*1.35;
    h += d.w*.05*exp(-x*x*7.)*exp(-age*1.05)*sin(x*15.)/(1.+r*1.6);
  }
  return h;
}
vec3 sky(vec2 uv, float txt, float li){
  float asp = uRes.x/uRes.y;
  vec2 c = (uv-vec2(.5,uHor))*vec2(asp*.9,3.2);
  vec3 col = vec3(.028,.028,.032) + vec3(1.,.5,.12)*.17*exp(-dot(c,c)*2.5);
  float dy = uv.y-uHor;
  if(dy > .002){
    float z = F*2.4/dy, X = (uv.x-.5)*asp*z/F;
    float w = max(.05, z/F/uRes.y*2.2), L = 0.;
    for(int k=0;k<4;k++){ L += smoothstep(w,0.,abs(X-(float(k)-1.5)*2.8))*(.05/w); }
    col += vec3(1.,.93,.82)*L*step(fract(z*.17),.8)*smoothstep(55.,7.,z)*li;
  }
  vec4 t = texture2D(uText, uv);
  return mix(col, t.rgb, t.a*txt);
}
void main(){
  vec2 uv = vUv; float asp = uRes.x/uRes.y; float dy = uHor-uv.y;
  if(dy <= 0.){ gl_FragColor = vec4(sky(uv,0.,.045),1.); return; }
  float z = F/dy, X = (uv.x-.5)*asp*z/F; vec2 P = vec2(X,z);
  float e = .02+z*.004;
  float hx = (height(P+vec2(e,0.))-height(P-vec2(e,0.)))/(2.*e);
  float hz = (height(P+vec2(0.,e))-height(P-vec2(0.,e)))/(2.*e);
  vec3 n = normalize(vec3(-hx,1.,-hz));
  float fill = 1.-pow(1.-uFill,3.);
  float front = mix(70.,.5,fill)+(fbm(vec2(X*.8,uTime*.15))-.5)*1.4;
  float wet = smoothstep(front-.3,front+.3,z);
  float edge = exp(-pow((z-front)*3.,2.))*(1.-step(.999,fill));
  vec3 dry = vec3(.2,.2,.21)*(.5+.55*(fbm(P*4.)*.6+fbm(P*19.)*.4))*smoothstep(40.,2.,z);
  vec2 ruv = vec2(uv.x, uHor+dy) + vec2(n.x,n.z)*vec2(.2,.32)/z;
  float bl = .002+dy*.018;
  vec3 refl = sky(ruv,.62,.3)*.5 + sky(ruv+vec2(0.,bl),.62,.3)*.3 + sky(ruv+vec2(0.,bl*2.4),.62,.3)*.2;
  float fres = .2+.8*pow(1.-clamp(dy/uHor,0.,1.),4.);
  vec3 resin = vec3(.045,.047,.052)+vec3(.012)*fbm(P*30.);
  float Xl = X+n.x*.04, lw = max(.045, z/F/uRes.y*2.2);
  float lane = smoothstep(lw,0.,abs(abs(Xl)-1.75)-.022)*(.045/lw);
  lane += smoothstep(lw,0.,abs(Xl)-.015)*step(fract(z*.32),.5)*(.03/lw)*.5;
  resin += vec3(1.,.52,.1)*clamp(lane,0.,1.)*.55*smoothstep(30.,4.,z)*smoothstep(1.6,4.5,z);
  vec3 spec = vec3(1.,.78,.5)*clamp(-hz*1.6,0.,1.)*.35;
  vec3 col = mix(dry, resin+refl*fres+spec, wet) + vec3(1.,.7,.35)*edge*.55;
  col = mix(col, vec3(.03,.029,.03), smoothstep(14.,70.,z));
  gl_FragColor = vec4(col,1.);
}`;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : (console.warn(gl.getShaderInfoLog(s)), null); };
    const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {}; ['uRes', 'uTime', 'uHor', 'uFill', 'uText', 'uDrops'].forEach((k) => { U[k] = gl.getUniformLocation(prog, k); });

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]].forEach(([k, v]) => gl.texParameteri(gl.TEXTURE_2D, k, v));
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.uniform1i(U.uText, 0);
    const tc = document.createElement('canvas'), tx = tc.getContext('2d');

    let hor = 0.4, aspect = 1;
    const F = 0.7;
    const stretchKw = (s) => { const v = parseFloat(s) || 100; return v >= 124 ? 'expanded' : v >= 112 ? 'semi-expanded' : 'normal'; };
    function layout() {
      const r = hero.getBoundingClientRect();
      let dpr = Math.min(devicePixelRatio || 1, 1.6);
      // ponytail: pixel budget cap keeps integrated GPUs smooth; raise if the hero must be sharper on 4K
      if (r.width * r.height * dpr * dpr > 1.9e6) dpr = Math.sqrt(1.9e6 / (r.width * r.height));
      const W = Math.max(1, Math.round(r.width * dpr)), H = Math.max(1, Math.round(r.height * dpr));
      cv.width = tc.width = W; cv.height = tc.height = H; aspect = r.width / r.height;
      gl.viewport(0, 0, W, H);
      const cs = getComputedStyle(title), fsz = parseFloat(cs.fontSize) * dpr;
      tx.clearRect(0, 0, W, H);
      tx.font = `${cs.fontWeight} ${fsz}px ${cs.fontFamily}`;
      if ('fontStretch' in tx) tx.fontStretch = stretchKw(cs.fontStretch);
      if ('letterSpacing' in tx) tx.letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * dpr}px`;
      tx.fillStyle = cs.color; tx.textBaseline = 'alphabetic';
      const m = tx.measureText('M'), desc = m.fontBoundingBoxDescent || fsz * 0.24;
      // only the line standing on the floor is mirrored (on mobile the title wraps to two lines)
      const words = $$('.w', title).map((w) => { const b = w.getBoundingClientRect(); return [w, (b.left - r.left) * dpr, (b.bottom - r.top) * dpr - desc]; });
      const base = Math.max(...words.map((w) => w[2]));
      words.forEach(([w, x, y]) => y > base - fsz * 0.3 && tx.fillText(w.textContent.toUpperCase(), x, y));
      hor = 1 - base / H;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc);
      gl.uniform2f(U.uRes, W, H);
      gl.uniform1f(U.uHor, hor);
    }

    const drops = new Float32Array(48);
    let di = 0, lastDrop = 0, last = [0, 0];
    const t0 = performance.now(), now = () => (performance.now() - t0) / 1000;
    const addDrop = (x, z, a) => { drops.set([x, z, now(), a], di * 4); di = (di + 1) % 12; lastDrop = now(); };
    const toFloor = (cx, cy) => {
      const r = cv.getBoundingClientRect();
      const u = (cx - r.left) / r.width, v = 1 - (cy - r.top) / r.height, dy = hor - v;
      if (dy < 0.01) return null;
      const z = F / dy;
      return [(u - 0.5) * aspect * z / F, z];
    };
    const touched = () => hero.classList.add('touched');
    hero.addEventListener('pointermove', (e) => {
      const p = toFloor(e.clientX, e.clientY);
      if (!p || now() - lastDrop < 0.07 || Math.hypot(p[0] - last[0], p[1] - last[1]) < 0.15) return;
      last = p; addDrop(p[0], p[1], e.pointerType === 'touch' ? 0.9 : 0.6); touched();
    }, { passive: true });
    hero.addEventListener('pointerdown', (e) => { const p = toFloor(e.clientX, e.clientY); if (p) { addDrop(p[0], p[1], 1.5); touched(); } });

    function draw(t, fill) {
      if (!RM && t - lastDrop > 2.4 + Math.random() * 2) addDrop((Math.random() - 0.5) * 3.2, 2.2 + Math.random() * 5, 0.9);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uFill, fill);
      gl.uniform4fv(U.uDrops, drops);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      hero.classList.add('gl-on'); // hide the CSS fallback floor only once a real frame exists
    }
    let raf = 0, vis = true;
    const frame = () => {
      raf = 0;
      if (!vis || document.hidden) return;
      const t = now();
      draw(t, Math.min(1, Math.max(0, (t - 0.15) / 2.6)));
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (RM) draw(4, 1); else if (!raf) raf = requestAnimationFrame(frame); };
    layout();
    start();
    let rz = 0;
    new ResizeObserver(() => { cancelAnimationFrame(rz); rz = requestAnimationFrame(() => { layout(); if (RM) draw(4, 1); }); }).observe(hero);
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis) start(); }).observe(hero);
    document.addEventListener('visibilitychange', start);
  }
})();
