// G-Epoxy static site build. Node >= 18, zero dependencies.
// Usage: node build.mjs   ->  writes ./public/*.html, sitemap.xml, robots.txt
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'public');
const IMG = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest-img.json'), 'utf8'));

export const SITE = {
  name: 'G-Epoxy',
  url: 'https://gepoxy.hu',
  phone: '+36 20 407 8064',
  tel: '+36204078064',
  email: 'info@gepoxy.hu',
  facebook: 'https://www.facebook.com/mugyantapadlogyor/',
  street: 'Szabadság út 62',
  city: 'Bágyogszovát',
  zip: '9145',
  hq: [47.594, 17.358],
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- small helpers ----------
const ICON = {
  arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  mail: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3zm0 0 9 8 9-8" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  pin: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-7.2 7-13a7 7 0 0 0-14 0c0 5.8 7 13 7 13Zm0-10a3 3 0 1 0 0-6 3 3 0 0 0 0 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  fb: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h-2.5A4.5 4.5 0 0 0 9 7.5V10H6v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  check: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>',
};
const MARK = '<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 37 11.5 20 20 3 11.5Z" fill="var(--amber)"/><path d="M3 18.5 20 27l17-8.5" fill="none" stroke="currentColor" stroke-width="3.2"/><path d="M3 25.5 20 34l17-8.5" fill="none" stroke="currentColor" stroke-width="3.2" opacity=".45"/></svg>';

function img(name, alt, { cls = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false } = {}) {
  const dim = IMG[name];
  if (!dim) throw new Error(`missing image: ${name}`);
  const [w, h] = dim;
  const s = Math.min(1, 800 / Math.max(w, h));
  return `<img class="${cls}" src="assets/img/${name}-800.webp" srcset="assets/img/${name}-800.webp ${Math.round(w * s)}w, assets/img/${name}.webp ${w}w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
const chips = (arr) => `<ul class="chips">${arr.map((c) => `<li>${c}</li>`).join('')}</ul>`;
const marking = () => '<div class="marking" aria-hidden="true" data-reveal><span></span></div>';
const head = (eyebrow, title, lead = '', cls = '') =>
  `<header class="sec-head ${cls}" data-reveal><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</header>`;

// ---------- geography (service-area map) ----------
const R_EARTH = 6371;
export function km([a, b], [c, d]) {
  const r = Math.PI / 180, dl = (c - a) * r, dn = (d - b) * r;
  const x = Math.sin(dl / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dn / 2) ** 2;
  return 2 * R_EARTH * Math.asin(Math.sqrt(x));
}
assert(Math.abs(km([47.687, 17.65], [47.4979, 19.0402]) - 106) < 6, 'haversine Győr–Budapest ≈ 106 km');

const LON0 = 16.45, LAT1 = 48.35, K = 400, COS = Math.cos((47.5 * Math.PI) / 180);
const MW = Math.round(2.5 * COS * K), MH = Math.round(1.75 * K);
const P = ([lat, lon]) => [+((lon - LON0) * COS * K).toFixed(1), +((LAT1 - lat) * K).toFixed(1)];
const poly = (pts, close) => 'M' + pts.map((p) => P(p).join(' ')).join('L') + (close ? 'Z' : '');

export const TOWNS = [
  ['Győr', 47.687, 17.65, 'gyor', 1], ['Mosonmagyaróvár', 47.868, 17.269, 'gyor', 1], ['Csorna', 47.611, 17.25, 'gyor'],
  ['Kapuvár', 47.592, 17.031, 'gyor'], ['Sopron', 47.685, 16.59, 'gyor', 1], ['Pápa', 47.33, 17.467, 'gyor', 1],
  ['Pannonhalma', 47.549, 17.755, 'gyor'], ['Kisbér', 47.5, 18.03, 'gyor'], ['Tata', 47.652, 18.318, 'gyor'],
  ['Tatabánya', 47.586, 18.394, 'gyor', 1], ['Komárom · Komárno', 47.752, 18.124, 'gyor felvidek', 1],
  ['Dunaszerdahely · Dunajská Streda', 47.993, 17.619, 'felvidek', 1], ['Somorja · Šamorín', 48.03, 17.311, 'felvidek', 1],
  ['Nagymegyer · Veľký Meder', 47.857, 17.77, 'felvidek'], ['Gúta · Kolárovo', 47.917, 17.998, 'felvidek'],
  ['Ógyalla · Hurbanovo', 47.876, 18.197, 'felvidek'], ['Érsekújvár · Nové Zámky', 47.986, 18.162, 'felvidek', 1],
  ['Vágsellye · Šaľa', 48.151, 17.877, 'felvidek'], ['Galánta · Galanta', 48.19, 17.727, 'felvidek', 1],
  ['Szenc · Senec', 48.22, 17.4, 'felvidek'], ['Párkány · Štúrovo', 47.799, 18.717, 'felvidek', 1],
  ['Veszprém', 47.093, 17.911, 'balaton', 1], ['Balatonalmádi', 47.035, 18.013, 'balaton'], ['Balatonfüred', 46.961, 17.871, 'balaton', 1],
  ['Tihany', 46.913, 17.889, 'balaton'], ['Siófok', 46.904, 18.058, 'balaton', 1], ['Zamárdi', 46.886, 17.954, 'balaton'],
  ['Balatonlelle', 46.783, 17.687, 'balaton'], ['Balatonboglár', 46.776, 17.651, 'balaton'], ['Fonyód', 46.743, 17.556, 'balaton'],
  ['Badacsonytomaj', 46.807, 17.507, 'balaton'], ['Tapolca', 46.882, 17.441, 'balaton'], ['Keszthely', 46.769, 17.243, 'balaton', 1],
  ['Hévíz', 46.79, 17.184, 'balaton'],
].map(([n, lat, lon, r, major], i) => ({ i, n, ll: [lat, lon], r, major: !!major, d: Math.round(km(SITE.hq, [lat, lon])) }));

const REGIONS = {
  gyor: { name: 'Győr és környéke', href: 'mugyanta-padlo-gyor.html' },
  felvidek: { name: 'Felvidék', href: 'mugyanta-padlo-felvidek.html' },
  balaton: { name: 'Balaton', href: 'mugyanta-padlo-balaton.html' },
};

const DANUBE = [[48.14, 17.1], [48.1, 17.16], [48.03, 17.24], [47.98, 17.31], [47.93, 17.37], [47.88, 17.44], [47.84, 17.52], [47.8, 17.62], [47.76, 17.72], [47.735, 17.82], [47.745, 17.93], [47.76, 18.03], [47.755, 18.12], [47.74, 18.22], [47.73, 18.33], [47.75, 18.45], [47.77, 18.55], [47.8, 18.66], [47.81, 18.74], [47.79, 18.84], [47.76, 18.94]];
const MOSON = [[47.98, 17.31], [47.9, 17.27], [47.86, 17.29], [47.8, 17.42], [47.73, 17.56], [47.7, 17.64], [47.72, 17.73], [47.735, 17.82]];
const KISDUNA = [[48.15, 17.15], [48.17, 17.4], [48.1, 17.62], [48.02, 17.85], [47.92, 18.0], [47.76, 18.12]];
const VAH = [[48.35, 17.86], [48.15, 17.88], [47.95, 18.02]];
const RABA = [[47.2, 16.75], [47.4, 16.95], [47.55, 17.15], [47.62, 17.35], [47.69, 17.63]];
const BALATON = [[46.77, 17.255], [46.79, 17.33], [46.795, 17.42], [46.79, 17.5], [46.82, 17.58], [46.845, 17.65], [46.875, 17.72], [46.89, 17.79], [46.905, 17.84], [46.897, 17.87], [46.895, 17.89], [46.915, 17.91], [46.95, 17.89], [46.985, 17.96], [47.02, 18.02], [47.035, 18.09], [47.035, 18.13], [47.01, 18.135], [46.96, 18.1], [46.915, 18.05], [46.89, 17.96], [46.885, 17.9], [46.85, 17.86], [46.82, 17.79], [46.79, 17.7], [46.77, 17.63], [46.745, 17.56], [46.72, 17.47], [46.71, 17.38], [46.72, 17.29], [46.745, 17.25]];

function serviceMap(focus = 'all') {
  const hq = P(SITE.hq);
  const grat = [];
  for (let lat = 47; lat <= 48; lat += 0.5) { const [, y] = P([lat, 0]); grat.push(`<path d="M0 ${y}H${MW}"/><text x="6" y="${y - 5}">${lat.toFixed(1)}°N</text>`); }
  for (let lon = 17; lon <= 18.5; lon += 0.5) { const [x] = P([0, lon]); grat.push(`<path d="M${x} 0V${MH}"/><text x="${x + 5}" y="${MH - 8}">${lon.toFixed(1)}°E</text>`); }
  const [fx, fy] = P([47.82, 16.76]);
  const regionGlow = Object.keys(REGIONS).map((r) => {
    const t = TOWNS.filter((x) => x.r.split(' ')[0] === r).map((x) => P(x.ll));
    const cx = t.reduce((a, p) => a + p[0], 0) / t.length, cy = t.reduce((a, p) => a + p[1], 0) / t.length;
    return `<circle class="rg rg-${r}" cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${r === 'felvidek' ? 150 : 125}"/>`;
  }).join('');
  const links = TOWNS.map((t) => { const [x, y] = P(t.ll); return `<path class="ln" data-town="${t.i}" data-r="${t.r}" d="M${hq[0]} ${hq[1]}L${x} ${y}" pathLength="1"/>`; }).join('');
  const dots = TOWNS.map((t) => {
    const [x, y] = P(t.ll); const left = x > MW - 150;
    const label = t.n.split(' · ')[0];
    return `<g class="tw${t.major ? ' major' : ''}" data-town="${t.i}" data-r="${t.r}" tabindex="0" role="button" aria-label="${esc(t.n)}, ${t.d} km légvonalban"><circle cx="${x}" cy="${y}" r="${t.major ? 4.5 : 3}"/><text x="${left ? x - 9 : x + 9}" y="${y + 4}"${left ? ' text-anchor="end"' : ''}>${esc(label)}</text></g>`;
  }).join('');
  const list = Object.entries(REGIONS).map(([r, R]) => `<div class="tl-col" data-r="${r}"><h3><a href="${R.href}">${R.name}</a></h3><ul>${TOWNS.filter((t) => t.r.split(' ').includes(r)).map((t) => `<li><button type="button" data-town="${t.i}"><span>${esc(t.n)}</span><b>${t.d} km</b></button></li>`).join('')}</ul></div>`).join('');
  return `<div class="smap-wrap" data-map data-focus="${focus}">
  <div class="smap-tabs" role="group" aria-label="Régió kiemelése">
    ${[['all', 'Mind'], ...Object.entries(REGIONS).map(([k, v]) => [k, v.name])].map(([k, v]) => `<button type="button" data-focus-btn="${k}" aria-pressed="${k === focus}">${v}</button>`).join('')}
  </div>
  <figure class="smap">
    <svg viewBox="0 0 ${MW} ${MH}" role="img" aria-labelledby="smap-t">
      <title id="smap-t">A G-Epoxy szolgáltatási területe: Győr és környéke, a Felvidék magyarlakta települései és a Balaton régió</title>
      <defs><radialGradient id="rgg"><stop offset="0" stop-color="var(--amber)" stop-opacity=".22"/><stop offset="1" stop-color="var(--amber)" stop-opacity="0"/></radialGradient></defs>
      <g class="grat">${grat.join('')}</g>
      <g class="regions">${regionGlow}</g>
      <g class="water">
        <path class="river minor" d="${poly(KISDUNA)}"/><path class="river minor" d="${poly(VAH)}"/><path class="river minor" d="${poly(RABA)}"/><path class="river minor" d="${poly(MOSON)}"/>
        <path class="river danube" d="${poly(DANUBE)}"/>
        <path class="lake" d="${poly(BALATON, true)}"/>
        <ellipse class="lake" cx="${fx}" cy="${fy}" rx="${(0.06 * COS * K).toFixed(1)}" ry="${(0.14 * K).toFixed(1)}"/>
      </g>
      <g class="lbl"><text x="${P([48.29, 17.5])[0]}" y="${P([48.29, 17.5])[1]}">SZLOVÁKIA</text><text x="${P([47.35, 18.25])[0]}" y="${P([47.35, 18.25])[1]}">MAGYARORSZÁG</text><text class="sm" x="${P([47.7, 18.4])[0]}" y="${P([47.7, 18.4])[1]}">Duna</text><text class="sm" x="${P([46.86, 17.45])[0]}" y="${P([46.86, 17.45])[1]}">Balaton</text></g>
      <g class="links">${links}</g>
      <g class="towns">${dots}</g>
      <g class="hq"><circle class="hq-pulse" cx="${hq[0]}" cy="${hq[1]}" r="10"/><circle cx="${hq[0]}" cy="${hq[1]}" r="6"/><text x="${hq[0] - 12}" y="${hq[1] + 22}" text-anchor="middle">G-EPOXY · Bágyogszovát</text></g>
    </svg>
    <div class="smap-tip" aria-live="polite"></div>
  </figure>
  <div class="tl">${list}</div>
</div>`;
}

