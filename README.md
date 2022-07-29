# Arquitetura do Projeto

- /.vscode - serve para debugar(apertar f5) o projeto, para debugar vc precisa primeira deixar o projeto rodando
           - precisa de uma extensão para rodar, [Deprecated] Debugger for Chrome ou outra 

- /nginx    - serve para o deploy
- /public - são os arquivos estáticos

- /src - onde está o projeto

## Estrutura do /src

- /api    - tem funções responsáveis para a comunicação com o back-end
- /domain - domínio do negócio, onde tem regras ou classes específicas do oriente, exemplo classe Poster
- /ui     - É a parte visual contendo os componentes, páginas, rotas, etc
- /utils  - Funções gerais que podem ser usadas por mais um arquivo

- App.jsx - Componente principal contendo contextos, rotas, página de manutenção

- index.jsx - Arquivo de entrada do React

## Estrutura do /src/ui

- /assets     - contêm imagens e icones
- /components - contêm elementos que podem ser reutilizados por páginas 
- /context    - São arquivos responsáveis pelos estados globais (dados globais, exemplo, token, lista de alunos, lista de professores) da aplicação. 
                 Obs, esses dados globais servem para não ficar 'passando os dados via props'
                 [LEITURA](https://reactjs.org/docs/context.html)

- /globalStyles - :)

- /pages      - É a página em si com a sua estrutura e utiliza os componentes                 
- /routes     - Contém as rotas das páginas, é divido em rotas publicas(public) e privadas(private) que irá ser direcionado dependendo do usuário


## Comandos para rotar o projeto

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Dúvidas sobre Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
