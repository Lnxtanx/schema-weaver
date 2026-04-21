import { Section } from "./Section";
import { ProductShot } from "./ProductShot";
import { Button } from "@/components/ui/button";
import { Eye, FileLock2, KeyRound, ScrollText, ShieldCheck, Users } from "lucide-react";

const items = [
  {
    icon: KeyRound,
    title: "Share projects, not credentials.",
    body: "Connections are stored encrypted at the workspace level. Invite a teammate and they get exactly the access you choose — never a raw connection string.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access Control.",
    body: "Owners manage billing and connections. Editors design schema and run migrations. Viewers query data. Custom roles for compliance-heavy orgs.",
  },
  {
    icon: FileLock2,
    title: "Automatic data masking.",
    body: "Tag a column as PII and Schema Weaver automatically redacts it for non-admins across the Data Explorer, exports, and Resona AI responses.",
  },
  {
    icon: ScrollText,
    title: "Tamper-evident audit log.",
    body: "Every file edit, applied migration, query, and export is recorded with author, IP, and timestamp. Stream to your SIEM via webhook.",
  },
];

export function TeamSection() {
  return (
    <Section
      id="teams"
      eyebrow="The Enterprise Layer"
      title={
        <>
          Build together.
          <br />
          <span className="text-gradient-mesh">Securely.</span>
        </>
      }
      description="Schema Weaver is built for teams from day one. Manage projects in the cloud, invite teammates by email, share read-only data access with stakeholders, and ship with the auditability your security team actually wants."
    >
      <div className="mt-16 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5 order-2 lg:order-1">
          {items.map((it) => (
            <div key={it.title} className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <it.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-2">
            <Button variant="hero" size="lg" asChild>
              <a href="https://sql-editor.schemaweaver.vivekmind.com">Invite your team</a>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <a href="#">Read security overview</a>
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <ProductShot
            src="/images/sql-editor/team-collaboration.png"
            caption="team-collaboration — workspace · 12 members"
            glow="blue"
          />

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Mini icon={Users} label="Roles" value="4" />
            <Mini icon={Eye} label="Audit retention" value="∞" />
            <Mini icon={ShieldCheck} label="Encryption" value="AES-256" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Mini({ icon: Icon, label, value }: { icon: typeof Eye; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div className="font-display text-lg font-bold mt-2">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}