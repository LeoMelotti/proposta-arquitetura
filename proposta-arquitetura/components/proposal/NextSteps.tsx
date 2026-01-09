import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';

interface NextStepsProps {
  proposal: Proposal;
}

export function NextSteps({ proposal }: NextStepsProps) {
  const steps = [
    proposal.proximosPasso1,
    proposal.proximosPasso2,
    proposal.proximosPasso3,
  ].filter(Boolean);

  return (
    <section className="section page-break-before">
      <div className="section-inner">
        <SectionLabel>Próximos Passos</SectionLabel>
        
        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-start gap-5"
            >
              {/* Number */}
              <span className="font-serif text-lg text-accent flex-shrink-0 w-8">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Step */}
              <p className="text-body text-text-strong pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center no-print">
          <Button href={`/api/pdf?slug=${proposal.slug}`}>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Baixar PDF
          </Button>
        </div>
        
        {/* Divider */}
        <Divider className="my-12" />
        
        {/* Signature */}
        <div className="text-center">
          <p className="font-serif text-xl uppercase tracking-wide text-text-strong mb-1">
            {proposal.arquitetaNome}
          </p>
          <p className="text-caption text-text-secondary mb-1">
            {proposal.arquitetaCargo} · {proposal.arquitetaCau}
          </p>
          <p className="text-body text-accent font-medium mb-4">
            {proposal.escritorioNome}
          </p>
          <p className="text-caption text-text-secondary">
            {proposal.escritorioTelefone} · {proposal.escritorioEmail}
          </p>
        </div>
      </div>
    </section>
  );
}
