import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { products, COLOR_SWATCHES, type WindowType } from "@/data/products";
import { ProductCard, ProductCardSkeleton } from "@/components/site/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "UPVC Window Collection — Luminae" },
      {
        name: "description",
        content:
          "Browse our full collection of UPVC windows: sliding, casement, tilt & turn, bay, and french door systems. Customize and request a quote.",
      },
      { property: "og:title", content: "UPVC Window Collection — Luminae" },
      {
        property: "og:description",
        content: "Sliding, casement, tilt & turn, bay, french. Custom built for your home.",
      },
    ],
  }),
  component: ProductsPage,
});

const TYPES: { value: WindowType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sliding", label: "Sliding" },
  { value: "casement", label: "Casement" },
  { value: "tilt-turn", label: "Tilt & Turn" },
  { value: "fixed", label: "Fixed" },
  { value: "bay", label: "Bay" },
  { value: "french", label: "French" },
];

const ALL_COLORS = Array.from(
  new Set(products.flatMap((p) => p.colors)),
);

function ProductsPage() {
  const [type, setType] = useState<WindowType | "all">("all");
  const [color, setColor] = useState<string | null>(null);
  const [price, setPrice] = useState(35000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (type === "all" || p.type === type) &&
          (!color || p.colors.includes(color)) &&
          p.startingFrom <= price,
      ),
    [type, color, price],
  );

  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <section className="container-x pt-10 pb-8 sm:pt-12 sm:pb-10 lg:pt-20 lg:pb-12">
        <span className="text-xs uppercase tracking-[0.18em] text-brand">Collection</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl">Our windows</h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Each system is built to order. Pick a starting point, customize your
          configuration, and we'll send a precise quote.
        </p>
      </section>

      <section className="container-x grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10 pb-20 sm:pb-24">
        <aside className="lg:sticky lg:top-28 self-start">
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden flex items-center justify-between w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
            aria-expanded={filtersOpen}
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} />
          </button>
          <div className="hidden lg:flex items-center gap-2 text-sm font-semibold mb-6">
            <Filter className="h-4 w-4" /> Filters
          </div>
          <div className={cn("space-y-6 sm:space-y-8 mt-4 lg:mt-0", !filtersOpen && "hidden lg:block")}>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Window type
            </div>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    type === t.value
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground/40",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Frame color
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setColor(null)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs",
                  !color
                    ? "bg-foreground text-background border-foreground"
                    : "border-border",
                )}
              >
                Any
              </button>
              {ALL_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c === color ? null : c)}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
                    color === c ? "border-foreground" : "border-border",
                  )}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-border"
                    style={{ backgroundColor: COLOR_SWATCHES[c] }}
                  />
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground mb-3">
              <span>Max starting price</span>
              <span className="font-medium text-foreground">₹{price.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min={9000}
              max={35000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[var(--brand)]"
            />
          </div>
          </div>
        </aside>

        <div>
          <div className="text-sm text-muted-foreground mb-4 sm:mb-5">
            {loading ? "Loading…" : `${filtered.length} windows`}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : filtered.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No windows match those filters.{" "}
              <Link to="/products" className="text-brand underline">Reset</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
