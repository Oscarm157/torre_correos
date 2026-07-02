// Torre Correos opera en Tijuana. Formatea toda fecha en esa zona horaria para
// que el CRM se lea correcto sin importar dónde esté el servidor o el viewer.
const TZ = "America/Tijuana";

const dt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TZ,
});

const dtTime = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: TZ,
});

const KB = 1024;
export function fmtSize(bytes: number | null | undefined): string {
  if (!bytes && bytes !== 0) return "";
  if (bytes < KB) return `${bytes} B`;
  if (bytes < KB * KB) return `${(bytes / KB).toFixed(0)} KB`;
  return `${(bytes / (KB * KB)).toFixed(1)} MB`;
}

export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return dt.format(new Date(d));
}

export function fmtDateTime(d: Date | string | null | undefined): string {
  if (!d) return "—";
  return dtTime.format(new Date(d));
}
