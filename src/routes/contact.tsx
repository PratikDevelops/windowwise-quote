import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Luminae — Talk to a Window Specialist" },
      {
        name: "description",
        content: "Reach our team for a free consultation, site visit, or quote. Bengaluru, Mumbai, Hyderabad, Pune.",
      },
      { property: "og:title", content: "Contact Luminae" },
      { property: "og:description", content: "Talk to a UPVC window specialist." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", form);
    setSent(true);
  };

  return (
    <section className="container-x py-12 lg:py-20">
      <span className="text-xs uppercase tracking-[0.18em] text-brand">Contact</span>
      <h1 className="mt-2 font-display text-5xl sm:text-6xl max-w-2xl">
        Let's talk about your home.
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Whether you have a single window to replace or a whole project, we'd
        love to help. Expect a reply within one business day.
      </p>

      <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div className="space-y-4">
          {[
            { icon: Phone, k: "Call", v: "+91 99999 00000", href: "tel:+919999900000" },
            { icon: Mail, k: "Email", v: "hello@luminae.in", href: "mailto:hello@luminae.in" },
            { icon: MapPin, k: "Studio", v: "224, Industrial Area, Phase 2, Bengaluru 560058" },
          ].map((c) => (
            <a
              key={c.k}
              href={c.href}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover:shadow-soft transition-shadow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-soft text-brand">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.k}</div>
                <div className="mt-0.5 font-medium">{c.v}</div>
              </div>
            </a>
          ))}

          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-surface relative">
            <div className="absolute inset-0 grid place-items-center text-muted-foreground text-sm">
              <div className="text-center">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-brand" />
                <div>Map placeholder</div>
                <div className="text-xs">12.978° N, 77.516° E</div>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft">
          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-2xl">Message sent</h3>
              <p className="mt-2 text-muted-foreground">We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h3 className="font-display text-2xl">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <FormField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </div>
              <FormField label="Email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div>
                <label className="text-xs font-medium text-muted-foreground">Message</label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow transition-all"
              >
                Send message <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, value, onChange, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
