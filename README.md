# Sales System Project

Projeto standalone do sistema de vendas.

## Rodar localmente

```bash
yarn install
yarn db:setup
yarn dev
```

Aplicação: `http://localhost:3002`

## Observações

- crie `.env` a partir de `.env.example`
- configure `DATABASE_URL` e `DIRECT_URL` com as credenciais do Neon
- use `yarn db:setup` para gerar o client Prisma, aplicar o schema e popular os dados
- para deploy na Vercel, cadastre as mesmas variáveis de ambiente do `.env`

## Deploy

- GitHub remoto atual: `https://github.com/moysesemanuel/sales-system.git`
- banco esperado: Neon/PostgreSQL
- a Vercel não exige `vercel.json` para este projeto; o essencial é conectar o repositório e definir `DATABASE_URL` e `DIRECT_URL`
