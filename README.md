# Projeto Node.js com SOLID, CI/CD, Testes Unitários e E2E

Este projeto é uma aplicação backend desenvolvida em Node.js que adota os princípios SOLID, integrações contínuas (CI), entregas contínuas (CD) e inclui testes unitários e de ponta a ponta (e2e). A aplicação oferece funcionalidades para gerenciamento de usuários e academias.

## Funcionalidades

### Requisitos Funcionais (RFs)
- [x] Cadastro de usuários
- [x] Autenticação de usuários
- [x] Obtenção do perfil do usuário logado
- [x] Obtenção do número de check-ins realizados pelo usuário logado
- [x] Histórico de check-ins do usuário
- [x] Busca de academias próximas
- [x] Busca de academias pelo nome
- [x] Check-in em academias
- [x] Validação de check-ins
- [x] Cadastro de academias

### Regras de Negócio (RNs)
- [x] Não permitir cadastro com e-mail duplicado
- [x] Não permitir mais de um check-in por dia
- [x] Não permitir check-in fora do raio de 100m da academia
- [x] Check-in válido até 20 minutos após a criação
- [x] Apenas administradores podem validar check-ins
- [x] Apenas administradores podem cadastrar academias

### Requisitos Não Funcionais (RNFs)
- [x] Senha do usuário criptografada
- [x] Dados persistidos em PostgreSQL
- [x] Listas de dados paginadas com 20 itens por página
- [x] Identificação do usuário por JWT (Json Web Token)

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/rafaelsoutoo/API-Node-SOLID-GymPass.git
   cd API-Node-SOLID-GymPass
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente conforme ".env.example".

4. **Iniciar o Docker**

    ```bash
   docker compose up -d
   ```

5. **Rodar a Aplicação em Ambiente de Desenvolvimento**

   ```bash
   npm run dev
   ```

