// The problems inside one big ticket. causes.ts files each report by its tenant; a report the
// desk read as a one-day move (desk-notes.json) is a different bug, so it gets a problem of its own.
import { groupByCause, uniqueById, type Cause, type Report, type Tenant } from '#lib/kb/causes';

export type Problem = Cause | 'unplaced' | 'one-day-move';

export type ProblemGroup = {
  problem: Problem;
  reports: Report[];
  tenants: number;
  firstSeen: string;
  lastSeen: string;
};

function summarize(problem: Problem, reports: Report[]): ProblemGroup {
  const days = reports.map((r) => r.receivedAt.slice(0, 10)).sort();
  return {
    problem,
    reports,
    tenants: new Set(reports.map((r) => r.tenant)).size,
    firstSeen: days[0],
    lastSeen: days[days.length - 1],
  };
}

export function problemsIn(
  all: Report[],
  ticket: number,
  tenantOf: (r: Report) => Tenant | undefined,
  oneDayMove: readonly string[],
): ProblemGroup[] {
  const merged = uniqueById(all).filter((r) => r.mergedInto === ticket);
  const moved = merged.filter((r) => oneDayMove.includes(r.id));
  const rest = merged.filter((r) => !oneDayMove.includes(r.id));
  const groups = groupByCause(rest, tenantOf).map((g) => summarize(g.cause, g.reports));
  if (moved.length) groups.push(summarize('one-day-move', moved));
  return groups.sort((a, b) => b.reports.length - a.reports.length);
}
