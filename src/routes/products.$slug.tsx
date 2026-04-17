import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Minus, Plus, Sparkles } from "lucide-react";
import { products, formatINR, COLOR_SWATCHES } from "@/data/products";
import { useQuote } from "@/components/site/QuoteProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — Luminae UPVC Windows` : "Window — Luminae" },
        {
          name: "description",
          content: p?.description ?? "Custom UPVC window from Luminae.",
        },
        { property: "og:title", content: p ? `${p.name} — Luminae` : "Luminae" },
        { property: "og:description", content: p?.description ?? "" },
        ...(p ? [{ property: "og:image", content: p.image }, { name: "twitter:image", content: p.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-4xl">Window not found</h1>
      <Link to="/products" className="mt-6 inline-block text-brand underline">
        Back to collection
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: typeof products[number] };
  const { openQuote } = useQuote();

  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1500);
  const [glass, setGlass] = useState(product.glass[1] ?? product.glass[0]);
  const [color, setColor] = useState(product.colors[0]);

  // Live price: sq.ft × baseRate × glass multiplier
  const glassMult = glass.toLowerCase().includes("triple")
    ? 1.6
    : glass.toLowerCase().includes("acoustic") || glass.toLowerCase().includes("low-e")
      ? 1.3
      : glass.toLowerCase().includes("toughened") || glass.toLowerCase().includes("solar")
        ? 1.25
        : glass.toLowerCase().includes("double")
          ? 1.15
          : 1;

  const sqft = useMemo(() => (width * height) / 92903, [width, height]); // mm² → sqft
  const estimate = useMemo(
    () => Math.round(sqft * product.baseRate * 600 * glassMult),
    [sqft, product.baseRate, glassMult],
  );

  return (
    <section className="container-x py-10 lg:py-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to collection
      </Link>

      <div className="mt-8 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border"
            style={{ backgroundColor: COLOR_SWATCHES[color] + "10" }}
          >
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-brand" /> Custom built
            </div>
          </motion.div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square rounded-xl overflow-hidden border",
                  i === 0 ? "border-foreground" : "border-border opacity-60",
                )}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Configurator */}
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-brand">
            {product.typeLabel}
          </span>
          <h1 className="mt-2 font-display text-4xl lg:text-5xl">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs"
              >
                <Check className="h-3 w-3 text-brand" /> {f}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 space-y-6 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl">Customize</h3>
              <span className="text-xs text-muted-foreground">All units in mm</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <NumberField label="Width" value={width} setValue={setWidth} min={400} max={3000} step={50} />
              <NumberField label="Height" value={height} setValue={setHeight} min={400} max={3000} step={50} />
            </div>

            <div>
              <Label>Glass type</Label>
              <select
                value={glass}
                onChange={(e) => setGlass(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              >
                {product.glass.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <Label>Frame color</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all",
                      color === c
                        ? "border-foreground bg-surface"
                        : "border-border hover:border-foreground/40",
                    )}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-border"
                      style={{ backgroundColor: COLOR_SWATCHES[c] }}
                    />
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-border">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Estimated price
                </div>
                <div className="mt-1 font-display text-3xl">
                  ₹ {formatINR(estimate)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {sqft.toFixed(1)} sq.ft · incl. installation
                </div>
              </div>
              <button
                onClick={() =>
                  openQuote({
                    productName: product.name,
                    type: product.typeLabel,
                    width,
                    height,
                    glass,
                    color,
                    estimatedPrice: estimate,
                  })
                }
                className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground shadow-soft hover:shadow-glow transition-all"
              >
                Request Quote
              </button>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            * Estimate is indicative. Final quote is provided post site measurement.
          </p>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-muted-foreground">{children}</label>;
}

function NumberField({
  label, value, setValue, min, max, step,
}: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5 flex items-center rounded-lg border border-input bg-background overflow-hidden">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - step))}
          className="grid h-10 w-10 place-items-center hover:bg-surface"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(Math.min(max, Math.max(min, Number(e.target.value) || min)))}
          className="flex-1 bg-transparent text-center text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + step))}
          className="grid h-10 w-10 place-items-center hover:bg-surface"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
