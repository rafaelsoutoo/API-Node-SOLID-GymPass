## GymPss app

## RFs

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter seu histórico de check-ins;
- [] Deve ser possível o usuário buscar academias próximas;
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível validar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs

- [] o usuário não deve poder se cadatrar com um e-mail duplicado;
- [] o usuário não deve pode fazer 2 check-in no mesmo dia;
- [] o usuário não deve pode fazer check-in se náo tiver perto (100m) da academia;
- [] o check-in só pode ser validado até 20 min após criado;
- [] o check-in só pode ser validado por administradores;
- [] academia so pode er cadastradas por  administradores;

## RNFs

- [] a senha do usuário precisa estar criptografada;
- [] os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] todas listas de dados precisam estar paginadas com 20 itens por páginas;
- [] o usuário deve ser  indentificado por um JWT (Json Web Token);