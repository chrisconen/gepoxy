export default (h) => {
  const opts = h.SYSTEMS.map((s) => `<option value="${s.id}">${s.tab}</option>`).join('');
  const towns = h.TOWNS.map((t) => `<option value="${h.esc(t.n)}">`).join('');
  return {
    path: 'kapcsolat.html',
    crumb: 'Kapcsolat',
    priority: '0.8',
    title: 'Ajánlatkérés, kapcsolat — műgyanta padló, vízszigetelés | G-Epoxy',
    description: 'Kérjen helyszíni felmérést és tételes ajánlatot ipari, kereskedelmi műgyanta padlóra vagy vízszigetelésre. G-Epoxy, 9145 Bágyogszovát — Győr, Felvidék, Balaton. Tel.: +36 20 407 8064.',
    bodyClass: 'page-contact',
    body: `
<section class="sec contact-sec">
  <div class="wrap">
    <nav class="crumbs" aria-label="Morzsamenü"><a href="./">Főoldal</a><span aria-current="page">Kapcsolat</span></nav>
    <div class="contact">
      <div class="contact-l">
        <p class="eyebrow">Ajánlatkérés</p>
        <h1 class="phero-h">Írja le, <span class="dim">mi lesz a padlón.</span></h1>
        <p class="lead">Minél többet tudunk a használatról — terhelés, vegyszerek, mosás, felület —, annál pontosabb az első becslés. Utána helyszíni felmérés és tételes ajánlat következik.</p>
        <div class="contact-card">
          <a class="cc-tel" href="tel:${h.SITE.tel}">${h.ICON.phone}<span>${h.SITE.phone}</span></a>
          <a href="mailto:${h.SITE.email}">${h.ICON.mail}<span>${h.SITE.email}</span></a>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(`${h.SITE.zip} ${h.SITE.city}, ${h.SITE.street}`)}" rel="noopener" target="_blank">${h.ICON.pin}<span>${h.SITE.zip} ${h.SITE.city}, ${h.SITE.street}<small>Útvonaltervezés ↗</small></span></a>
        </div>
        <p class="note">Fotókat és alaprajzot e-mailben is küldhet: <a href="mailto:${h.SITE.email}">${h.SITE.email}</a></p>
      </div>
      <form class="form" id="ajanlat" action="https://formsubmit.co/${h.SITE.email}" method="post" data-form>
        <input type="hidden" name="_subject" value="Ajánlatkérés — gepoxy.hu">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_next" value="${h.SITE.url}/kapcsolat.html?ok=1#ajanlat">
        <div class="f-row">
          <label><span>Név *</span><input name="nev" required autocomplete="name" maxlength="120"></label>
          <label><span>Cég</span><input name="ceg" autocomplete="organization" maxlength="120"></label>
        </div>
        <div class="f-row">
          <label><span>Telefon *</span><input name="telefon" type="tel" required autocomplete="tel" minlength="6" maxlength="40"></label>
          <label><span>E-mail *</span><input name="email" type="email" required autocomplete="email" maxlength="160"></label>
        </div>
        <div class="f-row">
          <label><span>Település *</span><input name="telepules" required list="towns" maxlength="120"><datalist id="towns">${towns}</datalist></label>
          <label><span>Becsült terület (m²)</span><input name="terulet" type="number" min="1" max="100000" inputmode="numeric"></label>
        </div>
        <label><span>Felhasználási környezet</span><select name="rendszer"><option value="">Válasszon…</option>${opts}<option value="egyeb">Egyéb / nem tudom</option></select></label>
        <label><span>Üzenet</span><textarea name="uzenet" rows="5" maxlength="4000" placeholder="Pl. 400 m² raktár, targoncaforgalom, a régi bevonat felvált, a munkát augusztusi leállásra kellene ütemezni."></textarea></label>
        <label class="hp" aria-hidden="true">Weboldal<input name="_honey" tabindex="-1" autocomplete="off"></label>
        <label class="f-check"><input type="checkbox" name="adatkezeles" required><span>Elolvastam és elfogadom az <a href="adatkezeles.html" target="_blank">adatkezelési tájékoztatót</a>. *</span></label>
        <button class="btn btn-amber btn-lg" type="submit">Ajánlatkérés elküldése ${h.ICON.arrow}</button>
        <p class="f-msg" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>
<section class="sec sec-regions">
  <div class="wrap">
    ${h.head('Szolgáltatási terület', 'Ide megyünk.')}
    ${h.serviceMap()}
  </div>
</section>
`,
  };
};
