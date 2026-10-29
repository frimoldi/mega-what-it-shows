# What #4471 holds

The support desk merged 412 reports about dates into one ticket, `#4471`, and marked it known: one issue, one fix queued. The desk's own kb renders a different picture: its cause table for #4471 shows two causes. Each has an issue here:

| Issue | Problem | Reports |
|---|---|---|
| [#1](../../issues/1) | The shared parser reads day-first dates month first | 379 |
| [#2](../../issues/2) | The booking-v3 form hints `MM/DD/YYYY` to day-first tenants | 33 |

379 + 33 = 412: every report in #4471, counted once, the desk's way. Counts are from the desk's export of 2026-10-04: 427 rows, 412 unique reports by id. The cause comes from the tenant. The desk read 5 of the parser reports as a one-day move (`desk-notes.json`); it files and counts them under parser and footnotes them, so #1 includes and names them.

## The kb page

- Source: [`support-kb/src/routes/kb/incidents/4471-problems/+page.svx`](support-kb/src/routes/kb/incidents/4471-problems/+page.svx), signed `frimoldi` (desk ref `DR-TTMW-EEVQ`).
- Its numbers come from the desk's own `CauseTable` component, computed from the desk's data at render time. The page adds words and the ticket links, no new logic.
- As the desk sees it: [`rendered/4471-problems.html`](rendered/4471-problems.html) and [`rendered/4471-problems.png`](rendered/4471-problems.png).

`support-kb/` is the desk's kb export with the page added, plus what it takes to render it (`package.json`, `vite.config.js`, `src/app.html`, `src/routes/+layout.js`).

## Render it

```sh
cd support-kb
npm install
npx vite build   # pages land in build/kb/
```

Built with SvelteKit 3.1, Svelte 5.57, mdsvex 0.12 and adapter-static.
