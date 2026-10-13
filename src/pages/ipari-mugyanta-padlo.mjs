export default (h) => {
  const f = h.faq([
    ['Működő üzemben is tudtok dolgozni?', 'Igen. A munkát szakaszolva, műszakrendhez, hétvégéhez vagy tervezett leálláshoz igazítva ütemezzük, hogy a termelés a lehető legkevésbé álljon. Az ütemtervet az ajánlattal együtt adjuk.'],
    ['Mennyi idő után terhelhető az ipari padló?', 'Jellemzően 24 óra után gyalogosan járható, könnyű forgalom 2–3 nap után, teljes mechanikai és vegyi terhelés kb. 7 nap után. Gyorsan kötő rendszerekkel ez rövidíthető — a pontos értéket a választott rendszer és a hőmérséklet határozza meg.'],
    ['Mi az ESD padló és kinek van rá szüksége?', 'Az ESD (elektrosztatikus kisülés elleni) padló a statikus töltést földelőhálózaton keresztül elvezeti. Elektronikai gyártásban, szervertermekben, vezérlőtermekben és robbanásveszélyes környezetben szükséges. Vezető (0,025–1 MΩ) és disszipatív (1–1000 MΩ) kivitelben készül.'],
    ['Felújítható a régi, kopott ipari padló?', 'Az esetek többségében igen: a régi bevonatot vagy a laza réteget lecsiszoljuk, a sérüléseket kijavítjuk, és új rendszert hordunk fel. Hogy a régi bevonat maradhat-e alapnak, azt tapadásvizsgálattal döntjük el.'],
    ['Milyen vastag legyen az ipari padló?', 'A terheléstől függ. Könnyű forgalomra elég egy 0,3–0,5 mm-es bevonat, raktárba és gyártásba 2–4 mm önterülő rendszer, élelmiszeriparba és hősokkos környezetbe 4–9 mm PU-cement.'],
  ], 'gyik-ipari');
  return {
    path: 'ipari-mugyanta-padlo.html',
    crumb: 'Ipari műgyanta padló',
    priority: '0.9',
    title: 'Ipari műgyanta padló — epoxi, PU-cement, ESD | G-Epoxy Győr',
    description: 'Ipari műgyanta padló élelmiszeripari üzembe, raktárba, gyártócsarnokba és műhelybe: önterülő epoxi, PU-cement, ESD és csúszásgátló rendszerek. Győr, Felvidék, Balaton.',
    schema: [f.schema, { '@type': 'Service', name: 'Ipari műgyanta padló', serviceType: 'Ipari padlóbevonat', provider: { '@id': h.SITE.url + '/#ceg' }, areaServed: ['Győr', 'Felvidék', 'Balaton'] }],
    body: `
${h.pageHero({ eyebrow: 'Szolgáltatás 01', h1: 'Ipari<br>műgyanta padló', lead: 'Hézagmentes, vegyszerálló és csúszásbiztos padlórendszerek, amelyek bírják a targoncát, a napi mosást és a három műszakot. Élelmiszeripartól a logisztikai csarnokig.', image: 'husipari-uzem-kesz-folyoka', alt: 'Kész ipari műgyanta padló rozsdamentes folyókával élelmiszeripari üzemben', chipsList: ['Epoxi', 'PU-cement', 'ESD', 'R9–R13', '0,3–9 mm'], crumbs: [['Ipari műgyanta padló']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Mi számít egy ipari padlónál?</p><h2>Nem a szín. <span class="dim">A terhelés, a vegyszer, a hő és a víz.</span></h2><p class="lead">Egy ipari padlót nem katalógusból választunk, hanem a használatból tervezünk. Mi fog rajta közlekedni? Mi ömlik rá? Milyen hőmérsékletű vízzel mossák? Csúszik-e nedvesen? Ebből születik a rétegrend — és ebből az ár is.</p><p>Az aljzat-előkészítést, a folyókák beépítését és a szükséges vízszigetelést is mi végezzük, így a teljes rendszerért egy kivitelező felel.</p>`,
      h.sheet('Ipari adatlap', [['Rendszervastagság', '0,3–9 mm'], ['Csúszásgátlás', 'R9–R13'], ['Járható', '≈ 24 óra után'], ['Teljes terhelés', '≈ 7 nap után'], ['Felület', 'sima / szórt / érdes'], ['Szín', 'RAL szerint'], ['Kivitelezés', 'szakaszolva, működő üzemben is']]))}
    ${h.cards([
      ['Mechanikai terhelés', 'Targonca, raklapemelő, kerékterhelés, leeső szerszám és ütés. A rétegvastagságot és a töltöttséget erre méretezzük.', 'Terhelés'],
      ['Vegyszerállóság', 'Savak, lúgok, olajok, üzemanyagok, fertőtlenítő- és tisztítószerek — a tényleges vegyszerlista alapján választunk rendszert.', 'Vegyszer'],
      ['Hő és hősokk', 'Forró vizes, gőzös mosás, sütők, hűtőkamrák: itt a PU-cement rendszerek bírják a hirtelen hőmérséklet-változást.', 'Hő'],
      ['Csúszásbiztonság', 'Nedves, zsíros, poros közeg? A kvarchomok-szórás finomhangolásával R9 és R13 között állítjuk be.', 'Csúszás'],
      ['Higiénia', 'Hézagmentes felület, zárt falcsatlakozás, lejtés a folyókák felé — nincs fuga, ahol baktérium vagy víz megtelepszik.', 'Higiénia'],
      ['Üzemidő', 'A leállás pénzbe kerül. Szakaszolt kivitelezés, hétvégi munka, gyorsan terhelhető rendszerek.', 'Idő'],
    ])}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Rendszereink', 'Ipari padlórendszerek', 'Hat alaprendszer, amelyekből a konkrét környezetre szabott rétegrend összeáll.')}
    ${h.cards([
      ['Önterülő epoxi padló', 'Sima, pormentes, kopásálló felület raktárakba, gyártó- és szerelőcsarnokokba. 2–4 mm, RAL színben, felfestett közlekedési utakkal.', '2–4 mm'],
      ['PU-cement padló', 'Poliuretán-cement rendszer élelmiszeripari üzemekbe és nagykonyhákba: hősokkálló, vegyszerálló, csúszásgátló. 4–9 mm.', '4–9 mm'],
      ['Szórt csúszásgátló rendszer', 'Kvarchomokkal szórt többrétegű rendszer műhelyekbe, mosóterekbe, rámpákra, nedves zónákba. R10–R13.', 'R10–R13'],
      ['ESD vezetőképes padló', 'Rézszalagos földelőhálóval és vezetőképes rétegekkel — elektronikai gyártásba, szerverterembe, vezérlőterembe.', 'ESD'],
      ['Vékonyrétegű ipari bevonat', 'Portalanító, pórustömítő bevonat könnyebb terhelésre, raktárakba és tárolókba — gyors és költséghatékony.', '0,3–0,5 mm'],
      ['Közlekedési utak & jelölések', 'Gyalogos utak, targoncasávok, tárolási zónák és biztonsági jelölések, tartós műgyanta festéssel.', 'Jelölés'],
    ], 'cards-sys')}
  </div>
