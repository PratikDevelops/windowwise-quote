import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuote } from "@/components/site/QuoteProvider";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Windows" },
  { to: "/gallery", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openQuote } = useQuote();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-brand text-brand-foreground font-display text-lg shadow-soft transition-transform group-hover:scale-105">
            L
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg tracking-tight">Luminae</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              UPVC Windows
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-brand" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+919999900000"
            className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            +91 99999 00000
          </a>
          <button
            onClick={() => openQuote()}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
          >
            Get Free Quote
          </button>
          <button
            aria-label="Menu"
            className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-3 text-base text-foreground/90 hover:bg-surface rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => openQuote()}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
