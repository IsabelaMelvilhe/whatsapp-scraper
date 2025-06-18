# Whatsapp Scraper

Este projeto é um scraper de mensagens do WhatsApp Web utilizando Puppeteer, Express e Sequelize. Ele permite capturar mensagens de conversas do WhatsApp Web e expor endpoints para consulta e envio de mensagens via API REST.

## Funcionalidades

- Automatiza o acesso ao WhatsApp Web e coleta de mensagens das conversas.
- API REST para listar e criar mensagens.
- Integração com banco de dados MySQL via Sequelize.
- Interface web simples para interação.

## Instalação

 Instale as dependências:

```npm install```

Configure o banco de dados em:

```config/default.json```

Crie as tabelas necessárias:

```npm run create-table```

## Uso

Inicie o servidor:

```npm start```

Acesse o WhatsApp Web e faça login quando solicitado.

Após o login, todas as mensagens são lidas e salvas no banco de dados.

Utilize os endpoints da API:

`GET /mensagens` - Lista todas as mensagens.

`POST /mensagens` - Envia uma mensagem e armazena no banco.

## Observações

O Puppeteer abre o navegador em modo não-headless para permitir o login manual no WhatsApp Web via QR Code.
