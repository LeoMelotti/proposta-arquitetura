import { Proposal } from './types';

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.srv1199443.hstgr.cloud/webhook/proposta';

export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
  try {
    const response = await fetch(`${N8N_WEBHOOK_URL}?slug=${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data as Proposal;
  } catch (error) {
    console.error('Error fetching proposal from n8n:', error);
    return null;
  }
}

export async function getAllProposalSlugs(): Promise<string[]> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.slugs || [];
  } catch (error) {
    console.error('Error fetching slugs from n8n:', error);
    return [];
  }
}

export function getValidityDate(dataProposta: string, validadeDias: number): string {
  const parts = dataProposta.split('/');
  if (parts.length !== 3) return '';
  const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  date.setDate(date.getDate() + validadeDias);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function formatDate(dataProposta: string): string {
  const parts = dataProposta.split('/');
  if (parts.length !== 3) return dataProposta;
  const date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}
