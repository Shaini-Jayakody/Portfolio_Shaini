import { motion } from "framer-motion";
import { 
  GraduationCap, Compass, Target, ExternalLink, 
  BookOpen, Users, Globe, Code2, Database, Sparkles
} from "lucide-react";
import { Section } from "./Section";

const timeline = [
  { 
    year: "2023-Present", 
    title: "B.Sc. (Hons) in Software Engineering", 
    place: "SLIIT University", 
    url: "https://www.sliit.lk/",
    icon: Code2,
    desc: "Focused on web development, software architecture, databases, and mobile application development." 
  },
  { 
    year: "Present", 
    title: "Diploma in Human Resources Management", 
    place: "LPEC Campus", 
    url: "https://www.lpec.lk/",
    icon: Users,
    desc: "Focused on human resource principles, organizational behavior, recruitment, and workplace management." 
  },
  { 
    year: "2019", 
    title: "Diploma in English Language", 
    place: "British Way English Academy", 
    url: "https://www.britishway.lk/",
    icon: Globe,
    desc: "Focused on English communication, academic writing, grammar, and professional language skills." 
  },
];

const cards = [
  { icon: Compass, title: "Interests", body: "Full-stack development, mobile apps, UI/UX design, cloud systems, and emerging technologies like AI." },
  { icon: Target, title: "Goals", body: "To build impactful, scalable software products that solve real problems and contribute to meaningful digital experiences." },
];

export function About() {
  return (
    <Section id="about" eyebrow="About Me" title="A look into my universe" subtitle="Software engineer and Designer at heart, curious about how things work.">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8"
        >
          <p className="text-base leading-relaxed text-muted-foreground">
           I'm a Software Engineering undergraduate passionate about full-stack and mobile development, with hands-on experience building scalable, real-world applications. 
           I enjoy working at the intersection of logic and creativity-where clean system design meets thoughtful user experience. Outside of coding, I explore design ideas, experiment with new technologies, and stay curious about how things work under the hood.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {cards.map(c => (
              <div key={c.title} className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                <c.icon className="size-5 text-secondary" />
                <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" aria-hidden />
          <div className="flex items-center gap-2 pb-4 text-sm text-muted-foreground">
            <GraduationCap className="size-4 text-secondary" /> Education & journey
          </div>
          <ul className="space-y-5">
            {timeline.map((t, i) => (
              <motion.li
                key={t.year}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12"
              >
                <span className="absolute left-2 top-1.5 size-4 rounded-full border-2 border-background bg-primary glow-primary" />
                <div className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <t.icon className="size-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-semibold">{t.title}</h4>
                        <span className="text-xs text-secondary">{t.year}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <a 
                          href={t.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-secondary transition-colors group"
                        >
                          {t.place}
                          <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground/90 pl-13">{t.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}