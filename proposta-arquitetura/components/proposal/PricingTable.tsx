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

  const formatPct = (pct: string | number) => {
    if (!pct) return '';
    const pctStr = String(pct);
    if (pctStr.includes('%')) return pctStr;
    const num = parseFloat(pctStr);
    if (!isNaN(num)) {
      if (num <= 1) {
        return Math.round(num * 100) + '%';
      }
      return Math.round(num) + '%';
    }
    return pctStr;
  };

  const validityDate = getValidityDate(proposal.dataProposta, proposal.validadeDias);

  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Investimento</SectionLabel>
        
        <div className="card-accent p-8 md:p-10 text-center mb-8">
          <p className="text-label mb-3">Valor Total do Projeto</p>
          <p className="font-serif text-4xl md:text-5xl text-[#c9a86c] tracking-wide">
            {proposal.investimentoTotal}
          </p>
        </div>

        <div className="card overflow-hidden">
          <div className="px-6 py-4 bg-card/50 border-b border-line/50">
            <span className="text-label">Condições de Pagamento</span>
          </div>
          
          <div className="divide-y divide-line/30">
            {parcelas.map((parcela, index) => (
              <div 
                key={index}
                className="flex items-center justify-between px-6 py-5"
              >
                <div className="flex-1">
                  <span className="text-body text-text-strong">
                    {parcela.descricao}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-body text-text-strong font-semibold">
                    {parcela.valor}
                  </span>
                  <span className="text-caption text-[#c9a86c] font-medium w-12 text-right">
                    {formatPct(parcela.pct)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {validityDate && (
          <p className="text-caption text-text-secondary mt-6 text-center">
            Proposta válida até {validityDate}
          </p>
        )}
      </div>
    </section>
  );
}