</section>

${h.configurator()}

<section class="sec">
  <div class="wrap">
    ${h.head('Referencia', 'Ipari padló a gyakorlatban', 'Húsipari üzem és ESD padló — saját munkáink. A teljes folyamat a <a href="referenciak.html">referenciák</a> között.')}
    ${h.refs([
      ['husipari-uzem-07-atadas', 'Kész hézagmentes műgyanta padló húsipari üzem folyosóján', 'Húsipari üzem — átadás', 'Hézagmentes, csúszásgátló', 'ipari', true],
      ['husipari-uzem-kesz-folyoka', 'Műgyanta padló rozsdamentes folyókákkal', 'Folyókák egy síkban', 'Élelmiszeripar', 'ipari'],
      ['esd-padlo-02', 'Vezetőképes ESD műgyanta padló kapcsolószekrények előtt', 'ESD padló', 'Vezetőképes rendszer', 'ipari'],
      ['esd-padlo-03', 'ESD padló narancssárga jelölt zónával', 'ESD zóna', 'Jelölt munkaterület', 'ipari'],
      ['husipari-uzem-kesz-folyoso', 'Szórt felületű ipari műgyanta padló folyosón', 'Szórt felület', 'R11+ csúszásgátlás', 'ipari'],
    ])}
  </div>
</section>

${h.processBlock()}
${f.html}
${h.cta('Ipari padló? Kezdjük a felméréssel.')}
`,
  };
};
