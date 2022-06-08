
# ADMIN-IDQBRN

Front-end do sistema de controle de doenças do IDQBRN 

## 🔨 Funcionalidades do projeto


O sistema possui uma pagina para mostrar os casos de doenças no brasil, podendo filtrar por doença, estado ou cidade. Esses casos sao representados em um mapa.

Além dessa pagina inicial, é possivel, mediante um login, acessar uma pagina para adicionar, alterar ou excluir casos de doenças ou registrar novos usuarios.



## 🔗 Páginas web

- `/`: Pagina inicial, visualizacao do mapa

- `/login`: Pagina para realizar o login

- `/admin`: Pagina autenticada, onde o admin pode manipular o banco de dados

## ✔️ Técnicas e tecnologias utilizadas



- `Vite+TypeScript`: Ferramentas de desenvolvimento
- `Vuejs`: Framework para desenvolvimento de interface
- `Vuetify`: Biblioteca para Design
- `Pinia`: Biblioteca para Store

## 📁 Acesso ao projeto

Para ter acesso aos arquivos do projeto você pode clonar usando o seguinte comando:

```
git clone https://github.com/ccsg12/admin-idqbrn.git
```

## 🛠️ Abrir e rodar o projeto

Agora que já tem a pasta do projeto na sua máquina, dentro dela instale as dependências:
```
yarn install
```

Então podemos rodar um servidor local:
```
yarn dev
```

