<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>WaxAlert</title>

  <!-- Fonts (matches WaxAlert.com) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">

  <!-- PWA -->
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="apple-touch-icon" href="/icons/icon-192.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="theme-color" content="#0b0b0b">

  <style>
    :root{
      --bg:#0b0b0b;
      --text:#ffffff;
      --muted:rgba(255,255,255,.72);
      --card:rgba(255,255,255,.08);
      --border:rgba(255,255,255,.12);
      --input:#111;

      --primary:#ffffff;
      --primaryText:#000000;

      --shadow: 0 10px 30px rgba(0,0,0,.25);
      --radius:16px;

      /* Accent (default dark: white primary is fine) */
      --accent:#ffffff;
    }

    /* Light mode: blue accents for switch + primary buttons */
    [data-theme="light"]{
      --bg:#ffffff;
      --text:#111111;
      --muted:rgba(0,0,0,.62);
      --card:rgba(0,0,0,.04);
      --border:rgba(0,0,0,.12);
      --input:#ffffff;

      --accent:#0A66FF;            /* blue */
      --primary: var(--accent);    /* blue button */
      --primaryText:#ffffff;
      --shadow: 0 10px 30px rgba(0,0,0,.08);
    }

    html,body{height:100%}
    body{
      margin:0;
      font-family: Arial, sans-serif;
      background:var(--bg);
      color:var(--text);
    }

    main{
      max-width:900px;
      margin:0 auto;
      padding:16px;
    }

    .top{
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      margin-bottom:14px;
    }

    .brand h1{
      margin:0;
      font-family: "Bangers", system-ui, -apple-system, Arial, sans-serif;
      font-size:34px;
      letter-spacing:1px;
      line-height:1;
    }

    .card{
      background:var(--card);
      border:1px solid var(--border);
      border-radius:var(--radius);
      padding:14px;
      box-shadow: var(--shadow);
    }

    .help{
      font-size:13px;
      line-height:1.35;
      color:var(--muted);
      margin-bottom:10px;
    }

    input{
      width:100%;
      box-sizing:border-box;
      padding:12px;
      border-radius:12px;
      border:1px solid var(--border);
      background:var(--input);
      color:var(--text);
      font-size:16px;
      outline:none;
    }

    .row{
      display:flex;
      gap:10px;
      margin-top:12px;
    }
    .row > * { flex:1; }

    button{
      padding:12px;
      border-radius:12px;
      font-weight:800;
      cursor:pointer;
      border:0;
      font-size:16px; /* match input text size */
    }

    .primary{
      background:var(--primary);
      color:var(--primaryText);
    }

    .ghost{
      background:transparent;
      border:1px solid var(--border);
      color:var(--text);
      font-weight:800;
    }

    .list{
      margin-top:12px;
      display:grid;
      gap:10px;
    }

    /* Suggestions */
    .suggestion{
      cursor:pointer;
      padding:12px;
      border-radius:14px;
      background:var(--card);
      border:1px solid var(--border);
    }
    .suggestion b{
      display:block;
      font-size:15px;
      line-height:1.2;
    }

    /* Export rows */
    .kv{
      display:grid;
      grid-template-columns: 1fr auto;
      gap:10px;
      padding:8px 0;
      border-bottom:1px solid var(--border);
    }
    .kv:last-child{border-bottom:none}
    .k{color:var(--muted)}
    .v{font-weight:900;text-align:right}

    /* CM button link wrapper */
    .btnLink{ text-decoration:none; display:block; margin-top:12px; }

    /* Toggle switch (uses accent in light mode) */
    .themeWrap{
      display:flex;
      align-items:center;
      gap:10px;
      user-select:none;
      white-space:nowrap;
      font-size:12px;
      color:var(--muted);
    }
    .switch{
      position:relative;
      width:46px;
      height:26px;
      display:inline-block;
    }
    .switch input{
      opacity:0;
      width:0;
      height:0;
    }
    .slider{
      position:absolute;
      cursor:pointer;
      top:0; left:0; right:0; bottom:0;
      background: rgba(255,255,255,.18);
      border:1px solid var(--border);
      transition:.2s;
      border-radius:999px;
    }
    [data-theme="light"] .slider{
      background: rgba(10,102,255,.20); /* soft blue track */
      border-color: rgba(10,102,255,.35);
    }

    .slider:before{
      position:absolute;
      content:"";
      height:20px;
      width:20px;
      left:3px;
      top:50%;
      transform:translateY(-50%);
      background: var(--primary); /* white in dark, blue in light */
      border-radius:999px;
      transition:.2s;
    }

    /* In dark mode, knob is white when unchecked; keep it looking crisp */
    :root .slider:before{
      background:#ffffff;
    }
    /* In light mode, make knob blue to match accent */
    [data-theme="light"] .slider:before{
      background: var(--accent);
    }

    /* Checked = dark mode */
    .switch input:checked + .slider:before{
      transform:translate(20px, -50%);
    }

    @media (max-width: 380px){
      .brand h1{ font-size:30px; }
    }
  </style>
</head>

