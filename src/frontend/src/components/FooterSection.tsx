import { Zap } from "lucide-react";

export default function FooterSection() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-display font-black text-sm">APEX MOD</p>
              <p className="text-xs text-muted-foreground">
                Modular Productivity Hub
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm font-display font-bold text-gradient-cyan">
              "Your desk, your rules."
            </p>
          </div>

          <div className="text-xs text-muted-foreground text-center md:text-right">
            <p>
              © {year}. Built with ❤️ using{" "}
              <a
                href={utm}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <p className="mt-1 opacity-60">Made-to-order · Printed in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
