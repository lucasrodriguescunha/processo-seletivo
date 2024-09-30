# Processo Seletivo: Empresa Jovem Virtual UNIFAGOC
## Sistema de Gerenciamento de Projetos e Tarefas

Este repositório tem como objetivo criar um sistema de gerenciamento de projetos e tarefas, permitindo aos usuários criar, visualizar, atualizar e excluir projetos e suas respectivas tarefas. O sistema inclui uma API backend em Java (Spring Boot) e um frontend desenvolvido em Angular que consome essa API.

### Funcionalidades

**Gerenciamento de Projetos:** Criação, listagem, atualização de status ("Não iniciado", "Em andamento", "Concluído"), atualização dos dados e exclusão de projetos.

**Gerenciamento de Tarefas:** Criação, listagem, atualização de status ("Não iniciada", "Em andamento", "Concluída"), atualização dos dados e exclusão de tarefas.

### Tecnologias utilizadas

**Backend** 

- Linguagem: Java
- Framework: Spring Boot
- Banco de dados: PostgreSQL

**Frontend**

- HTML5, CSS/Bootstrap, TypeScript
- Framework: Angular
- Consumo da API: Fetch API

### Endpoints da API

A seguir estão todos os endpoints disponíveis para o gerenciamento de tarefas e projetos:

**Endpoints de Projetos**

***Criar Projeto***
- **Método:** `POST`
- **URL:** `/api/projetos`

***Listar Projetos***
- **Método:** `GET`
- **URL:** `/api/projetos`

***Visualizar Projeto***
- **Método:** `GET`
- **URL:** `/api/projetos/{id}`

***Atualizar Projeto***
- **Método:** `PUT`
- **URL:** `/api/projetos/{id}`

***Atualizar Status do Projeto***
- **Método:** `PUT`
- **URL:** `/api/projetos/{id}/status`

***Excluir Projeto***
- **Método:** `DELETE`
- **URL:** `/api/projetos/{id}`

---

**Endpoints de Tarefas**

***Criar Tarefa***
- **Método:** `POST`
- **URL:** `/api/tarefas`

***Listar Tarefas***
- **Método:** `GET`
- **URL:** `/api/tarefas`

***Visualizar Tarefa***
- **Método:** `GET`
- **URL:** `/api/tarefas/{id}`

***Atualizar Tarefa***
- **Método:** `PUT`
- **URL:** `/api/tarefas/{id}`

***Atualizar Status da Tarefa***
- **Método:** `PUT`
- **URL:** `/api/tarefas/{id}/status`

***Excluir Tarefa***
- **Método:** `DELETE`
- **URL:** `/api/tarefas/{id}`

***Filtrar Tarefas***
- **Método:** `GET`
- **URL:** `/api/tarefas/filtro`

### Documentação da API

A documentação da API pode ser acessada através do Swagger, detalhando os endpoints disponíveis, métodos HTTP, parâmetros e exemplos de requisições e respostas:

- URL da Documentação (Swagger): `http://localhost:8080/swagger-ui/index.html#/`

### Instalação e Execução

**Backend (Spring Boot)**

Clone o repositório:

```console
git clone https://github.com/seuusuario/seurepositorio.git
