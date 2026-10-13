export default (h) => {
  const all = [
    ['husipari-uzem-07-atadas', 'Kész hézagmentes műgyanta padló húsipari üzem folyosóján', 'Húsipari üzem — átadás', 'Ipari · kőműves', 'ipari komuves', true],
    ['husipari-uzem-kesz-folyoka', 'Műgyanta padló rozsdamentes folyókákkal húsipari üzemben', 'Folyókák egy síkban', 'Élelmiszeripar', 'ipari komuves'],
    ['husipari-uzem-02-lefolyok', 'Folyókák beépítése az aljzatba műgyanta padló előtt', 'Folyókák beépítése', 'Kőműves munka', 'komuves'],
    ['husipari-uzem-05-alapozas', 'Alapozott aljzat narancssárga jelölésekkel', 'Alapozás', 'Rétegrend', 'ipari'],
    ['esd-padlo-02', 'Vezetőképes ESD műgyanta padló kapcsolószekrények előtt', 'ESD padló', 'Vezetőképes rendszer', 'ipari', true],
    ['esd-padlo-03', 'ESD padló narancssárga jelölt munkaterülettel', 'ESD zóna', 'Jelölt munkaterület', 'ipari'],
    ['esd-padlo-01', 'ESD padló kivitelezés közben', 'ESD — kivitelezés', 'Ipari', 'ipari'],
    ['menhely-padlo-01', 'Hézagmentes műgyanta padló győri kutyamenhelyen', 'Kutyamenhely, Győr', 'Mosható, csúszásgátló', 'kereskedelmi', true],
    ['menhely-padlo-02', 'Műgyanta padló kennelsor mentén', 'Menhely — kennelsor', 'Fertőtleníthető', 'kereskedelmi'],
    ['uzlet-mugyanta-padlo', 'Sötét, fényes műgyanta padló üzlethelyiségben', 'Üzlethelyiség', 'Önterülő rendszer', 'kereskedelmi'],
    ['garazs-padlo-utana', 'Szórt műgyanta garázspadló', 'Garázspadló', 'Szórt bevonat', 'kereskedelmi'],
    ['garazs-padlo-01', 'Műgyanta padló garázsban szerelőaknával', 'Garázs szerelőaknával', 'Olajálló', 'kereskedelmi'],
    ['garazs-padlo-02', 'Szürke műgyanta garázspadló', 'Garázs', 'Kereskedelmi', 'kereskedelmi'],
    ['terasz-utana', 'Vízszigetelő, csúszásgátló bevonat teraszon', 'Terasz — kész', 'Vízszigetelés', 'vizszigeteles', true],
    ['terasz-bevonat', 'Kültéri műgyanta bevonat terasz szegélyén', 'Terasz szegély', 'Vízszigetelés', 'vizszigeteles'],
    ['lepcso-utana', 'Felújított külső lépcső csúszásgátló bevonattal', 'Külső lépcső — kész', 'Kőműves · szigetelés', 'komuves vizszigeteles', true],
    ['lepcso-javitas', 'Lépcső betonjavítás és élképzés közben', 'Lépcső — betonjavítás', 'Kőműves munka', 'komuves'],
    ['lepcso-kesz', 'Felújított lépcső alulnézetből', 'Lépcső — alulnézet', 'Csúszásgátló', 'komuves vizszigeteles'],
  ];
  const cats = [['all', 'Mind'], ['ipari', 'Ipari'], ['kereskedelmi', 'Kereskedelmi'], ['vizszigeteles', 'Vízszigetelés'], ['komuves', 'Kőműves']];
  return {
    path: 'referenciak.html',
    crumb: 'Referenciák',
    priority: '0.8',
    title: 'Referenciák — műgyanta padló és vízszigetelés munkáink | G-Epoxy',
    description: 'Ipari és kereskedelmi műgyanta padló, vízszigetelés és kőműves referenciamunkáink: húsipari üzem, ESD padló, győri kutyamenhely, garázsok, teraszok, lépcsők — előtte és utána.',
    body: `
${h.pageHero({ eyebrow: 'Portfólió', h1: 'Referenciák', lead: 'Saját fotók, saját munkák. Üzem, raktár, menhely, garázs, terasz, lépcső — a nyers aljzattól a kész felületig.', image: 'husipari-uzem-kesz-folyoso', alt: 'Kész szórt felületű ipari műgyanta padló folyosón', crumbs: [['Referenciák']] })}

<section class="sec">
  <div class="wrap">
    <div class="filters" role="group" aria-label="Szűrés kategória szerint" data-filters>${cats.map(([k, t], i) => `<button type="button" data-f="${k}" aria-pressed="${i === 0}">${t}</button>`).join('')}</div>
    <div data-gallery>${h.refs(all)}</div>
  </div>
</section>

${h.beforeAfter()}
${h.anatomy()}
${h.cta('A következő referencia lehet az Öné.')}
`,
  };
};
