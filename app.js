/* Shared logic for both the English and Russian pages.
   Reads window.PAGE_LANG ("en" | "ru") and window.SITE_CONFIG (config.js).
   You should not need to edit this file. */
(function(){
  var L = (window.PAGE_LANG === "ru") ? "ru" : "en";
  var C = window.SITE_CONFIG || {};
  var t = function(en, ru){ return L === "ru" ? ru : en; };
  var byId = function(id){ return document.getElementById(id); };
  var esc = function(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };

  /* ---------- Amazon: open the visitor's local store (same KDP ASIN, all marketplaces) ---------- */
  var AMZ_TLD = {
    "Asia/Kolkata":"in","Asia/Calcutta":"in","Europe/London":"co.uk","Europe/Dublin":"co.uk",
    "Europe/Berlin":"de","Europe/Vienna":"de","Europe/Zurich":"de","Europe/Paris":"fr","Europe/Brussels":"fr",
    "Europe/Madrid":"es","Europe/Rome":"it","Europe/Amsterdam":"nl","Europe/Stockholm":"se","Europe/Warsaw":"pl",
    "Asia/Tokyo":"co.jp","Asia/Dubai":"ae","Asia/Riyadh":"sa","Asia/Singapore":"sg",
    "America/Toronto":"ca","America/Vancouver":"ca","America/Edmonton":"ca","America/Winnipeg":"ca","America/Halifax":"ca",
    "America/Sao_Paulo":"com.br","America/Mexico_City":"com.mx",
    "Australia/Sydney":"com.au","Australia/Melbourne":"com.au","Australia/Brisbane":"com.au","Australia/Perth":"com.au"
  };
  function amazonTLD(){
    try{
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if(AMZ_TLD[tz]) return AMZ_TLD[tz];
      if(tz.indexOf("Australia/")===0) return "com.au";
    }catch(e){}
    return "com";
  }
  function localizeAmazon(url){
    if(!url || url.indexOf("amazon.")<0) return url;
    var tld = amazonTLD();
    var book = url.match(/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i);
    if(book) return "https://www.amazon."+tld+"/dp/"+book[1];
    var author = url.match(/\/(?:-\/e|stores\/author)\/([A-Z0-9]{10})/i);
    if(author) return "https://www.amazon."+tld+"/-/e/"+author[1];
    return url;                              // not a recognised pattern -> leave as pasted
  }

  /* ---------- BUY BUTTONS ---------- */
  function renderBuy(){
    var box = byId("buy-buttons"); if(!box) return;
    var order = (C.buyOrder && C.buyOrder[L]) || [];
    var map = {}; (C.buy||[]).forEach(function(b){ map[b.id]=b; });
    var html = "";
    order.forEach(function(id){
      var b = map[id]; if(!b) return;
      var label = esc(b.label[L] || b.label.en);
      if(b.url && b.url.trim()){
        var cls = (id==="direct") ? "btn ghost" : "btn";
        html += '<a class="'+cls+'" href="'+esc(localizeAmazon(b.url))+'" target="_blank" rel="noopener">'+label+'</a>';
      } else {
        html += '<span class="btn soon">'+label+'<small>'+t("Coming soon","Скоро")+'</small></span>';
      }
    });
    box.innerHTML = html;
  }

  /* ---------- REVIEW BUTTONS ---------- */
  function renderReview(){
    var box = byId("review-buttons"); if(!box) return;
    var html = "";
    (C.review||[]).forEach(function(r){
      if(r.url && r.url.trim()){
        html += '<a href="'+esc(localizeAmazon(r.url))+'" target="_blank" rel="noopener">'+esc(r.label[L]||r.label.en)+'</a>';
      }
    });
    box.innerHTML = html || '<span style="color:var(--muted);font-family:Arial,sans-serif;font-size:13px">'+
      t("Review links will appear here once the stores are live.","Ссылки на отзывы появятся, когда магазины станут доступны.")+'</span>';
  }

  /* ---------- SHARE BUTTONS ---------- */
  function renderShare(){
    var box = byId("share-buttons"); if(!box) return;
    var url = encodeURIComponent((C.canonical && C.canonical[L]) || location.href);
    var text = encodeURIComponent(t(
      "It was never your fault — because it was never you.",
      "Это не было твоей виной — потому что это никогда не был ты."));
    box.innerHTML =
      '<a href="https://t.me/share/url?url='+url+'&text='+text+'" target="_blank" rel="noopener">Telegram</a>'+
      '<a href="https://wa.me/?text='+text+'%20'+url+'" target="_blank" rel="noopener">WhatsApp</a>'+
      '<a href="https://twitter.com/intent/tweet?text='+text+'&url='+url+'" target="_blank" rel="noopener">X</a>'+
      '<button type="button" id="copybtn">'+t("Copy link","Скопировать ссылку")+'</button>';
    var cb = byId("copybtn");
    if(cb) cb.addEventListener("click", function(){
      var link = (C.canonical && C.canonical[L]) || location.href;
      if(navigator.clipboard) navigator.clipboard.writeText(link);
      cb.textContent = t("Copied ✓","Скопировано ✓");
      setTimeout(function(){ cb.textContent = t("Copy link","Скопировать ссылку"); }, 1800);
    });
  }

  /* ---------- CONTACT ---------- */
  function renderContact(){
    var box = byId("contact-links"); if(!box || !C.contact) return;
    var parts = [];
    if(C.contact.email) parts.push('<a href="mailto:'+esc(C.contact.email)+'">'+esc(C.contact.email)+'</a>');
    if(C.contact.telegram) parts.push('<a href="https://t.me/'+esc(C.contact.telegram)+'" target="_blank" rel="noopener">Telegram: @'+esc(C.contact.telegram)+'</a>');
    box.innerHTML = parts.join('<span style="color:var(--line)"> &nbsp;·&nbsp; </span>');
  }

  /* ---------- FOOTER LINKS (language-aware order) ---------- */
  var LABELS = {
    goodreads:"Goodreads", amazonAuthor:{en:"Amazon Author",ru:"Автор на Amazon"}, instagram:"Instagram",
    wikipedia_en:"Wikipedia", wikipedia_ru:"Википедия", googleBooks:"Google Books",
    livelib:"LiveLib", litresAuthor:{en:"Litres",ru:"Литрес"}, vk:"VK", dzen:"Dzen",
    authorToday:"Author.Today", wikidata:"Wikidata", youtube:"YouTube",
    newsletter:{en:"Newsletter",ru:"Рассылка"}
  };
  var FOOTER_ORDER = {
    en:["goodreads","amazonAuthor","instagram","wikipedia_en","googleBooks","youtube","wikidata","newsletter"],
    ru:["livelib","litresAuthor","vk","wikipedia_ru","dzen","authorToday","youtube","wikidata","newsletter"]
  };
  function lbl(key){ var v=LABELS[key]; return v && v.en ? t(v.en,v.ru) : (v||key); }
  function renderFooter(){
    var box = byId("footer-links"); if(!box) return;
    var s = C.social||{}, parts = [];
    (FOOTER_ORDER[L]||[]).forEach(function(k){
      if(s[k]) parts.push('<a href="'+esc(s[k])+'" target="_blank" rel="noopener">'+lbl(k)+'</a>');
    });
    if(C.contact && C.contact.telegram) parts.push('<a href="https://t.me/'+esc(C.contact.telegram)+'" target="_blank" rel="noopener">Telegram</a>');
    if(C.contact && C.contact.email) parts.push('<a href="mailto:'+esc(C.contact.email)+'">Email</a>');
    box.innerHTML = parts.join(" · ");
  }

  /* ---------- READER QUOTES (only if provided) ---------- */
  function renderReviews(){
    var box = byId("reader-quotes"); if(!box) return;
    var list = C.reviews||[];
    if(!list.length){ box.style.display="none"; return; }
    box.innerHTML = list.map(function(r){
      return '<p class="review">'+esc(r[L]||r.en||r.ru)+'</p>';
    }).join("");
  }

  /* ---------- sameAs JSON-LD (interconnection for Google/Yandex/AI) ---------- */
  function injectSameAs(){
    var s = C.social||{}, same = [];
    Object.keys(s).forEach(function(k){ if(s[k] && s[k].trim()) same.push(s[k].trim()); });
    if(C.contact && C.contact.telegram) same.push("https://t.me/"+C.contact.telegram);
    if(!same.length) return;
    var node = { "@context":"https://schema.org","@type":"Person",
      "@id":"https://abhijeetrai.com/#author","name":"Abhijeet Rai","sameAs":same };
    var sc = document.createElement("script");
    sc.type = "application/ld+json"; sc.text = JSON.stringify(node);
    document.head.appendChild(sc);
  }

  /* ---------- GOLD-DUST HERO CANVAS ---------- */
  function dust(){
    var c = byId("dust"); if(!c) return;
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var x=c.getContext("2d"), W,H,pts=[];
    function init(){ W=c.width=c.offsetWidth; H=c.height=c.offsetHeight;
      var n=Math.min(150,Math.floor(W*H/9000)); pts=[];
      for(var i=0;i<n;i++) pts.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+0.3,a:Math.random()*0.6+0.2,s:Math.random()*0.18+0.02}); }
    function draw(){ x.clearRect(0,0,W,H);
      for(var i=0;i<pts.length;i++){var p=pts[i];x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);
        x.fillStyle='rgba('+(201+(Math.random()*30|0))+','+(165+(Math.random()*25|0))+',90,'+p.a+')';x.fill();
        p.y-=p.s; if(p.y<-2){p.y=H+2;p.x=Math.random()*W;}}
      requestAnimationFrame(draw); }
    init(); draw(); window.addEventListener("resize",init);
  }

  /* ---------- remember language choice (so auto-detect respects it) ---------- */
  function rememberLangChoice(){
    var links = document.querySelectorAll ? document.querySelectorAll('.lang a[data-setlang]') : null;
    if(links && links.forEach) links.forEach(function(a){
      a.addEventListener("click", function(){
        try{ localStorage.setItem("lang_pref", a.getAttribute("data-setlang")); }catch(e){}
      });
    });
  }

  /* ---------- run ---------- */
  document.addEventListener("DOMContentLoaded", function(){
    renderBuy(); renderReview(); renderShare(); renderContact(); renderFooter(); renderReviews(); injectSameAs(); rememberLangChoice(); dust();
    var y = byId("yr"); if(y) y.textContent = new Date().getFullYear();
  });
})();
