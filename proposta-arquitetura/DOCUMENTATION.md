# Sistema de Propostas — Escritório de Arquitetura

## 1. Arquitetura & Estratégia

### Stack
```
Next.js 14 (App Router) + Tailwind CSS + Google Sheets API
Deploy: Vercel
PDF: Puppeteer via API Route
```

### Fluxo de Dados

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Google Sheets  │ ───▶ │  API Route       │ ───▶ │  Page Render    │
│  (aba PROPOSTAS)│      │  /api/proposal   │      │  /p/[slug]      │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                                            │
                                                            ▼
                                                   ┌─────────────────┐
                                                   │  /api/pdf       │
                                                   │  (Puppeteer)    │
                                                   └─────────────────┘
```

### Leitura do Google Sheets

**Opção recomendada: Google Sheets API v4 + Service Account**

1. Criar projeto no Google Cloud Console
2. Ativar Google Sheets API
3. Criar Service Account e baixar JSON de credenciais
4. Compartilhar a planilha com o email do Service Account
5. Usar biblioteca `googleapis` no Next.js

**Passo a passo:**

```bash
# 1. Instalar dependência
npm install googleapis

# 2. Adicionar variáveis de ambiente (.env.local)
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=1abc...xyz
```

### Modelo da Aba PROPOSTAS

| Coluna | Nome Amigável | Exemplo |
|--------|---------------|---------|
| A | slug | marina-casa-itaim |
| B | cliente_nome | Marina Oliveira |
| C | projeto_nome | Residência Itaim |
| D | projeto_tipo | Projeto de Interiores |
| E | data_proposta | 15/01/2025 |
| F | validade_dias | 15 |
| G | resumo_texto | Proposta para desenvolvimento completo... |
| H | resumo_bullets | Estudo de layout;Projeto executivo;Detalhamento marcenaria |
| I | prazo_total | 90 dias |
| J | investimento_total | R$ 85.000 |
| K | escopo_itens | Levantamento arquitetônico;Estudo preliminar;Anteprojeto;Projeto executivo;Detalhamento de marcenaria |
| L | etapas_nomes | Briefing;Estudo Preliminar;Anteprojeto;Projeto Executivo;Acompanhamento |
| M | etapas_duracoes | 1 semana;2 semanas;3 semanas;4 semanas;Conforme obra |
| N | entregaveis | Plantas humanizadas;Cortes e elevações;Projeto de iluminação;Detalhamento de marcenaria;Memorial descritivo |
| O | visitas_qtd | 8 |
| P | visitas_descricao | Visitas técnicas mensais para acompanhamento de obra |
| Q | nao_incluso | Projeto estrutural;Projeto hidráulico;Projeto elétrico;RRT/ART;Taxas de aprovação |
| R | premissas | Aprovação de cada etapa em até 5 dias úteis;Fornecimento de plantas do imóvel |
| S | parcelas_descricao | Entrada;Aprovação Anteprojeto;Entrega Final |
| T | parcelas_valores | R$ 25.500;R$ 34.000;R$ 25.500 |
| U | parcelas_pct | 30%;40%;30% |
| V | portfolio_urls | https://i.imgur.com/xxx.jpg;https://i.imgur.com/yyy.jpg;https://i.imgur.com/zzz.jpg |
| W | portfolio_legendas | Residência Jardins, 2024;Apartamento Vila Nova, 2023;Casa de Praia Guarujá, 2024 |
| X | proximo_passo_1 | Reunião de alinhamento para aprovação da proposta |
| Y | proximo_passo_2 | Assinatura do contrato e pagamento da entrada |
| Z | proximo_passo_3 | Início do briefing detalhado |
| AA | arquiteta_nome | Carolina Mendes |
| AB | arquiteta_cargo | Arquiteta e Urbanista |
| AC | arquiteta_cau | CAU A12345-6 |
| AD | escritorio_nome | Studio CM Arquitetura |
| AE | escritorio_telefone | (11) 99999-8888 |
| AF | escritorio_email | contato@studiocm.com.br |
| AG | logo_url | https://i.imgur.com/logo.png |

---

## 2. Wireframe Textual & Hierarquia Tipográfica

### Hierarquia Tipográfica

```
NIVEL 1 — Display/Capa
Font: Cormorant Garamond
Size: 48px / 3rem (mobile: 36px / 2.25rem)
Weight: 300 (Light)
Transform: uppercase
Letter-spacing: 0.25em
Line-height: 1.1

