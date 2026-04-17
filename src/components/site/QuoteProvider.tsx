import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { X, Check } from "lucide-react";
import { formatINR } from "@/data/products";

export interface QuoteConfig {
  productName?: string;
  type?: string;
  width?: number;
  height?: number;
  glass?: string;
  color?: string;
  estimatedPrice?: number;
}

interface QuoteCtx {
  openQuote: (config?: QuoteConfig) => void;
}

const Ctx = createContext<QuoteCtx | null>(null);

export function useQuote() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useQuote must be used inside QuoteProvider");
  return c;
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<QuoteConfig>({});
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", notes: "" });

  const openQuote = useCallback((c: QuoteConfig = {}) => {
    setConfig(c);
    setSubmitted(false);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request:", { ...form, config });
    setSubmitted(true);
  };

  return (
    <Ctx.Provider value={{ openQuote }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-ink/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full sm:max-w-2xl bg-card text-card-foreground rounded-t-2xl sm:rounded-2xl shadow-card max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-surface transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {submitted ? (
              <div className="p-10 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-soft text-brand">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-2xl">Request received</h3>
                <p className="mt-2 text-muted-foreground text-sm">
                  Thanks {form.name || "there"} — our specialist will call you within 24 hours
                  with a detailed quote.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="text-xs uppercase tracking-[0.18em] text-brand">Free Quote</div>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl">
                  Tell us about your project
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get a tailored quotation within 24 hours. No obligation. Prefer a guided flow?{" "}
                  <a href="/quote" className="text-brand underline underline-offset-2">
                    Try our quote wizard →
                  </a>
                </p>

                {(config.productName || config.width) && (
                  <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-sm">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Your configuration
                    </div>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {config.productName && <Row k="Product" v={config.productName} />}
                      {config.type && <Row k="Type" v={config.type} />}
                      {config.width && config.height && (
                        <Row k="Size" v={`${config.width} × ${config.height} mm`} />
                      )}
                      {config.glass && <Row k="Glass" v={config.glass} />}
                      {config.color && <Row k="Frame" v={config.color} />}
                      {typeof config.estimatedPrice === "number" && (
                        <Row k="Estimate" v={`₹ ${formatINR(config.estimatedPrice)}`} />
                      )}
                    </div>
                  </div>
                )}

                <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" required value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })} />
                  <Field label="Phone" required type="tel" value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })} />
                  <Field label="Email" required type="email" value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })} className="sm:col-span-2" />
                  <Field label="Address" value={form.address}
                    onChange={(v) => setForm({ ...form, address: v })} className="sm:col-span-2" />
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">
                      Additional notes
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                      placeholder="Number of windows, timeline, site address..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="sm:col-span-2 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow transition-all"
                  >
                    Request Quote
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}

function Field({
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
