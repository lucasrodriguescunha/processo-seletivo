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

### Instalação e Execução

**Backend (Spring Boot)**

Clone o repositório:

```console
git clone https://github.com/lucasrodriguescunha/processo-seletivo
```

Navegue até o diretório do backend:

```console
cd backend-processo-seletivo
```

Execute o aplicativo:

```console
./mvnw spring-boot:run
```

A API estará disponível em:

```console
http://localhost:8080
```

---

**Frontend (Angular)**

Clone o repositório:

```console
git clone https://github.com/lucasrodriguescunha/processo-seletivo
```

Navegue até o diretório do frontend:

```console
cd frontend-processo-seletivo
```

Instale as dependências:

```console
npm install
```

Inicie o servidor de desenvolvimento:

```console
ng serve
```

O frontend estará disponível em:

```console
http://localhost:4200
```

### Documentação da API

A documentação da API pode ser acessada através do Swagger, detalhando os endpoints disponíveis, métodos HTTP, parâmetros e exemplos de requisições e respostas:

- URL da Documentação (Swagger): `http://localhost:8080/swagger-ui/index.html#/`




