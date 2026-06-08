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
        {/* Timeline line with gradient */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2" aria-hidden />
        
        <ul className="space-y-10">
          {ROLES.map((r, i) => (
            <motion.li
              key={r.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`}
            >
              <div className={`pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`}>
                {/* Timeline dot with glow */}
                <span className="absolute left-2 top-1 size-4 rounded-full border-2 border-background bg-primary glow-primary md:left-1/2 md:-translate-x-1/2 transition-all duration-300 group-hover:scale-125 group-hover:bg-secondary" />
                
                {/* Card with glow effect */}
                <motion.div
                  whileHover={{ y: -6, rotate: -0.4 }}
                  className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_15px_40px_rgba(30,144,255,0.3)]"
                >
                  {/* Glow Effect - Top Right Corner */}
                  <div 
                    className="pointer-events-none absolute right-0 top-0 size-24 opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: "radial-gradient(circle at 100% 0%, rgba(30,144,255,0.6), transparent 60%)" }}
                  />
                  
                  {/* Icon with glow on hover */}
                  <div className="relative mb-3 inline-flex">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-500 group-hover:bg-primary/40 group-hover:scale-150" />
                    <div className="relative inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/20">
                      <r.icon className={`size-3.5 ${r.iconColor} transition-all duration-300 group-hover:scale-110`} />
                      <span className="text-xs text-secondary">{r.period}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-secondary">
                    {r.role}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground transition-colors duration-300 group-hover:text-muted-foreground/80">
                    {r.society}
                  </p>
                  
                  {r.desc && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent transition-all duration-300 group-hover:from-primary" />
                      <p className="text-sm text-muted-foreground/90 italic transition-colors duration-300 group-hover:text-muted-foreground">
                        {r.desc}
                      </p>
                    </div>
                  )}
                  
                  {/* Hover Effect Overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/40" />
                </motion.div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}