export default (h) => {
  const f = h.faq([
    ['Miért nem elég „csak lefesteni” a betont?', 'Mert a bevonat annyit ér, amennyit az aljzat: ha laza, poros, nedves vagy repedt, a legjobb műgyanta is leválik. A csiszolás, javítás és portalanítás nem extra, hanem a rendszer része.'],
    ['Folyókát, lefolyót is beépítetek?', 'Igen. Élelmiszeripari és vizes terekben a folyókák kibontását, beépítését, szintre állítását és a lejtésképzést a padló előtt elvégezzük — így a víz oda folyik, ahová kell.'],
    ['Lépcsőt is felújítotok?', 'Igen: a laza részek eltávolítása, betonpótlás, élképzés, majd vízszigetelő és csúszásgátló bevonat. A referenciák között előtte–utána fotókat is talál.'],
    ['Önálló kőműves munkát is vállaltok?', 'Elsősorban a padló- és szigetelési munkáinkhoz kapcsolódó kőműves feladatokat végezzük: bontás, aljzatjavítás, kiegyenlítés, folyókák, lábazatok, lépcsők. Így egy kivitelező felel az egészért.'],
  ], 'gyik-kom');
  return {
    path: 'komuves-munkak.html',
    crumb: 'Aljzat-előkészítés & kőműves munkák',
    priority: '0.8',
    title: 'Aljzat-előkészítés, betonjavítás, kőműves munkák | G-Epoxy Győr',
    description: 'Aljzatcsiszolás, betonjavítás, repedésjavítás, lejtésképzés, folyókák beépítése és lépcsőfelújítás műgyanta padló és vízszigetelés alá. Egy felelős kivitelező Győr és környékén.',
    schema: [f.schema, { '@type': 'Service', name: 'Aljzat-előkészítés és kőműves munkák', serviceType: 'Betonjavítás, aljzat-előkészítés', provider: { '@id': h.SITE.url + '/#ceg' }, areaServed: ['Győr', 'Felvidék', 'Balaton'] }],
    body: `
${h.pageHero({ eyebrow: 'Szolgáltatás 04', h1: 'Aljzat &amp;<br>kőműves munkák', lead: 'A műgyanta padló az utolsó néhány milliméter. Alatta minden más: csiszolás, betonjavítás, lejtés, folyókák, falcsatlakozás. Ezt is mi csináljuk — ezért mi is felelünk érte.', image: 'aljzat-elokeszites', alt: 'Gyémántcsiszoló gép ipari betonaljzat előkészítése közben', chipsList: ['Gyémántcsiszolás', 'Betonjavítás', 'Lejtésképzés', 'Folyókák', 'Lépcsők'], crumbs: [['Aljzat & kőműves munkák']] })}

<section class="sec">
  <div class="wrap">
    ${h.split(`<p class="eyebrow">Miért egy kézben?</p><h2>Ha az aljzat rossz, <span class="dim">a padló is rossz lesz.</span></h2><p class="lead">A leggyakoribb padlóhiba nem a műgyantában van, hanem alatta: nedves beton, laza cementtej, rossz lejtés, rosszul beépített folyóka. Ha a kőműves és a padlós két külön cég, a hibánál mindenki a másikra mutat.</p><p>Nálunk nincs ilyen: a bontástól a fedőrétegig ugyanaz a csapat dolgozik, és ugyanaz a cég vállal garanciát.</p>`,
      h.sheet('Előkészítés — mérjük', [['Nedvességtartalom', 'mérés a bevonat előtt'], ['Felületi szilárdság', 'tapadás / húzószilárdság'], ['Síkpontosság', 'lejtés, egyenetlenség'], ['Repedések', 'mozgó / nyugvó'], ['Szennyeződés', 'olaj, régi bevonat']]))}
  </div>
</section>

<section class="sec sec-dark2">
  <div class="wrap">
    ${h.head('Munkanemek', 'Amit a padló alatt elvégzünk')}
    ${h.cards([
      ['Gépi csiszolás & portalanítás', 'Gyémántszerszámos csiszolás: eltávolítja a cementtejet, a régi bevonatot és a szennyeződést, tapadóképes felületet ad.', '01'],
      ['Bontás', 'Régi burkolat, sérült esztrich, felvált bevonat bontása és elszállításra előkészítése.', '02'],
      ['Betonjavítás & repedésjavítás', 'Kitöredezett élek, kagylósodás, repedések javítása javítóhabarccsal vagy műgyantával.', '03'],
      ['Kiegyenlítés & lejtésképzés', 'Önterülő kiegyenlítő vagy esztrich, lejtés a folyókák és összefolyók felé.', '04'],
      ['Folyókák & lefolyók', 'Rozsdamentes folyókák, lefolyók kibontása, beépítése, szintre állítása.', '05'],
      ['Lábazatok & falcsatlakozások', 'Lekerekített falcsatlakozás, lábazat kialakítása — higiénikus, takarítható sarkok.', '06'],
      ['Lépcsőfelújítás', 'Laza részek eltávolítása, betonpótlás, élképzés, majd szigetelő és csúszásgátló bevonat.', '07'],
      ['Szigetelés előkészítése', 'Lejtésképzés, vízorr, áttörések előkészítése teraszok és tetők szigetelése előtt.', '08'],
    ], 'cards-4')}
  </div>
</section>

${h.anatomy()}
${h.beforeAfter(['lepcso', 'garazs'], { title: 'Betonjavítás. <span class="dim">Látható eredménnyel.</span>' })}

<section class="sec">
  <div class="wrap">
    ${h.head('Részlet', 'Lépcsőfelújítás közben')}
    ${h.refs([
      ['lepcso-javitas', 'Lépcső betonjavítás és élképzés narancssárga élvédőkkel', 'Élképzés és betonpótlás', 'Kőműves munka', 'komuves', true],
      ['lepcso-javitas-reszlet', 'Repedt lépcsőfok javítás közben', 'Repedések feltárása', 'Előkészítés', 'komuves'],
      ['lepcso-kesz', 'Felújított lépcső csúszásgátló műgyanta bevonattal', 'Kész lépcső', 'Csúszásgátló bevonat', 'komuves'],
    ])}
  </div>
</section>
${f.html}
${h.cta('Rossz az aljzat? Ott kezdjük.')}
`,
  };
};
