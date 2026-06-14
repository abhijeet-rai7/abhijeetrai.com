# abhijeetrai.com — your website (how it works, how to publish it)

A complete, fast author/book site for **It Was Never You** / **Это был не ты**, matched to your
cover's "One Substance" design. It is **two equal pages** — English and Russian — each a real,
separate web address so Google and Yandex can index and rank both natively. A Russian visitor
on the Russian page sees only Russian.

## You edit ONE file: `config.js`

Open `config.js` and paste your links between the quotes. That's it — both pages update.

- **A buy button** shows **"Coming soon / Скоро"** until you paste its `url`. The moment you add a
  link, it turns into a live button automatically. (So Apple Books, Kindle, etc. can say "coming
  soon" now, and go live the day you get the link.)
- **Review buttons** appear only for stores where you add a review `url`.
- **Contact** (your email + Telegram) is already filled in.
- **Social profiles** (Goodreads, Amazon Author, Instagram, Wikidata) — add each `url` when it
  exists. These also become the "sameAs" links that tell Google/Yandex/AI all these profiles are
  the same author (the interconnection from the visibility playbook).
- **Reader quotes** — the `reviews: []` list stays hidden until you add real quotes.

You do **not** need to touch any other file.

## The files
```
website/
  index.html        ← English page  (abhijeetrai.com/)
  ru/index.html     ← Russian page   (abhijeetrai.com/ru/)
  config.js         ← THE file you edit (links, labels, contact, profiles)
  app.js            ← shared logic (renders buttons from config) — don't edit
  style.css         ← shared design — don't edit
  assets/           ← your covers (EN + RU) and 4 illustrations
  llms.txt          ← summary for AI crawlers (ChatGPT, Perplexity, Claude, Gemini)
  robots.txt        ← welcomes search + AI crawlers
  sitemap.xml       ← lists both EN and RU pages for search engines
```

## Cost
- The website is **free to host forever**.
- You already own **abhijeetrai.com**, so there is **no extra cost** — just point the domain at the host.

## Publish it so it works EVERYWHERE — including Russia

Important (2026): **Do NOT use Cloudflare** (Cloudflare Pages, or routing your domain through
Cloudflare's proxy). Since mid-2025 Russian ISPs throttle Cloudflare so heavily that pages do not
load for Russian readers. Also avoid the free `*.pages.dev` / `*.netlify.app` style addresses for
Russia. Use your own domain on a non-Cloudflare host.

### Recommended (free, broadly reachable incl. Russia): GitHub Pages
GitHub is generally accessible across Russia, Europe, Asia, and the Americas, it's free, supports
your custom domain + HTTPS, and does not sit behind Cloudflare.
1. Create a free account at github.com.
2. New repository named `abhijeetrai.com` (public).
3. Upload the **contents** of this `website` folder (index.html, ru/, assets/, config.js, app.js,
   style.css, llms.txt, robots.txt, sitemap.xml). Keep the `ru/` and `assets/` folders intact.
4. Repo → Settings → Pages → Source: "Deploy from branch" → branch `main`, folder `/root` → Save.
5. Settings → Pages → Custom domain: enter `abhijeetrai.com` → Save → tick "Enforce HTTPS".
6. At your domain registrar, add the DNS records GitHub shows you (four A records to GitHub's IPs,
   and a CNAME for `www`). **Do not enable any Cloudflare proxy on these records.**
   Live: English = abhijeetrai.com · Russian = abhijeetrai.com/ru/

### Easiest if you'll pay a little (~$3/mo, strong global incl. Russia): a plain shared host
Hostinger, or any standard shared host with global data centres, reachable in Russia and without
Cloudflare in front. Upload this folder via their File Manager and point `abhijeetrai.com` at it.

### The only 100%-guaranteed-in-Russia option
A host physically in Russia (e.g. Timeweb, Selectel, Beget) — but these need a Russian payment
method, so they're impractical from India. Skip unless Russian reach ever becomes a problem.

### Don't over-worry about this
Your Russian *sales* happen on **Litres**, which is always reachable inside Russia. The website is
a support + SEO asset. Even on the rare day a foreign host is throttled in one Russian region, your
Litres listing keeps selling. GitHub Pages is a solid, free, global choice — start there.

After deploying, send the live URL to test it from multiple regions.

## After it's live — switch on search & AI
- Add the site to **Google Search Console** (search.google.com/search-console) → submit `sitemap.xml`.
- Add the site to **Yandex Webmaster** (webmaster.yandex.com) → submit `sitemap.xml`. This is what
  makes Russian readers find you in Yandex. Having a real Russian page (`/ru/`) with Russian text and
  Russian structured data is exactly what Yandex rewards.
- Create a **Wikidata** item for you and the book, then paste its URL into `config.js` (social.wikidata).
- Link to this site from every store listing, Goodreads, and your Amazon Author page.

## Your blog (it's built — here's how it works)
There's now a **Reading / Эссе** section, linked from the header on both home pages:
- English essays live in `website/blog/` · Russian essays in `website/ru/blog/`
- Each essay is its own real page (its own web address), so Google/Yandex/AI can index each one.
- You do **NOT** need Medium or any third-party editor. The content is plain text inside these files.

**To add a new essay later (two easy ways):**
1. *Simplest:* write the essay as plain text and send it to me — I'll generate the page, link it, and add it to the sitemap.
2. *Yourself:* open `ESSAYS_for_blog.md` (in the project folder), add your essay in the same format
   with a short slug, then run `python3 build_blog.py` from the project folder. It rebuilds all blog
   pages automatically. Then re-upload the `website` folder to GitHub.
Either way: no copy-pasting from an editor, no HTML by hand.

## IMPORTANT after any change: re-upload to GitHub
Whenever files change (new essay, new links in config.js), re-upload the changed files to your
GitHub repo (or just re-drag the whole `website` folder and overwrite). The live site only updates
when GitHub has the new files.

## Finish checklist
- [ ] Paste store links into `config.js` as each listing goes live (Kindle, Apple, Google, Kobo, Litres, direct).
- [ ] Paste review links into `config.js` once product pages exist.
- [ ] Add Goodreads / Amazon Author / Instagram / Wikidata URLs to `config.js` social block.
- [ ] Confirm the author name (currently "Abhijeet Rai" / "Абхиджит Рай").
- [ ] (Optional) add real reader quotes to the `reviews` list in `config.js`.
