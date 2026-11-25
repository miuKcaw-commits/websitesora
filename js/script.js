/* SORA CITY — logika situs. Data & pengaturan ada di js/data.js */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const addr = () => CONFIG.ip + (CONFIG.port ? ":" + CONFIG.port : "");
const toast = m => { const e = $("#toast"); e.textContent = m; e.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove("on"), 2200); };
const ICON = {
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
};
const SOC = [["tiktok", "TikTok", v => v], ["email", "Email", v => "mailto:" + v]];
const pill = (arr, c) => arr.map(x => `<span class="${c}">${x}</span>`).join("");


/* ---------- gambar gagal dimuat -> placeholder rapi ---------- */
document.addEventListener("error", e => {
  const im = e.target; if (!(im instanceof HTMLImageElement)) return;
  const fi = im.closest(".fi"), ab = im.closest(".alb");
  if (fi) { fi.classList.add("e"); im.replaceWith(Object.assign(document.createElement("span"), { textContent: (im.alt || "?")[0].toUpperCase() })); }
  else if (im.closest(".photo")) { im.replaceWith(Object.assign(document.createElement("div"), { className: "em", textContent: "foto menyusul" })); }
  else if (ab) { const i = ab.dataset.i; if (i != null && GALLERY[i]) GALLERY[i].src = ""; ab.removeAttribute("data-i"); ab.classList.add("e"); im.replaceWith(Object.assign(document.createElement("div"), { className: "em", textContent: "foto menyusul" })); }
}, true);

/* ---------- latar hero: video cinematic (fallback ke foto) ---------- */
function useSlides() { $("#slides").innerHTML = HERO_SLIDES.map((s, i) => `<img src="${s}" alt="" ${i ? 'loading="lazy"' : ""}>`).join(""); si = 0; slide(); }
function buildHero() {
  if (!HERO_VIDEO) return useSlides();
  const hero = $("#hero"), v = document.createElement("video");
  v.src = HERO_VIDEO; v.poster = HERO_SLIDES[0] || ""; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.preload = "auto"; v.disablePictureInPicture = true;
  v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
  if (typeof HERO_FOCUS !== "undefined") hero.style.setProperty("--focus", HERO_FOCUS);
  v.onerror = () => { v.remove(); useSlides(); };
  $("#slides").appendChild(v); v.play().catch(() => {});
}


/* ---------- helper carousel: baris otomatis dibagi 2 kalau panjang ---------- */
const CHEV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;
const carHTML = (items, label) => `<div class="car" data-car><div class="cst"><button class="cb cp" type="button" aria-label="Geser ke kiri">${CHEV("m15 5-7 7 7 7")}</button><div class="track" tabindex="0" role="region" aria-label="${label}">${items.join("")}</div><button class="cb cn" type="button" aria-label="Geser ke kanan">${CHEV("m9 5 7 7-7 7")}</button></div><div class="dots"></div></div>`;
const rowsHTML = (items, label, max = 4) => { const h = Math.ceil(items.length / 2); return (items.length > max ? [items.slice(0, h), items.slice(h)] : [items]).map(r => carHTML(r, label)).join(""); };

