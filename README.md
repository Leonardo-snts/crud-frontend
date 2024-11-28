# Front-end com React e TypeScript

Esse projeto foi construido com React e Typescript, fazendo uso de Tailwind CSS para estilizar o conteúdo da pagina o mesmo recebe os dados de uma API REST e proporciona ter controle de uma lista de tarefas e reoordenar cards com interações drag-and-drop ou por interação com botões.

## Diretórios e Arquivos

### 1. components/
Contém componentes reutilizáveis para a interface do usuário:

ButtonAddTask.tsx: Botão que leva para página de adicinoar uma nova Tarefa.
ButtonHome.tsx: Botão para voltar para a página principal.

### 2. pages/
Define as páginas principais da aplicação:

AddTask.tsx: Página para adicionar uma nova tarefa.
TaskList.tsx: Página que exibe a lista de tarefas e permite fazer edições e remoções.

### 3. services/
Armazena as funções de comunicação com a API:

api.ts: Contém funções para interagir com os endpoints do backend, como criar, buscar, atualizar e deletar tarefas

## Arquivos Adicionais
- App.tsx: Configura a estrutura principal e as rotas da aplicação.
- index.tsx: Arquivo de entrada para renderizar a aplicação no DOM.
- index.css: Configurações globais de estilo usando TailwindCSS.

## Funcionalidades

### Página Inicial:
Tem como objetivo listar de forma simples uma lista de tarefas, permitindo editar os dados de alguma tarefa, ou alterar a ordem de prioridade, além disso quando o valor da tarefa é maior ou igual a R$ 1000,00 a mesma aplica um fundo amarelo para a tarefa, possui ícones ao lado direito da tarefa:
- Lixeira: Deleta a Tarefa (abre um modal para confirmar se deseja excluir)
- Lápis: Edita a Tarefa de acordo com a necessidade
- Seta para cima ou para baixo: move um card de Tarefa para cima ou para baixo alterando a ordem
- Drag-and-drop: Adicional para mover os cards com interação de movimentos (segure o card e o arraste para a posição desejada)
- Botão Adicionar Tarefa: Abre uma nova página para adicionar uma nova Tarefa
- Botão de Tema: Alterna entre o Tema Escuro ou Claro

### Página de Adicionar Produtos
Página onde tem um pequeno formulário para ser preenchido com os detalhes da Tarefa e exibe erros caso o formulário não esteja completo ou já exista algum com o mesmo nome:
- Formulário: Campos para adicionar detalhes da Tarefa
- Botão Incluir: Executa a adição da Tarefa
- Botão Voltar: Volta para a página Inicial com as Tarefas adicionadas
- Botão de Tema: Alterna entre o Tema Escuro ou Claro

## Instalação e Execução
### 1. Clone o repositório e navegue até a pasta do frontend:

 ```
git clone <url-do-repositorio>
cd src
 ```

### 2. Instale as dependências:

 ```
npm install
 ```

### 3. Inicie o servidor de desenvolvimento:

 ```
npm start
 ```

### Abra a aplicação: Acesse http://localhost:3000 no navegador.
