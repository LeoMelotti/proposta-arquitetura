import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface SiteVisitsProps {
  proposal: Proposal;
}

export function SiteVisits({ proposal }: SiteVisitsProps) {
  if (!proposal.visitasQtd || proposal.visitasQtd === 0) {
    return null;
  }

  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Acompanhamento de Obra</SectionLabel>
        
        <div className="card-accent p-8 md:p-10 text-center">
          {/* Number */}
          <div className="mb-4">
            <span className="font-serif text-5xl md:text-6xl text-accent tracking-tight">
              {proposal.visitasQtd}
            </span>
          </div>
          
          {/* Label */}
          <p className="text-label mb-4">
            Visitas Técnicas
          </p>
          
          {/* Description */}
          <p className="text-body text-text-secondary max-w-md mx-auto">
            {proposal.visitasDescricao}
          </p>
        </div>
      </div>
    </section>
  );
}
