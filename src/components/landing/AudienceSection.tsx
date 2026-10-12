import { Section } from "./Section";
import {
  Rocket,
  Zap,
  BarChart3,
  Layers,
  Database,
  Code2,
  Briefcase,
  FileSpreadsheet,
  Terminal,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    title: "Founders",
    icon: Rocket,
    accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Startups",
    icon: Zap,
    accentColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "Data Analysts",
    icon: BarChart3,
    accentColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    title: "Product Managers",
    icon: Layers,
    accentColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "Data Engineers",
    icon: Database,
    accentColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    title: "Software Engineers",
    icon: Code2,
    accentColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    title: "CEOs & Executives",
    icon: Briefcase,
    accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Operations & Finance",
    icon: FileSpreadsheet,
    accentColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Solo Developers",
    icon: Terminal,
    accentColor: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
];

export function AudienceSection() {
  return (
    <Section
      id="teams"
      headerClassName="max-w-4xl"
      title={
        <span className="block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          Built for your <span className="text-gradient-mesh">entire team</span>
        </span>
      }
    >
      {/* Connected Modular 3x3 Grid |--|--|--| */}
      <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          {roles.map((item, idx) => {
            const Icon = item.icon;

            return (
              <a
                key={idx}
                href="https://data-explorer.schemaweaver.dev?demo=true"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0b101b] p-6 sm:p-7 flex items-center justify-between hover:bg-[#0f1523] transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                      item.accentColor
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
