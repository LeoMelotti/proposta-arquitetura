import { Proposal } from '@/lib/types';

interface ScopeListProps {
  proposal: Proposal;
}

export function ScopeList({ proposal }: ScopeListProps) {
  // Função para colocar negrito antes dos dois pontos
  const formatItem = (item: string) => {
    const colonIndex = item.indexOf(':');
    if (colonIndex > -1) {
      const before = item.substring(0, colonIndex);
      const after = item.substring(colonIndex);
      return (
        <>
          <strong className="font-semibold">{before}</strong>
          <span className="font-normal text-text-secondary">{after}</span>
        </>
      );
    }
    return item;
  };

  return (
    <section className="section avoid-break">
      <div className="section-inner">
        <div className="space-y-0">
          {proposal.escopoItens.map((item, index) => (
            <div 
              key={index}
              className="flex items-start gap-5 py-5 border-b border-line/50 last:border-b-0"
            >
              {/* Number with accent color */}
              <span className="font-serif text-lg text-[#c9a86c] flex-shrink-0 w-8 pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              
              {/* Item */}
              <p className="text-body text-text-strong flex-1">
                {formatItem(item)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
