// The problems inside one big ticket, counted the desk's way. causes.ts files each report by its
// tenant, and the desk counts a report where it is filed. A report the desk read as a one-day move
// (desk-notes.json) is a different bug: it gets a row of its own and stays counted where it is filed.
import { groupByCause, readAs, uniqueById, type Cause, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = Cause | 'unplaced' | 'one-day-move';

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  tenants: number;
  firstSeen: string;
  lastSeen: string;
  // How many of these reports are one-day moves too (0 for the one-day-move row itself).
  oneDayMoves: number;
};

function summarize(problem: Problem, reports: Report[], oneDayMoves: number): ProblemGroup {
  const days = reports.map((r) => r.receivedAt.slice(0, 10)).sort();
  return {
    problem,
    reports,
    tenants: new Set(reports.map((r) => r.tenant)).size,
    firstSeen: days[0],
    lastSeen: days[days.length - 1],
    oneDayMoves,
  };
}

export function mergedInto(all: Report[], ticket: number): Report[] {
  return uniqueById(all).filter((r) => r.mergedInto === ticket);
}

export function problemsIn(
  all: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const merged = mergedInto(all, ticket);
  const groups = groupByCause(merged, tenantOf).map((g) => summarize(g.cause, g.reports, readAs(g, oneDayMove)));
  const moved = merged.filter((r) => oneDayMove.includes(r.id));
  if (moved.length) groups.push(summarize('one-day-move', moved, 0));
  return groups.sort((a, b) => b.reports.length - a.reports.length);
}
