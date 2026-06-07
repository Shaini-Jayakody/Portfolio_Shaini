import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Section } from "./Section";

type Skill = { name: string; level: number };
type Cat = { id: string; label: string; skills: Skill[] };

const CATS: Cat[] = [
  { id: "languages", label: "Languages", skills: [
    { name: "JavaScript", level: 94 }, { name: "TypeScript", level: 85 },
    { name: "Python", level: 90 }, { name: "Java", level: 92 },
    { name: "Kotlin", level: 90 }, { name: "PHP", level: 95 },
    { name: "C++", level: 97 }, { name: "C", level: 94 },
    { name: "R", level: 80 },
  ]},
  { id: "frontend", label: "Frontend", skills: [
    { name: "React", level: 95 }, { name: "Next.js", level: 88 },
    { name: "TypeScript", level: 92 }, { name: "Tailwind CSS", level: 94 },
    { name: "HTML5", level: 100 }, { name: "CSS3", level: 98 },
    { name: "Framer Motion", level: 90 },
  ]},
  { id: "backend", label: "Backend", skills: [
    { name: "Node.js", level: 90 }, { name: "Express.js", level: 90 },
    { name: "Spring Boot", level: 80 }, { name: "Python", level: 88 },
    { name: "REST APIs", level: 92 },
  ]},
  { id: "databases", label: "Databases", skills: [
    { name: "MySQL", level: 90 }, { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 90 }, { name: "SQLite", level: 85 },
  ]},
  { id: "cloud", label: "Cloud & DevOps", skills: [
    { name: "AWS", level: 88 }, { name: "Docker", level: 90 },
    { name: "Kubernetes", level: 82 }, { name: "CI/CD", level: 86 },
    { name: "Git", level: 98 },
  ]},
  { id: "tools", label: "Tools & IDEs", skills: [
    { name: "VS Code", level: 95 }, { name: "IntelliJ", level: 80 },
    { name: "Android Studio", level: 90 }, { name: "Postman", level: 98 },
    { name: "Figma", level: 85 }, { name: "Git", level: 98 },
    { name: "Docker", level: 75 }, { name: "Eclipse", level: 98 },
    { name: "Maven", level: 81 },
  ]},
];

export function Skills() {
  const [active, setActive] = useState<string>(CATS[0].id);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const activeCat = CATS.find(c => c.id === active)!;

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ width: 380, height: 380 });
      } else if (width < 768) {
        setDimensions({ width: 500, height: 450 });
      } else if (width < 1024) {
        setDimensions({ width: 700, height: 480 });
      } else {
        setDimensions({ width: 800, height: 500 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate responsive center and radius
  const center = {
    x: dimensions.width / 2,
    y: dimensions.height / 2
  };
  
  const getRadius = () => {
    const skillCount = activeCat.skills.length;
    const minDimension = Math.min(dimensions.width, dimensions.height);
    
    if (dimensions.width < 640) {
      return minDimension * 0.35;
    } else if (dimensions.width < 768) {
      return minDimension * 0.38;
    }
    return minDimension * 0.4;
  };
  
  const radius = getRadius();
  
  const nodes = activeCat.skills.map((skill, i) => {
    const angle = (i / activeCat.skills.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...skill,
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      angle,
    };
  });

  return (
    <Section id="skills" eyebrow="Skills" title="My constellation of craft" subtitle="A map of the technologies I navigate by.">
      {/* Category Filters - Scrollable on mobile */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex min-w-max justify-center gap-2 px-4">
          {CATS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                active === cat.id
                  ? "border-primary bg-primary text-primary-foreground shadow-lg"
                  : "border-primary/20 bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Network Visualization - Responsive */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-full">
            <svg 
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} 
              className="w-full h-auto"
              style={{ aspectRatio: `${dimensions.width}/${dimensions.height}` }}
            >
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.7 0.16 265 / 30%)" />
                  <stop offset="100%" stopColor="oklch(0.7 0.16 265 / 0%)" />
                </radialGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="oklch(0.7 0.16 265)" />
                  <stop offset="100%" stopColor="oklch(0.85 0.11 230)" />
                </linearGradient>
              </defs>

              {/* Center glow */}
              <circle cx={center.x} cy={center.y} r={radius * 0.7} fill="url(#centerGlow)" />

              {/* Connection lines */}
              {nodes.map((node, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={center.x}
                  y1={center.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="url(#lineGrad)"
                  strokeWidth={dimensions.width < 640 ? "1" : "1.5"}
                  strokeOpacity="0.4"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                />
              ))}

              {/* Network connections between nodes */}
              {nodes.map((a, i) =>
                nodes.slice(i + 1).map((b, j) => (
                  <line
                    key={`net-${i}-${j}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="oklch(0.7 0.16 265 / 15%)"
                    strokeWidth={dimensions.width < 640 ? "0.5" : "0.8"}
                  />
                ))
              )}

              {/* Center node */}
              <motion.circle
                cx={center.x}
                cy={center.y}
                r={dimensions.width < 640 ? "8" : "12"}
                fill="oklch(0.85 0.11 230)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <circle cx={center.x} cy={center.y} r={dimensions.width < 640 ? "16" : "24"} fill="oklch(0.7 0.16 265 / 20%)" />
              <circle cx={center.x} cy={center.y} r={dimensions.width < 640 ? "24" : "36"} fill="oklch(0.7 0.16 265 / 10%)" />
            </svg>

            {/* Skill Nodes */}
            {nodes.map((skill, i) => {
              const nodeSize = dimensions.width < 640 ? "h-7 w-7" : "h-9 w-9";
              const fontSize = dimensions.width < 640 ? "text-[10px]" : "text-xs";
              const labelSize = dimensions.width < 640 ? "text-[9px]" : "text-xs";
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: "absolute",
                    left: `${(skill.x / dimensions.width) * 100}%`,
                    top: `${(skill.y / dimensions.height) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="group"
                >
                  {/* Node Dot */}
                  <div className={`relative flex ${nodeSize} items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border transition-all duration-300 ${
                    hoveredSkill === skill.name 
                      ? "border-primary shadow-lg shadow-primary/30 scale-110" 
                      : "border-primary/30 group-hover:border-primary/60 group-hover:scale-105"
                  }`}>
                    <span className={`${fontSize} font-bold text-foreground`}>
                      {skill.name.charAt(0)}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <div className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card/90 px-1.5 py-0.5 ${labelSize} font-medium backdrop-blur-sm shadow-lg z-10`}>
                    {skill.name}
                  </div>

                  {/* Progress Bar Popup */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap z-50"
                    >
                      <div className="rounded-xl bg-card/95 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur-md shadow-xl border border-primary/20">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[8px] sm:text-[10px] text-muted-foreground">Proficiency</span>
                            <span className="text-[10px] sm:text-xs font-bold text-primary">{skill.level}%</span>
                          </div>
                          <div className="h-1 w-16 sm:w-24 overflow-hidden rounded-full bg-muted">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.5 }}
                              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}