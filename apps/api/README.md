# API local

API REST local para testar o fluxo do Pod Control Center antes das integrações
com OBS e YouTube. Ela usa apenas Node.js e persiste os dados em
`apps/api/data/pod-control-center.local.json` quando iniciada pelo comando do
workspace.

## Executar

```bash
pnpm --filter @pod-control-center/api dev
```

Ou gere o JavaScript e execute-o:

```bash
pnpm --filter @pod-control-center/api build
pnpm --filter @pod-control-center/api start
```

Por padrão, a API escuta apenas em `http://127.0.0.1:3100`. É possível alterar
a porta e o arquivo de dados com as variáveis `PORT` e `POD_CONTROL_DATA_FILE`.

## Rotas

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/health` | Verifica se a API está disponível. |
| `GET`, `POST` | `/pods` | Lista ou cria pods. |
| `GET`, `PATCH`, `DELETE` | `/pods/:id` | Consulta, atualiza ou remove um pod. |
| `GET`, `POST` | `/appointments` | Lista ou cria agendamentos. |
| `GET`, `PATCH`, `DELETE` | `/appointments/:id` | Opera um agendamento. |
| `GET`, `POST` | `/episodes` | Lista ou cria episódios. |
| `GET`, `PATCH`, `DELETE` | `/episodes/:id` | Opera um episódio. |
| `GET`, `POST` | `/transmissions` | Lista ou inicia o registro de uma transmissão. |
| `GET`, `PATCH`, `DELETE` | `/transmissions/:id` | Atualiza estado ou remove uma transmissão. |

## Exemplo

```bash
curl http://127.0.0.1:3100/pods

curl -X POST http://127.0.0.1:3100/appointments \
  -H "Content-Type: application/json" \
  -d "{\"podId\":\"pod-01\",\"title\":\"Podcast Mesa 12\",\"startsAt\":\"2026-07-23T14:00:00.000Z\",\"endsAt\":\"2026-07-23T16:00:00.000Z\"}"
```
