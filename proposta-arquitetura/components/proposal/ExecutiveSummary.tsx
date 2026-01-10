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
          {proposal.resumoTexto}
        </p>
        
        {/* Bullets */}
        {proposal.resumoBullets.length > 0 && (
          <div className="card-accent p-6 md:p-8 mb-10">
            <ul className="list-editorial">
              {proposal.resumoBullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {/* Prazo */}
          <div className="card p-5 md:p-6 text-center">
            <p className="text-label mb-2">Prazo Estimado</p>
            <p className="font-serif text-2xl md:text-3xl text-text-strong tracking-wide">
              {proposal.prazoTotal}
            </p>
          </div>
          
          {/* Investimento */}
          <div className="card p-5 md:p-6 text-center">
            <p className="text-label mb-2">Investimento</p>
            <p className="font-serif text-2xl md:text-3xl text-text-strong tracking-wide">
              {proposal.investimentoTotal}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
