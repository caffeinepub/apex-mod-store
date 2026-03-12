import { Badge } from "@/components/ui/badge";
import { IndianRupee, Leaf, Puzzle, Shield } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: IndianRupee,
    title: "Exceptional Value",
    description:
      "Premium 3D-printed desk organization starting at just ₹399. Custom-made for your setup without the premium price tag.",
    accent: "text-accent",
    bg: "bg-accent/10 border-accent/20",
  },
  {
    icon: Shield,
    title: "Premium Build Quality",
    description:
      "Engineered with precision tolerances and reinforced connection points. Built to last through years of daily use.",
    accent: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Materials",
    description:
      "PLA+ is fully biodegradable and derived from renewable resources. Look good while doing good for the planet.",
    accent: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  {
    icon: Puzzle,
    title: "Modular Innovation",
    description:
      "Add, remove, and rearrange modules as your setup evolves. Your organizer grows with your workflow.",
    accent: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-secondary/20">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 text-xs tracking-widest uppercase">
            Why Apex-Mod
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight">
            Four Pillars of{" "}
            <span className="text-gradient-cyan">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-lg border bg-card flex flex-col gap-4"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className={`w-12 h-12 rounded-md border ${feat.bg} flex items-center justify-center`}
              >
                <feat.icon className={`w-6 h-6 ${feat.accent}`} />
              </div>
              <div>
                <h3
                  className={`font-display font-bold text-base mb-2 ${feat.accent}`}
                >
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
