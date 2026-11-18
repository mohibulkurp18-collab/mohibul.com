/*
 * site.js — small helper shared by every page.
 * 1. Mobile menu: adds a "Menu" button to the header on small screens.
 * 2. Interactive pages (projects.html, credentials.html): renders the
 *    <template id="dc-template"> using the data in the page's own <script>.
 * You normally never need to edit this file.
 */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var menuOpen = false;
  function setupMenu() {
    var header = document.querySelector('#dc-root header');
    if (!header) return;
    var nav = header.querySelector('nav[aria-label="Primary"]');
    if (!nav || header.querySelector('.menu-btn')) return;
    if (!nav.id) nav.id = 'primary-nav';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-btn';
    btn.setAttribute('aria-controls', nav.id);
    btn.innerHTML = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path class="l1" d="M4 7h16"/><path class="l2" d="M4 12h16"/><path class="l3" d="M4 17h16"/></svg><span>Menu</span>';
    nav.parentNode.insertBefore(btn, nav);
    function apply() {
      header.classList.toggle('menu-open', menuOpen);
      btn.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
      btn.querySelector('span').textContent = menuOpen ? 'Close' : 'Menu';
    }
    btn.addEventListener('click', function () { menuOpen = !menuOpen; apply(); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { menuOpen = false; apply(); } });
    apply();
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      var h = document.querySelector('#dc-root header');
      if (h) { h.classList.remove('menu-open'); var b = h.querySelector('.menu-btn'); if (b) { b.setAttribute('aria-expanded', 'false'); b.querySelector('span').textContent = 'Menu'; b.focus(); } }
    }
  });

  /* ---------- Template renderer for interactive pages ---------- */
  var tpl = document.getElementById('dc-template');
  var root = document.getElementById('dc-root');
  if (!tpl || typeof window.DCSetup !== 'function') { setupMenu(); return; }

  var instance;
  function DCLogic() { this.state = {}; }
  DCLogic.prototype.setState = function (patch) {
    var next = {}, k;
    for (k in this.state) next[k] = this.state[k];
    for (k in patch) next[k] = patch[k];
    this.state = next;
    render(true);
  };
  var Component = window.DCSetup(DCLogic);
  instance = new Component();
  if (!instance.state) instance.state = {};
  // Optional deep link: projects.html#maps opens the Map gallery tab.
  if (/^#(maps|map-gallery)$/.test(location.hash)) instance.state.tab = 'maps';

  var HOLE = /\{\{\s*([\w.$]+)\s*\}\}/g;
  function get(path, ctx) {
    if (path === 'true') return true;
    if (path === 'false') return false;
    var parts = path.split('.'), v = ctx;
    for (var i = 0; i < parts.length; i++) { if (v == null) return undefined; v = v[parts[i]]; }
    return v;
  }
  function fill(str, ctx) {
    return str.replace(HOLE, function (m, k) { var v = get(k, ctx); return v == null ? '' : String(v); });
  }
  function holeKey(str) {
    var m = /^\s*\{\{\s*([\w.$]+)\s*\}\}\s*$/.exec(str || '');
    return m ? m[1] : null;
  }
  function build(node, ctx, out) {
    if (node.nodeType === 3) { out.push(document.createTextNode(fill(node.nodeValue, ctx))); return; }
    if (node.nodeType === 8) return;
    if (node.nodeType !== 1) return;
    var tag = node.localName;
    if (tag === 'sc-for') {
      var list = get(holeKey(node.getAttribute('list')) || '', ctx) || [];
      var as = node.getAttribute('as') || 'item';
      for (var i = 0; i < list.length; i++) {
        var c = Object.create(ctx); c[as] = list[i];
        children(node, c, out);
      }
      return;
    }
    if (tag === 'sc-if') {
      if (get(holeKey(node.getAttribute('value')) || '', ctx)) children(node, ctx, out);
      return;
    }
    var el = document.importNode(node, false);
    var attrs = Array.prototype.slice.call(el.attributes);
    for (var a = 0; a < attrs.length; a++) {
      var name = attrs[a].name, val = attrs[a].value;
      if (name.indexOf('hint-') === 0) { el.removeAttribute(name); continue; }
      if (val.indexOf('{{') === -1) continue;
      if (name.slice(0, 2) === 'on') {
        var fn = get(holeKey(val) || '', ctx);
        el.removeAttribute(name);
        if (typeof fn === 'function') el.addEventListener(name.slice(2), fn);
        continue;
      }
      el.setAttribute(name, fill(val, ctx));
    }
    var kids = [];
    children(node, ctx, kids);
    for (var j = 0; j < kids.length; j++) el.appendChild(kids[j]);
    out.push(el);
  }
  function children(node, ctx, out) {
    var src = node.localName === 'template' ? node.content : node;
    for (var n = src.firstChild; n; n = n.nextSibling) build(n, ctx, out);
  }
  function focusables() {
    return Array.prototype.slice.call(root.querySelectorAll('a[href], button, [tabindex]'));
  }
  function render(keepFocus) {
    var focusIndex = -1;
    if (keepFocus && document.activeElement && root.contains(document.activeElement)) {
      focusIndex = focusables().indexOf(document.activeElement);
    }
    var vals = instance.renderVals() || {};
    var out = [];
    children(tpl, vals, out);
    var frag = document.createDocumentFragment();
    out.forEach(function (n) { frag.appendChild(n); });
    var x = window.scrollX, y = window.scrollY;
    root.replaceChildren(frag);
    setupMenu();
    window.scrollTo(x, y);
    if (focusIndex >= 0) { var f = focusables()[focusIndex]; if (f) f.focus({ preventScroll: true }); }
  }
  render(false);
  if (location.hash && location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