NIVEL 2 — Título de Seção
Font: Cormorant Garamond
Size: 28px / 1.75rem (mobile: 24px / 1.5rem)
Weight: 400
Transform: uppercase
Letter-spacing: 0.15em
Line-height: 1.2

NIVEL 3 — Subtítulo/Label
Font: Montserrat
Size: 11px / 0.6875rem
Weight: 500
Transform: uppercase
Letter-spacing: 0.12em
Line-height: 1.4

NIVEL 4 — Corpo
Font: Montserrat
Size: 15px / 0.9375rem
Weight: 400
Letter-spacing: 0.01em
Line-height: 1.7

NIVEL 5 — Caption/Meta
Font: Montserrat
Size: 12px / 0.75rem
Weight: 400
Color: texto-secundario
Letter-spacing: 0.02em
```

### Wireframe das Seções

```
┌─────────────────────────────────────────────────────────────────┐
│                         SEÇÃO 1: CAPA                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │                      [LOGO]                             │   │
│  │                                                         │   │
│  │              ─────────────────────                      │   │
│  │                                                         │   │
│  │                    P R O P O S T A                      │   │
│  │                                                         │   │
│  │              RESIDÊNCIA ITAIM                           │   │
│  │                                                         │   │
│  │              ─────────────────────                      │   │
│  │                                                         │   │
│  │              Preparado para                             │   │
│  │              MARINA OLIVEIRA                            │   │
│  │                                                         │   │
│  │              Janeiro 2025                               │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 2: RESUMO EXECUTIVO                     │
│                                                                 │
│  LABEL: Resumo Executivo                                        │
│  ───────────────────────                                        │
│                                                                 │
│  [Parágrafo de texto fluido com a visão geral do projeto]       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ○  Bullet point 1                                      │   │
│  │  ○  Bullet point 2                                      │   │
│  │  ○  Bullet point 3                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │  PRAZO           │    │  INVESTIMENTO    │                  │
│  │  90 dias         │    │  R$ 85.000       │                  │
│  └──────────────────┘    └──────────────────┘                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 3: ESCOPO INCLUSO                       │
│                                                                 │
│  LABEL: Escopo do Projeto                                       │
│  ───────────────────────                                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  01   Levantamento arquitetônico                        │   │
│  │  ──────────────────────────────────────────────────     │   │
│  │  02   Estudo preliminar                                 │   │
│  │  ──────────────────────────────────────────────────     │   │
│  │  03   Anteprojeto                                       │   │
│  │  ──────────────────────────────────────────────────     │   │
│  │  04   Projeto executivo                                 │   │
│  │  ──────────────────────────────────────────────────     │   │
│  │  05   Detalhamento de marcenaria                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 4: PROCESSO E ETAPAS                    │
│                                                                 │
│  LABEL: Processo                                                │
│  ───────────────────────                                        │
│                                                                 │
│  ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐       │
│  │  1  │ ─── │  2  │ ─── │  3  │ ─── │  4  │ ─── │  5  │       │
│  └─────┘     └─────┘     └─────┘     └─────┘     └─────┘       │
│  Briefing   Estudo     Anteprojeto  Executivo  Acompan.        │
│  1 sem      2 sem      3 sem        4 sem      Obra            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 5: ENTREGÁVEIS                          │
│                                                                 │
│  LABEL: Entregáveis do Executivo                                │
│  ───────────────────────                                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ☑  Plantas humanizadas                                 │   │
│  │  ☑  Cortes e elevações                                  │   │
│  │  ☑  Projeto de iluminação                               │   │
│  │  ☑  Detalhamento de marcenaria                          │   │
│  │  ☑  Memorial descritivo                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 6: ACOMPANHAMENTO                       │
│                                                                 │
│  LABEL: Acompanhamento de Obra                                  │
│  ───────────────────────                                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │           8 VISITAS TÉCNICAS                            │   │
│  │                                                         │   │
│  │     Visitas técnicas mensais para acompanhamento        │   │
│  │     de obra e verificação de conformidade               │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 7: NÃO INCLUSO                          │
│                                                                 │
│  LABEL: Não Incluso / Premissas                                 │
│  ───────────────────────                                        │
│                                                                 │
│  NÃO INCLUSO                    PREMISSAS                       │
│  ─────────────                  ─────────────                   │
│  • Projeto estrutural           • Aprovação em até 5 dias       │
│  • Projeto hidráulico           • Fornecimento de plantas       │
│  • Projeto elétrico                                             │
│  • RRT/ART                                                      │
│  • Taxas de aprovação                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 8: INVESTIMENTO                         │
│                                                                 │
│  LABEL: Investimento e Condições                                │
│  ───────────────────────                                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  PARCELA              VALOR           %                 │   │
│  │  ───────────────────────────────────────────────────    │   │
│  │  Entrada              R$ 25.500       30%               │   │
│  │  ───────────────────────────────────────────────────    │   │
│  │  Aprovação Antep.     R$ 34.000       40%               │   │
│  │  ───────────────────────────────────────────────────    │   │
│  │  Entrega Final        R$ 25.500       30%               │   │
│  │  ═══════════════════════════════════════════════════    │   │
│  │  TOTAL                R$ 85.000       100%              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Válido até 30/01/2025                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 9: PORTFÓLIO                            │
│                                                                 │
│  LABEL: Portfólio Selecionado                                   │
│  ───────────────────────                                        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │              │  │              │  │              │          │
│  │    IMG 1     │  │    IMG 2     │  │    IMG 3     │          │
│  │              │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  Res. Jardins      Apto Vila Nova    Casa Guarujá              │
│  2024              2023              2024                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   SEÇÃO 10: PRÓXIMOS PASSOS                     │
│                                                                 │
│  LABEL: Próximos Passos                                         │
│  ───────────────────────                                        │
│                                                                 │
│  01  Reunião de alinhamento para aprovação                      │
│  02  Assinatura do contrato e pagamento da entrada              │
│  03  Início do briefing detalhado                               │
│                                                                 │
│                    ┌─────────────────────┐                      │
│                    │   BAIXAR PDF  ↓     │                      │
│                    └─────────────────────┘                      │
│                                                                 │
│  ─────────────────────────────────────────────────────────      │
│                                                                 │
│  CAROLINA MENDES                                                │
│  Arquiteta e Urbanista · CAU A12345-6                          │
│  Studio CM Arquitetura                                          │
│  (11) 99999-8888 · contato@studiocm.com.br                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Design Tokens

