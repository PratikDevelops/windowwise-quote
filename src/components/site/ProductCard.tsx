import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { formatINR } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group block rounded-2xl bg-card border border-border overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-1"
      >
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-brand">
              {product.typeLabel}
            </span>
            <span className="text-xs text-muted-foreground">
              from ₹{formatINR(product.startingFrom)}
            </span>
          </div>
          <h3 className="mt-2 font-display text-xl">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {product.shortSpec}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium">Customize &amp; quote</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface group-hover:bg-brand group-hover:text-brand-foreground transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      <div className="aspect-[4/3] bg-surface animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-surface rounded animate-pulse" />
        <div className="h-5 w-2/3 bg-surface rounded animate-pulse" />
        <div className="h-3 w-full bg-surface rounded animate-pulse" />
      </div>
    </div>
  );
}
