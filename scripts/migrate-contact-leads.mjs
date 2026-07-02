import { neon } from "@neondatabase/serverless";

// Migra contact_leads (tabla mínima de la Fase 1) -> leads (CRM completo de la
// Fase 2). Idempotente: si ya existe un lead con el mismo email y la misma
// fecha de creación (±1s), se omite. NO borra contact_leads: se conserva como
// respaldo hasta confirmar 1:1 en producción (ver plan de Fase 2).
const sql = neon(process.env.DATABASE_URL);

const SITE_URL = "https://torre-correos-tau.vercel.app";

const rows = await sql`
  select id, name, email, phone, message, created_at
  from contact_leads
  order by created_at asc
`;

let migrated = 0;
let skipped = 0;

for (const row of rows) {
  const existing = await sql`
    select id from leads
    where email = ${row.email}
      and created_at between ${row.created_at}::timestamptz - interval '1 second'
                          and ${row.created_at}::timestamptz + interval '1 second'
    limit 1
  `;
  if (existing.length) {
    skipped++;
    continue;
  }

  const [lead] = await sql`
    insert into leads (name, email, phone, source, source_url, created_at)
    values (${row.name}, ${row.email}, ${row.phone}, 'form', ${`${SITE_URL}/#contacto`}, ${row.created_at})
    returning id
  `;
  await sql`
    insert into lead_events (lead_id, kind, detail)
    values (${lead.id}, 'created', 'Migrado desde contact_leads (Fase 1)')
  `;
  if (row.message) {
    await sql`insert into lead_comments (lead_id, body) values (${lead.id}, ${row.message})`;
  }
  migrated++;
}

console.log(`Migrados: ${migrated}. Ya existían (omitidos): ${skipped}. Total en contact_leads: ${rows.length}.`);
console.log("contact_leads no se borró. Bórrala manualmente cuando confirmes que quedó 1:1 en prod.");