### Cores

```css
:root {
  /* Base */
  --color-cream: #EAE5DF;
  --color-taupe: #B2A695;
  --color-card: #CFC5B8;
  --color-line: #C6B6A7;
  --color-accent: #9F8A75;
  --color-text-secondary: #695E54;
  --color-text-strong: #231F19;
  
  /* Semânticos */
  --color-background: var(--color-cream);
  --color-surface: #F5F2EE;
  --color-border: var(--color-line);
}
```

### Spacing Scale (8px base)

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.5rem;    /* 24px */
  --space-6: 2rem;      /* 32px */
  --space-8: 3rem;      /* 48px */
  --space-10: 4rem;     /* 64px */
  --space-12: 5rem;     /* 80px */
  --space-16: 6rem;     /* 96px */
  --space-20: 8rem;     /* 128px */
}
```

### Typography Scale

```css
:root {
  /* Display */
  --text-display: clamp(2.25rem, 5vw, 3rem);
  
  /* Headings */
  --text-h1: clamp(1.5rem, 3vw, 1.75rem);
  --text-h2: clamp(1.25rem, 2.5vw, 1.5rem);
  
  /* Body */
  --text-body: 0.9375rem;
  --text-small: 0.8125rem;
  
  /* Labels */
  --text-label: 0.6875rem;
  --text-caption: 0.75rem;
  
  /* Tracking */
  --tracking-tight: -0.01em;
  --tracking-normal: 0.01em;
  --tracking-wide: 0.08em;
  --tracking-wider: 0.12em;
  --tracking-widest: 0.25em;
}
```

### Border & Shadow

```css
:root {
  /* Radius */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;
  
  /* Borders */
  --border-thin: 1px solid var(--color-line);
  --border-accent: 1px solid var(--color-accent);
  
  /* Shadows */
  --shadow-subtle: 0 1px 3px rgba(35, 31, 25, 0.04);
  --shadow-card: 0 2px 8px rgba(35, 31, 25, 0.06);
  --shadow-elevated: 0 4px 16px rgba(35, 31, 25, 0.08);
}
```

---

## 4. Estrutura de Pastas

```
proposta-arquitetura/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── p/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/
│       ├── proposal/
│       │   └── route.ts
│       └── pdf/
│           └── route.ts
├── components/
│   ├── proposal/
│   │   ├── Cover.tsx
│   │   ├── ExecutiveSummary.tsx
│   │   ├── ScopeList.tsx
│   │   ├── Timeline.tsx
│   │   ├── ExecutiveChecklist.tsx
│   │   ├── SiteVisits.tsx
│   │   ├── Exclusions.tsx
│   │   ├── PricingTable.tsx
│   │   ├── PortfolioGrid.tsx
│   │   └── NextSteps.tsx
│   └── ui/
│       ├── SectionLabel.tsx
│       ├── Divider.tsx
│       └── Button.tsx
├── lib/
│   ├── sheets.ts
│   └── types.ts
├── public/
│   └── fonts/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 5. Print Styles & PDF Logic

