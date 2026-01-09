import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface TimelineProps {
  proposal: Proposal;
}

export function Timeline({ proposal }: TimelineProps) {
  const steps = proposal.etapasNomes.map((nome, index) => ({
    nome,
    duracao: proposal.etapasDuracoes[index] || '',
  }));

  return (
    <section className="section page-break-before avoid-break">
      <div className="section-inner">
        <SectionLabel>Processo e Etapas</SectionLabel>
        
        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              {/* Line & Dot */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-card border border-line flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm text-accent">
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-full bg-line mt-2 min-h-[2rem]" />
                )}
              </div>
              
              {/* Content */}
              <div className="pb-2">
                <p className="text-body text-text-strong font-medium">
                  {step.nome}
                </p>
                <p className="text-caption text-text-secondary mt-1">
                  {step.duracao}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          {/* Steps */}
          <div className="flex items-start justify-between relative">
            {/* Connection Line */}
            <div className="absolute top-4 left-4 right-4 h-px bg-line" />
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center flex-1 relative z-10"
              >
                {/* Circle */}
                <div className="w-8 h-8 rounded-full bg-cream border border-line flex items-center justify-center mb-4">
                  <span className="font-serif text-sm text-accent">
                    {index + 1}
                  </span>
                </div>
                
                {/* Name */}
                <p className="text-body-sm text-text-strong font-medium mb-1 max-w-[120px]">
                  {step.nome}
                </p>
                
                {/* Duration */}
                <p className="text-caption text-text-secondary">
                  {step.duracao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
