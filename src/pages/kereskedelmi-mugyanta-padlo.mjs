export default (h) => {
  const f = h.faq([
    ['Nyitvatartás alatt is tudtok dolgozni?', 'A munkát a zárva tartáshoz igazítjuk: éjszakára, hétvégére vagy szakaszokra bontva, hogy az üzlet vagy rendelő a lehető legrövidebb ideig álljon. A bevonat jellemzően 24 óra után járható.'],
    ['Milyen színben és fényességben készülhet?', 'RAL színskála szerint, matt, selyemfényű vagy fényes kivitelben. Kereskedelmi terekbe általában a matt PU fedést javasoljuk, mert jobban takarja a karcokat és nem tükröz zavaróan.'],
    ['Mennyire könnyű takarítani?', 'A hézagmentes felületen nincs fuga, amelyben a szennyeződés megül. Gépi takarítás, nedves felmosás és a szokásos tisztítószerek is használhatók; az átadáskor karbantartási útmutatót adunk.'],
    ['Lehet csúszásgátló a bejárati zóna?', 'Igen. A bejáratoknál, rámpákon és vizes zónákban a felület csúszásgátló szórással készülhet, miközben a belső tér sima marad.'],
    ['Meglévő járólapra is készülhet?', 'Bizonyos esetekben igen, ha a burkolat stabilan tapad és nem üreges. Ezt a felmérésen vizsgáljuk; sokszor a bontás és az aljzat helyreállítása a tartósabb megoldás — ezt is vállaljuk.'],
  ], 'gyik-ker');
  return {
    path: 'kereskedelmi-mugyanta-padlo.html',
    crumb: 'Kereskedelmi műgyanta padló',
    priority: '0.9',
    title: 'Kereskedelmi műgyanta padló üzletbe, garázsba, rendelőbe | G-Epoxy',
    description: 'Hézagmentes, könnyen takarítható kereskedelmi műgyanta padló üzletekbe, bemutatótermekbe, garázsokba, rendelőkbe és intézményekbe. RAL színben, zárva tartáshoz igazított kivitelezéssel.',
    schema: [f.schema, { '@type': 'Service', name: 'Kereskedelmi műgyanta padló', serviceType: 'Kereskedelmi padlóbevonat', provider: { '@id': h.SITE.url + '/#ceg' }, areaServed: ['Győr', 'Felvidék', 'Balaton'] }],
    body: `
${h.pageHero({ eyebrow: 'Szolgáltatás 02', h1: 'Kereskedelmi<br>műgyanta padló', lead: 'Napi több száz lépés, bevásárlókocsi, raklap és takarítógép. Hézagmentes, karcálló, könnyen tisztítható felület üzletekbe, bemutatótermekbe, garázsokba és intézményekbe.', image: 'kereskedelmi-folyoso', alt: 'Fényes kereskedelmi műgyanta padló bevásárlóközpont folyosóján', chipsList: ['Önterülő epoxi', 'Matt PU fedés', 'RAL szín', 'Csúszásgátló zónák'], crumbs: [['Kereskedelmi műgyanta padló']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Miért műgyanta?</p><h2>Gyorsan takarítható. <span class="dim">Lassan kopik. Nem fugázott.</span></h2><p class="lead">Egy kereskedelmi tér padlóján a vevő, a személyzet és a takarítógép is nyomot hagy. A hézagmentes műgyanta felületen nincs fuga, nincs kiálló lapszél, nincs repedő járólap — és a felújítás sem jelent hetekig tartó bontást.</p><p>Nem dekoratív dizájnpadlót készítünk, hanem funkcionális, tartós felületet: egyszínű RAL kivitelben, matt vagy selyemfényű fedéssel, a forgalomhoz méretezett rétegvastagsággal.</p>`,
      h.sheet('Kereskedelmi adatlap', [['Rendszervastagság', '2–3 mm'], ['Felület', 'matt / selyem / fényes'], ['Szín', 'RAL szerint'], ['Járható', '≈ 24 óra után'], ['Csúszásgátlás', 'zónánként állítható'], ['Ütemezés', 'zárva tartáshoz igazítva']]))}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Felhasználás', 'Ahol a kereskedelmi padló dolgozik')}
    ${h.cards([
      ['Üzletek & áruházak', 'Kocsiforgalom, raklapos árufeltöltés, napi gépi takarítás — kopásálló, egyszínű felület.', 'Retail'],
      ['Bemutatótermek & autószalonok', 'Nagy, egybefüggő, hézagmentes felület, amely bírja a gépjárművek súlyát és a gumiabroncs-nyomokat.', 'Showroom'],
      ['Gyógyszertárak & rendelők', 'Fertőtleníthető, hézagmentes, falra felhajtható padló — higiéniai követelményekre.', 'Egészségügy'],
      ['Állatorvosi rendelők & menhelyek', 'Folyamatos mosás, fertőtlenítés és állati terhelés: zárt, csúszásgátló felület.', 'Intézmény'],
      ['Garázsok & mélygarázsok', 'Olaj, sólé, gumiabroncs: szórt, csúszásgátló bevonat, felfestett parkolóhelyekkel.', 'Parkolás'],
      ['Irodák, lépcsőházak, közösségi terek', 'Csendes, tartós, könnyen tisztítható felület, ahol sok ember fordul meg naponta.', 'Közösségi'],
    ])}
  </div>
</section>

${h.beforeAfter(['garazs', 'lepcso'], { title: 'Ugyanaz a tér. <span class="dim">Más szint.</span>' })}

<section class="sec">
  <div class="wrap">
    ${h.head('Referencia', 'Kereskedelmi munkáink')}
    ${h.refs([
      ['menhely-padlo-01', 'Hézagmentes műgyanta padló győri kutyamenhely kennelfolyosóján', 'Kutyamenhely, Győr', 'Mosható, csúszásgátló', 'kereskedelmi', true],
      ['uzlet-mugyanta-padlo', 'Sötét, fényes műgyanta padló üzlethelyiségben', 'Üzlethelyiség', 'Önterülő rendszer', 'kereskedelmi'],
      ['garazs-padlo-01', 'Szórt műgyanta padló garázsban', 'Garázs', 'Szórt bevonat', 'kereskedelmi'],
      ['menhely-padlo-02', 'Műgyanta padló kennelek között', 'Menhely — kennelsor', 'Fertőtleníthető', 'kereskedelmi'],
      ['garazs-padlo-02', 'Szürke műgyanta garázspadló', 'Garázs', 'Olajálló felület', 'kereskedelmi'],
    ])}
  </div>
</section>

${h.configurator()}
${f.html}
${h.cta('Üzlet, garázs, rendelő? Nézzük meg.')}
`,
  };
};
