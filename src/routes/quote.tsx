import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Bed,
  UtensilsCrossed,
  Bath,
  Building2,
  Sparkles,
} from "lucide-react";
import { products, COLOR_SWATCHES, formatINR, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Quote — Guided Wizard | Luminae" },
      {
        name: "description",
        content:
          "Build your custom UPVC window quote in under 2 minutes. Step-by-step: room, type, size, glass, color, and contact.",
      },
      { property: "og:title", content: "Build your UPVC window quote — Luminae" },
      { property: "og:description", content: "A guided 2-minute quote wizard." },
    ],
  }),
  component: QuoteWizard,
});

const ROOMS = [
  { id: "living", label: "Living Room", icon: Home, hint: "Large openings, daylight" },
  { id: "bedroom", label: "Bedroom", icon: Bed, hint: "Quiet & private" },
  { id: "kitchen", label: "Kitchen", icon: UtensilsCrossed, hint: "Ventilation matters" },
  { id: "bath", label: "Bathroom", icon: Bath, hint: "Frosted privacy glass" },
  { id: "office", label: "Office / Other", icon: Building2, hint: "Acoustic comfort" },
] as const;

const STEPS = ["Room", "Type", "Size", "Glass", "Color", "Contact"] as const;

interface State {
  room: string;
  product: Product;
  width: number;
  height: number;
  glass: string;
  color: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const initial: State = {
  room: "",
  product: products[0],
  width: 1200,
  height: 1500,
  glass: products[0].glass[1] ?? products[0].glass[0],
  color: products[0].colors[0],
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

function QuoteWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [s, setS] = useState<State>(initial);
  const [done, setDone] = useState(false);

  const update = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  const setProduct = (p: Product) =>
    setS((prev) => ({
      ...prev,
      product: p,
      glass: p.glass.includes(prev.glass) ? prev.glass : p.glass[1] ?? p.glass[0],
      color: p.colors.includes(prev.color) ? prev.color : p.colors[0],
    }));

  const sqft = useMemo(() => (s.width * s.height) / 92903, [s.width, s.height]);
  const glassMult = s.glass.toLowerCase().includes("triple")
    ? 1.6
    : s.glass.toLowerCase().match(/acoustic|low-e/) ? 1.3
    : s.glass.toLowerCase().match(/toughened|solar/) ? 1.25
    : s.glass.toLowerCase().includes("double") ? 1.15
    : 1;
  const estimate = Math.round(sqft * s.product.baseRate * 600 * glassMult);

  const canProceed =
    step === 0 ? !!s.room :
    step === 1 ? !!s.product :
    step === 2 ? s.width >= 400 && s.height >= 400 :
    step === 3 ? !!s.glass :
    step === 4 ? !!s.color :
    step === 5 ? !!s.name && !!s.phone && !!s.email :
    false;

  const next = () => setStep((v) => Math.min(STEPS.length - 1, v + 1));
  const back = () => (step === 0 ? navigate({ to: "/" }) : setStep((v) => v - 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wizard quote:", { ...s, estimatedPrice: estimate });
    setDone(true);
  };

  if (done) return <DonePanel name={s.name} />;

  return (
    <section className="container-x py-8 sm:py-10 lg:py-16">
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-14 items-start">
        {/* Main flow */}
        <div className="lg:min-h-[520px] order-2 lg:order-1">
          <Stepper step={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-10"
            >
              {step === 0 && (
                <Step
                  eyebrow="Step 1"
                  title="Where will the windows go?"
                  hint="This helps us recommend the right product."
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ROOMS.map((r) => {
                      const active = s.room === r.id;
                      return (
                        <OptionCard
                          key={r.id}
                          active={active}
                          onClick={() => update("room", r.id)}
                        >
                          <r.icon className={cn("h-5 w-5", active ? "text-brand" : "text-muted-foreground")} />
                          <div className="mt-3 font-medium">{r.label}</div>
                          <div className="text-xs text-muted-foreground">{r.hint}</div>
                        </OptionCard>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step eyebrow="Step 2" title="Pick a window system" hint="You can change this later.">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {products.map((p) => {
                      const active = s.product.slug === p.slug;
                      return (
                        <OptionCard key={p.slug} active={active} onClick={() => setProduct(p)} className="!p-0 overflow-hidden">
                          <div className="flex gap-4 p-4">
                            <img src={p.image} alt={p.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase tracking-wider text-brand">{p.typeLabel}</div>
                              <div className="font-medium truncate">{p.name}</div>
                              <div className="text-xs text-muted-foreground line-clamp-2">{p.shortSpec}</div>
                            </div>
                          </div>
                        </OptionCard>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step eyebrow="Step 3" title="Approximate size" hint="In millimeters. We'll measure precisely on site.">
                  <div className="grid sm:grid-cols-2 gap-4 max-w-md">
                    <SliderField label="Width" value={s.width} onChange={(v) => update("width", v)} min={400} max={3000} step={50} suffix="mm" />
                    <SliderField label="Height" value={s.height} onChange={(v) => update("height", v)} min={400} max={3000} step={50} suffix="mm" />
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm">
                    <Sparkles className="h-4 w-4 text-brand" />
                    {sqft.toFixed(1)} sq.ft area
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step eyebrow="Step 4" title="Choose your glass" hint="Better glass = quieter rooms and lower bills.">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {s.product.glass.map((g) => {
                      const active = s.glass === g;
                      return (
                        <OptionCard key={g} active={active} onClick={() => update("glass", g)}>
                          <div className="font-medium">{g}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {g.toLowerCase().includes("triple") && "Maximum thermal & acoustic performance"}
                            {g.toLowerCase().includes("acoustic") && "Best-in-class sound reduction"}
                            {g.toLowerCase().includes("low-e") && "Reflects heat, keeps interiors cool"}
                            {g.toLowerCase().includes("toughened") && "5× stronger, safety glass"}
                            {g.toLowerCase().includes("frosted") && "Privacy with diffused light"}
                            {g.toLowerCase().includes("solar") && "Cuts solar heat gain"}
                            {g.toLowerCase().match(/^double/) && "Standard insulated glazing"}
                            {g.toLowerCase().includes("single") && "Budget-friendly basic glazing"}
                          </div>
                        </OptionCard>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 4 && (
                <Step eyebrow="Step 5" title="Frame color" hint="UV-stable finish with a 10-year colorfast guarantee.">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {s.product.colors.map((c) => {
                      const active = s.color === c;
                      return (
                        <OptionCard key={c} active={active} onClick={() => update("color", c)}>
                          <div
                            className="h-14 w-full rounded-lg border border-border"
                            style={{ backgroundColor: COLOR_SWATCHES[c] }}
                          />
                          <div className="mt-3 font-medium">{c}</div>
                        </OptionCard>
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 5 && (
                <Step eyebrow="Final step" title="Where should we send the quote?" hint="No spam — one specialist will call within 24 hours.">
                  <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2 max-w-2xl">
                    <Input label="Full name" required value={s.name} onChange={(v) => update("name", v)} />
                    <Input label="Phone" required type="tel" value={s.phone} onChange={(v) => update("phone", v)} />
                    <Input label="Email" required type="email" value={s.email} onChange={(v) => update("email", v)} className="sm:col-span-2" />
                    <Input label="Address (optional)" value={s.address} onChange={(v) => update("address", v)} className="sm:col-span-2" />
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium text-muted-foreground">Notes</label>
                      <textarea
                        rows={3}
                        value={s.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        placeholder="Number of windows, timeline, special requests…"
                        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow transition-all"
                    >
                      Submit Quote Request <Check className="h-4 w-4" />
                    </button>
                  </form>
                </Step>
              )}
            </motion.div>
          </AnimatePresence>

          {step < STEPS.length - 1 && (
            <div className="mt-12 flex items-center justify-between">
              <button
                onClick={back}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-surface transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={next}
                disabled={!canProceed}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-soft"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Live summary */}
        <SummaryPanel s={s} estimate={estimate} sqft={sqft} />
      </div>
    </section>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className={cn(
                  "flex items-center gap-2 transition-opacity",
                  active ? "opacity-100" : done ? "opacity-100" : "opacity-50",
                )}
              >
                <div
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-xs font-medium border transition-colors",
                    done && "bg-brand text-brand-foreground border-brand",
                    active && "bg-foreground text-background border-foreground",
                    !done && !active && "bg-card border-border text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className="hidden sm:inline text-xs font-medium">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("h-px flex-1", done ? "bg-brand" : "bg-border")} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step({
  eyebrow, title, hint, children,
}: {
  eyebrow: string; title: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-xs uppercase tracking-[0.18em] text-brand">{eyebrow}</span>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl text-balance">{title}</h1>
      {hint && <p className="mt-2 text-muted-foreground">{hint}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

function OptionCard({
  active, onClick, children, className,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative text-left rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-soft",
        active ? "border-foreground shadow-soft" : "border-border",
        className,
      )}
    >
      {active && (
        <span className="absolute top-3 right-3 grid h-5 w-5 place-items-center rounded-full bg-brand text-brand-foreground">
          <Check className="h-3 w-3" />
        </span>
      )}
      {children}
    </button>
  );
}

function SliderField({
  label, value, onChange, min, max, step, suffix,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground">{label}</label>
        <span className="text-sm font-medium">{value} {suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--brand)]"
      />
      <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
        <span>{min}</span><span>{max}</span>
      </div>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", required, className,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; className?: string;
}) {
  return (
    <div className={className}>
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

function SummaryPanel({
  s, estimate, sqft,
}: {
  s: State; estimate: number; sqft: number;
}) {
  const room = ROOMS.find((r) => r.id === s.room)?.label;
  return (
    <aside className="lg:sticky lg:top-28 rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
      <div className="aspect-[4/3] bg-surface relative overflow-hidden">
        <img src={s.product.image} alt={s.product.name} className="h-full w-full object-cover transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div
          className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-medium border border-border"
        >
          <span
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: COLOR_SWATCHES[s.color] }}
          />
          {s.color}
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-display text-lg">{s.product.name}</div>
          <span className="text-[10px] uppercase tracking-wider text-brand">{s.product.typeLabel}</span>
        </div>
        <dl className="text-sm space-y-1.5">
          {room && <Row k="Room" v={room} />}
          <Row k="Size" v={`${s.width} × ${s.height} mm`} />
          <Row k="Area" v={`${sqft.toFixed(1)} sq.ft`} />
          <Row k="Glass" v={s.glass} />
          <Row k="Color" v={s.color} />
        </dl>
        <div className="pt-4 border-t border-border">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Estimated price</div>
          <div className="mt-1 font-display text-3xl">₹ {formatINR(estimate)}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">incl. installation · indicative</div>
        </div>
      </div>
    </aside>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-right truncate max-w-[60%]">{v}</dd>
    </div>
  );
}

function DonePanel({ name }: { name: string }) {
  return (
    <section className="container-x py-24 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-soft text-brand">
        <Check className="h-7 w-7" />
      </div>
      <h1 className="mt-6 font-display text-4xl sm:text-5xl">Quote request received</h1>
      <p className="mt-3 max-w-xl mx-auto text-muted-foreground">
        Thanks {name || "there"} — a Luminae specialist will review your
        configuration and call you within 24 hours with a precise quote.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium">
          Back to home
        </Link>
        <Link to="/products" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-surface">
          Explore more windows
        </Link>
      </div>
    </section>
  );
}
