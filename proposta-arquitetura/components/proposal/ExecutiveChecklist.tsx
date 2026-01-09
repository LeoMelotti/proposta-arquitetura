import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ExecutiveChecklistProps {
  proposal: Proposal;
}

export function ExecutiveChecklist({ proposal }: ExecutiveChecklistProps) {
  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Entregáveis do Executivo</SectionLabel>
        
        <div className="card p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposal.entregaveis.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3"
              >
                {/* Checkmark */}
                <div className="w-5 h-5 rounded-subtle bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg 
                    className="w-3 h-3 text-accent" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                {/* Item */}
                <p className="text-body text-text-strong">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
