# Processo Seletivo: Empresa Jovem Virtual UNIFAGOC
## Sistema de Gerenciamento de Projetos e Tarefas

Este repositório tem como objetivo criar um sistema de gerenciamento de projetos e tarefas, permitindo aos usuários criar, visualizar, atualizar e excluir projetos e suas respectivas tarefas. O sistema inclui uma API backend em Java (Spring Boot) e um frontend desenvolvido em Angular que consome essa API.

### Sumário
- [Funcionalidades](#funcionalidades)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Endpoints da API](#endpoints-da-api)
  - [Endpoints de projetos](#endpoints-de-projetos)
  - [Endpoints de tarefas](#endpoints-de-tarefas)
- [Instalação e execução](#instalação-e-execução)
  - [Backend (Spring Boot)](#backend-spring-boot)
  - [Frontend (Angular)](#frontend-angular)
  - [Database (PostgreSQL)](#database-postgresql)
- [Documentação da API](#documentação-da-api)

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

#### **Backend (Spring Boot)**

**Pré-requisitos:** É necessário ter o JDK 18 ou superior instalado.

1. *Java Development Kit (JDK):*

- Você pode verificar a instalação do JDK com o comando:

```console
java -version
```

2. *Apache Maven:*

- O Maven é utilizado para gerenciamento de dependências e construção do projeto. Você pode verificar a instalação do Maven com o comando:

```console
mvn -v
```

- Clone o repositório:

```console
git clone https://github.com/lucasrodriguescunha/processo-seletivo
```

- Navegue até o diretório do backend:

```console
cd backend-processo-seletivo
```

- Execute o aplicativo:

```console
./mvnw spring-boot:run
```

- A API estará disponível em:

```console
http://localhost:8080
```

### Documentação da API

A documentação da API pode ser acessada através do Swagger, detalhando os endpoints disponíveis, métodos HTTP, parâmetros e exemplos de requisições e respostas:

- URL da Documentação (Swagger): `http://localhost:8080/swagger-ui/index.html#/`

---

**Frontend (Angular)**

**Pré-requisitos:** Antes de começar, você precisa ter o Node.js e o Angular CLI instalados na sua máquina.

1. *Instalar o Node.js:*

- Faça o download e instale o Node.js
- Você pode verificar a instalação abrindo um terminal e digitando:

```console
node -v
npm -v
```

2. *Instalar o Angular CLI:*

- Após instalar o Node.js, você pode instalar o Angular CLI globalmente usando o seguinte comando:

```console
npm install -g @angular/cli
```

- Verifique a instalação do Angular CLI com:

```console
ng version
```

- Clone o repositório:

```console
git clone https://github.com/lucasrodriguescunha/processo-seletivo
```

- Navegue até o diretório do frontend:

```console
cd frontend-processo-seletivo
```

- Instale as dependências:

```console
npm install
```

- Inicie o servidor de desenvolvimento:

```console
ng serve
```

- O frontend estará disponível em:

```console
http://localhost:4200
```

---

#### **Database (PostgreSQL)**

**Pré-requisitos:** 

1. *Instalação do PostgreSQL:*

- Certifique-se de ter o PostgreSQL instalado em sua máquina.

2. *Criar um Banco de Dados:*

- Após a instalação, você pode criar um novo banco de dados usando o terminal do PostgreSQL ou uma interface gráfica como o pgAdmin. Execute os seguintes comandos no terminal do PostgreSQL:

3. *Abra o terminal do PostgreSQL:*

```console
psql -U seu_usuario
```

- Após entrar no terminal do PostgreSQL, execute o seguinte comando para criar o banco de dados:

```console
CREATE DATABASE db-processo-seletivo;
```

4. *Configuração do Banco de Dados no Spring Boot:*

- No arquivo *application.yml* do seu projeto Spring Boot, adicione as seguintes configurações:

```console
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/db-processo-seletivo  # URL de conexão com o banco de dados PostgreSQL local
    username: postgres  # Usuário do banco de dados
    password: root  # Senha do banco de dados
  jpa:
    hibernate:
      ddl-auto: update  # Atualiza automaticamente a estrutura do banco de dados conforme as mudanças no modelo JPA (use com cuidado em produção)
    show-sql: true  # Exibe as queries SQL no console, útil para depuração e análise de performance
  main:
    allow-bean-definition-overriding: true  # Permite que definições de beans sejam sobrescritas, útil em cenários de personalização

server:
  port: 8080  # Porta em que o servidor estará escutando
```

4. *Observações:*

- Substitua nome_do_banco_de_dados, seu_usuario, e sua_senha pelas informações corretas do banco de dados.

Com essas instruções, você estará pronto para usar o PostgreSQL no sistema de gerenciamento de projetos e tarefas.





