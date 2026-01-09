# Sistema de Propostas — Escritório de Arquitetura

Template editorial premium para propostas comerciais de arquitetura.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Data:** Google Sheets API
- **PDF:** Puppeteer + Chromium
- **Deploy:** Vercel

---

## Quick Start

### 1. Clone e instale

```bash
git clone <seu-repo>
cd proposta-arquitetura
npm install
```

### 2. Configure o Google Sheets

#### 2.1 Crie o Service Account

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Ative a **Google Sheets API**
4. Vá em **IAM & Admin > Service Accounts**
5. Crie um Service Account
6. Gere uma chave JSON e baixe

#### 2.2 Configure a Planilha

1. Crie uma planilha no Google Sheets
2. Renomeie a primeira aba para `PROPOSTAS`
3. Adicione os cabeçalhos na linha 1 (veja modelo abaixo)
4. Compartilhe a planilha com o email do Service Account

#### 2.3 Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Preencha com suas credenciais:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@projeto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1abc...xyz
```

### 3. Rode localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000/p/SEU-SLUG`

---

## Modelo da Planilha

### Cabeçalhos (Linha 1)

| Coluna | Nome |
|--------|------|
| A | slug |
| B | cliente_nome |
| C | projeto_nome |
| D | projeto_tipo |
| E | data_proposta |
| F | validade_dias |
| G | resumo_texto |
| H | resumo_bullets |
| I | prazo_total |
| J | investimento_total |
| K | escopo_itens |
| L | etapas_nomes |
| M | etapas_duracoes |
| N | entregaveis |
| O | visitas_qtd |
| P | visitas_descricao |
| Q | nao_incluso |
| R | premissas |
| S | parcelas_descricao |
| T | parcelas_valores |
| U | parcelas_pct |
| V | portfolio_urls |
| W | portfolio_legendas |
| X | proximo_passo_1 |
| Y | proximo_passo_2 |
| Z | proximo_passo_3 |
| AA | arquiteta_nome |
| AB | arquiteta_cargo |
| AC | arquiteta_cau |
| AD | escritorio_nome |
| AE | escritorio_telefone |
| AF | escritorio_email |
| AG | logo_url |

### Campos com Listas

Use `;` (ponto e vírgula) para separar itens:

```
resumo_bullets: Item 1;Item 2;Item 3
escopo_itens: Levantamento;Estudo;Projeto
portfolio_urls: url1;url2;url3
portfolio_legendas: Legenda 1;Legenda 2;Legenda 3
```

### Slug Automático

Se o campo `slug` estiver vazio, será gerado automaticamente a partir de `cliente_nome` + `projeto_nome`:

- "Marina Oliveira" + "Residência Itaim" → `marina-oliveira-residencia-itaim`

---

## Deploy na Vercel

### 1. Conecte ao repositório

```bash
vercel
```

### 2. Configure variáveis de ambiente

No dashboard da Vercel:

1. Settings → Environment Variables
2. Adicione:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`

### 3. Deploy

```bash
vercel --prod
```

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial (placeholder) |
| `/p/[slug]` | Página da proposta |
| `/api/pdf?slug=xxx` | Download do PDF |
| `/api/proposal?slug=xxx` | JSON da proposta |

---

## Customização

### Cores

Edite `tailwind.config.ts`:

```ts
colors: {
  cream: '#EAE5DF',
  taupe: '#B2A695',
  card: '#CFC5B8',
  line: '#C6B6A7',
  accent: '#9F8A75',
  'text-secondary': '#695E54',
  'text-strong': '#231F19',
}
```

### Fontes

O projeto usa:
- **Títulos:** Cormorant Garamond
- **Corpo:** Montserrat

Para trocar, edite `app/globals.css` e `tailwind.config.ts`.

### Logo

Coloque a URL do logo na coluna `logo_url` da planilha.

---

## Troubleshooting

### PDF não gera no local

Certifique-se de ter o Chrome instalado. O caminho é detectado automaticamente para Mac/Windows/Linux.

### Erro de autenticação no Sheets

1. Verifique se a planilha está compartilhada com o Service Account
2. Confirme que a API está ativada no Google Cloud
3. Confira se a chave privada está com `\n` corretos

### Imagens não aparecem no PDF

Verifique se as URLs das imagens são públicas e acessíveis via HTTPS.

---

## Licença

Uso interno apenas.
