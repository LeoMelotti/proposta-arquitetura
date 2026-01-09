interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <span className="text-label">{children}</span>
      <div className="mt-3 w-12 h-px bg-accent" />
    </div>
  );
}
