/* MatScienceAI site behaviour: copy button, coolant finder, contact form. */
(function () {
  var SALES = 'sales@matscienceai.com';

  /* Copy-to-clipboard buttons */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.dataset.copy);
      function selectIt() { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; }
      try { navigator.clipboard.writeText(el.textContent).then(function () { btn.textContent = 'Copied'; }, selectIt); } catch (e) { selectIt(); }
    });
  });

  /* Mobile menu */
  var header = document.querySelector('.site-header'), menuBtn = document.querySelector('.menu-btn');
  if (header && menuBtn) {
    function setMenu(open) {
      header.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    menuBtn.addEventListener('click', function () { setMenu(!header.classList.contains('is-open')); });
    header.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && header.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
  }

  /* Prefill the contact form from any link that carries data-product / data-need */
  var form = document.getElementById('leadForm');
  function setSelect(id, value) {
    var sel = document.getElementById(id);
    if (!sel || !value) return;
    for (var i = 0; i < sel.options.length; i++) { if (sel.options[i].text === value) { sel.selectedIndex = i; return; } }
  }
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-product], a[data-need]');
    if (!link || !form) return;
    setSelect('lf-product', link.dataset.product);
    setSelect('lf-need', link.dataset.need);
    setTimeout(function () {
      var first = form.querySelector('input:not(.lf-hp)');
      if (first) first.focus({ preventScroll: true });
    }, 600);
  });

  /* Coolant finder */
  var finder = document.getElementById('finder');
  if (finder) {
    var result = document.getElementById('finderResult');
    var cards = document.querySelectorAll('.card[data-fluid]');
    var copy = {
      pg25: { text: 'MS-PG25 fits loops designed around PG25.', product: 'MS-PG25', need: 'Datasheet and safety data sheet', cta: 'Request MS-PG25 datasheet' },
      dc6: { text: 'MS-DC6 fits loops where you want less glycol than a PG25 carries.', product: 'MS-DC6', need: 'Datasheet and safety data sheet', cta: 'Request MS-DC6 datasheet' },
      pg0: { text: "MS-PG0 is our glycol-free coolant. It's still in development, so register your interest and we'll keep you posted.", product: 'MS-PG0', need: 'Updates on availability', cta: 'Register interest in MS-PG0' },
      unsure: { text: 'Tell us about your loop and one of our engineers will recommend a fluid.', product: 'Not sure yet', need: 'Technical question', cta: 'Ask an engineer' }
    };
    finder.addEventListener('change', function (e) {
      var key = e.target.value, c = copy[key];
      cards.forEach(function (card) {
        var match = card.dataset.fluid === key;
        card.classList.toggle('is-match', match);
        card.classList.toggle('is-dim', key !== 'unsure' && !match);
      });
      result.textContent = '';
      var p = document.createElement('span'); p.textContent = c.text;
      var a = document.createElement('a'); a.className = 'btn btn-blue'; a.href = '#contact'; a.textContent = c.cta;
      a.dataset.product = c.product; a.dataset.need = c.need;
      result.append(p, a);
    });
  }

  /* Contact form */
  if (form) {
    var status = document.getElementById('lfStatus');
    var submit = document.getElementById('lf-submit');
    setSelect('lf-product', form.dataset.defaultProduct);

    function fieldError(id, msg) {
      var input = document.getElementById(id), err = document.getElementById(id + '-err');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg) input.setAttribute('aria-describedby', id + '-err'); else input.removeAttribute('aria-describedby');
      err.textContent = msg || '';
      return !msg;
    }
    function validate() {
      var ok = true, name = form.name.value.trim(), email = form.email.value.trim(), company = form.company.value.trim();
      ok = fieldError('lf-name', name ? '' : 'Enter your name.') && ok;
      ok = fieldError('lf-email', !email ? 'Enter your work email.' : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter an email address like name@company.com.')) && ok;
      ok = fieldError('lf-company', company ? '' : 'Enter your company name.') && ok;
      return ok;
    }
    function data() {
      var d = { name: form.name.value.trim(), email: form.email.value.trim(), company: form.company.value.trim(), product: form.product.value, need: form.need.value, message: form.message.value.trim(), page: location.pathname.split('/').pop() || 'index.html', _gotcha: form._gotcha.value };
      d._subject = 'Website request: ' + d.product + ', ' + d.need + ' (' + d.company + ')';
      d._replyto = d.email;
      return d;
    }
    function mailtoFor(d) {
      var subject = d.product + ': ' + d.need;
      var body = 'Name: ' + d.name + '\nCompany: ' + d.company + '\nEmail: ' + d.email + '\nProduct: ' + d.product + '\nNeed: ' + d.need + (d.message ? '\n\n' + d.message : '');
      return 'mailto:' + SALES + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    }
    function fallback(lead, d) {
      status.className = 'lf-status is-warn';
      status.textContent = lead + ' Email ' + SALES + ' instead. ';
      var a = document.createElement('a'); a.href = mailtoFor(d); a.textContent = 'Open an email with your request filled in';
      status.append(a);
    }
    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') validate(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'lf-status'; status.textContent = '';
      if (!validate()) { var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
      var d = data(), endpoint = form.dataset.endpoint;
      if (!endpoint) { fallback("This form isn't connected to an inbox yet.", d); return; }
      submit.disabled = true; submit.textContent = 'Sending…';
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          form.innerHTML = '';
          var done = document.createElement('div'); done.className = 'lf-done'; done.setAttribute('role', 'status');
          var h = document.createElement('h3'); h.textContent = 'Request sent';
          var p = document.createElement('p'); p.textContent = "We'll reply to " + d.email + ' within 1 to 2 business days.';
          done.append(h, p); form.append(done);
        })
        .catch(function () { submit.disabled = false; submit.textContent = 'Send request'; fallback("Your request didn't send.", d); });
    });
  }
})();
