import { Badge } from "@/components/ui/badge";
import { Eye, Recycle, Sparkles, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

const DIFFERENTIATORS = [
  {
    icon: Sparkles,
    title: "Premium Finishes",
    description:
      "Silk and dual-color filaments create a mirror-like sheen that looks custom-machined, not 3D-printed.",
  },
  {
    icon: Eye,
    title: "Visual Impact",
    description:
      "Transforms a cluttered desk into a conversation-starting battlestation. Form meets function at every angle.",
  },
  {
    icon: TrendingDown,
    title: "The Smart Investment",
    description:
      "Custom desk organizers retail for ₹2000+. Apex-Mod delivers the same premium feel at a fraction of the cost.",
  },
  {
    icon: Recycle,
    title: "Sustainability First",
    description:
      "Biodegradable PLA+ means your organized desk doesn't cost the planet. Guilt-free productivity.",
  },
];

export default function WhyApexMod() {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/uploads/Screenshot-7--6.png"
          alt="Apex Mod differentiators"
          className="w-full h-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-accent/15 text-accent border-accent/30 text-xs tracking-widest uppercase">
              Differentiators
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-6">
              Not Just Another
              <span className="block text-gradient-cyan">Desk Organizer</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Apex-Mod isn't a one-size-fits-all solution. It's a personal
              statement. Every unit is printed on demand, every configuration
              unique to the person who ordered it.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From gamers who need controller hooks and cable management to
              students who need pen holders and phone stands — Apex-Mod is the
              workspace companion that actually understands your workflow.
            </p>

            <div className="mt-8 flex gap-6">
              <div>
                <p className="font-display font-black text-3xl text-primary">
                  5+
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Modules
                </p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display font-black text-3xl text-accent">
                  4
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Color Options
                </p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="font-display font-black text-3xl text-green-400">
                  100%
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Custom
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {DIFFERENTIATORS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4"
              >
                <d.icon className="w-5 h-5 text-primary mb-3" />
                <h4 className="font-display font-bold text-sm mb-1.5">
                  {d.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {d.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
