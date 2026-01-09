import { Proposal } from '@/lib/types';
import { SectionLabel } from '@/components/ui/SectionLabel';

interface PortfolioGridProps {
  proposal: Proposal;
}

export function PortfolioGrid({ proposal }: PortfolioGridProps) {
  const images = proposal.portfolioUrls.map((url, index) => ({
    url,
    legenda: proposal.portfolioLegendas[index] || '',
  }));

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="section page-break-before">
      <div className="section-inner">
        <SectionLabel>Portfólio Selecionado</SectionLabel>
        
        {/* Grid */}
        <div className={`
          grid gap-4 md:gap-6
          ${images.length === 1 ? 'grid-cols-1' : ''}
          ${images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : ''}
          ${images.length >= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : ''}
        `}>
          {images.map((image, index) => (
            <div 
              key={index}
              className="avoid-break group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-soft bg-card">
                <img
                  src={image.url}
                  alt={image.legenda || `Projeto ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Caption */}
              {image.legenda && (
                <p className="text-caption text-text-secondary mt-3 text-center">
                  {image.legenda}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
