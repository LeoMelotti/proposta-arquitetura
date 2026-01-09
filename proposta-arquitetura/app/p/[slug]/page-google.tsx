import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProposalBySlug, getAllProposals } from '@/lib/sheets';
import {
  Cover,
  ExecutiveSummary,
  ScopeList,
  Timeline,
  ExecutiveChecklist,
  SiteVisits,
  Exclusions,
  PricingTable,
  PortfolioGrid,
  NextSteps,
} from '@/components/proposal';

interface PageProps {
  params: { slug: string };
}

// Generate static params for all proposals (optional, for SSG)
export async function generateStaticParams() {
  try {
    const proposals = await getAllProposals();
    return proposals.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const proposal = await getProposalBySlug(params.slug);
    
    if (!proposal) {
      return {
        title: 'Proposta não encontrada',
      };
    }
    
    return {
      title: `${proposal.projetoNome} | Proposta para ${proposal.clienteNome}`,
      description: proposal.resumoTexto.substring(0, 160),
    };
  } catch {
    return {
      title: 'Proposta',
    };
  }
}

export default async function ProposalPage({ params }: PageProps) {
  let proposal;
  
  try {
    proposal = await getProposalBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching proposal:', error);
    notFound();
  }
  
  if (!proposal) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* 1. Capa */}
      <Cover proposal={proposal} />
      
      {/* 2. Resumo Executivo */}
      <ExecutiveSummary proposal={proposal} />
      
      {/* 3. Escopo */}
      <ScopeList proposal={proposal} />
      
      {/* 4. Timeline */}
      <Timeline proposal={proposal} />
      
      {/* 5. Entregáveis */}
      <ExecutiveChecklist proposal={proposal} />
      
      {/* 6. Visitas */}
      <SiteVisits proposal={proposal} />
      
      {/* 7. Não Incluso / Premissas */}
      <Exclusions proposal={proposal} />
      
      {/* 8. Investimento */}
      <PricingTable proposal={proposal} />
      
      {/* 9. Portfólio */}
      <PortfolioGrid proposal={proposal} />
      
      {/* 10. Próximos Passos */}
      <NextSteps proposal={proposal} />
      
      {/* Footer spacing */}
      <div className="h-16" />
    </main>
  );
}

// Revalidate every 60 seconds
export const revalidate = 60;
