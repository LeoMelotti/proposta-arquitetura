export interface Proposal {
  slug: string;
  
  // Cliente & Projeto
  clienteNome: string;
  projetoNome: string;
  projetoTipo: string;
  dataProposta: string;
  validadeDias: number;
  
  // Resumo
  resumoTexto: string;
  resumoBullets: string[];
  prazoTotal: string;
  investimentoTotal: string;
  
  // Escopo
  escopoItens: string[];
  
  // Etapas (Timeline)
  etapasNomes: string[];
  etapasDuracoes: string[];
  
  // Entregáveis
  entregaveis: string[];
  
  // Visitas
  visitasQtd: number;
  visitasDescricao: string;
  
  // Não Incluso & Premissas
  naoIncluso: string[];
  premissas: string[];
  
  // Investimento
  parcelasDescricao: string[];
  parcelasValores: string[];
  parcelasPct: string[];
  
  // Portfólio
  portfolioUrls: string[];
  portfolioLegendas: string[];
  
  // Próximos Passos
  proximosPasso1: string;
  proximosPasso2: string;
  proximosPasso3: string;
  
  // Arquiteta
  arquitetaNome: string;
  arquitetaCargo: string;
  arquitetaCau: string;
  
  // Escritório
  escritorioNome: string;
  escritorioTelefone: string;
  escritorioEmail: string;
  logoUrl: string;
}

export interface SheetRow {
  [key: string]: string;
}

// Column mapping from Sheets to Proposal
export const COLUMN_MAP: Record<string, keyof Proposal> = {
  'slug': 'slug',
  'cliente_nome': 'clienteNome',
  'projeto_nome': 'projetoNome',
  'projeto_tipo': 'projetoTipo',
  'data_proposta': 'dataProposta',
  'validade_dias': 'validadeDias',
  'resumo_texto': 'resumoTexto',
  'resumo_bullets': 'resumoBullets',
  'prazo_total': 'prazoTotal',
  'investimento_total': 'investimentoTotal',
  'escopo_itens': 'escopoItens',
  'etapas_nomes': 'etapasNomes',
  'etapas_duracoes': 'etapasDuracoes',
  'entregaveis': 'entregaveis',
  'visitas_qtd': 'visitasQtd',
  'visitas_descricao': 'visitasDescricao',
  'nao_incluso': 'naoIncluso',
  'premissas': 'premissas',
  'parcelas_descricao': 'parcelasDescricao',
  'parcelas_valores': 'parcelasValores',
  'parcelas_pct': 'parcelasPct',
  'portfolio_urls': 'portfolioUrls',
  'portfolio_legendas': 'portfolioLegendas',
  'proximo_passo_1': 'proximosPasso1',
  'proximo_passo_2': 'proximosPasso2',
  'proximo_passo_3': 'proximosPasso3',
  'arquiteta_nome': 'arquitetaNome',
  'arquiteta_cargo': 'arquitetaCargo',
  'arquiteta_cau': 'arquitetaCau',
  'escritorio_nome': 'escritorioNome',
  'escritorio_telefone': 'escritorioTelefone',
  'escritorio_email': 'escritorioEmail',
  'logo_url': 'logoUrl',
};

// Fields that should be split by ";"
export const LIST_FIELDS: (keyof Proposal)[] = [
  'resumoBullets',
  'escopoItens',
  'etapasNomes',
  'etapasDuracoes',
  'entregaveis',
  'naoIncluso',
  'premissas',
  'parcelasDescricao',
  'parcelasValores',
  'parcelasPct',
  'portfolioUrls',
  'portfolioLegendas',
];
