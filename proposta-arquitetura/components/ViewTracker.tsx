'use client';

import { useEffect, useRef } from 'react';
import { Proposal } from '@/lib/types';

interface ViewTrackerProps {
  proposal: Proposal;
}

export function ViewTracker({ proposal }: ViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Only track once per page load
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Check if this is the first view (using localStorage)
    const viewKey = `proposta_viewed_${proposal.slug}`;
    const firstView = !localStorage.getItem(viewKey);
    
    // Mark as viewed
    if (firstView) {
      localStorage.setItem(viewKey, new Date().toISOString());
    }

    // Send tracking event to n8n
    const trackView = async () => {
      try {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_VIEW_WEBHOOK_URL;
        if (!webhookUrl) return;

        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: proposal.slug,
            clienteNome: proposal.clienteNome,
            projetoNome: proposal.projetoNome,
            firstView,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        // Silently fail - tracking shouldn't break the page
        console.debug('View tracking failed:', error);
      }
    };

    trackView();
  }, [proposal]);

  // This component renders nothing
  return null;
}
