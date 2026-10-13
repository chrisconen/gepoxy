export default (h) => {
  const f = h.faq([
    ['Mikor lehet kültéri vízszigetelést készíteni?', 'A folyékony membránokhoz jellemzően +10 °C feletti levegő- és aljzathőmérséklet, száraz aljzat és csapadékmentes idő kell. Ezért a teraszokat és tetőket tavasszal és ősszel ütemezzük — érdemes már télen egyeztetni.'],
    ['Járható a vízszigetelés, vagy burkolni kell?', 'Mindkettő megoldható. A PU vízszigetelés UV-álló, csúszásgátló fedéssel önmagában járófelület, de igény szerint burkolat alá is készülhet.'],
    ['Meglévő járólapra is lehet szigetelni?', 'Ha a burkolat stabilan tapad, nem üreges és nem mozog, bizonyos rendszerekkel igen. Ha a víz már a lapok alá jutott, a bontás és az aljzat helyreállítása a tartós megoldás — ezt is mi végezzük.'],
    ['Miért ázik be a terasz, ha a felülete ép?', 'A leggyakoribb ok nem a felület, hanem a csatlakozás: a falszegély, a küszöb, a lefolyó, a korlátrögzítés vagy a hiányzó vízorr. Ezeket a pontokat hálóerősítéssel, folytonosan szigeteljük.'],
    ['Pincét belülről is lehet szigetelni?', 'Igen, negatív oldali (belső) cementbázisú, kristályos vagy kenhető rendszerekkel — a nedvesség okától függően. Ehhez minden esetben helyszíni vizsgálat kell.'],
  ], 'gyik-viz');
  const hs = [
    ['Falcsatlakozás', 'A membránt a falra legalább 15 cm magasan felvezetjük, a sarkokban hálóerősítéssel. Itt ázik be a legtöbb terasz.'],
    ['Küszöb', 'Az ajtóküszöb alatt a víz befolyik a szerkezetbe. Folytonos felvezetés és lezárás a tok alatt.'],
    ['Repedés, dilatáció', 'A repedéseket kitisztítjuk és kitöltjük, a dilatációt rugalmas szalaggal hidaljuk át.'],
    ['Lefolyó', 'Gallérral, mandzsettával bekötött összefolyó — a membrán és a lefolyó egy rendszer.'],
    ['Korlátrögzítés', 'Minden áttörés potenciális beázás: a rögzítések körül külön lezárás.'],
    ['Vízorr, szegély', 'A lefutó víz ne a homlokzatra és a födém alá folyjon: élképzés és vízorr.'],
  ];
  const pos = [[118, 120], [196, 168], [300, 214], [420, 222], [585, 196], [712, 236]];
  return {
    path: 'vizszigeteles.html',
    crumb: 'Vízszigetelés',
    priority: '0.9',
    title: 'Vízszigetelés: terasz, erkély, lapostető, pince | G-Epoxy',
    description: 'Folyékony PU vízszigetelés teraszra, erkélyre, lapostetőre, pince és vizes üzemi terek szigetelése. Csatlakozások, küszöbök, lefolyók hálóerősítéssel. Győr, Felvidék, Balaton.',
    schema: [f.schema, { '@type': 'Service', name: 'Vízszigetelés', serviceType: 'Terasz, erkély, lapostető és pince vízszigetelés', provider: { '@id': h.SITE.url + '/#ceg' }, areaServed: ['Győr', 'Felvidék', 'Balaton'] }],
    body: `
${h.pageHero({ eyebrow: 'Szolgáltatás 03', h1: 'Vízszigetelés', lead: 'Terasz, erkély, lapostető, pince és vizes üzemi terek. Folyékony, hézag nélküli membránok, amelyek a részleteknél sem szakadnak meg — ott, ahol a víz valójában bejut.', image: 'vizszigeteles-terasz', alt: 'Folyékony poliuretán vízszigetelés hengerlése tetőteraszon, háttérben a Balaton', chipsList: ['PU membrán', 'UV-álló fedés', 'Repedésáthidaló', 'Hálóerősítés'], crumbs: [['Vízszigetelés']] })}

<section class="sec">
  <div class="wrap">
    ${h.head('Hol jut be a víz?', 'Nem a felületen. <span class="dim">A csatlakozásoknál.</span>', 'Egy terasz keresztmetszete hat kritikus ponttal. Vigye az egeret a pontokra vagy a listára.')}
    <figure class="xsec" data-reveal>
      <svg viewBox="0 0 800 330" role="img" aria-labelledby="xsec-t">
        <title id="xsec-t">Terasz vízszigetelés keresztmetszete a kritikus pontokkal</title>
        <defs><pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8" stroke="currentColor" stroke-width="1" opacity=".25"/></pattern></defs>
        <rect class="x-wall" x="40" y="20" width="70" height="290"/>
        <rect x="40" y="20" width="70" height="290" fill="url(#hatch)"/>
        <path class="x-slab" d="M110 236 L740 250 L740 290 L110 290Z"/>
        <path d="M110 236 L740 250 L740 290 L110 290Z" fill="url(#hatch)"/>
        <path class="x-mem" d="M110 140 L110 230 L740 244 L740 262"/>
        <path class="x-top" d="M114 144 L114 226 L736 240"/>
        <rect class="x-door" x="150" y="80" width="12" height="150"/><rect class="x-thr" x="140" y="222" width="62" height="10"/>
        <path class="x-crack" d="M300 238l-4 10 6 8-3 12"/>
        <rect class="x-drain" x="404" y="241" width="32" height="49"/>
        <rect class="x-post" x="579" y="120" width="10" height="122"/><path class="x-rail" d="M520 130H700"/>
        <path class="x-drip" d="M740 262 L760 266 L760 280"/>
        <text class="x-lbl" x="120" y="310">LEJTÉS ≥ 1,5–2% →</text>
        ${pos.map(([x, y], i) => `<g class="hs hs-${i + 1}"><circle cx="${x}" cy="${y}" r="15"/><text x="${x}" y="${y + 5}" text-anchor="middle">${i + 1}</text></g>`).join('')}
      </svg>
      <ol class="xsec-list">${hs.map(([t, d], i) => `<li data-h="${i + 1}"><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
    </figure>
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Szigetelési területek', 'Mit szigetelünk?')}
    ${h.cards([
      ['Terasz & erkély', 'Folyékony PU membrán hálóerősítéssel, UV-álló, csúszásgátló járófelülettel — burkolat nélkül is.', 'Kültér'],
      ['Lapostető', 'Hézagmentes, varratmentes szigetelés áttörésekkel, attikákkal, összefolyókkal együtt.', 'Tető'],
      ['Pince & lábazat', 'Cementbázisú, kenhető vagy kristályos rendszerek pozitív és negatív oldalról.', 'Talajnedvesség'],
      ['Vizes üzemi terek', 'Mosóterek, konyhák, élelmiszeripari helyiségek — szigetelés és műgyanta padló egy rendszerben.', 'Ipar'],
      ['Külső lépcsők & bejárók', 'Betonjavítás, élképzés, szigetelés és csúszásgátló fedés — kőműves munkával együtt.', 'Lépcső'],
      ['Aknák & tárolók', 'Technológiai aknák, gyűjtők, vizes helyiségek belső bevonata a felmérés alapján.', 'Műtárgy'],
    ])}
  </div>
</section>

${h.beforeAfter(['terasz', 'lepcso'], { title: 'Szigetelve. <span class="dim">Járhatóan.</span>' })}
${h.configurator()}
${f.html}
${h.cta('Beázik? Nézzük meg, hol.')}
`,
  };
};
