import { Proposal } from '@/lib/types';
import { formatDate } from '@/lib/sheets';

interface CoverProps {
  proposal: Proposal;
}

export function Cover({ proposal }: CoverProps) {
  return (
    <section className="cover-section min-h-screen flex items-center justify-center py-20 px-6">
      <div className="text-center max-w-lg">
        {/* Logo */}
        {proposal.logoUrl && (
          <div className="mb-16">
            <img 
              src={proposal.logoUrl} 
              alt={proposal.escritorioNome}
              className="h-12 md:h-16 mx-auto object-contain"
            />
          </div>
        )}
        
        {/* Divider */}
        <div className="w-16 h-px bg-line mx-auto mb-12" />
        
        {/* Label */}
        <p className="text-label mb-6">Proposta de Orçamento</p>
        
        {/* Project Name */}
        <h1 className="text-display text-text-strong mb-4">
          {proposal.projetoNome}
        </h1>
        
        {/* Project Type */}
        <p className="text-caption text-text-secondary mb-12">
          {proposal.projetoTipo}
        </p>
        
        {/* Divider */}
        <div className="w-16 h-px bg-line mx-auto mb-12" />
        
        {/* Client */}
        <p className="text-caption text-text-secondary mb-2">
          Elaborado para
        </p>
        <p className="font-serif text-xl uppercase tracking-wide text-text-strong mb-12">
          {proposal.clienteNome}
        </p>
        
        {/* Date */}
        <p className="text-caption text-text-secondary capitalize">
          {formatDate(proposal.dataProposta)}
        </p>
      </div>
    </section>
  );
}