### Estratégia de Impressão

1. CSS @media print com regras específicas
2. Page breaks controlados por classe `.page-break-before`
3. Evitar orphans/widows com `break-inside: avoid`
4. Margens A4 padrão (20mm)
5. Cores forçadas com `print-color-adjust: exact`

### Lógica do /api/pdf

```
1. Recebe ?slug=xxx
2. Busca dados do Sheets
3. Renderiza página em URL interna /p/[slug]?print=true
4. Puppeteer captura com:
   - format: 'A4'
   - printBackground: true
   - margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
5. Retorna PDF como download
```

---

## 6. Exemplo de Linha Preenchida

### Dados no Google Sheets (Linha 2)

| Coluna | Valor |
|--------|-------|
| slug | marina-residencia-itaim |
| cliente_nome | Marina Oliveira |
| projeto_nome | Residência Itaim |
| projeto_tipo | Projeto de Interiores |
| data_proposta | 15/01/2025 |
| validade_dias | 15 |
| resumo_texto | Proposta para desenvolvimento de projeto completo de interiores para residência no bairro Itaim Bibi. O projeto contempla todos os ambientes sociais e íntimos, com foco em funcionalidade, conforto e estética contemporânea. |
| resumo_bullets | Estudo de layout otimizado;Projeto luminotécnico completo;Especificação de acabamentos;Detalhamento de marcenaria sob medida |
| prazo_total | 90 dias |
| investimento_total | R$ 85.000 |
| escopo_itens | Levantamento arquitetônico in loco;Estudo preliminar com 2 opções de layout;Anteprojeto detalhado;Projeto executivo completo;Detalhamento de marcenaria;Especificação de materiais e fornecedores |
| etapas_nomes | Briefing;Estudo Preliminar;Anteprojeto;Projeto Executivo;Acompanhamento |
| etapas_duracoes | 1 semana;2 semanas;3 semanas;4 semanas;Durante obra |
| entregaveis | Plantas humanizadas em 3D;Cortes e elevações;Projeto de iluminação e elétrica;Detalhamento de marcenaria;Memorial descritivo;Planilha de orçamento estimativo |
| visitas_qtd | 8 |
| visitas_descricao | Visitas técnicas mensais para acompanhamento da execução e verificação de conformidade com o projeto |
| nao_incluso | Projeto estrutural;Projeto hidráulico;Projeto elétrico (apenas luminotécnico);RRT/ART complementares;Taxas de aprovação em condomínio |
| premissas | Aprovação de cada etapa em até 5 dias úteis;Fornecimento de plantas atualizadas do imóvel;Acesso ao imóvel para medições |
| parcelas_descricao | Entrada (assinatura);Aprovação do Anteprojeto;Entrega Final |
| parcelas_valores | R$ 25.500;R$ 34.000;R$ 25.500 |
| parcelas_pct | 30%;40%;30% |
| portfolio_urls | https://images.unsplash.com/photo-1600210492493-0946911123ea;https://images.unsplash.com/photo-1600607687939-ce8a6c25118c;https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3 |
| portfolio_legendas | Residência Jardins, São Paulo — 2024;Apartamento Vila Nova Conceição — 2023;Casa de Praia Guarujá — 2024 |
| proximo_passo_1 | Reunião de alinhamento para discussão e aprovação da proposta |
| proximo_passo_2 | Assinatura do contrato e pagamento da entrada (30%) |
| proximo_passo_3 | Agendamento da primeira visita técnica e início do briefing |
| arquiteta_nome | Carolina Mendes |
| arquiteta_cargo | Arquiteta e Urbanista |
| arquiteta_cau | CAU A98765-4 |
| escritorio_nome | Studio CM Arquitetura |
| escritorio_telefone | (11) 99876-5432 |
| escritorio_email | carolina@studiocm.arq.br |
| logo_url | https://i.imgur.com/example-logo.png |
