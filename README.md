# Md Mohibul Hasan Moonshad · Portfolio website

Personal portfolio covering Project Management, Data Analysis & Management and GIS.
It is a plain static website (HTML, CSS, a little JavaScript). It needs no build step and runs free on GitHub Pages.

---

## 1. What is in this folder

| File / folder | What it is |
|---|---|
| `index.html` | Home page |
| `story.html` | My Story |
| `expertise.html` | Expertise |
| `projects.html` | Projects + Map gallery (interactive) |
| `case-connected-bangladesh.html` | Connected Bangladesh case study |
| `experience.html` | Experience |
| `credentials.html` | Education, awards, certificates (interactive) |
| `404.html` | Shown when a link is wrong |
| `assets/Mohibul_Hasan_CV.pdf` | The CV behind every "Download CV" button |
| `assets/img/` | All photos, maps, logos and certificates |
| `assets/site.js`, `assets/site.css` | Mobile menu and the engine for the two interactive pages. Leave these alone. |
| `.nojekyll` | Tells GitHub to serve the files exactly as they are. Keep it. |

---

## 2. Put the site online (first time, about 10 minutes, all in the browser)

1. Sign in at **github.com**.
2. Click **+** (top right) → **New repository**.
   * **Repository name:** pick one.
     * `mohibul.com` gives the address `https://<your-username>.github.io/mohibul.com/` (the address on the CV).
     * `<your-username>.github.io` gives the shorter address `https://<your-username>.github.io/`.
   * Set it to **Public**. Do not tick "Add a README". Click **Create repository**.
3. On the new empty repository page, click the link **"uploading an existing file"**.
4. Unzip the download on your computer. Open the unzipped folder, select **everything inside it** (the `.html` files, the `assets` folder, `README.md`, `404.html`) and drag it into the upload box.
   * Drag the *contents*, not the outer folder, so `index.html` sits at the top level of the repository.
   * `.nojekyll` is a hidden file. If your computer hides it, it does not matter much; you can create it later on GitHub (**Add file → Create new file**, name it `.nojekyll`, leave it empty, commit).
5. Wait for the upload bar to finish, then click **Commit changes**.
6. Go to **Settings → Pages** (left menu).
   * **Source:** Deploy from a branch.
   * **Branch:** `main`, folder `/ (root)`. Click **Save**.
7. Wait one to three minutes and refresh the Pages settings. The live address appears at the top: **"Your site is live at …"**. Open it and check every page.

> Tip: put the live address on your LinkedIn profile and CV once it works.

---

## 3. Edit the site later

All editing can be done on github.com. Every save ("commit") goes live automatically within a minute or two.

### Change some text

1. Open the repository and click the page file, for example `experience.html`.
2. Click the **pencil icon** (Edit this file).
3. Press **Ctrl + F** (Cmd + F on Mac) and search for the words you want to change.
4. Change only the words between the tags. Example: in `<p ...>Old sentence.</p>` change only `Old sentence.`
5. Click **Commit changes…** → **Commit changes**.

Which file holds what:

| To change… | Edit |
|---|---|
| Home headline, highlights, featured projects | `index.html` |
| Career chapters and the route timeline | `story.html` |
| Skills and tools | `expertise.html` |
| Job titles, dates, responsibilities | `experience.html` |
| Connected Bangladesh case study | `case-connected-bangladesh.html` |
| Project cards and map gallery | `projects.html` (see below) |
| Certificates list | `credentials.html` (see below) |
| Top menu, top bar, footer | Repeated at the top and bottom of **every** page. Change it in each file. |

### Projects and certificates (the two interactive pages)

In `projects.html` and `credentials.html` the cards are made from a list near the **bottom** of the file, inside `<script>`.
Search for a project or certificate title and you will find an entry like:

```js
{"id": "meal", "title": "Monitoring, Evaluation, Accountability and Learning (MEAL)", "issuer": "...", "date": "19 Jul 2025", ...}
```

* To change it, edit the text between the quotes. Keep the quotes, commas and braces exactly as they are.
* To add one, copy a whole `{ ... }` entry, paste it after the previous one with a comma between them, give it a new unique `id`, and edit the text.
* The page layout itself sits higher up, inside `<template id="dc-template">`. The `{{ ... }}` markers are filled in automatically; do not remove them.

If a page goes blank after an edit, a quote or comma is usually missing. Open the file's **History**, compare with the previous version, or simply revert the commit.

### Replace the CV

1. Open the `assets` folder → **Add file → Upload files**.
2. Upload the new PDF named exactly **`Mohibul_Hasan_CV.pdf`** (same name) and commit. It replaces the old one, and every "Download CV" button uses it.

### Replace or add an image

* **Replace:** upload a new picture into `assets/img/` with **exactly the same file name** as the old one (for example `portrait.jpg`). Nothing else needs to change.
* **Add new:** upload it to `assets/img/`, then in the page use `<img src="assets/img/new-file.jpg" alt="Short description">`.
* Keep photos under about 500 KB (around 1600 px wide is plenty) so the site stays fast.

### Edit on your computer instead (optional)

1. Install **GitHub Desktop** (desktop.github.com) and **VS Code** (code.visualstudio.com).
2. In GitHub Desktop: **File → Clone repository** → choose this repository.
3. Open the folder in VS Code, edit, and double-click any `.html` file to preview it in your browser.
4. Back in GitHub Desktop: write a short summary → **Commit to main** → **Push origin**. The site updates in a minute or two.

### Use your own domain (optional)

If you buy a domain such as `mohibul.com`: **Settings → Pages → Custom domain**, enter it, then add the DNS records GitHub shows at your domain seller. Tick **Enforce HTTPS** once it is available.

---

Colours: burgundy `#7F1D1D`, gold `#B8894A`, slate `#2F5D7C`, parchment `#F5F0EB`, ink `#1C1917`.
Fonts: Source Serif 4 (headings) and Geist (text), loaded from Google Fonts.
