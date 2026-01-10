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

  // Função para formatar porcentagem corretamente
  const formatPct = (pct: string) => {
    if (!pct) return '';
    if (pct.includes('%')) return pct;
    const num = parseFloat(pct);
    if (!isNaN(num)) {
      if (num <= 1) {
        return `${Math.round(num * 100)}%`;
      }
      return `${Math.round(num)}%`;
    }
    return pct;
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: string) => {
    if (!value) return '';
    // Se já tem R$, retorna como está
    if (value.includes('R$')) return value;
    // Remove caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.replace(/[^\d.,]/g, '').replace(',', '.');
    const num = parseFloat(cleanValue);
    if (!isNaN(num)) {
      return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return value;
  };

  const validityDate = getValidityDate(proposal.dataProposta, proposal.validadeDias);

  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <SectionLabel>Investimento</SectionLabel>
        
        {/* Total em Destaque */}
        <div className="card-accent p-8 md:p-10 text-center mb-8">
          <p className="text-label mb-3">Valor Total do Projeto</p>
          <p className="font-serif text-4xl md:text-5xl text-[#c9a86c] tracking-wide">
            {formatCurrency(proposal.investimentoTotal)}
          </p>
        </div>

        {/* Condições de Pagamento */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 bg-card/50 border-b border-line/50">
            <span className="text-label">Condições de Pagamento</span>
          </div>
          
          {/* Rows */}
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
                    {formatCurrency(parcela.valor)}
                  </span>
                  <span className="text-caption text-[#c9a86c] font-medium w-12 text-right">
                    {formatPct(parcela.pct)}
                  </span>
                </div>
              </div>
            ))}
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
