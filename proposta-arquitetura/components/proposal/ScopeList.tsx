import { Proposal } from '@/lib/types';

interface ScopeListProps {
  proposal: Proposal;
}

export function ScopeList({ proposal }: ScopeListProps) {
  const formatItem = (item: unknown) => {
    const itemStr = String(item || '');
    const colonIndex = itemStr.indexOf(':');
    if (colonIndex > -1) {
      const before = itemStr.substring(0, colonIndex);
      const after = itemStr.substring(colonIndex);
      return (
        <>
          <strong className="font-semibold">{before}</strong>
          <span className="font-normal text-text-secondary">{after}</span>
        </>
      );
    }
    return itemStr;
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
              <span className="font-serif text-lg text-[#c9a86c] flex-shrink-0 w-8 pt-0.5">
                {String(index + 1).padStart(2, '0')}
              </span>
              
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