<body>
  <main>
    <div class="top">
      <div class="brand">
        <h1>WaxAlert</h1>
      </div>

      <div class="themeWrap">
        <span>Light</span>
        <label class="switch" title="Toggle light/dark mode">
          <input id="themeToggle" type="checkbox" />
          <span class="slider"></span>
        </label>
        <span>Dark</span>
      </div>
    </div>

    <div class="card">
      <div class="help">Type and tap a match. (Keywords power matching, but we only show product names.)</div>

      <input id="q" placeholder="Ex: 2025-26 Topps Midnight Basketball" />

      <div class="list" id="suggestions"></div>

      <div class="row">
        <button class="primary" id="searchBtn">Search</button>
        <button class="ghost" id="clearBtn">Clear</button>
      </div>
    </div>

    <div class="list" id="results"></div>
  </main>

  <script>
    // Update API_URL only if you created a brand new Apps Script deployment.
    const API_URL = "https://script.google.com/macros/s/AKfycbwAOfPLpnJg7W1Vwn1VWEgSSGG_6bSEtJgu9_K6HYSKZPUmw-6eaKzTWEoKO2569Qj_/exec";

    // Service worker (safe)
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
    }

    async function api(action, payload) {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, payload })
      });
      return await res.json();
    }

    // ----- THEME SWITCH -----
    const THEME_KEY = "waxalert_theme";
    const toggle = document.getElementById("themeToggle");

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
      toggle.checked = (theme === "dark"); // checked = dark
    }

    function detectTheme() {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") return saved;
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
      return "dark";
    }

    let theme = detectTheme();
    applyTheme(theme);

    toggle.addEventListener("change", () => {
      theme = toggle.checked ? "dark" : "light";
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    });

    // ----- TYPEAHEAD -----
    let PRODUCTS = [];
    let SELECTED = null;

    const q = document.getElementById("q");
    const suggestions = document.getElementById("suggestions");
    const results = document.getElementById("results");

    function norm(s){ return String(s || "").toLowerCase(); }

    function escapeHTML(s){
      return String(s).replace(/[&<>"']/g, m => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
      }[m]));
    }

    function renderSuggestions(list) {
      if (!list.length) { suggestions.innerHTML = ""; return; }
      // DisplayName ONLY (keywords never shown)
      suggestions.innerHTML = list.slice(0, 10).map(p => `
        <div class="suggestion" data-code="${escapeHTML(p.code)}">
          <b>${escapeHTML(p.displayName)}</b>
        </div>
      `).join("");
    }

    q.addEventListener("input", () => {
      SELECTED = null;
      const v = norm(q.value).trim();
      if (!v) { suggestions.innerHTML = ""; return; }

      const matches = PRODUCTS.filter(p =>
        (norm(p.displayName) + " " + norm(p.keywords) + " " + norm(p.code)).includes(v)
      );
      renderSuggestions(matches);
    });

    suggestions.addEventListener("click", (e) => {
      const el = e.target.closest("[data-code]");
      if (!el) return;

      SELECTED = PRODUCTS.find(p => p.code === el.dataset.code);
      if (!SELECTED) return;

      q.value = SELECTED.displayName;
      suggestions.innerHTML = "";
      runSearch();
    });

    async function runSearch() {
      if (!SELECTED) return;

      results.innerHTML = `<div class="card"><div class="k">Searching…</div></div>`;

      const res = await api("search", {
        q: SELECTED.displayName,
        ebayUrl: SELECTED.ebayUrl,
        productCode: SELECTED.code,
        productName: SELECTED.displayName
      });

      if (!res || !res.ok) {
        results.innerHTML = `<div class="card"><div class="k">Error</div><div class="k">${escapeHTML(res?.error || "Unknown error")}</div></div>`;
        return;
      }

      const rows = Array.isArray(res.exportData) ? res.exportData : [];
      const kv = rows
        .filter(r => (String(r?.[0]||"").trim() || String(r?.[1]||"").trim()))
        .map(r => `
          <div class="kv">
            <div class="k">${escapeHTML(r[0] || "")}</div>
            <div class="v">${escapeHTML(r[1] || "")}</div>
          </div>
        `).join("");

      // Uses Products Column E -> checklistUrl (CM URL)
      const cmUrl = SELECTED.checklistUrl ? String(SELECTED.checklistUrl).trim() : "";
      const cmBtn = cmUrl ? `
        <a class="btnLink" href="${escapeHTML(cmUrl)}" target="_blank" rel="noopener">
          <button class="primary" type="button">View on ChasingMajors</button>
        </a>
      ` : "";

      results.innerHTML = `<div class="card">${kv || `<div class="k">No results yet.</div>`}${cmBtn}</div>`;
    }

    document.getElementById("searchBtn").addEventListener("click", runSearch);

    document.getElementById("clearBtn").addEventListener("click", () => {
      q.value = "";
      suggestions.innerHTML = "";
      results.innerHTML = "";
      SELECTED = null;
      q.focus();
    });

    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter") runSearch();
    });

    async function loadProducts() {
      const data = await api("products", {});
      if (data && data.ok && Array.isArray(data.products)) PRODUCTS = data.products;
    }

    loadProducts();
  </script>
</body>
</html>
