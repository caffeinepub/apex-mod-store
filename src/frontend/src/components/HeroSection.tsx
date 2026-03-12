import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToCustomizer = () => {
    document
      .getElementById("customizer")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/uploads/WhatsApp-Image-2026-03-12-at-12.24.46-PM-1.jpeg"
          alt="Apex Mod desk organizer prototype"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/50" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            APEX MOD
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary"
          onClick={scrollToCustomizer}
          data-ocid="hero.primary_button"
        >
          Configure Yours
        </Button>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pb-24 pt-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-primary/15 text-primary border-primary/30 font-body text-xs tracking-widest uppercase">
              ⚡ Modular · 3D-Printed · Yours
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-foreground">APEX</span>
            <span className="block text-gradient-cyan">MOD</span>
            <span className="block text-foreground/70 text-2xl md:text-3xl lg:text-4xl font-medium mt-2 tracking-normal">
              Modular Productivity Hub
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A 3D-printed modular system that transforms cluttered workspaces
            into organized battlestations. Designed for gamers, students, and
            productivity enthusiasts who demand customization without
            compromise.
          </motion.p>

          <motion.p
            className="text-2xl md:text-3xl font-display font-bold text-accent mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            "Your desk, your rules."
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold text-base px-8 py-6 glow-cyan animate-glow-pulse"
              onClick={scrollToCustomizer}
            >
              Build Your Setup
            </Button>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                Starting at
              </span>
              <span className="text-2xl font-display font-black text-foreground">
                ₹399
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Customize
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
