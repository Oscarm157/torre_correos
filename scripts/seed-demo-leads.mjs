import { neon } from "@neondatabase/serverless";

// 10 leads de ejemplo para probar el CRM. Idempotente: si ya existe algún
// lead con utm_source = 'demo' no hace nada. Marca cada lead con utm_source
// "demo" para poder identificarlos/borrarlos después.
const sql = neon(process.env.DATABASE_URL);

const existing = await sql`select id from leads where utm_source = 'demo' limit 1`;
if (existing.length) {
  console.log("Ya hay leads de ejemplo cargados, no se hace nada.");
  process.exit(0);
}

const LEADS = [
  {
    name: "Karla Beltrán",
    email: "karla.beltran@gmail.com",
    phone: "664 123 4501",
    status: "new",
    source: "form",
    qualification: { interestType: "Residencias", budget: "$3.5M - $4M MXN", paymentMethod: "contado", purpose: "vivienda", timeline: "1-3 meses" },
    mensaje: "Me interesa conocer las plantas de las residencias, ¿tienen showroom disponible entre semana?",
  },
  {
    name: "Rodrigo Iñiguez",
    email: "r.iniguez.tj@hotmail.com",
    phone: "664 234 5602",
    status: "contacted",
    source: "form",
    qualification: { interestType: "Penthouses", budget: "$8M - $10M MXN", paymentMethod: "crédito", purpose: "vivienda", timeline: "3-6 meses" },
    mensaje: "Buscamos penthouse con vista, somos 2 adultos sin hijos.",
  },
  {
    name: "Grupo Aduanal del Pacífico SA de CV (Lic. Fernanda Cota)",
    email: "fernanda.cota@aduanaldelpacifico.mx",
    phone: "664 345 6703",
    status: "following_up",
    source: "manual",
    qualification: { interestType: "Corporativos", budget: "$5M MXN", paymentMethod: "ambos", purpose: "inversión", timeline: "6-12 meses" },
    mensaje: null,
  },
  {
    name: "Manuel Osuna",
    email: "manuel.osuna@outlook.com",
    phone: "664 456 7804",
    status: "proposal",
    source: "manual",
    qualification: { interestType: "Comercio", budget: "$2.5M MXN", paymentMethod: "contado", purpose: "inversión", timeline: "1-3 meses" },
    mensaje: null,
    valueAmount: 2500000,
  },
  {
    name: "Diana Palafox",
    email: "diana.palafox@gmail.com",
    phone: "664 567 8905",
    status: "new",
    source: "bot",
    qualification: { interestType: "Residencias", budget: "$3M - $3.5M MXN", paymentMethod: "crédito", purpose: "vivienda", timeline: "más de 12 meses" },
    mensaje: "Quiero saber si aceptan crédito Infonavit o solo bancario.",
  },
  {
    name: "Jorge Almada",
    email: "jorge.almada.tj@gmail.com",
    phone: "664 678 9006",
    status: "won",
    source: "form",
    qualification: { interestType: "Penthouses", budget: "$9M MXN", paymentMethod: "contado", purpose: "vivienda", timeline: "1-3 meses" },
    mensaje: "Ya visitamos el showroom, nos encantó la torre.",
    valueAmount: 9200000,
    closed: true,
  },
  {
    name: "Perla Vizcaíno",
    email: "perla.vizcaino@yahoo.com",
    phone: "664 789 0107",
    status: "lost",
    source: "form",
    qualification: { interestType: "Áreas de confort", budget: "$2M MXN", paymentMethod: "crédito", purpose: "vivienda", timeline: "1-3 meses" },
    mensaje: "Al final el presupuesto no nos alcanzó, gracias de todas formas.",
    closed: true,
  },
  {
    name: "Constructora Baja Sur (Ing. Hugo Terrazas)",
    email: "hugo.terrazas@bajasurconstructora.com",
    phone: "664 890 1208",
    status: "contacted",
    source: "manual",
    qualification: { interestType: "Corporativos", budget: "$6M - $7M MXN", paymentMethod: "ambos", purpose: "inversión", timeline: "3-6 meses" },
    mensaje: null,
  },
  {
    name: "Andrea Chavarín",
    email: "andrea.chavarin@gmail.com",
    phone: "664 901 2309",
    status: "following_up",
    source: "form",
    qualification: { interestType: "Comercio", budget: "$1.8M MXN", paymentMethod: "contado", purpose: "inversión", timeline: "1-3 meses" },
    mensaje: "Busco un local para abrir una cafetería, ¿cuántos m² tienen disponibles en planta baja?",
  },
  {
    name: "Luis Fernando Rubio",
    email: "lf.rubio@gmail.com",
    phone: "664 012 3410",
    status: "new",
    source: "bot",
    qualification: { interestType: "Residencias", budget: "$4M - $5M MXN", paymentMethod: "ambos", purpose: "vivienda", timeline: "3-6 meses" },
    mensaje: "¿Manejan alguna promoción de preventa?",
  },
];

for (const l of LEADS) {
  const [lead] = await sql`
    insert into leads (name, email, phone, source, source_url, qualification, status, utm_source, value_amount, closed_at)
    values (
      ${l.name}, ${l.email}, ${l.phone}, ${l.source},
      'https://torre-correos-tau.vercel.app/#contacto',
      ${JSON.stringify(l.qualification)}::jsonb,
      ${l.status}, 'demo', ${l.valueAmount ?? null},
      ${l.closed ? new Date() : null}
    )
    returning id
  `;
  await sql`
    insert into lead_events (lead_id, kind, detail)
    values (${lead.id}, 'created', 'Lead de ejemplo cargado para probar el CRM')
  `;
  if (l.mensaje) {
    await sql`insert into lead_comments (lead_id, body) values (${lead.id}, ${l.mensaje})`;
  }
}

console.log(`${LEADS.length} leads de ejemplo cargados (utm_source = 'demo').`);
