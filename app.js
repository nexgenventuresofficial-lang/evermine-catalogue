const $ = s => document.querySelector(s);
const wa = (m="") => `https://wa.me/${CONFIG.phone.replace(/\D/g,"")}${m?`?text=${encodeURIComponent(m)}`:""}`;
const srcOf = (x,w=1000) => (x.includes("/")||x.includes(".")) ? x : `https://drive.google.com/thumbnail?id=${x}&sz=w${w}`;
const GEM = `<svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M14 10h36l10 14-28 32L4 24zM4 24h56M24 10l-6 14 14 32 14-32-6-14M18 24 32 10l14 14"/></svg>`;
const slides = a => a.length ? a.map((s,i)=>`<img class="sl${i?"":" on"}" src="${srcOf(s)}" alt="" loading="lazy">`).join("") : `<div class="ph">${GEM}</div>`;
function run(root, ms, sel=".sl"){
  const el = [...root.querySelectorAll(sel)]; if (el.length < 2) return; let i = 0;
  const t = setInterval(() => { if (!document.body.contains(root)) return clearInterval(t);
    el[i].classList.remove("on"); i = (i+1) % el.length; el[i].classList.add("on"); }, ms + Math.random()*500);
}
function reveal(){
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.1});
  els.forEach(e => io.observe(e));
}

/* header / footer wiring */
$("#callLink").href = $("#callFoot").href = "tel:" + CONFIG.phone;
$("#callFoot").textContent = CONFIG.phoneDisplay;
["#waTop","#waFoot","#waFloat"].forEach(s => $(s).href = wa("Hello Evermine Jewels, I would like to know more about your diamond jewellery."));
$("#addr").textContent = CONFIG.address;
$("#mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Evermine Jewels " + CONFIG.address);
if (CONFIG.instagram) ["#igTop","#igFoot"].forEach(s => { $(s).href = CONFIG.instagram; $(s).hidden = false; });
$("#nav").innerHTML = [...CATEGORIES.map(c => `<a href="#/c/${c.slug}">${c.title}</a>`), `<a href="#/films">Films</a>`].join("");

/* data: Drive folder (auto) ya manual list */
const DATA = {}; let DRIVE_ERR = false;
const manual = slug => ITEMS.filter(p => p.cat === slug).map(p => ({ id:p.id, name:p.name, tag:p.tag, desc:p.desc, spec:p.spec||[],
  media:[...(p.images||[]).filter(Boolean).map(s => ({t:"i",src:s})), ...(p.video ? [{t:"v",src:p.video}] : [])] }));
