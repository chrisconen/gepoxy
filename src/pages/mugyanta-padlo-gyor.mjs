export default (h) => {
  const f = h.faq([
    ['Milyen gyorsan tudtok kijönni felmérni Győrben?', 'Bázisunk Bágyogszováton van, Győrtől kb. 24 km-re, így a győri és a környékbeli felméréseket egyeztetett időpontban, rövid határidővel vállaljuk.'],
    ['Mely településeken dolgoztok Győr környékén?', 'Győr mellett Mosonmagyaróvár, Csorna, Kapuvár, Sopron, Pápa, Pannonhalma, Kisbér, Tata, Tatabánya, Komárom és a köztük lévő települések — ipari parkokban, üzemekben, telephelyeken.'],
    ['Ipari parki csarnokban, működő gyártás mellett is dolgoztok?', 'Igen. A munkát szakaszolva, a műszakrendhez, hétvégéhez vagy tervezett leálláshoz igazítva végezzük; az ütemtervet az ajánlattal együtt kapja meg.'],
    ['Társasházi mélygarázst is vállaltok Győrben?', 'Igen: repedésáthidaló, csúszásgátló parkolóházi bevonat, felfestett parkolóhelyekkel — szükség esetén a födém és a rámpa betonjavításával együtt.'],
  ], 'gyik-gyor');
  return {
    path: 'mugyanta-padlo-gyor.html',
    crumb: 'Műgyanta padló Győr',
    priority: '0.9',
    title: 'Műgyanta padló Győr és környéke — ipari, kereskedelmi | G-Epoxy',
    description: 'Ipari és kereskedelmi műgyanta padló Győrben és környékén: üzemek, raktárak, ipari parki csarnokok, mélygarázsok. Vízszigetelés és aljzat-előkészítés. Bázisunk Bágyogszováton, Győrtől 24 km-re.',
    schema: [f.schema],
    body: `
${h.pageHero({ eyebrow: 'Régió · Győr–Moson–Sopron · Komárom–Esztergom', h1: 'Műgyanta padló<br>Győr és környéke', lead: 'Ipari és kereskedelmi műgyanta padló, vízszigetelés és aljzat-előkészítés Győrben és 60–80 km-es körzetében. Bágyogszovátról indulunk — Győrtől alig 24 km-re.', image: 'ipari-csarnok', alt: 'Fényes ipari műgyanta padló nagy gyártócsarnokban', chipsList: ['Ipari parkok', 'Logisztika', 'Élelmiszeripar', 'Mélygarázsok'], crumbs: [['Műgyanta padló Győr']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Győri ipar, győri padlók</p><h2>A város, ahol a padlónak <span class="dim">három műszakot kell bírnia.</span></h2><p class="lead">Győr és térsége az ország egyik legerősebb ipari régiója: autóipari beszállítók, gépgyártás, logisztikai központok az M1 és az M19 mentén, élelmiszeripari üzemek és egyre több raktár. Ezekben a csarnokokban a padló termelőeszköz — ha megáll, a gyártás is.</p><p>Győr környéki munkáinknál ezért az üzemidő a legfontosabb szempont: szakaszolt kivitelezés, hétvégi munkavégzés, gyorsan terhelhető rendszerek. A helyszíni felméréstől a kőműves előkészítésen át a fedőrétegig egy csapat dolgozik.</p>`,
      h.sheet('Győr — röviden', [['Bázis', 'Bágyogszovát'], ['Győr', h.dist('Győr')], ['Mosonmagyaróvár', h.dist('Mosonmagyaróvár')], ['Sopron', h.dist('Sopron')], ['Tatabánya', h.dist('Tatabánya')], ['Ügyintézés', 'helyszíni felmérés, tételes ajánlat']]))}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Jellemző munkák', 'Amit Győr környékén a leggyakrabban kérnek')}
    ${h.cards([
      ['Ipari parki csarnokok', 'Önterülő epoxi padló felfestett közlekedési utakkal, gyártó- és szerelőcsarnokokba, beszállítói üzemekbe.', 'Gyártás'],
      ['Logisztikai raktárak', 'Kopásálló, pormentes padló targoncaforgalomra — régi, poros betonpadlók felújítása is.', 'Logisztika'],
      ['Élelmiszeripari üzemek', 'PU-cement, csúszásgátló, hézagmentes padló folyókákkal és lejtésképzéssel.', 'Élelmiszer'],
      ['Szervizek & műhelyek', 'Olaj- és üzemanyagálló, csúszásgátló bevonat autószervizekbe, gépműhelyekbe.', 'Műhely'],
      ['Társasházi mélygarázsok', 'Repedésáthidaló parkolóházi rendszer, rámpák, felfestések, betonjavítás.', 'Parkolás'],
      ['Teraszok & lapostetők', 'Folyékony PU vízszigetelés, UV-álló, csúszásgátló járófelülettel.', 'Szigetelés'],
    ])}
  </div>
</section>

<section class="sec">
  <div class="wrap">
    ${h.head('Győri referencia', 'Kutyamenhely, Győr', 'Mosható, fertőtleníthető, csúszásgátló, hézagmentes felület a kennelek között — ahol naponta többször takarítanak, és a padló vizes.')}
    ${h.refs([
      ['menhely-padlo-01', 'Hézagmentes műgyanta padló győri kutyamenhely kennelfolyosóján', 'Kutyamenhely, Győr', 'Mosható, csúszásgátló', 'kereskedelmi', true],
      ['menhely-padlo-02', 'Műgyanta padló kennelek között a győri menhelyen', 'Kennelsor', 'Fertőtleníthető felület', 'kereskedelmi'],
      ['husipari-uzem-kesz-folyoka', 'Műgyanta padló folyókákkal élelmiszeripari üzemben', 'Élelmiszeripari üzem', 'Folyókák egy síkban', 'ipari'],
    ])}
  </div>
</section>

<section class="sec sec-regions">
  <div class="wrap">
    ${h.head('Települések', 'Győr és környéke — ahol dolgozunk', 'Távolság légvonalban a bágyogszováti bázisunktól.')}
    ${h.serviceMap('gyor')}
  </div>
</section>

${h.configurator()}
${f.html}
<section class="sec"><div class="wrap">${h.head('További régiók', 'A Dunán túl és a Balatonnál is.')}${h.regionCards('gyor')}</div></section>
${h.cta('Győr környékén? Kint vagyunk.')}
`,
  };
};
