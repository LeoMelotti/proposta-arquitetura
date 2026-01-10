import { Proposal } from '@/lib/types';

interface ScopeListProps {
  proposal: Proposal;
}

export function ScopeList({ proposal }: ScopeListProps) {
  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <div className="space-y-0">
          {proposal.escopoItens.map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-5 py-4 border-b border-line/50 last:border-b-0"
            >
              {/* Number */}
              <span className="font-serif text-lg text-accent flex-shrink-0 w-8 pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Item */}
              <p className="text-body text-text-strong flex-1">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
