import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Rocket } from "lucide-react";
import { StarsBackground } from "./StarsBackground";
import profile from "@/assets/Profile.png";

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <StarsBackground density={0.5} />
      <div className="absolute inset-0 grid-cosmic" aria-hidden />
      <div className="absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-secondary"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Hi, I'm <br />
            <span className="text-gradient">Shaini Jayakody</span>
            <br />
            <span className="text-foreground/70 text-[40px]">Undergraduate Software Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Turning ideas into impactful digital experiences through clean code, modern technologies, and user-focused design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] glow-primary"
            >
              <Rocket className="size-4 transition-transform group-hover:-rotate-12" />
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary/15"
            >
              <Mail className="size-4" /> Contact Me
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex items-center gap-4 text-muted-foreground"
          >
            <a href="https://github.com/Shaini-Jayakody" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-secondary"><Github className="size-5" /></a>
            <a href="https://www.linkedin.com/in/shaini-jayakody-6a9197377" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-secondary"><Linkedin className="size-5" /></a>
            <a href="mailto:shainijayakody8@gmail.com" aria-label="Email" className="transition-colors hover:text-secondary"><Mail className="size-5" /></a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-primary/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dashed border-secondary/20"
          />
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square overflow-hidden rounded-full glass-strong p-2"
          >
            <img
              src={profile}
              alt="Profile portrait"
              width={768}
              height={768}
              className="size-full rounded-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-primary/30" />
          </motion.div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-primary/20 blur-3xl" />
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll down"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground hover:text-foreground"
      >
        <ArrowDown className="size-5" />
      </motion.button>
    </section>
  );
}