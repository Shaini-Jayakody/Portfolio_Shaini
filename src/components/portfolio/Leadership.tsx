import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "./Section";

const ROLES = [
  { period: "2022 - 2024", role: "President",   Society: "Prathiba Youth Club", desc: "Oversaw club operations, organized community programs, and guided members in planning and executing events." },
  { period: "2017-2019", role: "Secretary", Society: "Astrological Society", desc: "Organized meetings and events, maintained society records, and supported communication and coordination among members." },
  { period: "2016- 2017", role: "Organizer", Society: "Road Safety team", desc: "Organized awareness campaigns and events focused on promoting road safety and responsible behavior in the community."},
  { period: "2016 — 2017", role: "Treasurer", Society: "Saukyadhana Society", desc: "Managed society funds, maintained financial records, and assisted in budgeting for events and activities." },
];

export function Leadership() {
  return (
    <Section id="leadership" eyebrow="Leadership And Activities" title="A timeline through space" subtitle="Stops along the way.">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2" aria-hidden />
        <ul className="space-y-10">
          {ROLES.map((r, i) => (
            <motion.li
              key={r.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                <span className="absolute left-2 top-1 size-4 rounded-full border-2 border-background bg-primary glow-primary md:left-1/2 md:-translate-x-1/2" />
                <div className="glass rounded-2xl p-5">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs text-secondary">
                    <Briefcase className="size-3.5" />{r.period}
                  </div>
                  <h3 className="text-lg font-semibold">{r.role}</h3>
                  <p className="text-sm text-muted-foreground">{r.Society}</p>
                  <p className="mt-2 text-sm text-muted-foreground/90">{r.desc}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
