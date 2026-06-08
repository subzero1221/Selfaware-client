import { UserProfile } from "@/types/dtos/auth";

export default function ProfileSettings({ user }: { user: UserProfile }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold uppercase tracking-wide text-wood-text-primary">
          პროფილის მონაცემები
        </h1>
        <p className="text-xs text-wood-text-muted mt-1 font-sans">
          თქვენი სისტემური იდენტიფიკატორები და ბიოგრაფია.
        </p>
      </div>

      <div className="border-2 border-wood-border rounded-xl p-6 space-y-4 font-mono text-xs max-w-xl">
        <div className="space-y-1">
          <span className="text-wood-text-muted uppercase">ელ-ფოსტა:</span>
          <p className="text-sm font-sans text-wood-text-primary bg-wood-border/10 p-3 border border-wood-border rounded-xl">
            {user.email}
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-wood-text-muted uppercase">
            ბიოგრაფია / შენიშვნა:
          </span>
          <p className="font-sans text-wood-text-secondary bg-wood-border/10 p-3 border border-wood-border rounded-xl leading-relaxed">
            {user.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
