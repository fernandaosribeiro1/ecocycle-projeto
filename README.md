# Ecocycle — Projeto (frontend)

Este repositório contém a versão frontend do site Ecocycle, construída com Angular 17 (standalone components).
O README a seguir explica como rodar, desenvolver e resolver os problemas mais comuns que surgiram durante o desenvolvimento.

## Conteúdo deste README
- Visão geral
- Pré-requisitos
- Instalação
- Como rodar em desenvolvimento
- Scripts úteis
- Estrutura principal do projeto
- Rotas principais
- Notas sobre estilos e assets
- Como contribuir

---

## Visão geral
Aplicação Single Page (Angular) com componentes standalone. A home foi organizada como `HomeComponent` (header, hero, seções e footer). O login/signup são rotas separadas (`/login` e `/cadastro`) para que o formulário de login não apareça na home por padrão.

O projeto inclui algumas convenções úteis e scripts auxiliares para corrigir saídas do gerador (`fix:styleurls`) e ajustes visuais (tipografia, box-sizing global etc.).

---

## Pré-requisitos
- Node.js 18+ (LTS)
- npm
- Angular CLI (opcional localmente — o projeto usa os scripts npm que chamam `ng`)

Verifique versões instaladas:

```powershell
node -v
npm -v
```

---

## Instalação
1. Instale dependências:

```powershell
npm install
```

2. (Opcional) Se precisar executar o script que corrige geradores de componentes:

```powershell
npm run fix:styleurls
```

---

## Como rodar em desenvolvimento
- Porta padrão (4200):

```powershell
npm start
```

- Se a porta 4200 estiver ocupada, execute com outra porta (ex.: 4300):

```powershell
npm start -- --port 4300
```

- Para build de produção:

```powershell
npm run build
```

- Para servir a versão SSR (server-side rendering) após build:

```powershell
npm run build
# depois (conforme package.json)
npm run serve:ssr:Ecocycle-Projeto
```

---

## Scripts úteis (do package.json)
- `npm start` — inicia `ng serve` (desenvolvimento)
- `npm run build` — build de produção
- `npm run watch` — build em modo watch
- `npm run test` — executa testes (karma/jasmine)
- `npm run fix:styleurls` — script para corrigir um bug de gerador que produz `styleUrl` em vez de `styleUrls` (útil quando gerar componentes com schematic)
- `npm run serve:ssr:Ecocycle-Projeto` — serve o servidor SSR (após build)

---

## Estrutura principal do projeto (resumida)
- `src/` — código fonte Angular
	- `app/` — componentes do app
		- `header/`, `menu-fixo/`, `hero/`, `como-funciona/`, `parceiros-premium/`, `interface-intuitiva/`, `footer/`, `login/`, `cadastro/`, `home/` etc.
	- `assets/` — imagens, fontes
	- `styles.scss` — estilos globais (tipografia, box-sizing, fonts)
	- `main.ts`, `index.html`, `server.ts` (SSR)
- `scripts/fix-styleurl.js` — utilitário para ajustar metadados gerados

---

## Rotas principais implementadas
As rotas são definidas em `src/app/app.routes.ts`:
- `/` → `HomeComponent` (página principal)
- `/login` → `LoginComponent` (tela de login)
- `/cadastro` → `CadastroComponent` (tela de cadastro)

Observação: os links do tipo `routerLink` foram adicionados nos templates dos componentes para permitir navegação sem recarregar a página.

---

## Problemas comuns e como resolvê-los (e o que já foi feito)
Abaixo estão problemas que apareceram durante o desenvolvimento e a solução aplicada — útil como referência.

1) Faixa branca ou overflow horizontal no layout
- Sintoma: aparece uma faixa branca lateral ou overflow horizontal inesperado.
- Causa comum: elementos com `width:100%` combinados com `padding` quando `box-sizing` é `content-box` (padrão), ou elementos posicionados com `left/right` e padding lateral grande.
- Solução aplicada no projeto:
	- Adicionado globalmente em `src/styles.scss`:
		```scss
		*, *::before, *::after { box-sizing: border-box; }
		body { overflow-x: hidden; }
		```
	- Se persistir, reduzir paddings horizontais em barras fixas (ex.: `.menu-fixo-navbar { padding: 20px clamp(16px, 4vw, 50px); }`).

2) Erro ao compilar template com `@` em texto (NG5002 / NG5008 etc.)
- Sintoma: ao colocar um email ou uma string com `@` no template externo, o compilador pode reclamar: "Incomplete block \"ecocycle\". If you meant to write the @ character, you should use the "&#64;" HTML entity instead." ou similar.
- Explicação: dependendo da versão do parser/template e do contexto, o `@` pode ser interpretado. A solução segura é escapar `@` como `&#64;` no HTML externo, ou usar `mailto:oi&#64;exemplo.com` como href.
- O que fizemos: substituímos `oi@ecocycle.com` por `oi&#64;ecocycle.com` (no texto e no `href`) no template do footer para evitar o erro de parsing.

3) Erro "Component 'X' is not resolved: templateUrl/styleUrls" e mensagem sobre `resolveComponentResources()`
- Sintoma: Angular reclama que o componente não está resolvido devido a `templateUrl`/`styleUrls`.
- Causa comum: template HTML malformado (duplicação ou tag não fechada), arquivos renomeados ou não salvos, ou problema temporário no compilador.
- Solução aplicada: limpei e corrigi `footer.component.html` (havia duplicação/malformação) e garanti que os arquivos existam; às vezes reiniciar o servidor (`npm start`) resolve.

4) Links `routerLink` não funcionam no template: "Can't bind to 'routerLink' since it isn't a known property"
- Causa: componente standalone não importou `RouterLink` (ou módulo `RouterModule`) no metadata.
- Solução: adicione `RouterLink` (e opcionalmente `CommonModule`) no array `imports` do componente standalone, por exemplo:
	```ts
	imports: [CommonModule, RouterLink]
	```

---

## Boas práticas e dicas de desenvolvimento
- Sempre rode `npm run fix:styleurls` caso tenha usado um gerador e os metadados `styleUrl` venham incorretos.
- Use `routerLink` para navegação interna e garanta que `RouterLink` esteja importado em componentes standalone que usam esse binding.
- Para depuração de layout, habilite no CSS temporariamente `outline` e `min-height` em componentes suspeitos para localizar onde estão sendo renderizados.

---

## Como contribuir
- Faça um fork do repositório, crie uma branch e abra um Pull Request.
- Procedimentos:
	- `npm install`
	- `npm start` (desenvolvimento)
	- Faça mudanças em uma branch descritiva
	- Submeta PR com descrição clara do que foi alterado

---

## Contato / Observações finais
- Arquivos de fontes estão em `src/assets/fonts` — verifique se as fontes proprietárias (ex.: Geist .woff2) estão presentes no projeto.
- Se você encontrar problemas específicos ao rodar o app local (erros no console do browser ou no terminal), cole a mensagem de erro aqui e eu te ajudo a resolver.

---

Licença: Este README não altera nenhum termo de licença do projeto. Se quiser, posso adicionar uma seção de LICENÇA (MIT/Apache/Proprietária) conforme necessidade.


Se quiser, eu adiciono também uma seção "Como testar" com exemplos de testes unitários, ou um checklist de revisão visual (responsividade, tipografia, acessibilidade).
