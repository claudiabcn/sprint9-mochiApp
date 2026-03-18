export function formatDateLocal(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function calcStreak(datesWithRecord: Set<string>): number {
  const today = new Date();
  const todayStr = formatDateLocal(today);
  const startOffset = datesWithRecord.has(todayStr) ? 0 : 1;
  let streak = 0;

  for (let i = startOffset; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (datesWithRecord.has(formatDateLocal(d))) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function avgMinutesByDay(records: { date_recorded: string; duration: number }[]): number {
  if (records.length === 0) return 0;
  const byDay = new Map<string, number>();
  for (const r of records) {
    byDay.set(r.date_recorded, (byDay.get(r.date_recorded) ?? 0) + r.duration);
  }
  const total = Array.from(byDay.values()).reduce((a, b) => a + b, 0);
  return Math.round(total / byDay.size);
}
