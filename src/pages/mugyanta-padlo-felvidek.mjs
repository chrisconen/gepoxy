export default (h) => {
  const f = h.faq([
    ['Szlovákiai, felvidéki címre is adtok ajánlatot?', 'Igen. Rendszeresen dolgozunk a Felvidék magyarlakta településein — a helyszíni felmérés és az ajánlat ugyanúgy zajlik, mint Magyarországon.'],
    ['Milyen nyelven zajlik az ügyintézés?', 'Magyarul: a felméréstől az ajánlaton át az átadásig.'],
    ['Meddig vállaltok munkát a Felvidéken?', 'Jellemzően a Csallóköz és a Mátyusföld településein, Pozsony környékétől (Somorja, Szenc) Komáromon, Gútán, Érsekújváron át Párkányig.'],
    ['Mezőgazdasági üzembe, géptárolóba is készül műgyanta padló?', 'Igen: géptárolókba, műhelyekbe olaj- és üzemanyagálló, csúszásgátló bevonat; feldolgozóüzemekbe, hűtőházakba hézagmentes, mosható élelmiszeripari padló.'],
  ], 'gyik-felvidek');
  return {
    path: 'mugyanta-padlo-felvidek.html',
    crumb: 'Műgyanta padló Felvidék',
    priority: '0.9',
    title: 'Műgyanta padló Felvidék – Komárom, Dunaszerdahely | G-Epoxy',
    description: 'Ipari és kereskedelmi műgyanta padló, vízszigetelés a Felvidéken: Komárom (Komárno), Dunaszerdahely, Somorja, Nagymegyer, Gúta, Érsekújvár, Galánta, Párkány. Magyar nyelvű ügyintézés.',
    schema: [f.schema],
    body: `
${h.pageHero({ eyebrow: 'Régió · Szlovákia · Csallóköz · Mátyusföld', h1: 'Műgyanta padló<br>a Felvidéken', lead: 'Ipari és kereskedelmi műgyanta padló, vízszigetelés és aljzat-előkészítés Szlovákia magyarlakta településein — Komáromtól Dunaszerdahelyen át Párkányig. Magyar nyelven, egy felelős kivitelezőtől.', image: 'elelmiszeripari-padlo', alt: 'Hézagmentes vörös PU-cement padló élelmiszer-feldolgozó üzemben', chipsList: ['Komárno', 'Dunajská Streda', 'Šamorín', 'Nové Zámky', 'Štúrovo'], crumbs: [['Műgyanta padló Felvidék']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Csallóköztől Párkányig</p><h2>A Duna túloldala <span class="dim">— közelebb, mint gondolná.</span></h2><p class="lead">A Csallóköz és a Mátyusföld gazdasága a földre épül: zöldség- és gabonafeldolgozás, tej- és húsipar, hűtőházak, mezőgazdasági géptárolók. A pozsonyi agglomeráció vonzásában Somorja, Szenc és Dunaszerdahely környékén egyre több logisztikai csarnok és gyártóüzem épül.</p><p>Bágyogszovátról a felvidéki települések nagy része egy-másfél órán belül elérhető. Ugyanazzal a csapattal, ugyanazzal a rétegrend-tervezéssel és garanciával dolgozunk, mint Magyarországon — és magyarul beszélünk.</p>`,
      h.sheet('Felvidék — röviden', [['Komárom · Komárno', h.dist('Komárom')], ['Dunaszerdahely', h.dist('Dunaszerdahely')], ['Somorja · Šamorín', h.dist('Somorja')], ['Érsekújvár', h.dist('Érsekújvár')], ['Párkány · Štúrovo', h.dist('Párkány')], ['Ügyintézés', 'magyar nyelven']]))}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Jellemző munkák', 'Amire a Felvidéken a leggyakrabban szükség van')}
    ${h.cards([
      ['Élelmiszer-feldolgozók & hűtőházak', 'Hézagmentes, mosható, csúszásgátló PU-cement padló folyókákkal, hősokkra méretezve.', 'Élelmiszer'],
      ['Mezőgazdasági géptárolók', 'Olaj- és üzemanyagálló, kopásálló bevonat műhelyekbe és géptárolókba.', 'Agrár'],
      ['Logisztikai csarnokok', 'Önterülő epoxi padló targoncaforgalomra, a Szenc–Somorja–Dunaszerdahely tengely mentén.', 'Logisztika'],
      ['Szervizek & üzletek', 'Csúszásgátló műhelypadló és könnyen takarítható kereskedelmi felület.', 'Kereskedelem'],
      ['Teraszok & lapostetők', 'Folyékony PU vízszigetelés UV-álló, járható fedéssel.', 'Szigetelés'],
      ['Betonjavítás & lejtésképzés', 'Az aljzat helyreállítása, folyókák, lépcsők — a padló alá.', 'Kőműves'],
    ])}
  </div>
</section>

<section class="sec sec-regions">
  <div class="wrap">
    ${h.head('Települések', 'Felvidéki települések, ahol dolgozunk', 'Magyar és szlovák névvel; távolság légvonalban a bágyogszováti bázisunktól.')}
    ${h.serviceMap('felvidek')}
  </div>
</section>

<section class="sec sec-sk" lang="sk">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Slovensky</p><h2>Epoxidové podlahy <span class="dim">na južnom Slovensku</span></h2><p class="lead">Priemyselné a komerčné epoxidové a polyuretánové podlahy, hydroizolácie a príprava podkladu — Komárno, Dunajská Streda, Šamorín, Veľký Meder, Kolárovo, Nové Zámky, Galanta, Šaľa, Štúrovo.</p><p>Bezškárové, chemicky odolné a protišmykové podlahy pre potravinárstvo, sklady, dielne, garáže a obchody. Cenovú ponuku vám radi pripravíme po obhliadke na mieste — kontaktujte nás telefonicky alebo e-mailom.</p>`,
      h.sheet('Kontakt', [['Telefón', `<a href="tel:${h.SITE.tel}">${h.SITE.phone}</a>`], ['E-mail', `<a href="mailto:${h.SITE.email}">${h.SITE.email}</a>`], ['Komunikácia', 'v maďarčine']]))}
  </div>
</section>

${h.configurator()}
${f.html}
<section class="sec"><div class="wrap">${h.head('További régiók', 'Győr környékén és a Balatonnál is.')}${h.regionCards('felvidek')}</div></section>
${h.cta('Felvidéki projekt? Beszéljünk magyarul.')}
`,
  };
};