/* ---------- render konten dari data.js ---------- */
function build() {
  $("#rail").innerHTML = `<a href="#home"><img class="logo" src="assets/logo-sr.png" alt="Sora City"></a>` +
    NAV.map(([k, v], i) => `<a class="l" href="#${k}" data-p="${k}"><b>0${i + 1}</b><span>${v}</span></a>`).join("") +
    `<div class="st"><i class="dot" data-dot></i>MC</div>`;
  $$("[data-ip]").forEach(e => e.textContent = addr());
  buildHero();
  $("#steps").innerHTML = STEPS.map((s, i) => `<li class="rv" style="transition-delay:${i * .1}s"><div class="n">${i + 1}</div><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join("");
  $("#comm").innerHTML = COMMUNITY.map((c, i) => `<a class="paper pinned rv" href="${c.url}" target="_blank" rel="noopener"><div class="nt">PENGUMUMAN 0${i + 1}</div><h3>${c.name}</h3><p>${c.note}</p><span class="go">Buka →</span></a>`).join("");
  $("#feat").innerHTML = rowsHTML(FEATURES.map((f, i) => `<article class="paper taped fc lift"><div class="fi ${f.img ? "" : "e"}">${f.img ? `<img src="${f.img}" alt="${f.name}" draggable="false">` : `<span>${f.name[0]}</span>`}</div><div class="tx"><div class="nt">FASILITAS ${String(i + 1).padStart(2, "0")}</div><h3>${f.name}</h3><p>${f.desc}</p></div></article>`), "Daftar fitur", 4);
  $("#gal").innerHTML = rowsHTML(GALLERY.map((g, i) => g.src
    ? `<button class="alb" style="--r:${g.rot}deg" data-i="${i}"><img src="${g.src}" alt="${g.cap}" draggable="false" ${i > 2 ? 'loading="lazy"' : ""}><span class="cap">${g.cap}</span></button>`
    : `<div class="alb e" style="--r:${g.rot}deg"><div class="em">foto menyusul</div><span class="cap">${g.cap}</span></div>`), "Galeri foto", 4);
  $("#staff").innerHTML = STAFF.map(g => `<div class="sgw"><h2 class="sg">${g.group.toUpperCase()}</h2>${carHTML(g.members.map(m => `<article class="ktp"><div class="kh"><span>KARTU TANDA PENDUDUK</span><span>SORA CITY</span></div><div class="kb">${m.skin ? `<img class="skin" src="${m.skin}" alt="${m.name}">` : `<div class="skin">${(m.name.match(/[A-Za-z0-9]/) || ["?"])[0].toUpperCase()}</div>`}<dl><dt>NAMA</dt><dd class="nm">${m.name}</dd><dt>JABATAN</dt><dd>${m.role}</dd><dt>DOMISILI</dt><dd>Sora City</dd><div class="chip"></div></dl></div><div class="ds">${m.desc}</div><div class="soc">${SOC.map(([k, n, f]) => m[k] ? `<a href="${f(m[k])}" target="_blank" rel="noopener" aria-label="${n} ${m.name}" title="${n}">${ICON[k]}</a>` : `<span class="off" title="${n} belum diisi">${ICON[k]}</span>`).join("")}</div></article>`), g.group)}</div>`).join("");
  $("#rank").innerHTML = rowsHTML(RANKS.map((r, i) => `<article class="tk"><div class="top"><div class="lab"><span>TIKET RANK</span><span>${r.icon}</span></div><div class="pr">Rp${r.price}</div><div class="pe">${r.period.toUpperCase()}</div></div><div class="bd"><div><h4>PREFIX</h4>${pill(r.prefix.split(", "), "pill")}</div><div><h4>PERMISSION</h4>${pill(r.perms, "cmd")}</div><div><h4>BONUS</h4>${pill(r.extra, "pill")}</div><div class="sp"></div><button class="btn bp bw" data-buy="${i}" data-mag>Beli via WhatsApp</button></div></article>`), "Daftar rank", 99);
  $("#duo").innerHTML = CREATORS.map((c, i) => `<article class="cc rv" style="transition-delay:${i * .15}s"><div class="ci"><span class="role2">${c.role.toUpperCase()}</span><div class="stage">${c.skin ? `<div class="sk"><img class="b" src="${c.skin}" alt="Skin ${c.name}">${c.skinHover ? `<img class="s" src="${c.skinHover}" alt="">` : ""}</div>` : `<div class="sil">Taruh skin di<br>assets/skins/<br>lalu isi di data.js</div>`}</div>${c.skin && c.skinHover ? '<div class="hint">◉ ARAHKAN KURSOR KE SKIN</div>' : ""}<h2 class="nm2">${c.name}</h2><p class="tg">${c.tagline}</p><div class="soc">${SOC.map(([k, n, f]) => c[k] ? `<a href="${f(c[k])}" target="_blank" rel="noopener" aria-label="${n} ${c.name}" title="${n}">${ICON[k]}</a>` : `<span class="off" title="${n} belum diisi">${ICON[k]}</span>`).join("")}</div></div></article>`).join("");
  $$(".rv").forEach(e => io.observe(e));
}
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });


/* ---------- carousel geser (fitur & galeri): swipe di HP, drag / panah di PC ---------- */
function initCar(car) {
  const tr = $(".track", car), items = [...tr.children], dots = $(".dots", car), pb = $(".cp", car), nb = $(".cn", car);
  dots.innerHTML = items.map((_, i) => `<button type="button" aria-label="Ke kartu ${i + 1}"></button>`).join("");
  const db = [...dots.children];
  const pad = () => parseFloat(getComputedStyle(tr).paddingLeft) || 0;
  const step = () => items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : tr.clientWidth;
  const near = () => { let k = 0, best = 1e9; items.forEach((it, i) => { const d = Math.abs(it.offsetLeft - pad() - tr.scrollLeft); if (d < best) { best = d; k = i; } }); return k; };
  function upd() {
    if (!tr.clientWidth) return;
    const max = tr.scrollWidth - tr.clientWidth, x = tr.scrollLeft;
    pb.disabled = x <= 2; nb.disabled = x >= max - 2;
    car.classList.toggle("nos", max <= 2);
    const k = x >= max - 2 ? items.length - 1 : near();
    db.forEach((d, i) => d.classList.toggle("on", i === k));
  }
  let raf = 0; tr.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); }, { passive: true });
  new ResizeObserver(upd).observe(tr);
  const go = d => tr.scrollBy({ left: d * Math.max(1, Math.floor(tr.clientWidth / step()) - 1) * step(), behavior: "smooth" });
  pb.onclick = () => go(-1); nb.onclick = () => go(1);
  db.forEach((d, i) => d.onclick = () => tr.scrollTo({ left: items[i].offsetLeft - pad(), behavior: "smooth" }));
  /* drag dengan mouse (di HP sudah otomatis swipe) */
  let down = false, sx = 0, sl = 0, moved = 0;
  tr.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse" || e.button !== 0) return; down = true; moved = 0; sx = e.clientX; sl = tr.scrollLeft; });
  addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) tr.classList.add("drag"); if (tr.classList.contains("drag")) { tr.scrollLeft = sl - dx; moved = Math.abs(dx); } });
  addEventListener("pointerup", () => { if (!down) return; down = false; if (tr.classList.contains("drag")) { tr.classList.remove("drag"); tr.scrollTo({ left: items[near()].offsetLeft - pad(), behavior: "smooth" }); } });
  tr.addEventListener("click", e => { if (moved > 5) { e.stopPropagation(); e.preventDefault(); } moved = 0; }, true);
  tr.addEventListener("dragstart", e => e.preventDefault());
  upd();
}

/* ---------- routing + tirai awan ---------- */
const ANCH = { gabung: "home", komunitas: "home" };
let cur = null, busy = false, pt = { x: innerWidth / 2, y: innerHeight / 2 };
document.addEventListener("pointerdown", e => { pt = { x: e.clientX, y: e.clientY }; }, true);
const target = () => { const h = (location.hash || "#home").slice(1); return NAV.some(n => n[0] === h) ? h : (ANCH[h] || "home"); };
function show() {
  const h = (location.hash || "#home").slice(1), p = target();
  $$(".page").forEach(e => e.classList.toggle("on", e.id === "p-" + p));
  $$(".rail a.l").forEach(a => a.classList.toggle("on", a.dataset.p === p));
  document.title = (p === "home" ? "Sora City — Server Minecraft Kota" : NAV.find(n => n[0] === p)[1] + " · Sora City");
  if (ANCH[h]) $("#" + h).scrollIntoView(); else scrollTo(0, 0);
  document.body.classList.toggle("cosmos", p === "creators");
  cur = p;
  music.set(p);
}
/* Transisi: tiga lapis warna langit mengembang dari titik klik sampai menutup layar penuh, halaman diganti, lalu menyusut kembali */
async function go() {
  const p = target();
  if (cur === null || p === cur || matchMedia("(prefers-reduced-motion:reduce)").matches || !Element.prototype.animate) return show();
  if (busy) return; busy = true;
  const c = $("#curtain"), v = $$(".cv", c), l = $(".cvl", c), R = Math.hypot(innerWidth, innerHeight) * 1.15;
  const clip = r => `circle(${r}px at ${pt.x}px ${pt.y}px)`, o = { duration: 640, easing: "cubic-bezier(.65,0,.25,1)", fill: "forwards" };
  $("#cvt").textContent = NAV.find(n => n[0] === p)[1].toUpperCase();
  c.classList.add("on");
  const ins = v.map((el, i) => el.animate([{ clipPath: clip(0) }, { clipPath: clip(R) }], { ...o, delay: i * 110 }));
  l.animate([{ opacity: 0, transform: "scale(.85)" }, { opacity: 1, transform: "none" }], { duration: 450, delay: 430, fill: "forwards", easing: "ease-out" });
  await Promise.all(ins.map(a => a.finished));
  show();
  await new Promise(r => setTimeout(r, 220));
  l.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" });
  const outs = v.map((el, i) => el.animate([{ clipPath: clip(R) }, { clipPath: clip(0) }], { ...o, delay: (2 - i) * 110 }));
  await Promise.all(outs.map(a => a.finished));
  [...ins, ...outs].forEach(a => a.cancel()); l.getAnimations().forEach(a => a.cancel());
  c.classList.remove("on"); busy = false;
  if (target() !== cur) go();
}
addEventListener("hashchange", go);

/* ---------- status server (API nyata) ---------- */
const st = {
  d: null,
  show() {
    const d = this.d;
    $$("[data-stat]").forEach(e => e.textContent = d === null ? "Tidak tersedia" : d.online ? "Online" : "Offline");
    $$("[data-dot]").forEach(e => e.className = "dot" + (d ? (d.online ? " on" : " off") : ""));
    $$("[data-players]").forEach(e => e.textContent = d && d.online && d.players != null ? d.players + (d.max ? " / " + d.max : "") : "—");
  },
  async load() {
    try { const j = await (await fetch(CONFIG.statusApi + encodeURIComponent(addr()))).json(); this.d = { online: !!j.online, players: j.players && j.players.online, max: j.players && j.players.max }; }
    catch (e) { this.d = null; }
    this.show();
  }
};

/* ---------- klik: salin IP, beli rank, lightbox ---------- */
document.addEventListener("click", async e => {
  if (e.target.closest("[data-copy]")) {
    try { await navigator.clipboard.writeText(addr()); } catch (_) { const x = document.createElement("textarea"); x.value = addr(); document.body.appendChild(x); x.select(); document.execCommand("copy"); x.remove(); }
    toast("IP berhasil disalin!");
  }
  const b = e.target.closest("[data-buy]");
  if (b) {
    if (!CONFIG.waNumber) return toast("Nomor WhatsApp belum diatur di data.js");
    const r = RANKS[b.dataset.buy];
    open(`https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(`Halo admin Sora City, saya ingin membeli rank Rp${r.price} (${r.period}).`)}`, "_blank", "noopener");
  }
  const g = e.target.closest(".alb[data-i]"); if (g) lb.open(+g.dataset.i);
});

/* ---------- interaksi: kilau kaca, tilt, magnet, parallax ---------- */
let pmE = null, pmR = 0;
document.addEventListener("pointermove", e => {
  pmE = e; if (pmR) return;
  pmR = requestAnimationFrame(() => {
    pmR = 0; const e = pmE;
    const g = e.target.closest && e.target.closest(".glass");
    if (g) { const r = g.getBoundingClientRect(); g.style.setProperty("--mx", e.clientX - r.left + "px"); g.style.setProperty("--my", e.clientY - r.top + "px"); }
    const t = e.target.closest("[data-tilt]");
    if (t) { const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; t.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; }
    const m = e.target.closest("[data-mag]");
    if (m) { const r = m.getBoundingClientRect(); m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; }
    if (e.pointerType === "mouse" && $("#hero").offsetParent) { const px = (e.clientX / innerWidth - .5).toFixed(3), py = (e.clientY / innerHeight - .5).toFixed(3); [".ht", ".board"].forEach(q => { const n = $(q); if (n) { n.style.setProperty("--px", px); n.style.setProperty("--py", py); } }); }
  });
});
document.addEventListener("pointerout", e => { const t = e.target.closest("[data-tilt],[data-mag]"); if (t && !t.contains(e.relatedTarget)) t.style.transform = ""; });

/* ---------- latar hero bergantian ---------- */
let si = 0; const sl = () => $$("#slides img");
function slide() { const a = sl(); if (!a.length) return; a.forEach((x, i) => x.classList.toggle("on", i === si)); si = (si + 1) % a.length; }

/* ---------- lightbox ---------- */
const lb = {
  i: 0, l() { return GALLERY.map((g, i) => i).filter(i => GALLERY[i].src); },
  open(i) { this.i = i; this.show(); $("#lb").classList.add("open"); }, close() { $("#lb").classList.remove("open"); },
  step(d) { const l = this.l(), k = l.indexOf(this.i); this.i = l[(k + d + l.length) % l.length]; this.show(); },
  show() { const g = GALLERY[this.i]; $("#lb img").src = g.src; $("#lb img").alt = g.cap; $("#lb p").textContent = g.cap; }
};
$("#lb .x").onclick = () => lb.close(); $("#lb .pv").onclick = () => lb.step(-1); $("#lb .nx").onclick = () => lb.step(1);
$("#lb").onclick = e => { if (e.target.id === "lb") lb.close(); };
addEventListener("keydown", e => { if (!$("#lb").classList.contains("open")) return; if (e.key === "Escape") lb.close(); if (e.key === "ArrowLeft") lb.step(-1); if (e.key === "ArrowRight") lb.step(1); });

/* ---------- musik latar: lagu utama (Beranda–Rank) + lagu khusus Web Dev, loop, mute + volume ---------- */
const music = (() => {
  const btn = $("#mute"), sld = $("#vol"), vv = $("#volv"), cfg = typeof MUSIC !== "undefined" ? MUSIC : null;
  if (!cfg || !(cfg.main || cfg.creators)) { btn.onclick = () => toast("Musik belum diatur di data.js"); return { set() {} }; }
  const tracks = {}, save = (k, v) => { try { localStorage.setItem(k, v); } catch (_) {} };
  let vol = cfg.volume == null ? .35 : cfg.volume, muted = false, want = "main", cur = null, started = true;
  try { muted = localStorage.getItem("sora-muted") === "1"; const sv = parseFloat(localStorage.getItem("sora-vol")); if (!isNaN(sv)) vol = Math.min(1, Math.max(0, sv)); } catch (_) {}
  const mk = k => { if (!cfg[k]) return null; const a = new Audio(); a.loop = true; a.preload = k === "main" ? "auto" : "metadata"; a.volume = 0; a.muted = muted; a.src = cfg[k]; a.addEventListener("error", () => { tracks[k] = null; }); return a; };
  tracks.main = mk("main"); tracks.creators = mk("creators");
  const fade = (a, to, ms, done) => { clearInterval(a._f); const from = a.volume, t0 = performance.now(); a._f = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / ms); a.volume = from + (to - from) * k; if (k === 1) { clearInterval(a._f); if (done) done(); } }, 50); };
  const ui = () => { const off = muted || vol === 0; btn.classList.toggle("off", off); btn.setAttribute("aria-pressed", off); btn.setAttribute("aria-label", off ? "Nyalakan musik" : "Matikan musik"); sld.value = Math.round(vol * 100); sld.style.setProperty("--v", sld.value + "%"); vv.textContent = sld.value; };
  const setMuted = m => { muted = m; save("sora-muted", m ? "1" : "0"); Object.values(tracks).forEach(a => a && (a.muted = m)); };
  const arm = () => { const ev = ["pointerup", "touchend", "keydown", "click"], go = () => { ev.forEach(e => removeEventListener(e, go, true)); started = true; sync(); }; ev.forEach(e => addEventListener(e, go, true)); };
  function sync() {
    if (!started) return;
    const a = tracks[want] || tracks.main; if (!a) return;
    if (cur && cur !== a) { const o = cur; fade(o, 0, 600, () => o.pause()); cur = null; }
    if (cur === a && !a.paused) return;
    a.muted = muted;
    a.play().then(() => { cur = a; fade(a, vol, 800); }).catch(err => { if (err && err.name === "NotAllowedError") { started = false; arm(); } });
  }
  btn.onclick = () => { if (!tracks.main && !tracks.creators) return toast("File musik belum ada di assets/audio/"); if (muted || vol === 0) { if (vol === 0) vol = .35, save("sora-vol", vol); setMuted(false); } else setMuted(true); ui(); started = true; sync(); if (cur && !muted) { clearInterval(cur._f); cur.volume = vol; } };
  sld.oninput = () => { vol = sld.value / 100; save("sora-vol", vol); if (vol > 0 && muted) setMuted(false); if (cur) { clearInterval(cur._f); cur.volume = vol; } ui(); started = true; sync(); };
  document.addEventListener("visibilitychange", () => { if (!cur) return; if (document.hidden) cur.pause(); else if (started) cur.play().catch(() => {}); });
  ui();
  return { set(p) { want = p === "creators" ? "creators" : "main"; sync(); } };
})();

/* swipe kiri/kanan di lightbox (HP) */
(() => { const l = $("#lb"); let x0 = null, y0 = 0;
  l.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  l.addEventListener("touchend", e => { if (x0 === null) return; const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0; x0 = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) lb.step(dx < 0 ? 1 : -1); }, { passive: true });
})();

build(); $$("[data-car]").forEach(initCar); show(); setInterval(slide, 6500); st.load(); setInterval(() => st.load(), 60000);

/* ---------- Arsitek: tilt kartu, bayangan Spiderman mengikuti kursor, bintang ---------- */
document.addEventListener("pointermove", e => {
  const k = e.target.closest(".sk");
  if (k) { const r = k.getBoundingClientRect(); k.style.setProperty("--x", e.clientX - r.left + "px"); k.style.setProperty("--y", e.clientY - r.top + "px"); k.classList.add("hv"); }
  document.querySelectorAll(".sk.hv").forEach(x => { if (x !== k) x.classList.remove("hv"); });
  const c = e.target.closest(".cc");
  if (c) { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`; }
  document.querySelectorAll(".cc").forEach(x => { if (x !== c) x.style.transform = ""; });
  mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5;
});
document.addEventListener("pointerleave", () => document.querySelectorAll(".sk.hv").forEach(x => x.classList.remove("hv")));
let mx = 0, my = 0, W, H, ST = [], shoot = null;
const cvs = $("#stars"), cx = cvs.getContext("2d");
function rs() { const d = devicePixelRatio || 1; W = cvs.width = innerWidth * d; H = cvs.height = innerHeight * d; ST = Array.from({ length: 160 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.4 + .3) * d, t: Math.random() * 6, z: Math.random() * .8 + .2 })); }
rs(); addEventListener("resize", rs);
(function loop(t) {
  if ($("#p-creators").classList.contains("on")) {
    cx.clearRect(0, 0, W, H);
    ST.forEach(s => { cx.globalAlpha = .35 + .65 * Math.abs(Math.sin(t / 900 + s.t)); cx.fillStyle = "#cfe3ff"; cx.beginPath(); cx.arc(s.x - mx * 30 * s.z, s.y - my * 30 * s.z, s.r, 0, 6.3); cx.fill(); });
    if (!shoot && Math.random() < .006) shoot = { x: Math.random() * W, y: Math.random() * H * .4, l: 0 };
    if (shoot) { cx.globalAlpha = 1 - shoot.l / 40; const g = cx.createLinearGradient(shoot.x, shoot.y, shoot.x - 120, shoot.y - 70); g.addColorStop(0, "#fff"); g.addColorStop(1, "transparent"); cx.strokeStyle = g; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(shoot.x, shoot.y); cx.lineTo(shoot.x - 120, shoot.y - 70); cx.stroke(); shoot.x += 18; shoot.y += 10; if (++shoot.l > 40) shoot = null; }
  }
  requestAnimationFrame(loop);
})(0);
