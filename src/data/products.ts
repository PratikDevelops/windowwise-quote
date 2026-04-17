import sliding from "@/assets/sliding.jpg";
import casement from "@/assets/casement.jpg";
import tiltturn from "@/assets/tiltturn.jpg";
import fixed from "@/assets/fixed.jpg";
import bay from "@/assets/bay.jpg";
import french from "@/assets/french.jpg";

export type WindowType =
  | "sliding"
  | "casement"
  | "tilt-turn"
  | "fixed"
  | "bay"
  | "french";

export interface Product {
  slug: string;
  name: string;
  type: WindowType;
  typeLabel: string;
  image: string;
  shortSpec: string;
  description: string;
  baseRate: number; // per sq.ft (in INR)
  colors: string[];
  glass: string[];
  features: string[];
  startingFrom: number;
}

export const COLOR_SWATCHES: Record<string, string> = {
  White: "#f5f5f4",
  "Anthracite Grey": "#3a3f44",
  Black: "#0f0f10",
  "Golden Oak": "#a06a37",
  "Walnut Brown": "#5a3a23",
  Cream: "#efe7d6",
};

export const products: Product[] = [
  {
    slug: "horizon-sliding",
    name: "Horizon Sliding",
    type: "sliding",
    typeLabel: "Sliding",
    image: sliding,
    shortSpec: "2-track · Triple seal · Up to 2.4m",
    description:
      "A space-saving sliding system engineered for wide openings. Smooth stainless rollers, multi-chambered profile and a triple seal create silence and energy efficiency in equal measure.",
    baseRate: 18,
    colors: ["White", "Anthracite Grey", "Black"],
    glass: ["5mm Single", "Double Glazed (4-12-4)", "Acoustic Laminated"],
    features: ["Sound 32dB", "U-value 1.4", "Wind class C4"],
    startingFrom: 12500,
  },
  {
    slug: "atelier-casement",
    name: "Atelier Casement",
    type: "casement",
    typeLabel: "Casement",
    image: casement,
    shortSpec: "Side-hung · 5-chamber · Multi-point lock",
    description:
      "Classic casement craft with modern engineering. A 5-chamber profile and multi-point locking deliver weather-tight performance and an unobstructed view.",
    baseRate: 22,
    colors: ["White", "Cream", "Walnut Brown"],
    glass: ["Double Glazed (4-12-4)", "Low-E Energy", "Frosted Privacy"],
    features: ["Sound 35dB", "U-value 1.2", "Wind class C5"],
    startingFrom: 14800,
  },
  {
    slug: "nordic-tilt-turn",
    name: "Nordic Tilt & Turn",
    type: "tilt-turn",
    typeLabel: "Tilt & Turn",
    image: tiltturn,
    shortSpec: "Dual-action · German hardware · 70mm profile",
    description:
      "European-style tilt for ventilation, full turn for cleaning. Concealed German hardware and reinforced profiles built for Indian climates.",
    baseRate: 28,
    colors: ["Anthracite Grey", "Black", "White"],
    glass: ["Double Glazed (4-12-4)", "Triple Glazed", "Acoustic Laminated"],
    features: ["Sound 38dB", "U-value 1.0", "Wind class C5"],
    startingFrom: 18900,
  },
  {
    slug: "panorama-fixed",
    name: "Panorama Fixed",
    type: "fixed",
    typeLabel: "Fixed",
    image: fixed,
    shortSpec: "Picture window · Slim sightlines · Up to 3m",
    description:
      "Maximum daylight with minimum frame. Engineered for large spans, the Panorama frames the view like a piece of architecture.",
    baseRate: 16,
    colors: ["Black", "Anthracite Grey", "White"],
    glass: ["Double Glazed (4-12-4)", "Low-E Energy", "Solar Control"],
    features: ["Sound 30dB", "U-value 1.5", "Wind class C4"],
    startingFrom: 9800,
  },
  {
    slug: "ember-bay",
    name: "Ember Bay",
    type: "bay",
    typeLabel: "Bay",
    image: bay,
    shortSpec: "3-panel bay · Custom angles · Reinforced sill",
    description:
      "Add architectural depth and a window seat to any room. Each Ember Bay is configured to your wall and finished with a reinforced sill.",
    baseRate: 26,
    colors: ["White", "Cream", "Golden Oak"],
    glass: ["Double Glazed (4-12-4)", "Low-E Energy", "Acoustic Laminated"],
    features: ["Sound 34dB", "U-value 1.3", "Wind class C4"],
    startingFrom: 26500,
  },
  {
    slug: "garden-french",
    name: "Garden French",
    type: "french",
    typeLabel: "French Door",
    image: french,
    shortSpec: "Twin-leaf · Floor-level threshold · Multi-lock",
    description:
      "Open your room to the outdoors. Twin sashes with low threshold and a quiet, secure multi-point lock.",
    baseRate: 24,
    colors: ["White", "Anthracite Grey", "Walnut Brown"],
    glass: ["Double Glazed (4-12-4)", "Toughened Safety", "Frosted Privacy"],
    features: ["Sound 33dB", "U-value 1.3", "Wind class C5"],
    startingFrom: 22400,
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
