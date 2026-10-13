export default (h) => {
  const f = h.faq([
    ['Mennyi idő alatt készül el egy ipari műgyanta padló?', 'A rendszertől és a felülettől függ. Egy jellemző, néhány száz négyzetméteres munka az aljzat-előkészítéssel együtt néhány nap; a bevonat általában 24 óra után járható, teljes mechanikai és vegyi terhelést jellemzően 7 nap után kap. Működő üzemben szakaszolva, hétvégére vagy leállásra ütemezve is dolgozunk.'],
    ['Mennyibe kerül a műgyanta padló négyzetméterenként?', 'Négyzetméterárat felmérés nélkül nem adunk, mert az ár nagy része az aljzaton múlik: nedvesség, repedések, lejtés, folyókák, bontás. Helyszíni felmérés után tételes, összehasonlítható ajánlatot adunk, amelyből látszik, mi mennyibe kerül.'],
    ['Milyen aljzatra lehet műgyanta padlót készíteni?', 'Jellemzően betonra és cementesztrichre. Feltétel a megfelelő szilárdság és alacsony nedvességtartalom — ezeket a felmérésen mérjük. Ha az aljzat nem megfelelő, a javítást, kiegyenlítést, lejtésképzést mi magunk végezzük el.'],
    ['Mi a különbség az epoxi és a poliuretán (PU) padló között?', 'Az epoxi kemény, nagyon kopás- és vegyszerálló, beltéri ipari terekbe ideális. A poliuretán rugalmasabb, jobban bírja a hőingadozást és az UV-t, repedésáthidaló — ezért kültéren, parkolóházban és élelmiszeriparban (PU-cement) gyakran ez a jobb választás. Sokszor a kettő kombinációja adja a legjobb rétegrendet.'],
    ['Lehet csúszásgátló a műgyanta padló?', 'Igen. Kvarchomok-szórással a csúszásgátlás a felhasználáshoz igazítható, R9-től egészen R13-ig — a száraz raktártól a nedves, zsíros húsüzemig.'],
    ['Vállaltok munkát Szlovákiában, a Felvidéken?', 'Igen. Rendszeresen dolgozunk a Felvidék magyarlakta településein — Komárom, Dunaszerdahely, Somorja, Nagymegyer, Gúta, Érsekújvár, Párkány és környékük. Az ügyintézés magyar nyelven zajlik.'],
    ['Készítetek otthoni dizájnpadlót vagy 3D padlót?', 'Nem. Ipari és kereskedelmi műgyanta padlókra, vízszigetelésre és az ezekhez kapcsolódó kőműves munkákra specializálódtunk — ott vagyunk a legjobbak, ahol a padlónak dolgoznia kell.'],
    ['Van garancia?', 'Igen, írásos garanciát vállalunk. Az időtartama a rendszertől és a felhasználási körülményektől függ — ezt az ajánlatban rögzítjük.'],
  ]);
  const industries = ['Élelmiszeripar', 'Autóipari beszállítók', 'Logisztika & raktár', 'Gyógyszer & elektronika — ESD', 'Autószerviz & műhely', 'Mélygarázs & parkolóház', 'Üzlet & bemutatóterem', 'Hotel & vendéglátás', 'Borászat & mezőgazdaság'];
  const mq = `<ul>${industries.map((i) => `<li>${i}</li>`).join('')}</ul>`;
  const svc = [
    ['ipari-mugyanta-padlo.html', 'ipari-csarnok', 'Ipari műgyanta padló', 'Élelmiszeripar, gyártás, raktár, ESD. Teherbírás, vegyszerállóság, csúszásgátlás — üzemi körülményekre méretezve.', ['Epoxi', 'PU-cement', 'ESD', 'R9–R13'], 'big'],
    ['kereskedelmi-mugyanta-padlo.html', 'kereskedelmi-folyoso', 'Kereskedelmi műgyanta padló', 'Üzletek, bemutatótermek, garázsok, intézmények. Hézagmentes, könnyen takarítható, RAL színben.', ['Önterülő', 'Matt PU', 'RAL'], 'tall'],
    ['vizszigeteles.html', 'vizszigeteles-terasz', 'Vízszigetelés', 'Terasz, erkély, lapostető, pince, vizes üzemi terek. Folyékony, hézag nélküli membránok.', ['PU membrán', 'UV-álló', 'Repedésáthidaló'], ''],
    ['komuves-munkak.html', 'aljzat-elokeszites', 'Aljzat & kőműves munkák', 'Csiszolás, betonjavítás, lejtésképzés, folyókák beépítése, lépcsőfelújítás. A padló alapja.', ['Csiszolás', 'Betonjavítás', 'Folyókák'], ''],
  ];
  return {
    path: 'index.html',
    priority: '1.0',
    title: 'Ipari műgyanta padló Győr · Felvidék · Balaton | G-Epoxy',
    description: 'Hézagmentes, vegyszerálló, csúszásbiztos ipari és kereskedelmi műgyanta padlók, vízszigetelés és aljzat-előkészítés Győr és környékén, a Felvidéken és a Balatonnál. Kérjen helyszíni felmérést!',
    bodyClass: 'home',
    schema: [f.schema],
    body: `
<section class="hero" data-hero aria-labelledby="hero-h">
  <canvas class="hero-gl" aria-hidden="true"></canvas>
  <div class="hero-in wrap">
    <p class="eyebrow hero-eyebrow"><span class="mono">47.59°N · 17.36°E</span> Bágyogszovát → Győr · Felvidék · Balaton</p>
    <h1 class="hero-h" id="hero-h"><span class="h-pre">Ipari & kereskedelmi</span><span class="h-main" data-hero-title><span class="w">Műgyanta</span> <span class="w">padló</span></span></h1>
    <div class="hero-reflect" aria-hidden="true"><span>Műgyanta</span> <span>padló</span></div>
    <div class="hero-floor">
      <div class="hero-copy">
        <p class="lead">Hézagmentes, vegyszerálló, csúszásbiztos padlórendszerek üzemekbe, raktárakba, konyhákba és mélygarázsokba — vízszigeteléssel és a teljes aljzat-előkészítéssel együtt.</p>
        <div class="hero-cta"><a class="btn btn-amber btn-lg" href="kapcsolat.html#ajanlat">Ajánlatkérés ${h.ICON.arrow}</a><a class="btn btn-ghost btn-lg" href="#rendszervalaszto">Rendszerválasztó</a></div>
      </div>
      <ul class="hero-spec" aria-label="Fő tulajdonságok"><li>Hézagmentes</li><li>Vegyszerálló</li><li>R9–R13 csúszásgátlás</li><li>ESD-képes</li></ul>
    </div>
    <p class="hero-hint" aria-hidden="true"><span class="hint-mouse">Húzza végig az egeret a friss gyantán</span><span class="hint-touch">Érintse meg a friss gyantát</span></p>
  </div>
</section>

<div class="marquee" aria-label="Iparágak, ahol dolgozunk"><div class="mq-track">${mq}<div aria-hidden="true">${mq}</div></div></div>

<section class="sec sec-manifesto" aria-labelledby="man-h">
  <div class="wrap">
    <p class="eyebrow" data-reveal>Fókusz</p>
    <h2 class="manifesto" id="man-h" data-reveal>Nem nappalit burkolunk. <span class="dim">Üzemet, raktárt, konyhát, mélygarázst — ahol a padlónak dolgoznia kell.</span></h2>
    <ul class="stats">
      <li data-reveal><b>10+</b><span>év tapasztalat</span><p>ipari és kereskedelmi padlórendszerekben</p></li>
      <li data-reveal style="--d:80ms"><b>1</b><span>felelős kivitelező</span><p>aljzat, vízszigetelés és bevonat egy kézben — nincs egymásra mutogatás</p></li>
      <li data-reveal style="--d:160ms"><b>0</b><span>hézag</span><p>nincs fuga, ahol a víz és a baktérium megtelepszik</p></li>
      <li data-reveal style="--d:240ms"><b>3</b><span>régió</span><p>Győr és környéke, Felvidék, Balaton</p></li>
    </ul>
  </div>
</section>

<section class="sec sec-services" id="szolgaltatasok" aria-labelledby="svc-h">
  <div class="wrap">
    ${h.head('Szolgáltatások', '<span id="svc-h">Négy szakág. <span class="dim">Egy rétegrend.</span></span>', 'A padló annyit ér, amennyit az alatta lévő aljzat. Ezért a bevonat mellett a vízszigetelést és a kőműves előkészítést is mi végezzük.')}
    <div class="svc-grid">${svc.map(([href, im, t, d, c, cls], i) => `<a class="svc gloss ${cls}" href="${href}" data-reveal style="--d:${i * 70}ms">${h.img(im, t, { sizes: cls === 'big' ? '(min-width: 900px) 60vw, 100vw' : '(min-width: 900px) 40vw, 100vw' })}<span class="svc-body"><span class="svc-n">0${i + 1}</span><b>${t}</b><span class="svc-d">${d}</span>${h.chips(c)}<span class="svc-go">${h.ICON.arrow}</span></span></a>`).join('')}</div>
  </div>
</section>

${h.marking()}
${h.configurator()}
${h.anatomy()}
${h.beforeAfter()}
${h.processBlock()}

<section class="sec sec-regions" id="regiok" aria-labelledby="reg-h">
  <div class="wrap">
    ${h.head('Szolgáltatási terület', '<span id="reg-h">Győr. Felvidék. Balaton.</span>', 'Bágyogszovátról indulunk — a Rába és a Duna között, félúton a három régió között. Válasszon települést, megmutatjuk a távolságot.')}
    ${h.serviceMap()}
    ${h.regionCards()}
  </div>
</section>

${f.html}
${h.cta()}
`,
  };
};
