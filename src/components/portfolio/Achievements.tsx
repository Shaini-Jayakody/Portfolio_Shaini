import { motion } from "framer-motion";
import { Award, Medal, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { Section } from "./Section";

const ITEMS = [
  { icon: Trophy, title: "AWS Certified Solutions Architect", year: "2024", desc: "Professional level certification." },
  { icon: Medal, title: "Google Cloud Professional", year: "2023", desc: "Cloud architect & ML engineer tracks." },
  { icon: Star, title: "Hackathon Winner", year: "2023", desc: "1st place at TechCrunch Disrupt SF." },
  { icon: Award, title: "Open Source Award", year: "2022", desc: "GitHub Stars program member." },
  { icon: Zap, title: "Patent Holder", year: "2022", desc: "Distributed caching algorithm." },
  { icon: Sparkles, title: "Conference Speaker", year: "2021", desc: "React Summit, Node Congress." },
];

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Stars I've collected" subtitle="Recognitions, certifications and milestones.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl glass p-6"
          >
            <div className="relative mb-4 inline-flex">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all group-hover:bg-primary/40" />
              <div className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 ring-1 ring-primary/40">
                <it.icon className="size-6 text-secondary" />
              </div>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-semibold">{it.title}</h3>
              <span className="text-xs text-secondary">{it.year}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
