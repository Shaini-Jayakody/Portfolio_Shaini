import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Loader } from "@/components/portfolio/Loader";
import { StarsBackground } from "@/components/portfolio/StarsBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shining Star — Software Engineer Portfolio" },
      { name: "description", content: "Portfolio of a software engineer crafting modern web, cloud and AI experiences. Explore projects, skills and achievements." },
      { property: "og:title", content: "Shining Star — Software Engineer Portfolio" },
      { property: "og:description", content: "Modern, cosmic-themed portfolio of a full-stack software engineer." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
          <StarsBackground density={0.8} />
        </div>
        <main>
          <Navbar theme={theme} toggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Achievements />
          <Journey />
          <Contact />
          <Footer />
        </main>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </>
  );
}
