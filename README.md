## GymPss app


## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs

- [x] o usuário não deve poder se cadatrar com um e-mail duplicado;
- [x] o usuário não deve pode fazer 2 check-in no mesmo dia;
- [x] o usuário não deve pode fazer check-in se náo tiver perto (100m) da academia;
- [x] o check-in só pode ser validado até 20 min após criado;
- [x] o check-in só pode ser validado por administradores;
- [x] academia so pode ser cadastradas por administradores;

## RNFs

- [x] a senha do usuário precisa estar criptografada;
- [x] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] todas listas de dados precisam estar paginadas com 20 itens por páginas;
- [x] o usuário deve ser  indentificado por um JWT (Json Web Token);