const list = async id => {
  const q = encodeURIComponent(`'${id}' in parents and trashed=false`);
  const r = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,mimeType)&pageSize=300&orderBy=name&key=${CONFIG.driveApiKey}`);
  if (!r.ok) throw new Error("drive"); return (await r.json()).files;
};
const parse = files => { const m = new Map();          // file name: "R-101 - Solitaire Ring.jpg"  (2nd photo: "... (2).jpg")
  files.filter(f => /^(image|video)\//.test(f.mimeType)).forEach(f => {
    const base = f.name.replace(/\.[^.]+$/,"").replace(/\s*\(\d+\)$/,"");
    const [id, ...rest] = base.split(/\s+-\s+/); const k = id.trim();
    const it = m.get(k) || { id:k, name:rest.join(" - ") || k, spec:[], media:[] };
    it.media.push({ t: f.mimeType.startsWith("video") ? "v" : "i", src:f.id }); m.set(k, it); });
  return [...m.values()]; };
async function load(){
  if (!CONFIG.driveApiKey){ CATEGORIES.forEach(c => DATA[c.slug] = manual(c.slug)); return; }
  try {
    const subs = CONFIG.rootFolder ? (await list(CONFIG.rootFolder)).filter(f => f.mimeType === "application/vnd.google-apps.folder") : [];
    const find = re => subs.find(f => new RegExp(re,"i").test(f.name));
    await Promise.all(CATEGORIES.map(async c => { const id = c.folder || (find(c.match)||{}).id; DATA[c.slug] = id ? parse(await list(id)) : []; }));
    const b = find("banner"); if (b){ const x = (await list(b.id)).filter(f => f.mimeType.startsWith("image")); if (x.length) HERO.splice(0, HERO.length, ...x.map(f => ({type:"image", src:f.id}))); }
    const fl = find("film|video"); if (fl){ const x = (await list(fl.id)).filter(f => f.mimeType.startsWith("video")); if (x.length) FILMS.splice(0, FILMS.length, ...x.map(f => ({title:f.name.replace(/\.[^.]+$/,""), id:f.id}))); }
  } catch(e){ DRIVE_ERR = true; CATEGORIES.forEach(c => DATA[c.slug] = manual(c.slug)); }
}

/* pages */
const tile = c => { const it = DATA[c.slug]||[];
  const s = c.cover ? [c.cover] : it.flatMap(i => i.media.filter(m => m.t==="i").map(m => m.src)).slice(0,8);
  return `<a class="tile reveal" href="#/c/${c.slug}">${slides(s)}<span>${c.title}<small>${it.length} designs</small></span></a>`; };

function home(){
  const hs = HERO.filter(s => s.src);
  $("#view").innerHTML = `
  <section class="hero${hs.length?" has-media":""}" id="top">
    <div class="hero-bg">${hs.map((s,i) => `<div class="slide${i?"":" on"}">${s.type==="video" ? `<video src="${srcOf(s.src,1600)}" autoplay muted loop playsinline></video>` : `<img src="${srcOf(s.src,1600)}" alt="">`}</div>`).join("")}</div>
    <div class="hero-text"><p class="kicker">The Evermine Signature</p><h1>Refined radiance<br>for your <em>everyday.</em></h1><a class="btn-line" href="#/c/${CATEGORIES[0].slug}">Explore the catalogue</a></div>
    <div class="hero-art" aria-hidden="true">${GEM}</div>
  </section>
  <ul class="assure"><li>Certified precious materials</li><li>Made with considered craft</li></ul>
  <section class="sec"><p class="kicker dark">Evermine Jewels</p><h2>Shop by collection</h2><div class="tiles">${CATEGORIES.map(tile).join("")}</div></section>
  <section class="sec films"><p class="kicker dark">In motion</p><h2>Watch the sparkle</h2><p style="text-align:center"><a class="btn-solid" href="#/films">Watch films</a></p></section>
  <section class="story"${STORY_BG?` style="background-image:linear-gradient(rgba(43,58,54,.7),rgba(43,58,54,.8)),url(${srcOf(STORY_BG,1600)})"`:""}>
    <p class="kicker">Evermine Atelier</p><h2>Our craft is our pride.</h2>
    <p>Every piece is designed and finished by hand in Surat, the diamond capital of India.</p>
    <a class="btn-line" href="${wa("Hello Evermine Jewels, I would like to talk to your designers.")}" target="_blank" rel="noopener">Talk to our designers</a></section>`;
  run($(".hero-bg"), CONFIG.heroMs, ".slide");
  document.querySelectorAll(".tile").forEach(t => run(t, CONFIG.slideMs));
}

function category(slug){
  const c = CATEGORIES.find(x => x.slug === slug); if (!c) return home();
  const items = DATA[slug] || [];
  $("#view").innerHTML = `<section class="sec page"><p class="crumb"><a href="#/">Home</a> &nbsp;/&nbsp; ${c.title}</p><h2>${c.title}</h2>
    <p class="count">${items.length} designs</p>${DRIVE_ERR ? `<p class="count">Drive se load nahi hua, saved list dikha rahe hain.</p>` : ""}
    <div class="tools"><input id="search" type="search" placeholder="Search by ID or name" aria-label="Search"></div>
    <div class="grid" id="grid"></div><p class="empty" id="empty" hidden>No designs found.</p></section>`;
  const draw = q => {
    const l = items.filter(i => (i.id + i.name).toLowerCase().includes(q));
    $("#grid").innerHTML = l.map(i => `<article class="card reveal" tabindex="0" data-id="${i.id}"><div class="thumb">${i.tag ? `<span class="badge">${i.tag}</span>` : ""}${slides(i.media.filter(m => m.t==="i").map(m => m.src))}</div>
      <h3>${i.name}</h3><p class="pid">ID · ${i.id}</p></article>`).join("");
    $("#empty").hidden = l.length > 0;
    document.querySelectorAll(".thumb").forEach(t => run(t, CONFIG.slideMs)); reveal();
  };
  draw(""); $("#search").oninput = e => draw(e.target.value.toLowerCase());
  const open = e => { const k = e.target.closest(".card"); if (k) openModal(items.find(i => i.id === k.dataset.id)); };
  $("#grid").onclick = open; $("#grid").onkeydown = e => e.key === "Enter" && open(e);
}

function films(){
  $("#view").innerHTML = `<section class="sec page"><p class="crumb"><a href="#/">Home</a> &nbsp;/&nbsp; Films</p><h2>Watch the sparkle</h2><div class="vgrid">${FILMS.map(f => f.id
    ? `<figure><iframe src="https://drive.google.com/file/d/${f.id}/preview" allow="autoplay; fullscreen" loading="lazy" title="${f.title}"></iframe><figcaption>${f.title}</figcaption></figure>`
    : `<figure><div class="ph vph">${GEM}<span>Video coming soon</span></div><figcaption>${f.title}</figcaption></figure>`).join("")}</div></section>`;
}

/* product popup */
function openModal(p){
  const show = it => $("#mStage").innerHTML = !it ? `<div class="ph">${GEM}</div>` : it.t==="v"
    ? `<iframe src="https://drive.google.com/file/d/${it.src}/preview" allow="autoplay; fullscreen" title="${p.name} video"></iframe>` : `<img src="${srcOf(it.src,1200)}" alt="${p.name}">`;
  show(p.media[0]);
  $("#mThumbs").innerHTML = p.media.length > 1 ? p.media.map((m,i) => `<button data-i="${i}">${m.t==="v" ? "Video" : "Photo " + (i+1)}</button>`).join("") : "";
  $("#mThumbs").onclick = e => e.target.dataset.i && show(p.media[+e.target.dataset.i]);
  $("#mCat").textContent = "ID · " + p.id; $("#mTitle").textContent = p.name;
  $("#mDesc").textContent = p.desc || ""; $("#mSpec").innerHTML = (p.spec||[]).map(s => `<li>${s}</li>`).join("");
  $("#mWa").href = wa(`Hello Evermine Jewels, I am interested in ${p.name} (ID: ${p.id}). Please share details.`);
  $("#modal").hidden = false; document.body.style.overflow = "hidden"; $("#mClose").focus();
}
function closeModal(){ $("#modal").hidden = true; $("#mStage").innerHTML = ""; document.body.style.overflow = ""; }
$("#mClose").onclick = closeModal; $("#modal").onclick = e => { if (e.target.id === "modal") closeModal(); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

/* router */
function route(){
  const h = location.hash || "#/"; if (h === "#contact") return;
  closeModal(); scrollTo(0,0);
  const m = h.match(/^#\/c\/(.+)$/); m ? category(m[1]) : h === "#/films" ? films() : home();
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("on", a.getAttribute("href") === h)); reveal();
}
$("#view").innerHTML = `<p class="empty">Loading…</p>`; load().then(route); addEventListener("hashchange", route);
