# What #4471 holds

This repo holds the support desk's kb export in `support-kb/`, as exported, with one page added: [`support-kb/src/routes/kb/incidents/4471-problems/+page.svx`](support-kb/src/routes/kb/incidents/4471-problems/+page.svx), signed with the course's signature ticket (desk ref `DR-3HC9-T3N2`).

The desk merged 412 reports about dates into ticket `#4471` and marked it known. The desk's own cause table for #4471 shows more than one problem. Each has an issue here:

| Issue | Problem | Reports |
|---|---|---|
| [#5](../../issues/5) | The shared parser reads day-first dates month first | 379 |
| [#2](../../issues/2) | The booking-v3 form hints `MM/DD/YYYY` to day-first tenants | 33 |
| [#6](../../issues/6) | Dates move by one day across time zones | 5 |

Counts are the desk's, from its export of 2026-10-04, as its cause table shows them: 412 reports, one per id. The desk files a report by tenant and counts it there, so the 5 one-day moves are counted under parser too and footnoted.

## The page

- Source: [`support-kb/src/routes/kb/incidents/4471-problems/+page.svx`](support-kb/src/routes/kb/incidents/4471-problems/+page.svx). Its numbers come from the desk's own `CauseTable`, computed from the desk's data at render time.
- As the desk sees it, built by the kb: [`support-kb/build/kb/incidents/4471-problems/index.html`](support-kb/build/kb/incidents/4471-problems/index.html) (the whole build is in `support-kb/build/`). A standalone copy and a screenshot: [`rendered/4471-problems.html`](rendered/4471-problems.html), [`rendered/4471-problems.png`](rendered/4471-problems.png).

## Render it

```sh
cd support-kb
npm install
npx vite build   # pages land in build/kb/
```

Added to the export to render it: `package.json`, `vite.config.js`, `src/app.html`, `src/routes/+layout.js`. Built with SvelteKit 3.1, Svelte 5.57, mdsvex 0.12 and adapter-static.
