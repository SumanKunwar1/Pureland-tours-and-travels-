import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";

/** A paragraph, a bullet list, or a table. */
export type LegalBlock =
  | string
  | { list: string[] }
  | { table: { head: string[]; rows: string[][] } };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

interface LegalPageProps {
  icon: LucideIcon;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cancellation Policy", href: "/cancellation" },
  { label: "Terms & Conditions", href: "/terms" },
];

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p>{block}</p>;
  }

  if ("list" in block) {
    return (
      <ul className="list-disc space-y-2 pl-5 marker:text-primary">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[28rem] text-left text-sm sm:text-base">
        <thead className="bg-emerald-light text-foreground">
          <tr>
            {block.table.head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row[0]} className="border-t border-border">
              {row.map((cell, index) => (
                <td key={cell} className={index === 0 ? "px-4 py-3 font-medium text-foreground" : "px-4 py-3"}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Shared shell for the privacy, cancellation and terms pages. */
export function LegalPage({ icon: Icon, title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container-custom max-w-4xl text-center"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-display font-bold">{title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground [text-wrap:balance]">
              {intro}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </motion.div>
        </section>

        <div className="container-custom grid gap-10 py-12 md:py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                On this page
              </p>
              <ol className="mt-4 space-y-2 border-l border-border text-sm">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                ))}
              </ol>

              <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Our policies
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="max-w-3xl">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-border py-8 first:pt-0 last:border-b-0"
              >
                <h2 className="text-2xl font-display font-bold">
                  <span className="mr-2 text-primary">{index + 1}.</span>
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                  {section.blocks.map((block, blockIndex) => (
                    <Block key={blockIndex} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-4 rounded-2xl bg-cream p-6 sm:p-8">
              <h2 className="text-2xl font-display font-bold">Questions? Contact us</h2>
              <p className="mt-2 text-muted-foreground">
                Pure Land Tours &amp; Travels Pvt. Ltd., Trinity Tower, Maharajgunj, Kathmandu, Nepal
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-x-8">
                <li>
                  <a href="mailto:info@purelandtravels.com.np" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    info@purelandtravels.com.np
                  </a>
                </li>
                <li>
                  <a href="tel:+9779843347095" className="inline-flex items-center gap-2 text-primary hover:underline">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    +977-9843347095
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/9779704502011"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp +977-9704502011
                  </a>
                </li>
              </ul>
            </section>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm lg:hidden">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-primary hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
