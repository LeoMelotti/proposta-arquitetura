import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getValidityDate } from '@/lib/sheets';

interface PricingTableProps {
  proposal: Proposal;
}

export function PricingTable({ proposal }: PricingTableProps) {
  const parcelas = proposal.parcelasDescricao.map((descricao, index) => ({
    descricao,
    valor: proposal.parcelasValores[index] || '',
    pct: proposal.parcelasPct[index] || '',
  }));

  const validityDate = getValidityDate(proposal.dataProposta, proposal.validadeDias);

  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Investimento e Condições</SectionLabel>
        
        <div className="card overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4 bg-card/50 border-b border-line/50">
            <span className="text-label">Parcela</span>
            <span className="text-label text-right w-32">Valor</span>
            <span className="text-label text-right w-16">%</span>
          </div>
          
          {/* Rows */}
          <div className="divide-y divide-line/30">
            {parcelas.map((parcela, index) => (
              <div 
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-4 px-6 py-4"
              >
                <div>
                  <span className="md:hidden text-caption text-text-secondary block mb-1">
                    Parcela {index + 1}
                  </span>
                  <span className="text-body text-text-strong">
                    {parcela.descricao}
                  </span>
                </div>
                <div className="md:text-right md:w-32">
                  <span className="md:hidden text-caption text-text-secondary">
                    Valor:{' '}
                  </span>
                  <span className="text-body text-text-strong font-medium">
                    {parcela.valor}
                  </span>
                </div>
                <div className="md:text-right md:w-16">
                  <span className="md:hidden text-caption text-text-secondary">
                    ({parcela.pct})
                  </span>
                  <span className="hidden md:inline text-body text-text-secondary">
                    {parcela.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2 md:gap-4 px-6 py-5 bg-text-strong text-cream">
            <span className="font-serif text-lg uppercase tracking-wide">
              Total
            </span>
            <span className="font-serif text-xl md:text-right md:w-32">
              {proposal.investimentoTotal}
            </span>
            <span className="hidden md:block text-right w-16 opacity-60">
              100%
            </span>
          </div>
        </div>
        
        {/* Validity */}
        {validityDate && (
          <p className="text-caption text-text-secondary mt-6 text-center">
            Proposta válida até {validityDate}
          </p>
        )}
      </div>
    </section>
  );
}
