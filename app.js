/* Shared logic for both the English and Russian pages.
   Reads window.PAGE_LANG ("en" | "ru") and window.SITE_CONFIG (config.js).
   You should not need to edit this file. */
(function(){
  var L = (window.PAGE_LANG === "ru") ? "ru" : "en";
  var C = window.SITE_CONFIG || {};
  var t = function(en, ru){ return L === "ru" ? ru : en; };
  var byId = function(id){ return document.getElementById(id); };
  var esc = function(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };

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
        html += '<a class="'+cls+'" href="'+esc(b.url)+'" target="_blank" rel="noopener">'+label+'</a>';
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
        html += '<a href="'+esc(r.url)+'" target="_blank" rel="noopener">'+esc(r.label[L]||r.label.en)+'</a>';
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

  /* ---------- FOOTER LINKS ---------- */
  function renderFooter(){
    var box = byId("footer-links"); if(!box) return;
    var s = C.social||{}, parts = [];
    if(s.goodreads)    parts.push('<a href="'+esc(s.goodreads)+'" target="_blank" rel="noopener">Goodreads</a>');
    if(s.amazonAuthor) parts.push('<a href="'+esc(s.amazonAuthor)+'" target="_blank" rel="noopener">'+t("Amazon Author","Автор на Amazon")+'</a>');
    if(s.instagram)    parts.push('<a href="'+esc(s.instagram)+'" target="_blank" rel="noopener">Instagram</a>');
    if(C.contact && C.contact.telegram) parts.push('<a href="https://t.me/'+esc(C.contact.telegram)+'" target="_blank" rel="noopener">Telegram</a>');
    if(s.newsletter)   parts.push('<a href="'+esc(s.newsletter)+'" target="_blank" rel="noopener">'+t("Newsletter","Рассылка")+'</a>');
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
    ["goodreads","amazonAuthor","instagram","wikidata"].forEach(function(k){ if(s[k]) same.push(s[k]); });
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
