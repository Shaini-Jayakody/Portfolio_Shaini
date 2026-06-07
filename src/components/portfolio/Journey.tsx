import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Award, 
  Computer, 
  BookOpen, 
  Languages, 
  School 
} from "lucide-react";
import { Section } from "./Section";

const ROLES = [
  { 
    period: "2023 - Present", 
    role: "BSc Honors in Software Engineering",   
    society: "Sri Lanka Institute of Information Technology (SLIIT)",
    icon: GraduationCap,
    iconColor: "text-blue-500"
  },
  { 
    period: "Present", 
    role: "Diploma in Human Resource Management", 
    society: "LPEC Campus",
    icon: Award,
    iconColor: "text-emerald-500"
  },
  { 
    period: "2022-2023", 
    role: "Trainee IT Operator", 
    society: "Fine Graphics",
    icon: Computer,
    iconColor: "text-purple-500"
  },
  { 
    period: "2019-2021", 
    role: "G.C.E. A/L", 
    society: "Pushpadhana Girls' College, Kandy", 
    desc: "Engineering Technology",
    icon: BookOpen,
    iconColor: "text-amber-500"
  },
  { 
    period: "2019", 
    role: "Diploma in English Language", 
    society: "British Way English Academy",
    icon: Languages,
    iconColor: "text-rose-500"
  },
  { 
    period: "2018", 
    role: "G.C.E. O/L", 
    society: "Hemamali Girls' College, Kandy",
    icon: School,
    iconColor: "text-teal-500"
  },
];

export function Journey() {
  return (
    <Section id="journey" eyebrow="Journey" title="A timeline through space" subtitle="Stops along the way.">
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
                <div className="glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs text-secondary">
                    <r.icon className={`size-3.5 ${r.iconColor}`} />
                    {r.period}
                  </div>
                  <h3 className="text-lg font-semibold">{r.role}</h3>
                  <p className="text-sm text-muted-foreground">{r.society}</p>
                  {r.desc && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                      <p className="text-sm text-muted-foreground/90 italic">{r.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}