# Pod Control Center

Painel de controle para centralizar a operação de um estúdio de podcast: a
aplicação desktop reúne, em uma única interface, integrações com OBS, YouTube e
automações. O projeto está em fase inicial; hoje ele entrega a fundação do app
Electron e a organização do monorepo.

## Estado atual

- Aplicação desktop em Electron, empacotada e servida por `electron-vite`.
- Interface de renderer em TypeScript e HTML/CSS, atualmente com uma tela
  inicial.
- Ponte segura e mínima entre Electron e a interface: expõe apenas a plataforma
  do sistema como `window.podControl.platform`.
- Estrutura preparada para API, integrações com OBS e YouTube, automações e
  pacotes compartilhados. Esses módulos ainda não têm implementação funcional.

## Tecnologias

- Node.js e TypeScript (ESM)
- pnpm workspaces
- Turborepo
- Electron, electron-vite e Vite

## Estrutura

```text
apps/
  desktop/       Aplicação Electron (main, preload e renderer)
  api/           Espaço reservado para a API
packages/
  config/        Configurações compartilhadas
  shared/        Código compartilhado
  types/         Tipos compartilhados
  ui/            Componentes de interface compartilhados
services/
  automation/    Integrações de automação
  obs/           Integração com OBS
  youtube/       Integração com YouTube
```

## Pré-requisitos

- Node.js compatível com as dependências do projeto
- pnpm 11 ou posterior

O repositório declara pnpm como gerenciador obrigatório. Caso necessário,
ative-o com Corepack:

```bash
corepack enable
corepack prepare pnpm@11.13.1 --activate
```

## Como executar

Na raiz do repositório, instale as dependências:

```bash
pnpm install
```

Inicie apenas o aplicativo desktop:

```bash
pnpm desktop
```

Ou inicie as tarefas de desenvolvimento dos workspaces:

```bash
pnpm dev
```

## Comandos úteis

| Comando | Descrição |
| --- | --- |
| `pnpm desktop` | Abre o app Electron em modo de desenvolvimento. |
| `pnpm dev` | Executa os scripts `dev` disponíveis no monorepo via Turborepo. |
| `pnpm build` | Gera os builds dos workspaces. |
| `pnpm lint` | Executa as verificações de lint configuradas. |
| `pnpm typecheck` | Executa a checagem de tipos dos workspaces. |
| `pnpm --filter @pod-control-center/desktop build` | Gera o build do desktop. |
| `pnpm --filter @pod-control-center/desktop preview` | Abre a prévia do build do desktop. |

## Arquitetura do desktop

O app em `apps/desktop` separa as responsabilidades do Electron:

- `src/main`: processo principal, responsável por criar a janela.
- `src/preload`: ponte controlada entre processos.
- `src/renderer`: interface exibida ao usuário.

A janela usa `contextIsolation`, sandbox e `nodeIntegration: false`. Novas APIs
para o renderer devem ser adicionadas deliberadamente ao preload; não exponha
acesso direto a módulos Node.js ou Electron à interface.

## Convenções

- O projeto usa módulos ECMAScript (`"type": "module"`).
- As configurações TypeScript estendem `tsconfig.base.json`.
- No desktop, `rootDir` é `src` e o `typecheck` é executado com
  `tsc --noEmit`.
- A orquestração de tarefas fica em `turbo.json`; artefatos de build são
  publicados em `dist/**` para o cache do Turbo.

## Próximos passos

As prioridades naturais são implementar os contratos compartilhados, definir a
API e acrescentar as integrações com OBS, YouTube e automação sem ampliar a
superfície exposta pelo preload.
