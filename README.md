# What #4471 holds

The support desk merged 412 reports about dates into one ticket, `#4471`, and marked it known: one issue, one fix queued. The desk's own kb renders a different picture. The reports hold three problems, each filed here as an issue:

| Issue | Problem | Reports |
|---|---|---|
| [#1](../../issues/1) | The shared parser reads day-first dates month first | 374 |
| [#2](../../issues/2) | The booking-v3 form hints `MM/DD/YYYY` to day-first tenants | 33 |
| [#3](../../issues/3) | Dates move by one day across time zones | 5 |

Counts are for the desk's export of 2026-10-04: 427 rows, 412 unique reports by id.

## The kb page

- Source: [`support-kb/src/routes/kb/incidents/4471-problems/+page.svx`](support-kb/src/routes/kb/incidents/4471-problems/+page.svx), signed `frimoldi` (desk ref `DR-TTMW-EEVQ`).
- Its numbers come from [`ProblemTable.svelte`](support-kb/src/lib/kb/ProblemTable.svelte) and [`problems.ts`](support-kb/src/lib/kb/problems.ts), computed from the data at render time.
- As the desk sees it: [`rendered/4471-problems.html`](rendered/4471-problems.html) and [`rendered/4471-problems.png`](rendered/4471-problems.png).

`support-kb/` is the desk's kb export with the page and its component added, plus what it takes to render it (`package.json`, `vite.config.js`, `src/app.html`, `src/routes/+layout.js`).

## Render it

```sh
cd support-kb
npm install
npx vite build   # pages land in build/kb/
```

Built with SvelteKit 3.1, Svelte 5.57, mdsvex 0.12 and adapter-static.
