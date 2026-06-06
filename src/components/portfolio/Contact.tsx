import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, Send, Twitter, Check } from "lucide-react";
import { Section } from "./Section";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(1000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const fe: typeof errors = {};
      r.error.issues.forEach(i => { fe[i.path[0] as keyof typeof form] = i.message; });
      setErrors(fe);
      return;
    }
    setErrors({});
    setBusy(true);
    setTimeout(() => { setBusy(false); setSent(true); setForm({ name: "", email: "", message: "" }); }, 900);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something stellar" subtitle="Got a project, role or idea? My inbox is always open.">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="glass rounded-3xl p-8">
          <h3 className="text-xl font-semibold">Find me across the universe</h3>
          <p className="mt-2 text-sm text-muted-foreground">Prefer a different channel? Reach out anywhere below — I usually reply within a day.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              { icon: Mail, label: "hello@shiningstar.dev", href: "mailto:hello@shiningstar.dev" },
              { icon: Linkedin, label: "linkedin.com/in/shiningstar", href: "#" },
              { icon: Github, label: "github.com/shiningstar", href: "#" },
              { icon: Twitter, label: "@shiningstar", href: "#" },
            ].map(l => (
              <li key={l.label}>
                <a href={l.href} className="group flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 transition-colors hover:border-primary/40">
                  <l.icon className="size-4 text-secondary" />
                  <span className="text-foreground/90 group-hover:text-foreground">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="glass rounded-3xl p-8" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Your name" value={form.name} onChange={v => setForm(s => ({ ...s, name: v }))} error={errors.name} />
            <Field id="email" type="email" label="Email" value={form.email} onChange={v => setForm(s => ({ ...s, email: v }))} error={errors.email} />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-xs uppercase tracking-wider text-muted-foreground">Message</label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={e => setForm(s => ({ ...s, message: e.target.value }))}
              className="mt-2 w-full resize-none rounded-2xl border border-primary/20 bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              placeholder="Tell me about your project, role or idea…"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <motion.button
            type="submit"
            disabled={busy || sent}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow-primary disabled:opacity-60"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {sent ? <><Check className="size-4" /> Sent — talk soon!</> : busy ? "Sending…" : <><Send className="size-4 transition-transform group-hover:translate-x-0.5" /> Launch message</>}
            </span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] opacity-0 transition-opacity group-hover:opacity-100 [animation:shimmer_2s_linear_infinite]" />
          </motion.button>
        </form>
      </div>
    </Section>
  );
}

function Field({ id, label, value, onChange, type = "text", error }: { id: string; label: string; value: string; onChange: (v: string) => void; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-primary/20 bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
