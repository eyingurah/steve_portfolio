(function () {
  "use strict";
  var S = window.SITE || {};
  var PRODUCTS = window.PRODUCTS || [];
  var COLLECTIONS = window.COLLECTIONS || {};
  var ROOT = document.documentElement.getAttribute("data-root") || "";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var isPh = function (v) { return !v || /\[[^\]]*\]/.test(v); };
  var esc = function (t) { var d = document.createElement("div"); d.textContent = t == null ? "" : t; return d.innerHTML; };
  var phSpan = function (t) { return '<span class="ph">' + esc(t) + "</span>"; };
  var val = function (v, fallback) { return isPh(v) ? phSpan(v || fallback) : esc(v); };

  /* ---------- Config -> page ---------- */
  function waLink(msg) {
    if (!S.whatsappRaw) return ROOT + "contact.html#enquiry";
    return "https://wa.me/" + S.whatsappRaw + "?text=" + encodeURIComponent(msg || S.whatsappMessage || "");
  }
  function applyConfig() {
    $$("[data-site]").forEach(function (el) {
      var k = el.getAttribute("data-site"), v = S[k];
      if (v == null) return;
      el.textContent = k === "version" ? "v" + v : v;
      if (k !== "version") el.classList.toggle("ph", isPh(v));
    });
    $$("[data-link]").forEach(function (a) {
      var t = a.getAttribute("data-link");
      if (t === "whatsapp") a.setAttribute("href", waLink());
      if (t === "phone") { if (S.phoneRaw) a.setAttribute("href", "tel:+" + S.phoneRaw); else a.removeAttribute("href"); }
      if (t === "email") { if (!isPh(S.email)) a.setAttribute("href", "mailto:" + S.email); else a.removeAttribute("href"); }
      if (t === "map") { if (S.mapUrl) { a.setAttribute("href", S.mapUrl); a.hidden = false; } else a.hidden = true; }
    });
    $$("[data-socials]").forEach(function (box) {
      var names = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok", youtube: "YouTube" };
      var out = Object.keys(names).filter(function (k) { return S.socials && S.socials[k]; }).map(function (k) {
        return '<li><a href="' + esc(S.socials[k]) + '" target="_blank" rel="noopener">' + names[k] + "</a></li>";
      });
      box.innerHTML = out.length ? out.join("") : '<li>' + phSpan("[Social media links]") + "</li>";
    });
    document.title = document.title.replace("[Brand Name]", isPh(S.brand) ? "Handcrafted Ghanaian Slippers" : S.brand);
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var b = $(".nav-toggle"), n = $("#nav");
    if (!b || !n) return;
    b.addEventListener("click", function () {
      var o = n.classList.toggle("open"); b.setAttribute("aria-expanded", o);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && n.classList.contains("open")) { n.classList.remove("open"); b.setAttribute("aria-expanded", "false"); b.focus(); }
    });
  }

  /* ---------- Product cards ---------- */
  function cardHTML(p) {
    var col = COLLECTIONS[p.collection] ? COLLECTIONS[p.collection].title : "";
    return '<li><button type="button" class="card-btn" data-id="' + esc(p.id) + '">' +
      '<span class="im"><img src="' + ROOT + 'assets/img/thumbs/' + esc(p.image) + '.webp" alt="' + esc(p.alt) + '" loading="lazy" width="560" height="560"></span>' +
      '<span class="tx"><span class="nm">' + esc(p.name) + '</span><span class="sub">' + esc(col) + '</span>' +
      '<span class="go">View details &rarr;</span></span></button></li>';
  }
  function renderGrid(el, list) {
    el.innerHTML = list.map(cardHTML).join("");
  }
  var currentList = PRODUCTS.slice();

  /* ---------- Product dialog ---------- */
  var dlg, opener, idx = 0;
  function buildDialog() {
    dlg = document.createElement("dialog");
    dlg.setAttribute("aria-labelledby", "pm-title");
    dlg.innerHTML = '<div class="pm"><div class="pm-img"><img id="pm-img" alt=""></div><div class="pm-body"><button type="button" class="pm-close" aria-label="Close">&times;</button>' +
      '<div class="eyebrow" id="pm-col"></div><h2 id="pm-title"></h2><p id="pm-desc"></p><dl class="facts" id="pm-facts"></dl>' +
      '<div class="btn-row"><a class="btn wa" id="pm-wa" href="#">Enquire on WhatsApp</a><a class="btn ghost" id="pm-custom" href="#">Request a custom version</a></div>' +
      '<div class="pm-nav"><button type="button" class="btn ghost" id="pm-prev">&larr; Previous</button><button type="button" class="btn ghost" id="pm-next">Next &rarr;</button></div></div></div>';
    document.body.appendChild(dlg);
    $(".pm-close", dlg).addEventListener("click", function () { dlg.close(); });
    $("#pm-prev", dlg).addEventListener("click", function () { show(idx - 1); });
    $("#pm-next", dlg).addEventListener("click", function () { show(idx + 1); });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", function () {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
      if (opener && document.contains(opener)) opener.focus();
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") show(idx + 1);
      if (e.key === "ArrowLeft") show(idx - 1);
    });
  }
  function show(i) {
    var n = currentList.length; if (!n) return;
    idx = (i + n) % n;
    var p = currentList[idx];
    var im = $("#pm-img", dlg);
    im.src = ROOT + "assets/img/products/" + p.image + ".webp"; im.alt = p.alt;
    $("#pm-col", dlg).textContent = COLLECTIONS[p.collection] ? COLLECTIONS[p.collection].title : "";
    $("#pm-title", dlg).textContent = p.name;
    $("#pm-desc", dlg).textContent = p.description;
    var avail = p.availability === "ready" ? "Ready to wear" : "Made to order";
    var rows = [
      ["Materials", p.materials && p.materials.length ? esc(p.materials.join(", ")) : phSpan("[Materials]")],
      ["Colours", p.colours && p.colours.length ? esc(p.colours.join(", ")) : phSpan("[Colours]")],
      ["Sizes", p.sizes ? esc(p.sizes) : phSpan("[Available sizes, EU / UK]")],
      ["Price", p.price ? esc(p.price) : phSpan("[Price] or price on request")],
      ["Availability", esc(avail)],
      ["Lead time", p.leadTime ? esc(p.leadTime) : phSpan("[Production time]")],
      ["Meaning", p.symbolism ? esc(p.symbolism) : phSpan("[Meaning or story of this design]")]
    ];
    $("#pm-facts", dlg).innerHTML = rows.map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>"; }).join("");
    $("#pm-wa", dlg).href = waLink("Hello, I am interested in the \u201C" + p.name + "\u201D (" + p.id + ").");
    $("#pm-custom", dlg).href = ROOT + "contact.html?product=" + encodeURIComponent(p.id) + "#enquiry";
    $("#pm-prev", dlg).hidden = $("#pm-next", dlg).hidden = n < 2;
    history.replaceState(null, "", "#" + p.id);
  }
  function openProduct(id, from) {
    var i = currentList.findIndex(function (p) { return p.id === id; });
    if (i < 0) { currentList = PRODUCTS.slice(); i = currentList.findIndex(function (p) { return p.id === id; }); }
    if (i < 0) return;
    opener = from || document.activeElement;
    if (!dlg) buildDialog();
    show(i);
    if (!dlg.open) dlg.showModal();
  }

  /* ---------- Listing pages ---------- */
  function initListings() {
    $$("[data-products]").forEach(function (box) {
      var mode = box.getAttribute("data-products");
      var base = PRODUCTS.filter(function (p) {
        if (mode === "all") return true;
        if (mode === "featured") return p.featured;
        return p.collection === mode;
      });
      var grid = $(".grid", box);
      var chipsBox = $(".chips", box);
      function paint(list) { currentList = list; renderGrid(grid, list); }
      paint(base);
      if (chipsBox) {
        var kind = chipsBox.getAttribute("data-filter");  // colour | collection
        var opts = [];
        base.forEach(function (p) {
          var vals = kind === "collection" ? [p.collection] : (p.colours || []);
          vals.forEach(function (v) { if (opts.indexOf(v) < 0) opts.push(v); });
        });
        var label = function (v) { return kind === "collection" ? (COLLECTIONS[v] ? COLLECTIONS[v].title : v) : v; };
        chipsBox.innerHTML = ['<button type="button" class="chip" aria-pressed="true" data-v="">All</button>'].concat(
          opts.map(function (v) { return '<button type="button" class="chip" aria-pressed="false" data-v="' + esc(v) + '">' + esc(label(v)) + "</button>"; })).join("");
        chipsBox.addEventListener("click", function (e) {
          var b = e.target.closest(".chip"); if (!b) return;
          $$(".chip", chipsBox).forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
          var v = b.getAttribute("data-v");
          paint(!v ? base : base.filter(function (p) {
            return kind === "collection" ? p.collection === v : (p.colours || []).indexOf(v) >= 0;
          }));
          var live = $(".live", box); if (live) live.textContent = currentList.length + " designs shown";
        });
      }
      box.addEventListener("click", function (e) {
        var b = e.target.closest(".card-btn"); if (!b) return;
        currentList = Array.prototype.map.call($$(".card-btn", box), function (x) {
          return PRODUCTS.filter(function (p) { return p.id === x.getAttribute("data-id"); })[0];
        });
        openProduct(b.getAttribute("data-id"), b);
      });
    });
    if (location.hash.length > 1 && $("[data-products]")) {
      var id = decodeURIComponent(location.hash.slice(1));
      if (PRODUCTS.some(function (p) { return p.id === id; })) { openProduct(id, null); }
    }
  }

  /* ---------- Enquiry form ---------- */
  function initForm() {
    var f = $("#enquiry-form"); if (!f) return;
    var sel = $("#product", f);
    if (sel) {
      sel.innerHTML = '<option value="">Custom design / not sure yet</option>' + PRODUCTS.map(function (p) {
        return '<option value="' + esc(p.id) + '">' + esc(p.name) + " (" + esc(COLLECTIONS[p.collection].title) + ")</option>";
      }).join("");
      var pre = new URLSearchParams(location.search).get("product"); if (pre) sel.value = pre;
    }
    var st = $("#form-status");
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (f.website && f.website.value) return;             // honeypot
      if (!f.checkValidity()) { f.reportValidity(); return; }
      st.hidden = false;
      if (isPh(S.formEndpoint)) {
        st.innerHTML = "This form is not connected yet. Please message us on <a href=\"" + esc(waLink("Hello, my name is " + f.name.value + ". " + f.message.value)) + "\">WhatsApp</a> instead.";
        return;
      }
      st.textContent = "Sending\u2026";
      fetch(S.formEndpoint, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(); f.reset(); st.textContent = "Thank you! Your message has been sent. We will reply soon."; })
        .catch(function () { st.innerHTML = "Sorry, something went wrong. Please try WhatsApp or call us."; });
    });
  }

  /* ---------- Accessibility panel ---------- */
  var KEY = "a11y-settings";
  function loadA11y() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } }
  function saveA11y(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ } }
  function applyA11y(s) {
    var r = document.documentElement;
    var theme = s.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "light") r.removeAttribute("data-theme"); else r.setAttribute("data-theme", theme);
    s.dyslexia ? r.setAttribute("data-font", "dyslexia") : r.removeAttribute("data-font");
    s.spacing ? r.setAttribute("data-spacing", "loose") : r.removeAttribute("data-spacing");
    s.size && s.size !== "default" ? r.setAttribute("data-size", s.size) : r.removeAttribute("data-size");
  }
  function initA11y() {
    var s = loadA11y(); applyA11y(s);
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "fab fab-a11y"; btn.setAttribute("aria-label", "Accessibility options");
    btn.setAttribute("aria-haspopup", "dialog"); btn.setAttribute("aria-expanded", "false"); btn.textContent = "\u267F";
    document.body.appendChild(btn);
    var d = document.createElement("dialog"); d.className = "a11y-panel"; d.setAttribute("aria-labelledby", "a11y-t");
    var themeNow = s.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var radios = function (name, items, cur) {
      return '<div class="seg">' + items.map(function (it) {
        return '<label><input type="radio" name="' + name + '" value="' + it[0] + '"' + (cur === it[0] ? " checked" : "") + '><span>' + it[1] + "</span></label>";
      }).join("") + "</div>";
    };
    d.innerHTML = '<div class="in"><button type="button" class="pm-close" aria-label="Close accessibility options">&times;</button><h2 id="a11y-t">Accessibility</h2>' +
      '<fieldset><legend>Theme</legend>' + radios("theme", [["light", "Light"], ["dark", "Dark"], ["sepia", "Sepia"], ["contrast", "High contrast"]], themeNow) + "</fieldset>" +
      '<fieldset><legend>Text size</legend>' + radios("size", [["default", "Default"], ["larger", "Larger"], ["largest", "Largest"]], s.size || "default") + "</fieldset>" +
      '<label class="tog">Dyslexia-friendly font <input type="checkbox" name="dyslexia"' + (s.dyslexia ? " checked" : "") + "></label>" +
      '<label class="tog">Increased line spacing <input type="checkbox" name="spacing"' + (s.spacing ? " checked" : "") + "></label>" +
      '<button type="button" class="btn ghost" id="a11y-reset">Reset to defaults</button></div>';
    document.body.appendChild(d);
    btn.addEventListener("click", function () { d.showModal(); btn.setAttribute("aria-expanded", "true"); });
    d.addEventListener("close", function () { btn.setAttribute("aria-expanded", "false"); btn.focus(); });
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
    $(".pm-close", d).addEventListener("click", function () { d.close(); });
    d.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "theme") s.theme = t.value;
      if (t.name === "size") s.size = t.value;
      if (t.name === "dyslexia") s.dyslexia = t.checked;
      if (t.name === "spacing") s.spacing = t.checked;
      saveA11y(s); applyA11y(s);
    });
    $("#a11y-reset", d).addEventListener("click", function () {
      s = {}; saveA11y(s); applyA11y(s);
      $$("input", d).forEach(function (i) {
        if (i.type === "checkbox") i.checked = false;
        if (i.name === "size") i.checked = i.value === "default";
        if (i.name === "theme") i.checked = i.value === (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      });
    });
  }

  /* ---------- Boot ---------- */
  function boot() { applyConfig(); initNav(); initListings(); initForm(); initA11y(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
