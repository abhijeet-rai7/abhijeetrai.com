/* ============================================================
   THE ONLY FILE YOU NEED TO EDIT.
   Paste a link between the quotes "" and that button turns ON.
   Leave it empty ""  =>  the button shows "Coming soon / Скоро".
   This controls BOTH the English page and the Russian page.
   ============================================================ */

window.SITE_CONFIG = {

  /* ---- WHERE TO BUY (ebook + paperback) ----
     Order shown on the page = order here. Leave url:"" for now;
     add the link the moment a store goes live and it appears automatically. */
  buy: [
    { id:"kindle",  label:{en:"Amazon Kindle", ru:"Amazon Kindle"}, url:"" },
    { id:"apple",   label:{en:"Apple Books",   ru:"Apple Books"},   url:"" },
    { id:"google",  label:{en:"Google Play",   ru:"Google Play"},   url:"" },
    { id:"kobo",    label:{en:"Kobo",          ru:"Kobo"},          url:"" },
    { id:"litres",  label:{en:"Litres",        ru:"Литрес"},        url:"" },
    { id:"direct",  label:{en:"Buy direct (PDF / EPUB)", ru:"Купить напрямую (PDF / EPUB)"}, url:"" }
  ],

  /* Which buy buttons appear on each language page (by id, in this order). */
  buyOrder: {
    en: ["kindle","apple","google","kobo","direct"],
    ru: ["litres","google","apple","kindle","direct"]
  },

  /* ---- WHERE READERS CAN LEAVE A REVIEW ----
     A button shows only when you add a url. Point these at YOUR product page
     on each store (the review tab), once the listings are live. */
  review: [
    { id:"amazon",   label:{en:"Review on Amazon",  ru:"Отзыв на Amazon"},  url:"" },
    { id:"goodreads",label:{en:"Goodreads",          ru:"Goodreads"},        url:"" },
    { id:"apple",    label:{en:"Apple Books",        ru:"Apple Books"},      url:"" },
    { id:"litres",   label:{en:"Review on Litres",   ru:"Отзыв на Литрес"},  url:"" },
    { id:"livelib",  label:{en:"LiveLib",            ru:"LiveLib"},          url:"" }
  ],

  /* ---- HOW READERS REACH YOU (shown in the Contact section) ---- */
  contact: {
    email: "abhijeet.rai.loves@gmail.com",
    telegram: "abhijeet_rai_loves"     // just the username, no @
  },

  /* ---- YOUR PROFILES ELSEWHERE ----
     These power the footer links AND the "sameAs" connections that tell
     Google / Yandex / AI these are all the same author (interconnection).
     Add each url when the profile exists; empty ones are hidden. */
  social: {
    goodreads:    "",   // e.g. https://www.goodreads.com/author/show/XXXX
    amazonAuthor: "",   // e.g. https://www.amazon.com/author/abhijeetrai
    instagram:    "",   // e.g. https://www.instagram.com/abhijeet_rai_loves
    wikidata:     "",   // e.g. https://www.wikidata.org/wiki/QXXXX
    newsletter:   ""    // your email-signup page, if any
  },

  /* ---- READER QUOTES ----
     Stays empty (and the section stays hidden) until you have real ones.
     Then add objects like: { en:"...", ru:"..." }  (ru optional) */
  reviews: [],

  /* Canonical addresses (used for share links). Leave as-is. */
  canonical: { en:"https://abhijeetrai.com/", ru:"https://abhijeetrai.com/ru/" }
};
