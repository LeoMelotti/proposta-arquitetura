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

  // Dividir em duas linhas: primeira metade em cima, segunda embaixo
  const midpoint = Math.ceil(steps.length / 2);
  const topRow = steps.slice(0, midpoint);
  const bottomRow = steps.slice(midpoint);

  return (
    <section className="section page-break-before avoid-break">
      <div className="section-inner">
        <SectionLabel>Processo e Etapas</SectionLabel>
        
        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#c9a86c]/20 border-2 border-[#c9a86c] flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-sm text-[#c9a86c] font-medium">
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-full bg-[#c9a86c]/30 mt-2 min-h-[2rem]" />
                )}
              </div>
              
              <div className="pb-2 pt-2">
                <p className="text-body text-text-strong font-medium">
                  {step.nome}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop: Two Row Timeline */}
        <div className="hidden md:block space-y-12">
          {/* Top Row */}
          <div className="flex items-start justify-between relative">
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#c9a86c]/30" />
            
            {topRow.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center flex-1 relative z-10"
              >
                <div className="w-10 h-10 rounded-full bg-[#c9a86c]/20 border-2 border-[#c9a86c] flex items-center justify-center mb-4">
                  <span className="font-serif text-sm text-[#c9a86c] font-medium">
                    {index + 1}
                  </span>
                </div>
                
                <p className="text-body-sm text-text-strong font-medium max-w-[120px]">
                  {step.nome}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          {bottomRow.length > 0 && (
            <div className="flex items-start justify-between relative">
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#c9a86c]/30" />
              
              {bottomRow.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center text-center flex-1 relative z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#c9a86c]/20 border-2 border-[#c9a86c] flex items-center justify-center mb-4">
                    <span className="font-serif text-sm text-[#c9a86c] font-medium">
                      {midpoint + index + 1}
                    </span>
                  </div>
                  
                  <p className="text-body-sm text-text-strong font-medium max-w-[120px]">
                    {step.nome}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
