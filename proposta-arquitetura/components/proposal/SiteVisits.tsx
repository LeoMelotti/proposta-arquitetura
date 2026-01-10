import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface SiteVisitsProps {
  proposal: Proposal;
}

export function SiteVisits({ proposal }: SiteVisitsProps) {
  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Visitas a obra</SectionLabel>
        
        <div className="card-accent p-8 md:p-10 text-center">
          {/* Number */}
          <div className="mb-4">
            <span className="font-serif text-5xl md:text-6xl text-accent tracking-tight">
              3
            </span>
          </div>
          
          {/* Label */}
          <p className="text-label mb-4">
            Visitas Técnicas
          </p>
          
          {/* Description */}
          <p className="text-body text-text-secondary max-w-md mx-auto">
            {proposal.visitasDescricao || 'Visitas técnicas para acompanhamento da execução e verificação de conformidade com o projeto'}
          </p>
        </div>
      </div>
    </section>
  );
}
