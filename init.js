/* Applies saved accessibility settings before first paint (loaded in <head>). */
(function () {
  try {
    var s = JSON.parse(localStorage.getItem("a11y-settings") || "{}");
    var r = document.documentElement;
    if (s.theme && s.theme !== "light") r.setAttribute("data-theme", s.theme);
    else if (!s.theme && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) r.setAttribute("data-theme", "dark");
    if (s.dyslexia) r.setAttribute("data-font", "dyslexia");
    if (s.spacing) r.setAttribute("data-spacing", "loose");
    if (s.size && s.size !== "default") r.setAttribute("data-size", s.size);
  } catch (e) { /* storage unavailable: use defaults */ }
})();
