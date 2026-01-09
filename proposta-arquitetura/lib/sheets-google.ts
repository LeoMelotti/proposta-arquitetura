import { google } from 'googleapis';
import { Proposal, COLUMN_MAP, LIST_FIELDS } from './types';

// Initialize Google Sheets API
function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  return google.sheets({ version: 'v4', auth });
}

// Normalize header to match COLUMN_MAP keys
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
}

// Generate slug from client name and project name
function generateSlug(clienteNome: string, projetoNome: string): string {
  const combined = `${clienteNome}-${projetoNome}`;
  return combined
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Parse a row into a Proposal object
function parseRow(headers: string[], row: string[]): Proposal {
  const rawData: Record<string, string> = {};
  
  headers.forEach((header, index) => {
    const normalizedHeader = normalizeHeader(header);
    const mappedKey = COLUMN_MAP[normalizedHeader];
    if (mappedKey) {
      rawData[mappedKey] = row[index] || '';
    }
  });

  // Process list fields (split by ";")
  const proposal: Partial<Proposal> = {};
  
  Object.entries(rawData).forEach(([key, value]) => {
    const propKey = key as keyof Proposal;
    if (LIST_FIELDS.includes(propKey)) {
      (proposal as any)[propKey] = value
        .split(';')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);
    } else if (propKey === 'validadeDias' || propKey === 'visitasQtd') {
      (proposal as any)[propKey] = parseInt(value) || 0;
    } else {
      (proposal as any)[propKey] = value;
    }
  });

  // Generate slug if empty
  if (!proposal.slug && proposal.clienteNome && proposal.projetoNome) {
    proposal.slug = generateSlug(proposal.clienteNome, proposal.projetoNome);
  }

  return proposal as Proposal;
}

// Fetch all proposals from the sheet
export async function getAllProposals(): Promise<Proposal[]> {
  const sheets = getSheets();
  const sheetId = process.env.GOOGLE_SHEET_ID;
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'PROPOSTAS!A:AG', // Columns A to AG
  });

  const rows = response.data.values;
  if (!rows || rows.length < 2) {
    return [];
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows
    .filter(row => row.some(cell => cell?.trim())) // Skip empty rows
    .map(row => parseRow(headers, row));
}

// Fetch a single proposal by slug
export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
  const proposals = await getAllProposals();
  
  // Find by exact slug match
  let proposal = proposals.find(p => p.slug === slug);
  
  // If not found, try to find by generated slug from client+project
  if (!proposal) {
    proposal = proposals.find(p => {
      const generatedSlug = generateSlug(p.clienteNome, p.projetoNome);
      return generatedSlug === slug;
    });
  }

  return proposal || null;
}

// Get validity date
export function getValidityDate(dataProposta: string, validadeDias: number): string {
  // Parse Brazilian date format (DD/MM/YYYY)
  const parts = dataProposta.split('/');
  if (parts.length !== 3) return '';
  
  const date = new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
  
  date.setDate(date.getDate() + validadeDias);
  
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

// Format date for display
export function formatDate(dataProposta: string): string {
  const parts = dataProposta.split('/');
  if (parts.length !== 3) return dataProposta;
  
  const date = new Date(
    parseInt(parts[2]),
    parseInt(parts[1]) - 1,
    parseInt(parts[0])
  );
  
  return date.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}
