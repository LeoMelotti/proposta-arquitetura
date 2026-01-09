import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface ExclusionsProps {
  proposal: Proposal;
}

export function Exclusions({ proposal }: ExclusionsProps) {
  const hasExclusions = proposal.naoIncluso.length > 0;
  const hasPremises = proposal.premissas.length > 0;

  if (!hasExclusions && !hasPremises) {
    return null;
  }

  return (
    <section className="section page-break-before avoid-break">
      <div className="section-inner">
        <SectionLabel>Observações Importantes</SectionLabel>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Não Incluso */}
          {hasExclusions && (
            <div>
              <h3 className="text-label mb-4">Não Incluso</h3>
              <ul className="space-y-3">
                {proposal.naoIncluso.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-body text-text-secondary"
                  >
                    <span className="text-line mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Premissas */}
          {hasPremises && (
            <div>
              <h3 className="text-label mb-4">Premissas</h3>
              <ul className="space-y-3">
                {proposal.premissas.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-body text-text-secondary"
                  >
                    <span className="text-line mt-1">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
