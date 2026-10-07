"use client";

interface EvidenceWorkNotesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function EvidenceWorkNotesSection({
  value,
  onChange,
}: EvidenceWorkNotesSectionProps) {
  return (
    <section className="space-y-2">
      <h3 className="font-barlow text-base font-bold text-primary-heading">
        Work Notes
      </h3>

      <div className="rounded-sm border border-border-input bg-card-bg p-3 shadow-2xs">
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-xs text-secondary-subheading leading-relaxed focus:outline-hidden resize-none bg-transparent"
          placeholder="Enter property work summary..."
        />
      </div>
    </section>
  );
}
