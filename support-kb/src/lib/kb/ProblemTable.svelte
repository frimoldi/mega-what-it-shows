<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import type { Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';
  import { problemsIn, type Problem } from '#lib/kb/problems';

  // `issues`: the ticket filed for each problem, by problem.
  let { ticket, issues = {} }: { ticket: number; issues?: Partial<Record<Problem, string>> } = $props();

  const WHAT: Record<Problem, string> = {
    parser: 'the shared parser reads a day-first date month first',
    hint: 'the booking-v3 form hints MM/DD/YYYY, then reads the date day first',
    'one-day-move': 'the date moves by one day, not month for day',
    unplaced: 'no tenant on file, so no cause yet',
  };

  const groups = $derived(problemsIn(reports as Report[], ticket, tenantOf, notes.oneDayMove));
  const total = $derived(groups.reduce((n, g) => n + g.reports.length, 0));
  const ticketNo = (url: string) => url.match(/\/issues\/(\d+)/)?.[1];
</script>

<p class="sum">
  <strong>{total}</strong> reports in #{ticket} ·
  <strong>{groups.length}</strong>
  {groups.length === 1 ? 'problem' : 'problems'}
</p>

<table>
  <thead>
    <tr><th>problem</th><th>what goes wrong</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.problem)}
      <tr class:open={!issues[g.problem]}>
        <td><code>{g.problem}</code></td>
        <td>{WHAT[g.problem]}</td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>
          {#if issues[g.problem]}
            <a href={issues[g.problem]}>issue {ticketNo(issues[g.problem]!) ?? 'link'}</a>
          {:else}
            no ticket yet
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.1rem; }
  .open td:last-child { color: var(--warn); font-weight: 600; }
</style>
