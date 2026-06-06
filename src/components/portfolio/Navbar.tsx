import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Sun, Moon, 
  User, Code2, FolderGit2, Briefcase, 
  Award, Mail 
} from "lucide-react";

const links = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "achievements", label: "Achievements", icon: Award },
   { id: "leadership", label: "Leadership", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

export function Navbar({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", ...links.map(l => l.id)];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
          scrolled 
            ? "bg-background border border-primary/20 shadow-lg" 
            : "glass"
        }`}>
          <button onClick={() => go("hero")} className="flex items-center gap-3 font-display text-base font-semibold">
            <img 
              src="https://res.cloudinary.com/dwona3xzj/image/upload/v1780763463/t1g8fmfb6wlxvxvrl0c3.png"
              alt="Logo"
              className="size-8 md:size-10 object-contain rounded-full"
            />
            <span className="text-gradient text-lg md:text-xl">Shining Star</span>
          </button>

          <nav className="hidden items-center md:flex md:gap-2">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                  active === l.id 
                    ? "bg-primary/20 text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                }`}
              >
                <l.icon className={`size-4 ${
                  active === l.id ? "text-secondary" : "text-muted-foreground"
                }`} />
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-background border border-primary/20 mt-2 overflow-hidden rounded-2xl p-3 md:hidden"
            >
              {links.map(l => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${
                    active === l.id 
                      ? "bg-primary/15 text-foreground" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  <l.icon className={`size-4 ${
                    active === l.id ? "text-secondary" : "text-muted-foreground"
                  }`} />
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}