// ---------- floor systems (configurator + layer stack) ----------
const LAYERS = { concrete: 34, membrane: 10, primer: 6, body: 14, grip: 8, top: 8, copper: 4, conductive: 8 };
export const SYSTEMS = [
  {
    id: 'elelmiszer', tab: 'Élelmiszeripar', name: 'Hézagmentes élelmiszeripari padló', top: '#a4553a',
    for: 'Húsüzem, tejüzem, pékség, nagykonyha, hűtőház, borászat',
    text: 'Nedves, zsíros, savas közeg, napi többszöri magasnyomású mosás és hősokk. Itt a padló nem burkolat, hanem higiéniai rendszer: lejtés a folyókák felé, zárt falcsatlakozás, nulla fuga.',
    layers: [['concrete', 'Beton aljzat', 'csiszolva, javítva, lejtésre kiegyenlítve'], ['primer', 'Penetráló alapozó', 'kvarchomok-szórással a tapadásért'], ['body', 'PU-cement / műgyanta törzsréteg', 'mechanikai és hőterhelésre'], ['grip', 'Csúszásgátló szórás', 'nedves közegre méretezve'], ['top', 'Zárófedés', 'zárt, mosható, higiénikus felület']],
    specs: [['Rendszervastagság', '4–9 mm'], ['Csúszásgátlás', 'R11–R13'], ['Tisztítás', 'magasnyomású, vegyszeres'], ['Kiegészítők', 'folyókák, lefolyók, falcsatlakozás']],
    props: [4, 5, 5, 5, 3],
  },
  {
    id: 'raktar', tab: 'Raktár & logisztika', name: 'Kopásálló önterülő epoxi padló', top: '#9aa0a4',
    for: 'Raktár, logisztikai központ, gyártócsarnok, szerelőüzem',
    text: 'Targonca, raklapemelő, folyamatos kerékterhelés. A cél: pormentes, kopásálló, könnyen takarítható sík felület, felfestett közlekedési utakkal és tárolási zónákkal.',
    layers: [['concrete', 'Beton aljzat', 'gyémántcsiszolt, portalanított'], ['primer', 'Epoxi alapozó', 'pórustömítés, tapadóhíd'], ['body', 'Önterülő epoxi réteg', 'nagy kopásállóságú, töltött'], ['top', 'Fedőréteg + jelölések', 'közlekedési utak, zónák']],
    specs: [['Rendszervastagság', '2–4 mm'], ['Felület', 'sima, selyemfényű'], ['Szín', 'RAL szerint'], ['Extra', 'felfestett közlekedési utak']],
    props: [5, 4, 2, 2, 2],
  },
  {
    id: 'muhely', tab: 'Műhely & autószerviz', name: 'Olajálló, csúszásgátló műhelypadló', top: '#6d7176',
    for: 'Autószerviz, gépműhely, karbantartó üzem, mezőgazdasági géptároló',
    text: 'Olaj, üzemanyag, fékfolyadék, leeső szerszám és emelő talpak. Csúszásgátló, vegyszerálló rendszer, amelyről a szennyeződés egyszerűen feltakarítható.',
    layers: [['concrete', 'Beton aljzat', 'csiszolt, javított'], ['primer', 'Epoxi alapozó', 'telítő, tapadóhíd'], ['grip', 'Szórt törzsréteg', 'kvarchomokkal telítve'], ['top', 'Vegyszerálló fedés', 'olaj- és üzemanyagálló']],
    specs: [['Rendszervastagság', '1,5–3 mm'], ['Csúszásgátlás', 'R10–R11'], ['Ellenáll', 'olaj, üzemanyag, fékfolyadék'], ['Felület', 'érdes vagy félérdes']],
    props: [4, 4, 4, 3, 2],
  },
  {
    id: 'esd', tab: 'ESD / elektronika', name: 'Vezetőképes ESD padlórendszer', top: '#2b2d31',
    for: 'Elektronikai gyártás, szerverterem, vezérlőterem, robbanásveszélyes környezet',
    text: 'A hagyományos epoxi szigetel: a súrlódásból statikus töltés halmozódik fel, ami érzékeny alkatrészeket tehet tönkre. Az ESD padló a töltést a földelőhálózaton keresztül biztonságosan elvezeti.',
    layers: [['concrete', 'Beton aljzat', 'előkészítve'], ['primer', 'Alapozó', 'tapadóhíd'], ['copper', 'Rézszalagos földelőháló', 'földelési pontokra kötve'], ['conductive', 'Vezetőképes alapréteg', 'a töltés szétosztása'], ['top', 'Vezetőképes fedőréteg', 'ESD-mérhető felület']],
    specs: [['Vezető padló', '0,025–1 MΩ'], ['Disszipatív padló', '1–1000 MΩ'], ['Rendszervastagság', '≈ 2 mm'], ['Kiegészítő', 'földelés, ellenállásmérés']],
    props: [4, 4, 2, 2, 2],
  },
  {
    id: 'garazs', tab: 'Mélygarázs & parkoló', name: 'Repedésáthidaló parkolóházi bevonat', top: '#8c9195',
    for: 'Mélygarázs, parkolóház, rámpa, társasházi garázs',
    text: 'Télen sólé, nyáron hőtágulás, egész évben gumiabroncs-kopás. A rugalmas membrán áthidalja a hajszálrepedéseket, így a sós víz nem jut el a vasalásig.',
    layers: [['concrete', 'Vasbeton födém', 'szemcseszórt / csiszolt'], ['primer', 'Alapozó', 'tapadóhíd'], ['membrane', 'Rugalmas PU membrán', 'repedésáthidaló'], ['grip', 'Kvarchomok szórás', 'csúszásgátló'], ['top', 'Kopásálló fedés + jelölések', 'parkolóhelyek, nyilak']],
    specs: [['Rendszervastagság', '2–4,5 mm'], ['Csúszásgátlás', 'R11'], ['Védelem', 'sólé, fagy, kopás'], ['Extra', 'felfestett parkolóhelyek']],
    props: [4, 3, 4, 2, 5],
  },
  {
    id: 'uzlet', tab: 'Üzlet & bemutatóterem', name: 'Egyszínű, karcálló kereskedelmi padló', top: '#3c3f44',
    for: 'Üzlet, bemutatóterem, autószalon, gyógyszertár, iroda, közösségi tér',
    text: 'Nagy gyalogos forgalom, kocsik, raklapok és napi takarítás. Hézagmentes, egyszínű felület RAL színben, matt vagy selyemfényű kivitelben — nyitvatartáshoz igazított ütemezéssel.',
    layers: [['concrete', 'Aljzat', 'beton vagy esztrich, kiegyenlítve'], ['primer', 'Alapozó', 'pórustömítés'], ['body', 'Önterülő réteg', 'sík, egyenletes felület'], ['top', 'PU fedőlakk', 'matt, karcálló, UV-stabil']],
    specs: [['Rendszervastagság', '2–3 mm'], ['Felület', 'matt / selyem / fényes'], ['Szín', 'RAL szerint'], ['Ütemezés', 'zárva tartáshoz igazítva']],
    props: [4, 3, 3, 2, 3],
  },
  {
    id: 'terasz', tab: 'Terasz & tető — vízszigetelés', name: 'Folyékony PU vízszigetelés járható fedéssel', top: '#a3aab0',
    for: 'Terasz, erkély, lapostető, loggia, külső lépcső',
    text: 'A víz mindig megtalálja a leggyengébb pontot: a falcsatlakozást, a küszöböt, a lefolyót. Folyékony, hézag nélküli membrán, amely a részleteken is folytonos — fölötte UV-álló, csúszásgátló járófelülettel.',
    layers: [['concrete', 'Aljzat', 'lejtésképzés, javítás'], ['primer', 'Alapozó', 'tapadóhíd'], ['membrane', 'PU vízszigetelő membrán', 'hálóerősítés a csatlakozásoknál'], ['grip', 'Csúszásgátló szórás', 'nedves állapotban is'], ['top', 'Alifás UV-álló fedés', 'nem sárgul, nem kréta']],
    specs: [['Rendszervastagság', '1,5–2,5 mm'], ['Tulajdonság', 'UV- és fagyálló, rugalmas'], ['Csúszásgátlás', 'R10–R11'], ['Kivitelezés', '+10 °C feletti hőmérsékleten']],
    props: [3, 2, 4, 4, 5],
  },
];
const PROPS = ['Kopásállóság', 'Vegyszerállóság', 'Csúszásgátlás', 'Hőtűrés', 'Rugalmasság'];

