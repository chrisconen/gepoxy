export default (h) => ({
  path: '404.html',
  abs: true,
  noindex: true,
  title: 'Az oldal nem található | G-Epoxy',
  description: 'A keresett oldal nem található.',
  body: `
<section class="sec nf">
  <div class="wrap">
    <p class="eyebrow">Hiba 404</p>
    <h1 class="phero-h">Ez a felület <span class="dim">még nincs leöntve.</span></h1>
    <p class="lead">A keresett oldal nem létezik, vagy elköltözött. Innen biztosan továbbjut:</p>
    <div class="phero-cta"><a class="btn btn-amber" href="/">Főoldal ${h.ICON.arrow}</a><a class="btn btn-ghost" href="/referenciak.html">Referenciák</a><a class="btn btn-ghost" href="/kapcsolat.html">Kapcsolat</a></div>
  </div>
</section>
`,
});
