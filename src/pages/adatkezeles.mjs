// ponytail: base GDPR notice for the quote form only (no cookies, no analytics). Fill the [kitöltendő] fields before launch.
export default (h) => ({
  path: 'adatkezeles.html',
  crumb: 'Adatkezelési tájékoztató',
  priority: '0.2',
  title: 'Adatkezelési tájékoztató | G-Epoxy',
  description: 'A G-Epoxy weboldalán keresztül küldött ajánlatkérések adatkezelési tájékoztatója.',
  body: `
<section class="sec legal">
  <div class="wrap narrow">
    <nav class="crumbs" aria-label="Morzsamenü"><a href="./">Főoldal</a><span aria-current="page">Adatkezelési tájékoztató</span></nav>
    <h1 class="phero-h">Adatkezelési tájékoztató</h1>
    <h2>1. Adatkezelő</h2>
    <p>G-Epoxy — [cégnév és cégforma: kitöltendő]<br>Székhely: ${h.SITE.zip} ${h.SITE.city}, ${h.SITE.street}<br>Adószám: [kitöltendő]<br>E-mail: <a href="mailto:${h.SITE.email}">${h.SITE.email}</a> · Telefon: <a href="tel:${h.SITE.tel}">${h.SITE.phone}</a></p>
    <h2>2. Kezelt adatok és cél</h2>
    <p>Az ajánlatkérő űrlapon megadott adatok (név, cégnév, telefonszám, e-mail-cím, település, becsült terület, felhasználási környezet, üzenet) kezelésének célja az ajánlatkérés megválaszolása, a helyszíni felmérés egyeztetése és ajánlat adása.</p>
    <h2>3. Jogalap</h2>
    <p>Az érintett kérésére a szerződés megkötését megelőző lépések megtétele (GDPR 6. cikk (1) bekezdés b) pont), valamint az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).</p>
    <h2>4. Megőrzési idő</h2>
    <p>Ha az ajánlatkérésből nem jön létre szerződés, az adatokat legfeljebb 1 évig őrizzük meg, majd töröljük. Szerződés esetén a számviteli és egyéb jogszabályi kötelezettségek szerinti ideig.</p>
    <h2>5. Adatfeldolgozók</h2>
    <p>Az űrlap adatait a FormSubmit (formsubmit.co) szolgáltatás továbbítja e-mailben az adatkezelőnek. A weboldal tárhelye a GitHub Pages (GitHub, Inc., USA), a domain névszerver- és hálózati szolgáltatója a Cloudflare, Inc. (USA); ezek a szolgáltatók a kiszolgáláshoz technikai naplóadatokat (pl. IP-cím) kezelhetnek. Az e-mail-fiók szolgáltatója: [kitöltendő]. Az adatokat egyéb harmadik félnek nem adjuk át, marketing célra nem használjuk.</p>
    <h2>6. Sütik</h2>
    <p>A weboldal nem használ követő vagy marketing sütiket, és nem futtat látogatottságmérő szoftvert. Külső betűtípust vagy térképet nem tölt be harmadik féltől.</p>
    <h2>7. Az érintett jogai</h2>
    <p>Ön kérheti az adataihoz való hozzáférést, azok helyesbítését, törlését, kezelésük korlátozását, tiltakozhat a kezelés ellen, és bármikor visszavonhatja hozzájárulását a fenti elérhetőségeken. Panaszával a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, 1055 Budapest, Falk Miksa utca 9–11., <a href="https://naih.hu" rel="noopener">naih.hu</a>) vagy a lakóhelye szerinti bírósághoz fordulhat.</p>
  </div>
</section>
`,
});
