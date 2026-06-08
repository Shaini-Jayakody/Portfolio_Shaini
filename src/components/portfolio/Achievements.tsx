import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Award, Medal, Sparkles, Star, Trophy, Zap, Search, X, 
  Brain, Database, Cloud, Bot, Cpu, Network, Rocket, 
  Shield, Code, Layout, Server, GitBranch, Globe, Package
} from "lucide-react";
import { Section } from "./Section";

const ITEMS = [
  { 
    icon: Trophy, 
    title: "Python for Beginners", 
    year: "2025", 
    issuer: "University of Moratuwa", 
    type: "certification", 
    credentialId: "dV6tbF7Wmb", 
    skills: ["Python", "Programming", "Problem Solving"] 
  },
  { 
    icon: Medal, 
    title: "Introduction to Python", 
    year: "2026", 
    issuer: "Sololearn", 
    type: "certification", 
    credentialId: "CC-PUASHVP0", 
    skills: ["Python", "Basics", "Data Types"] 
  },
  { 
    icon: Star, 
    title: "Python Developer", 
    year: "2026", 
    issuer: "Sololearn", 
    type: "certification", 
    credentialId: "CC-AAUKTT87", 
    skills: ["Python", "Advanced", "OOP", "Libraries"] 
  },
  { 
    icon: Layout, 
    title: "Web Design for Beginners", 
    year: "2026", 
    issuer: "University of Moratuwa", 
    type: "certification", 
    credentialId: "WCxXICgdZz", 
    skills: ["HTML", "CSS", "Web Design", "Responsive Design"] 
  },
  { 
    icon: Brain, 
    title: "Building GenAI Apps", 
    year: "2026", 
    issuer: "MongoDB", 
    type: "badge", 
    credentialId: "MDBdji0mytdg6", 
    skills: ["Generative AI", "Large Language Models (LLM)", "MongoDB", "Vector Search"] 
  },
  { 
    icon: Rocket, 
    title: "Deploying and Evaluating GenAI Apps", 
    year: "2026", 
    issuer: "MongoDB", 
    type: "badge", 
    credentialId: "MDBj8wdmf6ccy", 
    skills: ["AI Deployment", "Model Evaluation", "Retrieval-Augmented Generation (RAG)", "Cloud"] 
  },
  { 
    icon: Database, 
    title: "MongoDB Atlas Administration Path", 
    year: "2026", 
    issuer: "MongoDB", 
    type: "certification", 
    credentialId: "MDBp0mcpxwsgi", 
    skills: ["MongoDB", "Cloud Databases", "Performance", "Security"] 
  },
];

// Skill to icon mapping
const SKILL_ICONS: Record<string, React.ElementType> = {
  "Python": Code,
  "Programming": Code,
  "Problem Solving": Brain,
  "Basics": Star,
  "Data Types": Database,
  "Advanced": Rocket,
  "OOP": Cpu,
  "Libraries": Package,
  "HTML": Globe,
  "CSS": Layout,
  "Web Design": Layout,
  "Responsive Design": Layout,
  "Generative AI": Brain,
  "Large Language Models (LLM)": Bot,
  "MongoDB": Database,
  "Vector Search": Search,
  "AI Deployment": Rocket,
  "Model Evaluation": Shield,
  "Retrieval-Augmented Generation (RAG)": Network,
  "Cloud": Cloud,
  "Cloud Databases": Database,
  "Performance": Zap,
  "Security": Shield,
};

export function Achievements() {
  const [filterType, setFilterType] = useState<"all" | "certification" | "badge">("all");
  const [searchSkill, setSearchSkill] = useState("");

  // Filter items by type and search skill
  const filteredItems = ITEMS.filter(item => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = searchSkill === "" || 
      item.skills.some(skill => skill.toLowerCase().includes(searchSkill.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const getSkillIcon = (skill: string) => {
    const Icon = SKILL_ICONS[skill] || Code;
    return <Icon className="size-2.5" />;
  };

  return (
    <Section id="achievements" eyebrow="Achievements" title="Stars I've collected" subtitle="Recognitions, certifications and milestones from my learning journey.">
      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilterType("all")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
            filterType === "all"
              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
              : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"
          }`}
        >
          All Achievements
        </button>
        <button
          onClick={() => setFilterType("certification")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
            filterType === "certification"
              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
              : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"
          }`}
        >
          <Award className="size-4" /> Certifications
        </button>
        <button
          onClick={() => setFilterType("badge")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
            filterType === "badge"
              ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105"
              : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"
          }`}
        >
          <Medal className="size-4" /> Badges
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by skill (e.g., Python, LLM, RAG, MongoDB)..."
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="w-full rounded-full border border-primary/20 bg-background/40 py-2.5 pl-9 pr-8 text-sm outline-none transition-colors focus:border-primary"
          />
          {searchSkill && (
            <button
              onClick={() => setSearchSkill("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="size-3" />
          {filteredItems.length} achievement{filteredItems.length !== 1 ? "s" : ""} found
        </span>
      </div>

      {/* Achievements Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6, rotate: -0.4 }}
            className="group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_15px_40px_rgba(30,144,255,0.3)]"
          >
            {/* Glow Effect - Top Right Corner (like Certifications) */}
            <div 
              className="pointer-events-none absolute right-0 top-0 size-24 opacity-30 transition-opacity group-hover:opacity-60"
              style={{ background: "radial-gradient(circle at 100% 0%, rgba(30,144,255,0.6), transparent 60%)" }}
            />

            {/* Type Badge */}
            <div className={`absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm flex items-center gap-1 ${
              it.type === "certification" 
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
            }`}>
              {it.type === "certification" ? <Award className="size-3" /> : <Medal className="size-3" />}
              {it.type === "certification" ? "Certification" : "Badge"}
            </div>

            {/* Icon with glow on hover */}
            <div className="relative mb-4 inline-flex">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-500 group-hover:bg-primary/40 group-hover:scale-150" />
              <div className="relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 ring-1 ring-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:ring-primary">
                <it.icon className="size-6 text-secondary transition-all duration-300 group-hover:scale-110" />
              </div>
            </div>

            {/* Title and Year */}
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-base transition-colors duration-300 group-hover:text-secondary">
                {it.title}
              </h3>
              <span className="text-xs text-secondary whitespace-nowrap bg-secondary/10 px-2 py-0.5 rounded-full transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-105">
                {it.year}
              </span>
            </div>

            {/* Issuer */}
            <p className="mt-1.5 text-sm text-muted-foreground">{it.issuer}</p>

            {/* Skills Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {it.skills.map(skill => (
                <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-secondary transition-all duration-300 group-hover:bg-primary/20">
                  {getSkillIcon(skill)}
                  {skill}
                </span>
              ))}
            </div>

            {/* Credential ID */}
            {it.credentialId && (
              <div className="mt-3 pt-2 border-t border-border/30">
                <span className="text-[10px] text-muted-foreground/60 font-mono transition-colors duration-300 group-hover:text-muted-foreground/80">
                  ID: {it.credentialId}
                </span>
              </div>
            )}

            {/* Hover Effect Overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/40" />
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
            <Search className="size-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">No achievements found</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Try a different search term or category</p>
          <button
            onClick={() => {
              setSearchSkill("");
              setFilterType("all");
            }}
            className="mt-4 rounded-full bg-primary/20 px-4 py-1.5 text-sm text-secondary hover:bg-primary/30 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </Section>
  );
}