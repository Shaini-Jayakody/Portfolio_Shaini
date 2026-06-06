import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Section } from "./Section";

const ROLES = [
  { period: "2024 — Present", role: "Senior Software Engineer", company: "Nebula Labs", desc: "Leading the platform team building AI-native developer tooling used by 50k+ engineers." },
  { period: "2022 — 2024", role: "Software Engineer", company: "Stripe", desc: "Shipped payment optimization features that lifted authorization rates by 3.2% globally." },
  { period: "2020 — 2022", role: "Full-Stack Engineer", company: "Airbnb", desc: "Rebuilt the host onboarding funnel; +18% activation, +9% retention." },
  { period: "2019 — 2020", role: "Software Engineer Intern", company: "Google", desc: "Worked on ML ranking infrastructure for Search." },
];

export function Experience() {
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
                  <p className="text-sm text-muted-foreground">{r.company}</p>
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
