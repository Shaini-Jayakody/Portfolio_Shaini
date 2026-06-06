import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, Send, Check, AlertCircle } from "lucide-react";
import { Section } from "./Section";


const FORMSPREE_ID = "mbdednvo"; 

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(1000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const r = schema.safeParse(form);
    if (!r.success) {
      const fe: typeof errors = {};
      r.error.issues.forEach(i => { fe[i.path[0] as keyof typeof form] = i.message; });
      setErrors(fe);
      return;
    }
    
    setErrors({});
    setStatus("loading");
    
    try {
      // Send to Formspree
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
          _replyto: form.email,
        }),
      });
      
      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Formspree error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build beyond the horizon" subtitle="Got a project, role or idea? My inbox is always open.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Contact Info Card */}
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-semibold">Find me across the universe</h3>
          <p className="mt-2 text-sm text-muted-foreground">Reach out anywhere below - I usually reply within a day.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { icon: Mail, label: "shainijayakody8@gmail.com", href: "mailto:shainijayakody8@gmail.com" },
              { icon: Linkedin, label: "linkedin.com/in/shaini-jayakody-6a9197377", href: "https://www.linkedin.com/in/shaini-jayakody-6a9197377" },
              { icon: Github, label: "github.com/Shaini-Jayakody", href: "https://github.com/Shaini-Jayakody" },
            ].map(l => (
              <li key={l.label}>
                <a 
                  href={l.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="group flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 transition-colors hover:border-primary/40"
                >
                  <l.icon className="size-4 text-secondary" />
                  <span className="text-foreground/90 group-hover:text-foreground">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Additional Info */}
          <div className="mt-6 rounded-xl bg-primary/5 p-4 border border-primary/10">
            <p className="text-xs text-muted-foreground mt-1">
              Based in Sri Lanka | Available for remote work
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={onSubmit} className="glass rounded-3xl p-8" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field 
              id="name" 
              label="Your name" 
              value={form.name} 
              onChange={v => setForm(s => ({ ...s, name: v }))} 
              error={errors.name}
              disabled={status === "loading"}
            />
            <Field 
              id="email" 
              type="email" 
              label="Email" 
              value={form.email} 
              onChange={v => setForm(s => ({ ...s, email: v }))} 
              error={errors.email}
              disabled={status === "loading"}
            />
          </div>
          
          <div className="mt-4">
            <label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
              disabled={status === "loading"}
              className="mt-2 w-full resize-none rounded-2xl border border-primary/20 bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50"
              placeholder="Tell me about your project, role or idea…"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          
          {/* Error Message */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertCircle className="size-4" />
              Failed to send message. Please try again or email me directly.
            </motion.div>
          )}
          
          {/* Success Message */}
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center gap-2 rounded-xl bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400"
            >
              <Check className="size-4" />
              Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          
          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {status === "success" ? (
                <><Check className="size-4" /> Sent — talk soon!</>
              ) : status === "loading" ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending...
                </>
              ) : (
                <><Send className="size-4 transition-transform group-hover:translate-x-0.5" /> Send Message</>
              )}
            </span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity group-hover:opacity-100 animate-shimmer" />
          </motion.button>
          
          <p className="mt-4 text-center text-[10px] text-muted-foreground">
            Your message will be sent directly to my email. I never share your information.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Field({ 
  id, 
  label, 
  value, 
  onChange, 
  type = "text", 
  error,
  disabled = false
}: { 
  id: string; 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  type?: string; 
  error?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        className={`mt-2 w-full rounded-2xl border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary disabled:opacity-50 ${
          error ? 'border-destructive focus:border-destructive' : 'border-primary/20'
        }`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}