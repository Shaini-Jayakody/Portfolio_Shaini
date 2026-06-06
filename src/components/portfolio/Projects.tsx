import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronRight, Figma, Smartphone, Monitor, Palette, Play, Code2, Leaf, Globe } from "lucide-react";
import { Section } from "./Section";

type Project = {
  title: string;
  desc: string;
  detailedDesc: string[];
  tags: string[];
  category: "Web" | "Mobile" | "UI/UX";
  techStack: "MERN" | "Spring Boot" | "Other";
  gradient: string;
  github?: string;
  demo?: string;
  figma?: string;
  liveSite?: string;
  image: string;
};

const PROJECTS: Project[] = [
  { 
    title: "ELIXRA", 
    desc: "Online Smart Health Care Platform", 
    detailedDesc: [
      "Developed payment and patient management services using a microservices architecture",
      "Integrated Stripe for secure payment processing and Cloudinary for media storage",
      "Designed a scalable and modular frontend architecture for maintainable development",
      "Ensured smooth integration between microservices for efficient system communication"
    ],
    tags: ["Spring Boot", "MySQL", "JWT", "Kubernetes", "Docker", "Microservices", "Stripe", "Cloudinary"], 
    category: "Web",
    techStack: "Spring Boot",
    gradient: "from-green-500/40 to-emerald-400/40", 
    github: "https://github.com/KavinduKHM/ELIXRA---Smart-Health-Care-Platform.git", 
    demo: "https://drive.google.com/file/d/1b-KHS0yjrpy52oDkKTsX9UEGB4FW7ChZ/view?usp=drive_link",
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780762187/l22vejexlosngqvycrdc.png"
  },
  
  { 
    title: "RebuildHub", 
    desc: "Crowdsourced Damage Assessment Platform", 
    detailedDesc: [
      "Developed inventory and resource management module for a disaster response platform",
      "Built RESTful APIs using Node.js and Express.js for resource operations",
      "Integrated Stripe payment gateway for secure transactions and donations",
      "Implemented JWT authentication with role-based access control"
    ],
    tags: ["MERN", "Node.js", "Express.js", "React", "MongoDB", "JWT", "Stripe"], 
    category: "Web",
    techStack: "MERN",
    gradient: "from-indigo-500/40 to-cyan-400/40", 
    github: "https://github.com/KavinduKHM/Rebuilld-Hub.git", 
    liveSite: "https://rebuilld-hub-frontend.onrender.com/resources",
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780757349/vt87izcpuhv2oacmxjly.png"
  },
  
  { 
    title: "CeylonBrew", 
    desc: "Online Tea Management System", 
    detailedDesc: [
      "Developed issue tracking and reporting features with image upload support using Cloudinary API",
      "Implemented waste calculation logic for monitoring and analyzing production efficiency",
      "Generated automated PDF reports for system data and analytics",
      "Built backend functionality to support data processing and reporting workflows along with email notifications"
    ],
    tags: ["Spring Boot", "React", "MySQL", "Cloudinary", "Tailwind CSS", "Microservices", "REST API", "JWT"], 
    category: "Web",
    techStack: "Spring Boot",
    gradient: "from-orange-500/40 to-red-400/40", 
    github: "https://github.com/Visna-Sithmi/CeylonBrew.git", 
    demo: "https://drive.google.com/file/d/1cURXWr5yJNlV3ic_HKS4SrpuHS8_BeqB/view?usp=drive_link",
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780739059/j1mnuig5owmi7bog7kvc.png"
  },
  { 
    title: "ETicketsBus", 
    desc: "Online Bus Ticket Booking System", 
    detailedDesc: [
      "Developed route management functionalities for creating, updating, and maintaining bus routes",
      "Implemented CRUD operations using Java Servlets and JDBC for route data management and Admin Operations",
      "Integrated backend services with MySQL database for efficient data storage and retrieval",
      "Built validation and data handling logic to ensure accurate route and schedule management"
    ],
    tags: ["Java", "Servlets", "JDBC", "MySQL"], 
    category: "Web",
    techStack: "Other",
    gradient: "from-fuchsia-500/40 to-blue-500/40", 
    github: "https://github.com/IT23827226YasanLakmal/ETicketsBus.git", 
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780766373/zhs3yrvy11wmdchprkhf.png"
  },
  { 
    title: "OnlineJobs", 
    desc: "Job Portal Platform", 
    detailedDesc: [
      "Contributed to the development of a web-based job portal for job seekers and employers",
      "Participated in frontend development using HTML and CSS to create responsive user interfaces",
      "Assisted in integrating application features with a MySQL database",
      "Collaborated with team members throughout the design and development process"
    ],
    tags: ["PHP", "HTML", "CSS", "MySQL"], 
    category: "Web",
    techStack: "Other",
    gradient: "from-cyan-400/40 to-emerald-400/40", 
    github: "https://github.com/kavishlakmal/Online_Job_Portal.git", 
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780738761/gi9cqp3v6nvqzqrtun2w.jpg"
  },

  { 
    title: "Shaini Jayakody", 
    desc: "Portfolio Website", 
    detailedDesc: [
      "Dynamic project filtering system with category (Web/Mobile/UI/UX) and technology stack (MERN/Spring Boot) filters",
      "Interactive project cards with expandable details, tech stack badges, live demos, and smooth animations",
      "Animated constellation-style loader with particle effects and theme-aware navigation with active section highlighting",
      "Fully responsive design with dark/light mode toggle, glassmorphism effects, and mobile-first architecture"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React", "Cloudinary", "Dynamic Filtering", "Animated UI", "Custom Hooks"], 
    category: "Web",
    techStack: "Other",
    gradient: "from-cyan-400/40 to-emerald-400/40", 
    github: "https://github.com/Shaini-Jayakody/Portfolio_Shaini.git", 
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780763567/uzduesuxod7yv4fgekmg.png"
  },

  { 
    title: "StellaRise", 
    desc: "Habit & Wellness Tracker Mobile Application", 
    detailedDesc: [
      "Built a habit tracker with guided task completion and a custom progress rating system",
      "Developed an emoji-based mood journal with custom data visualization using Canvas API",
      "Designed a custom hydration tracker and home screen widget for enhanced user engagement",
      "Implemented local data persistence using SharedPreferences, ViewModel, and LiveData"
    ],
    tags: ["Kotlin", "Android SDK", "Material Design 3", "WorkManager", "SharedPreferences", "Canvas API", "App Widgets"], 
    category: "Mobile",
    techStack: "Other",
    gradient: "from-purple-500/40 to-pink-500/40", 
    github: "https://github.com/Shaini-Jayakody/StellaRise.git", 
    demo: "https://drive.google.com/file/d/1PuamekA3ttdWeclYu_r74CP_WUF4DgqV/view?usp=drive_link",
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780740078/p2erecs7pdguap7kfz69.png"
  },
  { 
    title: "Coffee Chapter", 
    desc: "Coffee Shop Mobile Application UI/UX Design", 
    detailedDesc: [
      "Designed a mobile coffee ordering experience with personalized drink customization",
      "Created interactive UI flows for selecting coffee flavors, cup designs, and coffee art",
      "Developed a customizable ordering system inspired by users' favorite books and characters",
      "Built high-fidelity prototypes and user-centered interfaces using Figma"
    ],
    tags: ["Figma", "UI Design", "Mobile App", "Wireframing", "User Flows"], 
    category: "UI/UX",
    techStack: "Other",
    gradient: "from-amber-500/40 to-orange-500/40", 
    figma: "https://www.figma.com/proto/UYwA6lHyCpEVloLKU4VEpw/Coffee?node-id=0-1&t=drGioGNoubwCf5OO-1",
    demo: "https://drive.google.com/file/d/1YR1j7Op110q1gv2YcN5hEPMvJ3mJ5p_X/view?usp=drive_link",
    image: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780746766/jog0k2thvpziefft5hs2.png"
  },
];

// Tech stack icons and colors - Only MERN, Spring Boot, and Other
const TECH_STACK_CONFIG = {
  "MERN": { icon: Code2, color: "from-blue-500 to-cyan-500", label: "MERN Stack" },
  "Spring Boot": { icon: Leaf, color: "from-green-500 to-emerald-500", label: "Spring Boot" },
  "Other": { icon: Code2, color: "from-gray-500 to-gray-600", label: "Other Technologies" }
};

// Category configuration
const CATEGORY_CONFIG = {
  "Web": { icon: Monitor, label: "Web Application", buttonLabel: "Live Demo" },
  "Mobile": { icon: Smartphone, label: "Mobile Application", buttonLabel: "View Demo" },
  "UI/UX": { icon: Palette, label: "UI/UX Design", buttonLabel: "Preview Design" }
};

export function Projects() {
  const [categoryFilter, setCategoryFilter] = useState<"All" | "Web" | "Mobile" | "UI/UX">("All");
  const [techFilter, setTechFilter] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // First filter by category, then by tech stack
  let filteredItems = PROJECTS.filter(p => categoryFilter === "All" || p.category === categoryFilter);
  if (techFilter !== "All") {
    filteredItems = filteredItems.filter(p => p.techStack === techFilter);
  }
  
  // Get unique tech stacks from filtered projects (only for Web category)
  const showTechFilters = categoryFilter === "Web";
  const webProjects = PROJECTS.filter(p => p.category === "Web");
  const availableTechStacks = showTechFilters ? ["All", ...new Set(webProjects.map(p => p.techStack))] : [];

  // Reset tech filter when switching away from Web category
  const handleCategoryChange = (category: "All" | "Web" | "Mobile" | "UI/UX") => {
    setCategoryFilter(category);
    if (category !== "Web") {
      setTechFilter("All");
    }
  };

  return (
    <Section id="projects" eyebrow="Projects" title="Where ideas become working systems" subtitle="A few products and platforms I've helped bring to life.">
      {/* Main Category Filters */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            categoryFilter === "All" 
              ? "bg-primary text-primary-foreground shadow-lg scale-105" 
              : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-primary/10"
          }`}
        >
          All Projects
        </button>
        {(["Web", "Mobile", "UI/UX"] as const).map(cat => {
          const Icon = CATEGORY_CONFIG[cat].icon;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                categoryFilter === cat 
                  ? "bg-primary text-primary-foreground shadow-lg scale-105" 
                  : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-primary/10"
              }`}
            >
              <Icon className="size-4" />
              {cat}
            </button>
          );
        })}
      </div>

      {/* Tech Stack Filters - ONLY show when Web category is selected */}
      {showTechFilters && availableTechStacks.length > 1 && (
        <div className="mb-10 flex flex-wrap justify-center gap-2 border-t border-border/50 pt-6">
          {availableTechStacks.map(tech => {
            if (tech === "All") {
              return (
                <button
                  key={tech}
                  onClick={() => setTechFilter(tech)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    techFilter === tech 
                      ? "bg-secondary/20 border-secondary text-secondary shadow-sm" 
                      : "bg-primary/5 border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  All Technologies
                </button>
              );
            }
            const techConfig = TECH_STACK_CONFIG[tech as keyof typeof TECH_STACK_CONFIG];
            if (!techConfig) return null;
            const Icon = techConfig.icon;
            return (
              <button
                key={tech}
                onClick={() => setTechFilter(tech)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                  techFilter === tech 
                    ? "bg-secondary/20 border-secondary text-secondary shadow-sm" 
                    : "bg-primary/5 border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                <Icon className="size-3" />
                {techConfig.label}
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((project, index) => {
          const CategoryIcon = CATEGORY_CONFIG[project.category].icon;
          const isMobileOrUIUX = project.category === "Mobile" || project.category === "UI/UX";
          const isWebProject = project.category === "Web";
          const techConfig = TECH_STACK_CONFIG[project.techStack as keyof typeof TECH_STACK_CONFIG];
          const TechIcon = techConfig?.icon || Code2;
          
          return (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Project Image - Transparent background for mobile/UIUX projects */}
              <div className={`relative overflow-hidden ${
                isMobileOrUIUX 
                  ? 'h-64 md:h-72 flex items-center justify-center bg-transparent' 
                  : 'h-48 md:h-52 bg-gradient-to-br from-gray-900 to-gray-800'
              }`}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className={`transition-transform duration-500 group-hover:scale-105 ${
                    isMobileOrUIUX 
                      ? 'h-full w-auto object-contain mx-auto' 
                      : 'h-full w-full object-cover'
                  }`}
                  loading="lazy"
                />
                
                {/* Tech Stack Badge - Only for Web Apps, positioned at top-right corner */}
                {isWebProject && techConfig && (
                  <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${techConfig.color} bg-black/90 backdrop-blur-sm px-2.5 py-1.5 text-xs font-medium text-white shadow-lg`}>
                    <TechIcon className="size-3" />
                    <span>{techConfig.label}</span>
                  </div>
                )}
                
                {/* Subtle gradient overlay on hover - transparent for mobile/UIUX */}
                {!isMobileOrUIUX && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                {isMobileOrUIUX && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
              
              <div className="p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon className="size-4 text-secondary" />
                  <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.desc}</p>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => setExpandedProject(expandedProject === project.title ? null : project.title)}
                  className="mt-3 flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary transition-colors"
                >
                  {expandedProject === project.title ? (
                    <><ChevronDown className="size-3" /> Details</>
                  ) : (
                    <><ChevronRight className="size-3" /> View key contributions</>
                  )}
                </button>
                
                {/* Detailed Description */}
                {expandedProject === project.title && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 space-y-1.5 border-t border-border/50 pt-3"
                  >
                    {project.detailedDesc.map((item, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                        <span className="text-primary mt-0.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
                
                {/* ALL TAGS - Fully visible */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className="rounded-full bg-secondary/10 border border-secondary/20 px-2 py-0.5 text-[10px] font-medium text-secondary">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-5 flex items-center gap-4 pt-3 border-t border-border/50">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-primary group/btn"
                    >
                      <Github className="size-3.5 transition-transform group-hover/btn:scale-110" /> 
                      Source Code
                    </a>
                  )}
                  
                  {project.figma && (
                    <a 
                      href={project.figma} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-primary group/btn"
                    >
                      <Figma className="size-3.5 transition-transform group-hover/btn:scale-110" /> 
                      Figma Design
                    </a>
                  )}
                  
                  {/* Live Site button for projects with liveSite */}
                  {project.liveSite && (
                    <a 
                      href={project.liveSite} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition-all hover:text-primary group/btn"
                    >
                      <Globe className="size-3 transition-transform group-hover/btn:scale-110" /> 
                      Live Site
                    </a>
                  )}
                  
                  {/* Demo button for projects with demo (but no liveSite) */}
                  {project.demo && !project.liveSite && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition-all hover:text-primary group/btn"
                    >
                      <Play className="size-3 transition-transform group-hover/btn:scale-110" /> 
                      {CATEGORY_CONFIG[project.category].buttonLabel}
                    </a>
                  )}
                </div>
              </div>
              
              {/* Hover Border Effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/20" />
            </motion.article>
          );
        })}
      </motion.div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <div className="text-5xl mb-3">🔍</div>
          <p className="text-lg">No projects found with the selected filters</p>
          <p className="text-sm mt-1">Try adjusting the category or tech stack filters</p>
        </div>
      )}
    </Section>
  );
}