function stack(sys) {
  let cum = 0;
  const slabs = sys.layers.map(([t], i) => {
    const th = LAYERS[t]; const z = cum + th; cum = z;
    const c = t === 'top' ? sys.top : '';
    return `<div class="slab s-${t}" data-i="${i}" style="--i:${i};--cum:${z}px;--t:${th}px${c ? `;--c:${c}` : ''}"><i></i></div>`;
  });
  return `<div class="stack-3d" aria-hidden="true"><div class="stack">${slabs.join('')}</div><span class="stack-shadow"></span></div>`;
}

function configurator() {
  const tabs = SYSTEMS.map((s, i) => `<button type="button" role="tab" id="tab-${s.id}" aria-controls="sys-${s.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${s.tab}</button>`).join('');
  const panels = SYSTEMS.map((s, i) => `<div class="sys" role="tabpanel" id="sys-${s.id}" aria-labelledby="tab-${s.id}" data-sys="${s.id}"${i ? ' hidden' : ''}>
    <div class="sys-vis">${stack(s)}
      <ol class="layers">${s.layers.map(([t, n, d], j) => `<li data-i="${j}"><span class="sw s-${t}"${t === 'top' ? ` style="--c:${s.top}"` : ''}></span><b>${n}</b><small>${d}</small></li>`).reverse().join('')}</ol>
    </div>
    <div class="sys-info">
      <p class="eyebrow">Javasolt rendszer</p>
      <h3>${s.name}</h3>
      <p class="sys-for">${s.for}</p>
      <p>${s.text}</p>
      <dl class="specs">${s.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <dl class="bars">${s.props.map((v, j) => `<div style="--v:${v}"><dt>${PROPS[j]}</dt><dd><span></span><em>${v}/5</em></dd></div>`).join('')}</dl>
      <a class="btn btn-amber" href="kapcsolat.html?rendszer=${s.id}#ajanlat">Ajánlatot kérek erre a rendszerre ${ICON.arrow}</a>
    </div>
  </div>`).join('');
  return `<section class="sec sec-config" id="rendszervalaszto" aria-labelledby="cfg-h">
  <div class="wrap">
    <header class="sec-head" data-reveal><p class="eyebrow">Rendszerválasztó</p><h2 id="cfg-h">Hová kell a padló? <span class="dim">A rétegrend ebből következik.</span></h2><p class="lead">Válassza ki a környezetet — megmutatjuk a jellemző rétegrendet, vastagságot és terhelhetőséget. A végleges rendszert mindig helyszíni felmérés után tervezzük.</p></header>
    <div class="cfg" data-cfg>
      <div class="cfg-tabs" role="tablist" aria-label="Felhasználási környezet">${tabs}</div>
      <div class="cfg-panels">${panels}</div>
    </div>
    <p class="note">Az értékek jellemző tartományok, tájékoztató jellegűek. A pontos rétegrendet a felmérés (nedvesség, szilárdság, terhelés, vegyszerek) határozza meg.</p>
  </div>
</section>`;
}

