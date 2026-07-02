import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { feedbackLinks, feedbackNotes } from "@/lib/schema";
import { PageHeader } from "@/components/crm/PageShell";
import { Breadcrumb } from "@/components/crm/Breadcrumb";
import { FeedbackBoard } from "./FeedbackBoard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Comentarios del sitio", robots: { index: false } };

export default async function FeedbackPage() {
  await requireAdmin();

  const links = await db
    .select({
      id: feedbackLinks.id,
      label: feedbackLinks.label,
      token: feedbackLinks.token,
      active: feedbackLinks.active,
      createdAt: feedbackLinks.createdAt,
    })
    .from(feedbackLinks)
    .orderBy(desc(feedbackLinks.createdAt));

  const notes = await db
    .select({
      id: feedbackNotes.id,
      linkId: feedbackNotes.linkId,
      linkLabel: feedbackLinks.label,
      path: feedbackNotes.path,
      note: feedbackNotes.note,
      selector: feedbackNotes.selector,
      elementText: feedbackNotes.elementText,
      pageTitle: feedbackNotes.pageTitle,
      status: feedbackNotes.status,
      createdAt: feedbackNotes.createdAt,
    })
    .from(feedbackNotes)
    .leftJoin(feedbackLinks, eq(feedbackNotes.linkId, feedbackLinks.id))
    .orderBy(desc(feedbackNotes.createdAt));

  const openCount = notes.filter((n) => n.status === "open").length;

  return (
    <div className="mx-auto max-w-[1100px]">
      <Breadcrumb items={[{ label: "Panel", href: "/admin" }, { label: "Comentarios del sitio" }]} />
      <div className="mt-4">
        <PageHeader
          eyebrow="Sitio público"
          title="Comentarios del sitio"
          description="Crea un enlace para que un cliente comente directo sobre el sitio en vivo. Aquí llegan sus notas con la página y la parte exacta a la que se refieren."
        />
      </div>
      <FeedbackBoard
        links={links.map((l) => ({ ...l, createdAt: l.createdAt ? l.createdAt.toISOString() : null }))}
        notes={notes.map((n) => ({ ...n, createdAt: n.createdAt ? n.createdAt.toISOString() : null }))}
        openCount={openCount}
      />
    </div>
  );
}
