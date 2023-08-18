
# Projeto Semanal | Locadora de Filmes

## Índice

- [Introdução](#introdução)
- [Instruções de Uso](#instruções-de-uso)
- [Regras da Entrega](#regras-da-entrega)
- [Tabela](#tabela)
- [Endpoints da Aplicação](#endpoints-da-aplicação)
- [Regras da Aplicação](#regras-da-aplicação)
  - [GET /movies](#get-movies)
  - [Casos de Erro](#casos-de-erro)
- [Exemplos de Requisição](#exemplos-de-requisição)
- [Middlewares](#middlewares)
- [Observações](#observações)

## Introdução

Neste projeto, implementei uma API para gerenciar a coleção de filmes de uma locadora que é utilizada em uma plataforma de streaming.

## Tecnologias Utilizadas

[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-gray?logo=express)](https://expressjs.com/)
[![pgFormat](https://img.shields.io/badge/pgFormat-blue)](https://www.npmjs.com/package/pgformat)


## Instruções de Uso

1. Clone o repositório da entrega.
2. Importe o arquivo "movies_workspace" no aplicativo Insomnia para obter as rotas e regras da API.

**Observações**:
- O workspace do Insomnia possui duas páginas:
  - Página para Debug: Pode ser usada para testes.
  - Página para Testes: Não altere nenhum teste ou rota nessa página.

## Regras da Entrega

- Código em TypeScript.
- Banco de dados Postgres.
- Nome da tabela, colunas e especificações devem ser seguidos rigorosamente.
- Pasta "sql" com:
  - create_table.sql: Criação da tabela "movies".
- Diagrama da tabela em "diagram.png" ou "diagram.jpg".
- Organização de arquivos como visto previamente.

## Tabela

Nome da tabela: movies

| Coluna    | Especificações                  |
|-----------|---------------------------------|
| id        | Inteiro, serial, chave primária |
| name      | String, tamanho 50, não nulo    |
| category  | String, tamanho 20, não nulo    |
| duration  | Inteiro, não nulo               |
| price     | Inteiro, não nulo               |

## Endpoints da Aplicação

| Método  | Endpoint     | Responsabilidade          |
|---------|--------------|---------------------------|
| POST    | /movies      | Criar um filme            |
| GET     | /movies      | Listar todos os filmes    |
| GET     | /movies/:id  | Buscar filme por id       |
| PATCH   | /movies/:id  | Atualizar filme por id    |
| DELETE  | /movies/:id  | Deletar filme por id      |

## Regras da Aplicação

### GET /movies

- Listar todos os filmes do cinema.
- Listar filmes por categoria enviada via query parameter "category".
- Caso a categoria não exista, retornar todos os filmes do banco.

### Casos de Erro

Nas rotas GET, PATCH e DELETE /movies/:id, caso o id não exista:

Resposta do servidor:

```json
{
  "message": "Movie not found!"
}
```

Status code: 404 NOT FOUND.

Nas rotas POST e PATCH, caso o "name" já exista:

Resposta do servidor:

```json
{
  "message": "Movie name already exists!"
}
```

Status code: 409 CONFLICT.

## Exemplos de Requisição

### POST /movies

**Corpo de envio da requisição**:

```json
{
  "name": "Divertidamente",
  "category": "Animação",
  "duration": 120,
  "price": 35
}
```

**Resposta do servidor**:

```json
{
  "id": 1,
  "name": "Divertidamente",
  "category": "Animação",
  "duration": 120,
  "price": 35
}
```

Status code: 201 CREATED.

### GET /movies

**Resposta do servidor**:

```json
[
  {
    "id": 1,
    "name": "Divertidamente",
    "category": "Animação",
    "duration": 120,
    "price": 35
  },
  {
    "id": 2,
    "name": "Matrix",
    "category": "Ficção",
    "duration": 120,
    "price": 35
  }
]
```

Status code: 200 OK.

## Middlewares

- Verificação de Nome Existente: Middleware para verificar se o nome do produto já existe no banco.
- Verificação de ID Existente: Middleware para verificar se o ID do produto existe no banco.

## Observações

A constante "market" em "database.ts" simula o banco de dados.

