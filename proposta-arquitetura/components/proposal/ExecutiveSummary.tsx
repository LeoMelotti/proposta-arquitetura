import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ExecutiveSummaryProps {
  proposal: Proposal;
}

export function ExecutiveSummary({ proposal }: ExecutiveSummaryProps) {
  return (
    <section className="section page-break-before">
      <div className="section-inner">
        <SectionLabel>Resumo da Proposta</SectionLabel>
        
        {/* Main Text */}
        <p className="text-body text-text-strong mb-8 leading-relaxed">
          Proposta de orçamento para projeto de interiores residencial contemplando os seguintes ambientes:
        </p>
        
        {/* Bullets */}
        {proposal.resumoBullets.length > 0 && (
          <div className="card-accent p-6 md:p-8">
            <ul className="list-editorial">
              {proposal.resumoBullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