// ---------- shared content blocks ----------
const ANATOMY = [
  ['husipari-uzem-01-kiindulas', 'Kiindulás', 'Működő élelmiszeripari üzem elhasznált, sérült aljzattal. Felmérés: nedvesség, szilárdság, lejtésviszonyok, a napi mosás vegyszerei.'],
  ['husipari-uzem-02-lefolyok', 'Bontás & folyókák', 'A folyókák és lefolyók helyének kibontása, beépítése és szintre állítása. Kőműves munka — saját csapattal, nem alvállalkozóval.'],
  ['husipari-uzem-03-aljzatjavitas', 'Aljzatjavítás', 'Gépi csiszolás, a laza és szennyezett részek eltávolítása, a hiányok pótlása javítóhabarccsal.'],
  ['husipari-uzem-04-kiegyenlites', 'Kiegyenlítés & lejtés', 'A víz a folyóka felé fusson, ne a sarokba. Lejtésképzés és kiegyenlítés a folyókák síkjához igazítva.'],
  ['husipari-uzem-05-alapozas', 'Alapozás', 'Penetráló alapozó a tapadásért; a csatlakozások, áttörések és falszegélyek előzetes lezárása.'],
  ['husipari-uzem-06-bevonat', 'Műgyanta rendszer', 'Hézagmentes, csúszásgátló bevonat rétegenként, kontrollált hőmérséklet és páratartalom mellett.'],
  ['husipari-uzem-07-atadas', 'Átadás', 'Mosható, hézagmentes, csúszásbiztos padló — a folyókákkal egy síkban. Az üzem újraindulhat.'],
];
function anatomy() {
  return `<section class="sec sec-anatomy" id="projekt" aria-labelledby="anat-h">
  <div class="wrap">
    ${head('Projekt anatómia · húsipari üzem', '<span id="anat-h">Aljzattól az átadásig.<br><span class="dim">Egy kézben.</span></span>', 'Egy valós referenciamunkánk hét lépésben. A műgyanta csak az utolsó néhány milliméter — a tartósság a bontásnál, a folyókáknál és az aljzatnál dől el. Ezért csináljuk mi a kőműves munkát is.')}
    <div class="anat" data-anat>
      <div class="anat-media" aria-hidden="true">${ANATOMY.map(([im, t], i) => img(im, '', { cls: i ? '' : 'on', sizes: '(min-width: 1024px) 45vw, 100vw' })).join('')}
        <div class="anat-prog"><span></span></div><p class="anat-count"><b>01</b> / 07</p></div>
      <ol class="anat-steps">${ANATOMY.map(([im, t, d], i) => `<li data-step="${i}"><div class="anat-pic">${img(im, `Húsipari üzem műgyanta padló — ${t.toLowerCase()}`, { sizes: '100vw' })}</div><p class="mono">${String(i + 1).padStart(2, '0')} / 07</p><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
    </div>
  </div>
</section>`;
}

const BA = {
  lepcso: ['lepcso-elotte', 'lepcso-utana', 'Külső lépcső felújítása', 'Betonjavítás, élképzés, csúszásgátló műgyanta bevonat'],
  garazs: ['garazs-padlo-elotte', 'garazs-padlo-utana', 'Garázspadló', 'Aljzat-előkészítés, szegélyek, szórt műgyanta bevonat'],
  terasz: ['terasz-elotte', 'terasz-utana', 'Terasz vízszigetelés', 'Repedésjavítás, vízszigetelő és csúszásgátló bevonat'],
};
function beforeAfter(keys = ['lepcso', 'garazs', 'terasz'], { title = 'Húzza el a csúszkát.', eyebrow = 'Előtte / utána' } = {}) {
  return `<section class="sec sec-ba" aria-label="Előtte–utána összehasonlítás">
  <div class="wrap">
    ${head(eyebrow, title, 'Saját fotóink, retusálás nélkül. Ugyanaz a felület, a munka előtt és után.')}
    <div class="ba-grid">${keys.map((k) => { const [b, a, t, d] = BA[k]; return `<figure class="ba" data-ba data-reveal style="--p:50%">
      <div class="ba-stage">${img(a, `${t} — utána`, { sizes: '(min-width: 900px) 33vw, 100vw' })}<div class="ba-before">${img(b, `${t} — előtte`, { sizes: '(min-width: 900px) 33vw, 100vw' })}</div>
        <span class="ba-tag l">Előtte</span><span class="ba-tag r">Utána</span><span class="ba-handle" aria-hidden="true"></span>
        <input type="range" min="0" max="100" value="50" aria-label="${esc(t)}: előtte–utána csúszka"></div>
      <figcaption><b>${t}</b><span>${d}</span></figcaption></figure>`; }).join('')}</div>
  </div>
</section>`;
}

const PROCESS = [
  ['Helyszíni felmérés', 'Nedvesség, szilárdság, terhelés, vegyszerek, üzemidő. Mérünk, nem tippelünk.'],
  ['Rendszerterv & ajánlat', 'Rétegrend, vastagság, csúszásgátlás, ütemezés — tételes, összehasonlítható ajánlat.'],
  ['Aljzat-előkészítés', 'Csiszolás, javítás, lejtésképzés, folyókák, vízszigetelés. A tartósság itt dől el.'],
  ['Kivitelezés', 'Rétegenként, kontrollált hőmérséklet és páratartalom mellett, akár szakaszolva, működő üzemben is.'],
  ['Átadás & garancia', 'Átadás-átvétel, karbantartási útmutató, írásos garancia.'],
];
function processBlock() {
  return `<section class="sec sec-process" aria-labelledby="proc-h">
  <div class="wrap">
    ${head('Hogyan dolgozunk', '<span id="proc-h">Öt lépés. <span class="dim">Nulla meglepetés.</span></span>')}
    <ol class="proc" data-proc>${PROCESS.map(([t, d], i) => `<li data-reveal style="--d:${i * 90}ms"><span class="proc-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>`;
}

function regionCards(except) {
  const data = [
    ['gyor', 'ipari-csarnok', 'Győr és környéke', 'Bázisunk Bágyogszováton, Győrtől ~24 km-re. Ipari parkok, autóipari beszállítók, logisztika, élelmiszeripar.'],
    ['felvidek', 'elelmiszeripari-padlo', 'Felvidék', 'Komárom, Dunaszerdahely, Somorja, Érsekújvár, Párkány — magyar nyelvű kivitelezés Szlovákiában.'],
    ['balaton', 'vizszigeteles-terasz', 'Balaton', 'Hotelek, éttermi konyhák, borászatok, teraszok vízszigetelése — szezon előtti ütemezéssel.'],
  ].filter(([k]) => k !== except);
  return `<div class="regions-grid">${data.map(([k, im, t, d]) => `<a class="region-card gloss" href="${REGIONS[k].href}" data-reveal>${img(im, `Műgyanta padló ${t}`, { sizes: '(min-width: 900px) 33vw, 100vw' })}<span class="rc-body"><span class="eyebrow">Régió</span><b>${t}</b><span>${d}</span><span class="rc-go">Részletek ${ICON.arrow}</span></span></a>`).join('')}</div>`;
}

function faq(items, id = 'gyik') {
  return {
    html: `<section class="sec sec-faq" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap faq-wrap">
    ${head('Gyakori kérdések', `<span id="${id}-h">Kérdések, <span class="dim">egyenes válaszok.</span></span>`)}
    <div class="faq">${items.map(([q, a]) => `<details data-reveal><summary><span>${q}</span><i aria-hidden="true"></i></summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div>
  </div>
</section>`,
    schema: { '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) },
  };
}

function cta(title = 'Kérjen helyszíni felmérést.', sub = 'Megnézzük az aljzatot, megmérjük, amit kell, és tételes ajánlatot adunk. Győr és környéke, Felvidék, Balaton.') {
  return `<section class="sec sec-cta" aria-labelledby="cta-h">
  <div class="wrap cta" data-reveal>
    <p class="eyebrow">Ajánlatkérés</p>
    <h2 id="cta-h">${title}</h2>
    <p class="lead">${sub}</p>
    <div class="cta-row">
      <a class="cta-tel" href="tel:${SITE.tel}">${ICON.phone}<span>${SITE.phone}</span></a>
      <a class="btn btn-amber btn-lg" href="kapcsolat.html#ajanlat">Ajánlatkérés online ${ICON.arrow}</a>
    </div>
  </div>
</section>`;
}

function pageHero({ eyebrow, h1, lead, image, alt, chipsList = [], crumbs = [] }) {
  return `<section class="phero">
  <div class="phero-bg">${img(image, alt, { sizes: '100vw', eager: true })}</div>
  <div class="wrap phero-inner">
    <nav class="crumbs" aria-label="Morzsamenü"><a href="./">Főoldal</a>${crumbs.map(([t, h]) => (h ? `<a href="${h}">${t}</a>` : `<span aria-current="page">${t}</span>`)).join('')}</nav>
    <p class="eyebrow">${eyebrow}</p>
    <h1 class="phero-h">${h1}</h1>
    <p class="lead">${lead}</p>
    ${chipsList.length ? chips(chipsList) : ''}
    <div class="phero-cta"><a class="btn btn-amber" href="kapcsolat.html#ajanlat">Ajánlatkérés ${ICON.arrow}</a><a class="btn btn-ghost" href="tel:${SITE.tel}">${ICON.phone} ${SITE.phone}</a></div>
  </div>
</section>`;
}

function refCard(name, alt, title, tags, cats, big = false) {
  return `<figure class="ref${big ? ' big' : ''}" data-cat="${cats}" data-reveal><button type="button" class="ref-btn" data-full="assets/img/${name}.webp" data-cap="${esc(title)}" aria-label="Nagyítás: ${esc(title)}">${img(name, alt, { sizes: big ? '(min-width: 900px) 50vw, 100vw' : '(min-width: 900px) 25vw, 50vw' })}</button><figcaption><b>${title}</b><span>${tags}</span></figcaption></figure>`;
}

const cards = (items, cls = '') => `<div class="cards ${cls}">${items.map(([t, d, tag], i) => `<article class="card gloss" data-reveal style="--d:${(i % 3) * 70}ms"><span class="card-n">${tag || String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div>`;
const refs = (list) => `<div class="refs">${list.map((r) => refCard(...r)).join('')}</div>`;
const townsList = (r) => `<ul class="towns-list">${TOWNS.filter((t) => t.r.split(' ').includes(r)).map((t) => `<li><span>${esc(t.n)}</span><b>${t.d} km</b></li>`).join('')}</ul>`;
const split = (left, right, cls = '') => `<div class="split ${cls}"><div class="split-l" data-reveal>${left}</div><div class="split-r" data-reveal style="--d:100ms">${right}</div></div>`;
const sheet = (title, rows) => `<aside class="sheet"><p class="sheet-t">${title}</p><dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></aside>`;

const dist = (prefix) => { const t = TOWNS.find((x) => x.n.startsWith(prefix)); if (!t) throw new Error('no town ' + prefix); return `≈ ${t.d} km`; };

export const H = { dist, SITE, ICON, MARK, img, chips, marking, head, serviceMap, configurator, anatomy, beforeAfter, processBlock, regionCards, faq, cta, pageHero, refCard, refs, cards, townsList, split, sheet, esc, TOWNS, REGIONS, SYSTEMS };

// ---------- layout ----------
const NAV = [
  ['ipari-mugyanta-padlo.html', 'Ipari padló'],
  ['kereskedelmi-mugyanta-padlo.html', 'Kereskedelmi padló'],
  ['vizszigeteles.html', 'Vízszigetelés'],
  ['komuves-munkak.html', 'Aljzat & kőműves'],
  ['referenciak.html', 'Referenciák'],
];

function layout(p, v) {
  const base = p.abs ? '/' : '';
  const url = SITE.url + '/' + (p.path === 'index.html' ? '' : p.path);
  const business = {
    '@type': 'GeneralContractor', '@id': SITE.url + '/#ceg', name: SITE.name, url: SITE.url + '/',
    image: SITE.url + '/assets/img/og-image.jpg', logo: SITE.url + '/assets/img/apple-touch-icon.png',
    telephone: SITE.phone, email: SITE.email,
    description: 'Ipari és kereskedelmi műgyanta padlók, vízszigetelés és aljzat-előkészítő kőműves munkák Győr és környékén, a Felvidéken és a Balatonnál.',
    address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, postalCode: SITE.zip, addressCountry: 'HU' },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.hq[0], longitude: SITE.hq[1] },
    areaServed: TOWNS.map((t) => ({ '@type': 'City', name: t.n.split(' · ')[0] })),
    knowsLanguage: ['hu'],
    sameAs: [SITE.facebook],
  };
  const crumbs = { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Főoldal', item: SITE.url + '/' }, ...(p.path === 'index.html' ? [] : [{ '@type': 'ListItem', position: 2, name: p.crumb || p.title, item: url }])] };
  const graph = { '@context': 'https://schema.org', '@graph': [business, crumbs, ...(p.schema || [])] };
  const nav = NAV.map(([h, t]) => `<li><a href="${base}${h}"${h === p.path ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  const regions = Object.values(REGIONS).map((r) => `<li><a href="${base}${r.href}"${r.href === p.path ? ' aria-current="page"' : ''}>${r.name}</a></li>`).join('');
  const body = p.body.replace(/(href|src|srcset|data-full)="assets\//g, `$1="${base}assets/`).replace(/srcset="([^"]+)"/g, (m, s) => (base ? `srcset="${s.replace(/, assets\//g, ', /assets/')}"` : m));
  return `<!doctype html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:type" content="website">
<meta property="og:locale" content="hu_HU">
<meta property="og:site_name" content="G-Epoxy">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}/assets/img/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0b0b0c">
<meta name="geo.region" content="HU-GS">
<meta name="geo.placename" content="Bágyogszovát">
<link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}assets/img/apple-touch-icon.png">
<link rel="preload" href="${base}assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/archivo-latin-ext.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add('js')</script>
<link rel="stylesheet" href="${base}assets/css/site.css?v=${v}">
<script src="${base}assets/js/site.js?v=${v}" defer></script>
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body class="${p.bodyClass || ''}">
<!--email_off-->
<a class="skip" href="#tartalom">Ugrás a tartalomra</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="brand" href="${base || './'}" aria-label="G-Epoxy — főoldal">${MARK}<span>G<i>—</i>EPOXY</span></a>
    <nav class="nav" id="nav" aria-label="Fő navigáció">
      <ul>${nav}
        <li class="sub"><a href="${base}index.html#regiok">Régiók</a><ul>${regions}</ul></li>
        <li class="nav-m"><a href="${base}kapcsolat.html">Kapcsolat</a></li>
      </ul>
    </nav>
    <a class="hdr-tel" href="tel:${SITE.tel}" aria-label="Hívás: ${SITE.phone}">${ICON.phone}<span>${SITE.phone}</span></a>
    <a class="btn btn-amber btn-sm hdr-cta" href="${base}kapcsolat.html#ajanlat">Ajánlatkérés</a>
    <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Menü"><span></span><span></span></button>
  </div>
</header>
<main id="tartalom">
${body}
</main>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <a class="ftr-brand" href="${base || './'}" aria-label="G-Epoxy — főoldal">${MARK}<span>G<i>—</i>EPOXY</span></a>
      <p class="ftr-claim">Ipari és kereskedelmi műgyanta padló, vízszigetelés, aljzat-előkészítés. Egy felelős kivitelező — az aljzattól a fedőrétegig.</p>
    </div>
    <div class="ftr-grid">
      <div><h2>Szolgáltatások</h2><ul>${NAV.slice(0, 4).map(([h, t]) => `<li><a href="${base}${h}">${t}</a></li>`).join('')}<li><a href="${base}referenciak.html">Referenciák</a></li></ul></div>
      <div><h2>Régiók</h2><ul>${regions}</ul><p class="ftr-towns">Győr · Mosonmagyaróvár · Sopron · Pápa · Tatabánya · Komárom · Dunaszerdahely · Somorja · Érsekújvár · Párkány · Veszprém · Siófok · Balatonfüred · Keszthely</p></div>
      <div><h2>Kapcsolat</h2><address><a href="tel:${SITE.tel}">${ICON.phone}${SITE.phone}</a><a href="mailto:${SITE.email}">${ICON.mail}${SITE.email}</a><a href="${SITE.facebook}" target="_blank" rel="noopener">${ICON.fb}Facebook</a><span>${ICON.pin}${SITE.zip} ${SITE.city}, ${SITE.street}</span></address></div>
    </div>
    <div class="ftr-bot"><span>© ${new Date().getFullYear()} G-Epoxy. Minden jog fenntartva.</span><a href="${base}adatkezeles.html">Adatkezelési tájékoztató</a></div>
    <a class="credit" href="https://conendigital.hu" target="_blank" rel="noopener"><span class="credit-l"><small>Kivitelezés</small><span class="credit-k">Weboldal &amp; webáruház készítés</span></span><span class="credit-b">conendigital.hu<span class="credit-go">${ICON.arrow}</span></span></a>
  </div>
</footer>
<dialog class="lb" data-lb aria-label="Kép nagyítva"><form method="dialog"><button class="lb-x" aria-label="Bezárás">×</button></form><img alt=""><p></p></dialog>
<nav class="dock" aria-label="Gyors kapcsolat"><a href="tel:${SITE.tel}">${ICON.phone}Hívás</a><a class="amber" href="${base}kapcsolat.html#ajanlat">Ajánlatkérés ${ICON.arrow}</a></nav>
<!--/email_off-->
</body>
</html>
`;
}

// ---------- build ----------
const hash = crypto.createHash('md5')
  .update(fs.readFileSync(path.join(OUT, 'assets/css/site.css')))
  .update(fs.readFileSync(path.join(OUT, 'assets/js/site.js')))
  .digest('hex').slice(0, 8);

const dir = path.join(ROOT, 'src/pages');
const pages = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  const p = mod.default(H);
  fs.writeFileSync(path.join(OUT, p.path), layout(p, hash));
  pages.push(p);
  console.log('built', p.path);
}
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE.url}/${p.path === 'index.html' ? '' : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority || '0.7'}</priority></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
// old site URLs -> new pages. GitHub Pages has no server redirects; an instant meta refresh + canonical is treated as a permanent redirect.
const REDIRECTS = {
  'mugyanta-padlo-gyor-rolunk.html': '/',
  'mugyanta-padlo-gyor-szolgaltatasaink.html': '/#szolgaltatasok',
  'mugyanta-padlo-gyor-portfolio.html': '/referenciak.html',
  'mugyanta-padlo-gyor-kapcsolat.html': '/kapcsolat.html',
  'gyori-menhely-mugyanta-padlo.html': '/referenciak.html',
};
for (const [from, to] of Object.entries(REDIRECTS)) {
  fs.writeFileSync(path.join(OUT, from), `<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Átirányítás…</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE.url}${to.split('#')[0]}"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace('${to}')</script></head><body><a href="${to}">Tovább az új oldalra</a></body></html>
`);
}
console.log(`${pages.length} pages, v=${hash}`);
