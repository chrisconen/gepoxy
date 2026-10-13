export default (h) => {
  const f = h.faq([
    ['Mikor érdemes megrendelni, hogy a szezonra elkészüljön?', 'A kültéri munkák (teraszok, erkélyek, tetők) jellemzően +10 °C felett, száraz időben készülnek, ezért tavasszal és ősszel ütemezzük őket. Ha a szezonnyitásra kell elkészülnie, érdemes már télen egyeztetni. Beltéri konyhák, üzemi terek egész évben, a zárva tartás alatt.'],
    ['Milyen padló kell egy borászatba?', 'A must és a bor savas, a tisztítás vizes és vegyszeres, a targoncák és tartályok nehezek. Hézagmentes, saválló, csúszásgátló rendszer kell, lejtéssel a folyókák felé — jellemzően PU-cement vagy vegyszerálló epoxi.'],
    ['Működő étterem vagy hotel konyhájában is dolgoztok?', 'Igen, a zárva tartáshoz vagy szezonon kívüli időszakhoz igazítva, szakaszolva. A konyhai padló hézagmentes, csúszásgátló és magasnyomású mosással tisztítható.'],
    ['Teraszra járólap helyett mehet közvetlenül a szigetelés?', 'Igen. A folyékony PU vízszigetelés UV-álló, csúszásgátló fedéssel önmagában járófelület, így nincs fuga és nincs üreges lap, ahol a víz bejut.'],
  ], 'gyik-balaton');
  return {
    path: 'mugyanta-padlo-balaton.html',
    crumb: 'Műgyanta padló Balaton',
    priority: '0.9',
    title: 'Műgyanta padló és vízszigetelés a Balatonnál | G-Epoxy',
    description: 'Műgyanta padló hotel- és éttermi konyhákba, borászatokba, üzemekbe; terasz, erkély és lapostető vízszigetelés a Balatonnál: Siófok, Balatonfüred, Keszthely, Veszprém, Fonyód, Tapolca.',
    schema: [f.schema],
    body: `
${h.pageHero({ eyebrow: 'Régió · Balaton · Veszprém megye · Somogy', h1: 'Műgyanta padló<br>a Balatonnál', lead: 'Hotel- és éttermi konyhák, borászatok, üzemi terek padlója; teraszok, erkélyek, lapostetők vízszigetelése — szezon előtt, ütemezetten. Siófoktól Keszthelyig, Veszprémtől Fonyódig.', image: 'vizszigeteles-terasz', alt: 'Tetőterasz folyékony vízszigetelése, háttérben a Balaton', chipsList: ['Vendéglátás', 'Borászatok', 'Teraszok', 'Szezon előtt'], crumbs: [['Műgyanta padló Balaton']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Szezonra készre</p><h2>A Balatonnál a határidő <span class="dim">a szezonnyitás.</span></h2><p class="lead">A tó körül a padló és a szigetelés kétféle terhelést kap: nyáron a vendégforgalmat — konyhák, kiszolgáló terek, teraszok —, télen a fagyot, a nedvességet és a hőingadozást. Ami ősszel beázik, tavasszal már nem javítható nyugodtan.</p><p>Ezért a balatoni munkákat a szezonhoz ütemezzük: kültéri szigetelést tavasszal és ősszel, beltéri konyhákat és üzemi tereket a zárva tartás alatt. A helyszíni felméréstől a kőműves előkészítésig egy csapat dolgozik.</p>`,
      h.sheet('Balaton — röviden', [['Veszprém', h.dist('Veszprém')], ['Balatonfüred', h.dist('Balatonfüred')], ['Siófok', h.dist('Siófok')], ['Keszthely', h.dist('Keszthely')], ['Kültéri munkák', 'tavasz, ősz · +10 °C felett'], ['Beltéri munkák', 'egész évben']]))}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Jellemző munkák', 'A tó körül ezekre van a legtöbb igény')}
    ${h.cards([
      ['Hotel- és éttermi konyhák', 'Hézagmentes, csúszásgátló PU-cement padló folyókákkal — bírja a forró vizes mosást és a zsírt.', 'Vendéglátás'],
      ['Borászatok & pincészetek', 'Saválló, mosható, csúszásgátló padló a feldolgozóba, palackozóba, tartálytérbe.', 'Bor'],
      ['Wellness kiszolgáló terek & mosodák', 'Vizes, párás terek szigetelése és hézagmentes, könnyen takarítható padlója.', 'Wellness'],
      ['Teraszok, erkélyek, lapostetők', 'Folyékony PU vízszigetelés UV-álló, csúszásgátló járófelülettel — fagyálló, rugalmas.', 'Szigetelés'],
      ['Hajó- és géptárolók, műhelyek', 'Olaj- és üzemanyagálló, kopásálló bevonat tárolókba és szervizekbe.', 'Műhely'],
      ['Üzletek & szálláshelyek közös terei', 'Könnyen takarítható, tartós felület nagy szezonális forgalomra.', 'Kereskedelem'],
    ])}
  </div>
</section>

${h.beforeAfter(['terasz', 'lepcso'], { title: 'Teraszok, lépcsők. <span class="dim">Fagy után is.</span>' })}

<section class="sec sec-regions">
  <div class="wrap">
    ${h.head('Települések', 'Balatoni települések, ahol dolgozunk', 'Észak- és dél-parton egyaránt; távolság légvonalban a bágyogszováti bázisunktól.')}
    ${h.serviceMap('balaton')}
  </div>
</section>

${h.configurator()}
${f.html}
<section class="sec"><div class="wrap">${h.head('További régiók', 'Győr környékén és a Felvidéken is.')}${h.regionCards('balaton')}</div></section>
${h.cta('Balatoni projekt? Ütemezzük a szezon elé.')}
`,
  };
};
