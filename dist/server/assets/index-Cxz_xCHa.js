import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FolderGit2, Code2, Award, Briefcase, Mail, Sun, Moon, X, Menu, Rocket, Github, Linkedin, ArrowDown, Compass, Target, GraduationCap, Users, Globe, ExternalLink, Palette, Smartphone, Monitor, Leaf, ChevronDown, ChevronRight, Figma, Play, Computer, BookOpen, Languages, School, Trophy, Medal, Star, Layout, Brain, Database, Search, Sparkles, Shield, Zap, Cloud, Network, Bot, Package, Cpu, Code, AlertCircle, Check, Send } from "lucide-react";
import { z } from "zod";
const links = [
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "journey", label: "Journey", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail }
];
function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["hero", ...links.map((l) => l.id)];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return /* @__PURE__ */ jsx(
    motion.header,
    {
      initial: { y: -40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6 },
      className: `fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`,
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: `flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "bg-background border border-primary/20 shadow-lg" : "glass"}`, children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => go("hero"), className: "flex items-center gap-3 font-display text-base font-semibold", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://res.cloudinary.com/dwona3xzj/image/upload/v1780763463/t1g8fmfb6wlxvxvrl0c3.png",
                alt: "Logo",
                className: "size-8 md:size-10 object-contain rounded-full"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gradient text-lg md:text-xl", children: "Shining Star" })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden items-center md:flex md:gap-2", children: links.map((l) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => go(l.id),
              className: `relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${active === l.id ? "bg-primary/20 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-primary/10"}`,
              children: [
                /* @__PURE__ */ jsx(l.icon, { className: `size-4 ${active === l.id ? "text-secondary" : "text-muted-foreground"}` }),
                l.label,
                active === l.id && /* @__PURE__ */ jsx(
                  motion.span,
                  {
                    layoutId: "nav-active",
                    className: "absolute inset-0 -z-10 rounded-full bg-primary/15",
                    transition: { type: "spring", stiffness: 380, damping: 30 }
                  }
                )
              ]
            },
            l.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleTheme,
                "aria-label": "Toggle theme",
                className: "rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground",
                children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsx(Moon, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setOpen((v) => !v),
                "aria-label": "Toggle menu",
                className: "rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground md:hidden",
                children: open ? /* @__PURE__ */ jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsx(Menu, { className: "size-5" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            className: "bg-background border border-primary/20 mt-2 overflow-hidden rounded-2xl p-3 md:hidden",
            children: links.map((l) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => go(l.id),
                className: `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${active === l.id ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsx(l.icon, { className: `size-4 ${active === l.id ? "text-secondary" : "text-muted-foreground"}` }),
                  l.label
                ]
              },
              l.id
            ))
          }
        ) })
      ] })
    }
  );
}
function StarsBackground({ density = 0.6 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    const starCount = Math.floor(120 * Math.min(density, 1.2));
    let stars = [];
    let shootingStars = [];
    const rand = (min, max) => min + Math.random() * (max - min);
    const createStar = (x, y, radius) => {
      return {
        x,
        y,
        radius,
        glowSize: radius * rand(2, 3.5),
        twinkleSpeed: rand(8e-3, 0.02),
        twinklePhase: rand(0, Math.PI * 2),
        baseAlpha: rand(0.6, 0.9),
        driftX: rand(-5e-3, 5e-3),
        driftY: rand(-5e-3, 5e-3)
      };
    };
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const x = rand(0, width);
        const y = rand(0, height);
        let radius = rand(0.8, 2.2);
        if (Math.random() < 0.08) radius = rand(2.2, 3.2);
        stars.push(createStar(x, y, radius));
      }
    };
    const spawnShootingStar = () => {
      let startX, startY;
      const edge = Math.floor(rand(0, 3));
      if (edge === 0) {
        startX = rand(0, width);
        startY = rand(-20, height * 0.25);
      } else if (edge === 1) {
        startX = rand(width * 0.5, width + 40);
        startY = rand(-20, height * 0.35);
      } else {
        startX = rand(-30, width * 0.25);
        startY = rand(-20, height * 0.4);
      }
      const vx = rand(-3.5, -0.8);
      const vy = rand(1.5, 3.8);
      const length = rand(12, 28);
      return {
        x: startX,
        y: startY,
        vx,
        vy,
        length,
        intensity: 0.9,
        age: 0,
        maxLife: rand(0.8, 1.4),
        tailPositions: []
      };
    };
    const updateShootingStars = (deltaTime) => {
      if (shootingStars.length < 4 && Math.random() < 0.012) {
        shootingStars.push(spawnShootingStar());
      }
      for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];
        s.tailPositions.unshift({ x: s.x, y: s.y });
        const maxTrail = Math.floor(s.length * 1.2);
        if (s.tailPositions.length > maxTrail) s.tailPositions.pop();
        s.x += s.vx;
        s.y += s.vy;
        s.age += deltaTime;
        let life = 1 - s.age / s.maxLife;
        if (life < 0) life = 0;
        s.intensity = life;
        if (s.x + 100 < 0 || s.x - 100 > width || s.y + 100 < 0 || s.y - 100 > height || life <= 0.02) {
          shootingStars.splice(i, 1);
          i--;
        }
      }
    };
    const applyStarDrift = () => {
      for (const star of stars) {
        star.x += star.driftX;
        star.y += star.driftY;
        if (star.x < -40) star.x = width + 40;
        if (star.x > width + 40) star.x = -40;
        if (star.y < -40) star.y = height + 40;
        if (star.y > height + 40) star.y = -40;
      }
    };
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed + star.twinklePhase) * 0.2 + 0.8;
        const alpha = Math.min(0.85, Math.max(0.35, star.baseAlpha * twinkle));
        const coreColor = `hsla(210, 100%, 65%, ${alpha})`;
        const glowColor = `hsla(200, 100%, 60%, ${alpha * 0.7})`;
        ctx.shadowBlur = star.glowSize * 1;
        ctx.shadowColor = `rgba(0, 150, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();
        ctx.shadowBlur = star.glowSize * 0.6;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = coreColor;
        ctx.fill();
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, 0.95)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      for (const meteor of shootingStars) {
        if (meteor.tailPositions.length < 2) continue;
        if (meteor.intensity <= 0.03) continue;
        const intensity = meteor.intensity;
        for (let i = 0; i < meteor.tailPositions.length - 1; i++) {
          const p1 = meteor.tailPositions[i];
          const p2 = meteor.tailPositions[i + 1];
          if (!p1 || !p2) continue;
          const t = i / (meteor.tailPositions.length - 1);
          const width2 = Math.max(1.2, 4 * (1 - t * 0.6) * intensity);
          const alphaFactor = 1 - t * 0.7;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(205, 100%, 65%, ${intensity * alphaFactor * 0.9})`;
          ctx.lineWidth = width2;
          ctx.shadowBlur = width2 * 1.2;
          ctx.shadowColor = `rgba(0, 160, 255, 0.9)`;
          ctx.stroke();
        }
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(0, 150, 255, 0.8)`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2 * intensity + 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 100%, 70%, ${intensity})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 1 * intensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 230, 255, ${intensity * 0.9})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      for (let i = 0; i < stars.length; i++) {
        if (stars[i].x < 0 || stars[i].x > width || stars[i].y < 0 || stars[i].y > height) {
          stars[i].x = rand(0, width);
          stars[i].y = rand(0, height);
        }
      }
    };
    let lastTime = performance.now();
    const animate = (now) => {
      let delta = Math.min(0.033, (now - lastTime) / 1e3);
      if (delta <= 0) delta = 1 / 60;
      lastTime = now;
      applyStarDrift();
      updateShootingStars(delta);
      draw();
      animationId = requestAnimationFrame(animate);
    };
    handleResize();
    initStars();
    setTimeout(() => shootingStars.push(spawnShootingStar()), 500);
    setTimeout(() => shootingStars.push(spawnShootingStar()), 1500);
    const showerInterval = setInterval(() => {
      if (shootingStars.length < 5) {
        shootingStars.push(spawnShootingStar());
        setTimeout(() => {
          if (shootingStars.length < 5) shootingStars.push(spawnShootingStar());
        }, 300);
      }
    }, 12e3);
    window.addEventListener("resize", handleResize);
    lastTime = performance.now();
    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(showerInterval);
      window.removeEventListener("resize", handleResize);
    };
  }, [density]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      className: "pointer-events-none absolute inset-0 h-full w-full",
      style: { background: "transparent" }
    }
  );
}
const profile = "/assets/Profile-CjTZU_z6.png";
function Hero() {
  return /* @__PURE__ */ jsxs("section", { id: "hero", className: "relative flex min-h-screen items-center overflow-hidden pt-28", children: [
    /* @__PURE__ */ jsx(StarsBackground, { density: 0.5 }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-cosmic", "aria-hidden": true }),
    /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-1/3 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]", "aria-hidden": true }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 md:grid-cols-[1.2fr_1fr] md:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-secondary",
            children: [
              /* @__PURE__ */ jsxs("span", { className: "relative flex size-2", children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" }),
                /* @__PURE__ */ jsx("span", { className: "relative inline-flex size-2 rounded-full bg-secondary" })
              ] }),
              "Available for new opportunities"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.1 },
            className: "mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
            children: [
              "Hi, I'm ",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-gradient", children: "Shaini Jayakody" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-foreground/70 text-[40px]", children: "Undergraduate Software Engineer" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.25 },
            className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            children: "Turning ideas into impactful digital experiences through clean code, modern technologies, and user-focused design."
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, delay: 0.4 },
            className: "mt-8 flex flex-wrap items-center gap-3",
            children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
                  className: "group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] glow-primary",
                  children: [
                    /* @__PURE__ */ jsx(Rocket, { className: "size-4 transition-transform group-hover:-rotate-12" }),
                    "View Projects"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
                  className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-primary/15",
                  children: [
                    /* @__PURE__ */ jsx(Mail, { className: "size-4" }),
                    " Contact Me"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.6, duration: 0.6 },
            className: "mt-8 flex items-center gap-4 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("a", { href: "https://github.com/Shaini-Jayakody", target: "_blank", rel: "noreferrer", "aria-label": "GitHub", className: "transition-colors hover:text-secondary", children: /* @__PURE__ */ jsx(Github, { className: "size-5" }) }),
              /* @__PURE__ */ jsx("a", { href: "https://www.linkedin.com/in/shaini-jayakody-6a9197377", target: "_blank", rel: "noreferrer", "aria-label": "LinkedIn", className: "transition-colors hover:text-secondary", children: /* @__PURE__ */ jsx(Linkedin, { className: "size-5" }) }),
              /* @__PURE__ */ jsx("a", { href: "mailto:shainijayakody8@gmail.com", "aria-label": "Email", className: "transition-colors hover:text-secondary", children: /* @__PURE__ */ jsx(Mail, { className: "size-5" }) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.9, delay: 0.2 },
          className: "relative mx-auto w-full max-w-md",
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: { duration: 40, repeat: Infinity, ease: "linear" },
                className: "absolute inset-0 rounded-full border border-dashed border-primary/30"
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { rotate: -360 },
                transition: { duration: 60, repeat: Infinity, ease: "linear" },
                className: "absolute inset-4 rounded-full border border-dashed border-secondary/20"
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                animate: { y: [-8, 8, -8] },
                transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                className: "relative aspect-square overflow-hidden rounded-full glass-strong p-2",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: profile,
                      alt: "Profile portrait",
                      width: 768,
                      height: 768,
                      className: "size-full rounded-full object-cover"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-primary/30" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -inset-6 -z-10 rounded-full bg-primary/20 blur-3xl" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      motion.button,
      {
        onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
        "aria-label": "Scroll down",
        animate: { y: [0, 8, 0] },
        transition: { duration: 2, repeat: Infinity },
        className: "absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted-foreground hover:text-foreground",
        children: /* @__PURE__ */ jsx(ArrowDown, { className: "size-5" })
      }
    )
  ] });
}
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsx("section", { id, className: "relative py-24 sm:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6 },
        className: "mx-auto mb-14 max-w-2xl text-center",
        children: [
          eyebrow && /* @__PURE__ */ jsx("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-wider text-secondary", children: eyebrow }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 text-4xl font-bold tracking-tight sm:text-5xl", children: title.split(" ").map(
            (w, i, arr) => i === arr.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-gradient", children: w }, i) : /* @__PURE__ */ jsxs("span", { children: [
              w,
              " "
            ] }, i)
          ) }),
          subtitle && /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: subtitle })
        ]
      }
    ),
    children
  ] }) });
}
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
  }
];
const cards = [
  { icon: Compass, title: "Interests", body: "Full-stack development, mobile apps, UI/UX design, cloud systems, and emerging technologies like AI." },
  { icon: Target, title: "Goals", body: "To build impactful, scalable software products that solve real problems and contribute to meaningful digital experiences." }
];
function About() {
  return /* @__PURE__ */ jsx(Section, { id: "about", eyebrow: "About Me", title: "A look into my universe", subtitle: "Software engineer and Designer at heart, curious about how things work.", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.1fr_1fr]", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        className: "glass rounded-3xl p-8",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-muted-foreground", children: "I'm a Software Engineering undergraduate passionate about full-stack and mobile development, with hands-on experience building scalable, real-world applications. I enjoy working at the intersection of logic and creativity-where clean system design meets thoughtful user experience. Outside of coding, I explore design ideas, experiment with new technologies, and stay curious about how things work under the hood." }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: cards.map((c) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-primary/15 bg-primary/5 p-5", children: [
            /* @__PURE__ */ jsx(c.icon, { className: "size-5 text-secondary" }),
            /* @__PURE__ */ jsx("h3", { className: "mt-3 text-base font-semibold", children: c.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: c.body })
          ] }, c.title)) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent", "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(GraduationCap, { className: "size-4 text-secondary" }),
        " Education & journey"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-5", children: timeline.map((t, i) => /* @__PURE__ */ jsxs(
        motion.li,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          className: "relative pl-12",
          children: [
            /* @__PURE__ */ jsx("span", { className: "absolute left-2 top-1.5 size-4 rounded-full border-2 border-background bg-primary glow-primary" }),
            /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "flex size-10 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsx(t.icon, { className: "size-5 text-secondary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
                    /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: t.title }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary", children: t.year })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: t.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1 hover:text-secondary transition-colors group",
                      children: [
                        t.place,
                        /* @__PURE__ */ jsx(ExternalLink, { className: "size-3 opacity-0 group-hover:opacity-100 transition-opacity" })
                      ]
                    }
                  ) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground/90 pl-13", children: t.desc })
            ] })
          ]
        },
        t.year
      )) })
    ] })
  ] }) });
}
const CATS = [
  { id: "languages", label: "Languages", skills: [
    { name: "JavaScript", level: 94 },
    { name: "TypeScript", level: 85 },
    { name: "Python", level: 90 },
    { name: "Java", level: 92 },
    { name: "Kotlin", level: 90 },
    { name: "PHP", level: 95 },
    { name: "C++", level: 97 },
    { name: "C", level: 94 },
    { name: "R", level: 80 }
  ] },
  { id: "frontend", label: "Frontend", skills: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 88 },
    { name: "TypeScript", level: 92 },
    { name: "Tailwind CSS", level: 94 },
    { name: "HTML5", level: 100 },
    { name: "CSS3", level: 98 },
    { name: "Framer Motion", level: 90 }
  ] },
  { id: "backend", label: "Backend", skills: [
    { name: "Node.js", level: 90 },
    { name: "Express.js", level: 90 },
    { name: "Spring Boot", level: 80 },
    { name: "Python", level: 88 },
    { name: "REST APIs", level: 92 }
  ] },
  { id: "databases", label: "Databases", skills: [
    { name: "MySQL", level: 90 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 90 },
    { name: "SQLite", level: 85 }
  ] },
  { id: "cloud", label: "Cloud & DevOps", skills: [
    { name: "AWS", level: 88 },
    { name: "Docker", level: 90 },
    { name: "Kubernetes", level: 82 },
    { name: "CI/CD Pipelines", level: 86 },
    { name: "Git", level: 98 }
  ] },
  { id: "tools", label: "Tools & IDEs", skills: [
    { name: "VS Code", level: 95 },
    { name: "IntelliJ IDEA", level: 80 },
    { name: "Android Studio", level: 90 },
    { name: "Postman", level: 98 },
    { name: "Figma", level: 85 },
    { name: "Git", level: 98 },
    { name: "Docker", level: 75 },
    { name: "Eclipse", level: 98 },
    { name: "Maven", level: 81 }
  ] }
];
function Skills() {
  const [active, setActive] = useState(CATS[0].id);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const activeCat = CATS.find((c) => c.id === active);
  const radius = 180;
  const center = { x: 400, y: 250 };
  const nodes = activeCat.skills.map((skill, i) => {
    const angle = i / activeCat.skills.length * Math.PI * 2 - Math.PI / 2;
    return {
      ...skill,
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
      angle
    };
  });
  return /* @__PURE__ */ jsxs(Section, { id: "skills", eyebrow: "Skills", title: "My constellation of craft", subtitle: "A map of the technologies I navigate by.", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-10 flex flex-wrap justify-center gap-2", children: CATS.map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActive(cat.id),
        className: `rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${active === cat.id ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105" : "border-primary/20 bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"}`,
        children: cat.label
      },
      cat.id
    )) }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4 },
        className: "relative mx-auto flex justify-center",
        children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-4xl", children: [
          /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 800 500", className: "w-full", children: [
            /* @__PURE__ */ jsxs("defs", { children: [
              /* @__PURE__ */ jsxs("radialGradient", { id: "centerGlow", cx: "50%", cy: "50%", r: "50%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.7 0.16 265 / 30%)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.7 0.16 265 / 0%)" })
              ] }),
              /* @__PURE__ */ jsxs("linearGradient", { id: "lineGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.7 0.16 265)" }),
                /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.85 0.11 230)" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("circle", { cx: center.x, cy: center.y, r: "140", fill: "url(#centerGlow)" }),
            nodes.map((node, i) => /* @__PURE__ */ jsx(
              motion.line,
              {
                x1: center.x,
                y1: center.y,
                x2: node.x,
                y2: node.y,
                stroke: "url(#lineGrad)",
                strokeWidth: "1.5",
                strokeOpacity: "0.4",
                strokeDasharray: "6 4",
                initial: { pathLength: 0 },
                animate: { pathLength: 1 },
                transition: { duration: 0.6, delay: i * 0.03 }
              },
              `line-${i}`
            )),
            nodes.map(
              (a, i) => nodes.slice(i + 1).map((b, j) => /* @__PURE__ */ jsx(
                "line",
                {
                  x1: a.x,
                  y1: a.y,
                  x2: b.x,
                  y2: b.y,
                  stroke: "oklch(0.7 0.16 265 / 15%)",
                  strokeWidth: "0.8"
                },
                `net-${i}-${j}`
              ))
            ),
            /* @__PURE__ */ jsx(
              motion.circle,
              {
                cx: center.x,
                cy: center.y,
                r: "16",
                fill: "oklch(0.85 0.11 230)",
                initial: { scale: 0 },
                animate: { scale: 1 },
                transition: { duration: 0.5 }
              }
            ),
            /* @__PURE__ */ jsx("circle", { cx: center.x, cy: center.y, r: "32", fill: "oklch(0.7 0.16 265 / 20%)" }),
            /* @__PURE__ */ jsx("circle", { cx: center.x, cy: center.y, r: "48", fill: "oklch(0.7 0.16 265 / 10%)" })
          ] }),
          nodes.map((skill, i) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.4, delay: 0.2 + i * 0.05 },
              onMouseEnter: () => setHoveredSkill(skill.name),
              onMouseLeave: () => setHoveredSkill(null),
              style: {
                position: "absolute",
                left: `${skill.x / 800 * 100}%`,
                top: `${skill.y / 500 * 100}%`,
                transform: "translate(-50%, -50%)"
              },
              className: "group",
              children: [
                /* @__PURE__ */ jsx("div", { className: `relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border transition-all duration-300 ${hoveredSkill === skill.name ? "border-primary shadow-lg shadow-primary/30 scale-110" : "border-primary/30 group-hover:border-primary/60 group-hover:scale-105"}`, children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-foreground", children: skill.name.charAt(0) }) }),
                /* @__PURE__ */ jsx("div", { className: "absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-card/90 px-2.5 py-1 text-xs font-medium backdrop-blur-sm shadow-lg", children: skill.name }),
                hoveredSkill === skill.name && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 10 },
                    className: "absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap",
                    children: /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-card/95 px-4 py-2 backdrop-blur-md shadow-xl border border-primary/20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Proficiency" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-primary", children: [
                          skill.level,
                          "%"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "h-1.5 w-32 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          initial: { width: 0 },
                          animate: { width: `${skill.level}%` },
                          transition: { duration: 0.5 },
                          className: "h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        }
                      ) })
                    ] }) })
                  }
                )
              ]
            },
            skill.name
          ))
        ] })
      },
      active
    ) })
  ] });
}
const PROJECTS = [
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
  }
];
const TECH_STACK_CONFIG = {
  "MERN": { icon: Code2, color: "from-blue-500 to-cyan-500", label: "MERN Stack" },
  "Spring Boot": { icon: Leaf, color: "from-green-500 to-emerald-500", label: "Spring Boot" },
  "Other": { icon: Code2, color: "from-gray-500 to-gray-600", label: "Other Technologies" }
};
const CATEGORY_CONFIG = {
  "Web": { icon: Monitor, label: "Web Application", buttonLabel: "Live Demo" },
  "Mobile": { icon: Smartphone, label: "Mobile Application", buttonLabel: "View Demo" },
  "UI/UX": { icon: Palette, label: "UI/UX Design", buttonLabel: "Preview Design" }
};
function Projects() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [techFilter, setTechFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState(null);
  let filteredItems = PROJECTS.filter((p) => categoryFilter === "All" || p.category === categoryFilter);
  if (techFilter !== "All") {
    filteredItems = filteredItems.filter((p) => p.techStack === techFilter);
  }
  const showTechFilters = categoryFilter === "Web";
  const webProjects = PROJECTS.filter((p) => p.category === "Web");
  const availableTechStacks = showTechFilters ? ["All", ...new Set(webProjects.map((p) => p.techStack))] : [];
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    if (category !== "Web") {
      setTechFilter("All");
    }
  };
  return /* @__PURE__ */ jsxs(Section, { id: "projects", eyebrow: "Projects", title: "Where ideas become working systems", subtitle: "A few products and platforms I've helped bring to life.", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleCategoryChange("All"),
          className: `relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === "All" ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-primary/10"}`,
          children: "All Projects"
        }
      ),
      ["Web", "Mobile", "UI/UX"].map((cat) => {
        const Icon = CATEGORY_CONFIG[cat].icon;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleCategoryChange(cat),
            className: `relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${categoryFilter === cat ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-primary/10"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "size-4" }),
              cat
            ]
          },
          cat
        );
      })
    ] }),
    showTechFilters && availableTechStacks.length > 1 && /* @__PURE__ */ jsx("div", { className: "mb-10 flex flex-wrap justify-center gap-2 border-t border-border/50 pt-6", children: availableTechStacks.map((tech) => {
      if (tech === "All") {
        return /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setTechFilter(tech),
            className: `flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${techFilter === tech ? "bg-secondary/20 border-secondary text-secondary shadow-sm" : "bg-primary/5 border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
            children: "All Technologies"
          },
          tech
        );
      }
      const techConfig = TECH_STACK_CONFIG[tech];
      if (!techConfig) return null;
      const Icon = techConfig.icon;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setTechFilter(tech),
          className: `flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${techFilter === tech ? "bg-secondary/20 border-secondary text-secondary shadow-sm" : "bg-primary/5 border-primary/15 text-muted-foreground hover:text-foreground hover:border-primary/30"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "size-3" }),
            techConfig.label
          ]
        },
        tech
      );
    }) }),
    /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3", children: filteredItems.map((project, index) => {
      const CategoryIcon = CATEGORY_CONFIG[project.category].icon;
      const isMobileOrUIUX = project.category === "Mobile" || project.category === "UI/UX";
      const isWebProject = project.category === "Web";
      const techConfig = TECH_STACK_CONFIG[project.techStack];
      const TechIcon = techConfig?.icon || Code2;
      return /* @__PURE__ */ jsxs(
        motion.article,
        {
          layout: true,
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.5, delay: index % 3 * 0.1 },
          whileHover: { y: -8 },
          className: "group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5",
          children: [
            /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden ${isMobileOrUIUX ? "h-64 md:h-72 flex items-center justify-center bg-transparent" : "h-48 md:h-52 bg-gradient-to-br from-gray-900 to-gray-800"}`, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: project.image,
                  alt: project.title,
                  className: `transition-transform duration-500 group-hover:scale-105 ${isMobileOrUIUX ? "h-full w-auto object-contain mx-auto" : "h-full w-full object-cover"}`,
                  loading: "lazy"
                }
              ),
              isWebProject && techConfig && /* @__PURE__ */ jsxs("div", { className: `absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${techConfig.color} bg-black/90 backdrop-blur-sm px-2.5 py-1.5 text-xs font-medium text-white shadow-lg`, children: [
                /* @__PURE__ */ jsx(TechIcon, { className: "size-3" }),
                /* @__PURE__ */ jsx("span", { children: techConfig.label })
              ] }),
              !isMobileOrUIUX && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
              isMobileOrUIUX && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 md:p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx(CategoryIcon, { className: "size-4 text-secondary" }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold tracking-tight", children: project.title })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: project.desc }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setExpandedProject(expandedProject === project.title ? null : project.title),
                  className: "mt-3 flex items-center gap-1 text-xs font-medium text-secondary hover:text-primary transition-colors",
                  children: expandedProject === project.title ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(ChevronDown, { className: "size-3" }),
                    " Details"
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(ChevronRight, { className: "size-3" }),
                    " View key contributions"
                  ] })
                }
              ),
              expandedProject === project.title && /* @__PURE__ */ jsx(
                motion.ul,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  exit: { opacity: 0, height: 0 },
                  transition: { duration: 0.2 },
                  className: "mt-3 space-y-1.5 border-t border-border/50 pt-3",
                  children: project.detailedDesc.map((item, idx) => /* @__PURE__ */ jsxs("li", { className: "text-xs text-muted-foreground flex items-start gap-2 leading-relaxed", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-primary mt-0.5", children: "▹" }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ] }, idx))
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: project.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-secondary/10 border border-secondary/20 px-2 py-0.5 text-[10px] font-medium text-secondary", children: tag.trim() }, tag)) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-4 pt-3 border-t border-border/50", children: [
                project.github && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.github,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-primary group/btn",
                    children: [
                      /* @__PURE__ */ jsx(Github, { className: "size-3.5 transition-transform group-hover/btn:scale-110" }),
                      "Source Code"
                    ]
                  }
                ),
                project.figma && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.figma,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all hover:text-primary group/btn",
                    children: [
                      /* @__PURE__ */ jsx(Figma, { className: "size-3.5 transition-transform group-hover/btn:scale-110" }),
                      "Figma Design"
                    ]
                  }
                ),
                project.liveSite && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.liveSite,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition-all hover:text-primary group/btn",
                    children: [
                      /* @__PURE__ */ jsx(Globe, { className: "size-3 transition-transform group-hover/btn:scale-110" }),
                      "Live Site"
                    ]
                  }
                ),
                project.demo && !project.liveSite && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: project.demo,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "inline-flex items-center gap-1.5 text-xs font-medium text-secondary transition-all hover:text-primary group/btn",
                    children: [
                      /* @__PURE__ */ jsx(Play, { className: "size-3 transition-transform group-hover/btn:scale-110" }),
                      CATEGORY_CONFIG[project.category].buttonLabel
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/20" })
          ]
        },
        project.title
      );
    }) }),
    filteredItems.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "text-5xl mb-3", children: "🔍" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg", children: "No projects found with the selected filters" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mt-1", children: "Try adjusting the category or tech stack filters" })
    ] })
  ] });
}
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
  }
];
function Journey() {
  return /* @__PURE__ */ jsx(Section, { id: "journey", eyebrow: "Journey", title: "A timeline through space", subtitle: "Stops along the way.", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-4xl", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent md:left-1/2", "aria-hidden": true }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-10", children: ROLES.map((r, i) => /* @__PURE__ */ jsx(
      motion.li,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.08 },
        className: `relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div:first-child]:col-start-2" : ""}`,
        children: /* @__PURE__ */ jsxs("div", { className: `pl-12 md:pl-0 ${i % 2 ? "md:pl-12" : "md:pr-12 md:text-right"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "absolute left-2 top-1 size-4 rounded-full border-2 border-background bg-primary glow-primary md:left-1/2 md:-translate-x-1/2" }),
          /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 inline-flex items-center gap-2 text-xs text-secondary", children: [
              /* @__PURE__ */ jsx(r.icon, { className: `size-3.5 ${r.iconColor}` }),
              r.period
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: r.role }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: r.society }),
            r.desc && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground/90 italic", children: r.desc })
            ] })
          ] })
        ] })
      },
      r.period
    )) })
  ] }) });
}
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
  }
];
const SKILL_ICONS = {
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
  "Security": Shield
};
function Achievements() {
  const [filterType, setFilterType] = useState("all");
  const [searchSkill, setSearchSkill] = useState("");
  const filteredItems = ITEMS.filter((item) => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = searchSkill === "" || item.skills.some((skill) => skill.toLowerCase().includes(searchSkill.toLowerCase()));
    return matchesType && matchesSearch;
  });
  const getSkillIcon = (skill) => {
    const Icon = SKILL_ICONS[skill] || Code;
    return /* @__PURE__ */ jsx(Icon, { className: "size-2.5" });
  };
  return /* @__PURE__ */ jsxs(Section, { id: "achievements", eyebrow: "Achievements", title: "Stars I've collected", subtitle: "Recognitions, certifications and milestones from my learning journey.", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilterType("all"),
          className: `rounded-full border px-5 py-2 text-sm font-medium transition-all ${filterType === "all" ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105" : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"}`,
          children: "All Achievements"
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilterType("certification"),
          className: `rounded-full border px-5 py-2 text-sm font-medium transition-all flex items-center gap-2 ${filterType === "certification" ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105" : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"}`,
          children: [
            /* @__PURE__ */ jsx(Award, { className: "size-4" }),
            " Certifications"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setFilterType("badge"),
          className: `rounded-full border px-5 py-2 text-sm font-medium transition-all flex items-center gap-2 ${filterType === "badge" ? "border-primary bg-primary text-primary-foreground shadow-lg scale-105" : "border-primary/20 bg-primary/5 text-muted-foreground hover:text-foreground hover:bg-primary/10"}`,
          children: [
            /* @__PURE__ */ jsx(Medal, { className: "size-4" }),
            " Badges"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Search by skill (e.g., Python, LLM, RAG, MongoDB)...",
          value: searchSkill,
          onChange: (e) => setSearchSkill(e.target.value),
          className: "w-full rounded-full border border-primary/20 bg-background/40 py-2.5 pl-9 pr-8 text-sm outline-none transition-colors focus:border-primary"
        }
      ),
      searchSkill && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSearchSkill(""),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
          children: /* @__PURE__ */ jsx(X, { className: "size-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "size-3" }),
      filteredItems.length,
      " achievement",
      filteredItems.length !== 1 ? "s" : "",
      " found"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filteredItems.map((it, i) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i % 3 * 0.08 },
        whileHover: { y: -5, scale: 1.02 },
        className: "group relative overflow-hidden rounded-2xl glass p-5 transition-all duration-300 hover:shadow-xl hover:border-primary/30",
        children: [
          /* @__PURE__ */ jsxs("div", { className: `absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm flex items-center gap-1 ${it.type === "certification" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-purple-500/20 text-purple-400 border border-purple-500/30"}`, children: [
            it.type === "certification" ? /* @__PURE__ */ jsx(Award, { className: "size-3" }) : /* @__PURE__ */ jsx(Medal, { className: "size-3" }),
            it.type === "certification" ? "Certification" : "Badge"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative mb-4 inline-flex", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all group-hover:bg-primary/40" }),
            /* @__PURE__ */ jsx("div", { className: "relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 ring-1 ring-primary/40", children: /* @__PURE__ */ jsx(it.icon, { className: "size-6 text-secondary" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground text-base", children: it.title }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-secondary whitespace-nowrap bg-secondary/10 px-2 py-0.5 rounded-full", children: it.year })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: it.issuer }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: it.skills.map((skill) => /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-secondary", children: [
            getSkillIcon(skill),
            skill
          ] }, skill)) }),
          it.credentialId && /* @__PURE__ */ jsx("div", { className: "mt-3 pt-2 border-t border-border/30", children: /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground/60 font-mono", children: [
            "ID: ",
            it.credentialId
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition-all duration-300 group-hover:ring-primary/20" })
        ]
      },
      it.title
    )) }),
    filteredItems.length === 0 && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-12",
        children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4", children: /* @__PURE__ */ jsx(Search, { className: "size-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: "No achievements found" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground/70 mt-1", children: "Try a different search term or category" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => {
                setSearchSkill("");
                setFilterType("all");
              },
              className: "mt-4 rounded-full bg-primary/20 px-4 py-1.5 text-sm text-secondary hover:bg-primary/30 transition-colors",
              children: "Clear all filters"
            }
          )
        ]
      }
    )
  ] });
}
const FORMSPREE_ID = "mbdednvo";
const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(1e3)
});
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const onSubmit = async (e) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const fe = {};
      r.error.issues.forEach((i) => {
        fe[i.path[0]] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _replyto: form.email
        })
      });
      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5e3);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5e3);
    }
  };
  return /* @__PURE__ */ jsx(Section, { id: "contact", eyebrow: "Contact", title: "Let's build beyond the horizon", subtitle: "Got a project, role or idea? My inbox is always open.", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[1fr_1.2fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Find me across the universe" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Reach out anywhere below - I usually reply within a day." }),
      /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3 text-sm", children: [
        { icon: Mail, label: "shainijayakody8@gmail.com", href: "mailto:shainijayakody8@gmail.com" },
        { icon: Linkedin, label: "linkedin.com/in/shaini-jayakody", href: "https://www.linkedin.com/in/shaini-jayakody-6a9197377" },
        { icon: Github, label: "github.com/Shaini-Jayakody", href: "https://github.com/Shaini-Jayakody" }
      ].map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "a",
        {
          href: l.href,
          target: "_blank",
          rel: "noreferrer",
          className: "group flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 transition-colors hover:border-primary/40",
          children: [
            /* @__PURE__ */ jsx(l.icon, { className: "size-4 text-secondary" }),
            /* @__PURE__ */ jsx("span", { className: "text-foreground/90 group-hover:text-foreground", children: l.label })
          ]
        }
      ) }, l.label)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 rounded-xl bg-primary/5 p-4 border border-primary/10", children: /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Based in Sri Lanka | Available for remote work" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "glass rounded-3xl p-8", noValidate: true, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx(
          Field,
          {
            id: "name",
            label: "Your name",
            value: form.name,
            onChange: (v) => setForm((s) => ({ ...s, name: v })),
            error: errors.name,
            disabled: status === "loading"
          }
        ),
        /* @__PURE__ */ jsx(
          Field,
          {
            id: "email",
            type: "email",
            label: "Email",
            value: form.email,
            onChange: (v) => setForm((s) => ({ ...s, email: v })),
            error: errors.email,
            disabled: status === "loading"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Message" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            id: "message",
            rows: 5,
            value: form.message,
            onChange: (e) => setForm((s) => ({ ...s, message: e.target.value })),
            disabled: status === "loading",
            className: "mt-2 w-full resize-none rounded-2xl border border-primary/20 bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50",
            placeholder: "Tell me about your project, role or idea…"
          }
        ),
        errors.message && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: errors.message })
      ] }),
      status === "error" && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive",
          children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "size-4" }),
            "Failed to send message. Please try again or email me directly."
          ]
        }
      ),
      status === "success" && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          className: "mt-4 flex items-center gap-2 rounded-xl bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400",
          children: [
            /* @__PURE__ */ jsx(Check, { className: "size-4" }),
            "Message sent successfully! I'll get back to you soon."
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.button,
        {
          type: "submit",
          disabled: status === "loading",
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          className: "group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-primary disabled:opacity-60 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ jsx("span", { className: "relative z-10 inline-flex items-center gap-2", children: status === "success" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "size-4" }),
              " Sent — talk soon!"
            ] }) : status === "loading" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
              "Sending..."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Send, { className: "size-4 transition-transform group-hover:translate-x-0.5" }),
              " Send Message"
            ] }) }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 -z-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity group-hover:opacity-100 animate-shimmer" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-center text-[10px] text-muted-foreground", children: "Your message will be sent directly to my email. I never share your information." })
    ] })
  ] }) });
}
function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  disabled = false
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { htmlFor: id, className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx(
      "input",
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        disabled,
        className: `mt-2 w-full rounded-2xl border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50 ${error ? "border-destructive focus:border-destructive" : "border-primary/20"}`
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-destructive", children: error })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "relative border-t border-primary/10 py-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-primary" }),
      /* @__PURE__ */ jsx("span", { children: "Shining Star · Exploring new worlds through code." })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " All rights reserved."
    ] })
  ] }) });
}
function Loader() {
  const starPts = [
    [200, 50],
    // outer top
    [235, 151],
    // inner
    [343, 154],
    // outer top-right
    [257, 218],
    // inner
    [288, 321],
    // outer bottom-right
    [200, 260],
    // inner
    [112, 321],
    // outer bottom-left
    [143, 218],
    // inner
    [57, 154],
    // outer top-left
    [165, 151]
    // inner
  ];
  const starPath = starPts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
  const crossLinks = [
    [0, 5],
    [2, 7],
    [4, 9],
    [6, 1],
    [8, 3],
    [1, 9],
    [3, 5],
    [5, 7]
  ];
  const ribbons = [
    { d: "M 305,75 C 255,30 155,30 125,100 C 100,160 225,205 250,270 C 270,325 180,365 100,330", color: "oklch(0.7 0.16 265)", w: 2.2, glow: "oklch(0.7 0.16 265 / 60%)" },
    { d: "M 290,85 C 245,45 160,45 132,108 C 110,165 222,210 242,268 C 260,320 175,355 105,325", color: "oklch(0.85 0.11 230)", w: 2.6, glow: "oklch(0.85 0.11 230 / 60%)" },
    { d: "M 275,95 C 235,60 165,60 140,115 C 120,168 220,215 235,265 C 250,315 170,348 110,320", color: "oklch(0.6 0.18 255)", w: 3, glow: "oklch(0.6 0.18 255 / 70%)" },
    { d: "M 260,108 C 225,78 172,75 148,122 C 130,170 216,220 228,262 C 240,308 168,340 115,315", color: "oklch(0.7 0.16 265)", w: 2.4, glow: "oklch(0.7 0.16 265 / 60%)" },
    { d: "M 245,122 C 215,98 180,95 156,128 C 140,170 212,224 222,260 C 232,300 165,332 118,310", color: "oklch(0.85 0.11 230)", w: 1.6, glow: "oklch(0.85 0.11 230 / 50%)" }
  ];
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
      className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 rounded-full blur-3xl",
              style: { background: "radial-gradient(circle, oklch(0.7 0.16 265 / 45%), transparent 70%)" },
              animate: { scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] },
              transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              width: "320",
              height: "320",
              viewBox: "0 0 400 400",
              className: "relative overflow-visible",
              fill: "none",
              children: [
                /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: starPath,
                    stroke: "oklch(0.7 0.16 265)",
                    strokeWidth: "1.2",
                    strokeOpacity: "0.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 0.8 },
                    transition: { duration: 0.8, ease: "easeOut" },
                    style: { filter: "drop-shadow(0 0 4px oklch(0.7 0.16 265 / 60%))" }
                  }
                ),
                crossLinks.map(([a, b], i) => /* @__PURE__ */ jsx(
                  motion.line,
                  {
                    x1: starPts[a][0],
                    y1: starPts[a][1],
                    x2: starPts[b][0],
                    y2: starPts[b][1],
                    stroke: "oklch(0.85 0.11 230)",
                    strokeWidth: "0.8",
                    strokeOpacity: "0.5",
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 0.5 },
                    transition: { duration: 0.4, delay: 0.6 + i * 0.03, ease: "easeOut" }
                  },
                  `cl-${i}`
                )),
                starPts.map((p, i) => /* @__PURE__ */ jsx(
                  motion.circle,
                  {
                    cx: p[0],
                    cy: p[1],
                    r: i % 2 === 0 ? 4 : 2.5,
                    fill: i % 2 === 0 ? "oklch(0.7 0.16 265)" : "oklch(0.85 0.11 230)",
                    initial: { opacity: 0, scale: 0 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.2 + i * 0.04, duration: 0.25, ease: "backOut" },
                    style: {
                      filter: `drop-shadow(0 0 6px ${i % 2 === 0 ? "oklch(0.7 0.16 265)" : "oklch(0.85 0.11 230)"})`
                    }
                  },
                  `sn-${i}`
                )),
                ribbons.map((r, i) => /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: r.d,
                    stroke: r.color,
                    strokeWidth: r.w,
                    strokeLinecap: "round",
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: {
                      duration: 0.9,
                      delay: 0.8 + i * 0.08,
                      ease: [0.65, 0, 0.35, 1]
                    },
                    style: { filter: `drop-shadow(0 0 5px ${r.glow})` }
                  },
                  `r-${i}`
                ))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.p,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.6, duration: 0.5 },
            className: "mt-8 font-display text-lg tracking-wide text-muted-foreground",
            children: [
              "Welcome to Shining Star's universe",
              /* @__PURE__ */ jsx(
                motion.span,
                {
                  animate: { opacity: [0, 1, 0] },
                  transition: { duration: 1, repeat: Infinity },
                  children: "..."
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function Index() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AnimatePresence, { children: loading && /* @__PURE__ */ jsx(Loader, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 -z-10 opacity-60", children: /* @__PURE__ */ jsx(StarsBackground, { density: 0.8 }) }),
      /* @__PURE__ */ jsxs("main", { children: [
        /* @__PURE__ */ jsx(Navbar, { theme, toggleTheme: () => setTheme((t) => t === "dark" ? "light" : "dark") }),
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(About, {}),
        /* @__PURE__ */ jsx(Projects, {}),
        /* @__PURE__ */ jsx(Skills, {}),
        /* @__PURE__ */ jsx(Achievements, {}),
        /* @__PURE__ */ jsx(Journey, {}),
        /* @__PURE__ */ jsx(Contact, {}),
        /* @__PURE__ */ jsx(Footer, {})
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      ` })
  ] });
}
export {
  Index as component
};
