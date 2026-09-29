# Rede Esperança

Plataforma web académica para uma ONG fictícia, desenvolvida para apresentar iniciativas sociais e permitir o registo de voluntários, doadores e parceiros.

## Funcionalidades

- Página inicial com apresentação da Rede Esperança.
- Consulta de projetos e iniciativas sociais.
- Formulário de cadastro de colaboradores.
- Validação de CPF, telefone, CEP e campos obrigatórios.
- Armazenamento local dos dados do formulário no navegador.
- Navegação responsiva entre as páginas.
- Recursos de acessibilidade no formulário.

## Tecnologias utilizadas

- HTML5 para a estrutura e a semântica das páginas.
- CSS3 para estilos, layout e responsividade.
- JavaScript ES Modules para interatividade e regras de negócio.
- `localStorage` para persistência local dos dados do formulário.
- Git e GitHub para versionamento e colaboração.

## Estrutura do projeto

```text
rede-esperanca/
├── css/
│   └── style.css
├── html/
│   ├── index.html
│   ├── inicio.html
│   ├── cadastro.html
│   └── projetos.html
├── img/
├── js/
│   ├── app.js
│   ├── formulario.js
│   ├── menu.js
│   ├── navegacao.js
│   ├── projetos.js
│   ├── storage.js
│   └── templates.js
└── README.md
```

## Pré-requisitos

- Git para clonar o repositório.
- Um navegador atualizado.
- Visual Studio Code é recomendado.
- A extensão Live Server é opcional, mas recomendada para executar o projeto localmente.

Não é necessário instalar dependências npm, pois o projeto utiliza HTML, CSS e JavaScript nativo.

## Instalação local

Clone o repositório e aceda à pasta do projeto:

```bash
git clone https://github.com/bfritschrenan-jpg/rede-esperanca.git
cd rede-esperanca
```

Abra a pasta no Visual Studio Code:

```bash
code .
```

Para executar, abra o ficheiro `html/index.html` no navegador ou use a extensão Live Server no VS Code. Com o Live Server, clique com o botão direito em `html/index.html` e selecione **Open with Live Server**.

## Build e testes

Este é um projeto front-end estático. Não há processo de build nem dependências externas obrigatórias. Também não há uma suíte de testes automatizados configurada neste momento. A validação pode ser feita executando a aplicação no navegador e verificando a navegação, o formulário, as mensagens de validação e o armazenamento local.

## Versionamento e colaboração

O projeto utiliza GitFlow simplificado:

- `main`: versão estável do projeto.
- `develop`: integração das funcionalidades em desenvolvimento.
- `feature/*`: implementação de tarefas isoladas.

As alterações devem ser registadas em commits descritivos e enviadas para o GitHub. Issues são usadas para descrever tarefas, milestones para agrupar objetivos de uma entrega e pull requests para rever e integrar branches de funcionalidade em `develop`.

Exemplo de fluxo:

```bash
git switch develop
git pull origin develop
git switch -c feature/nova-funcionalidade
# realizar alterações
git add .
git commit -m "feat: descreve a nova funcionalidade"
git push -u origin feature/nova-funcionalidade
```

Depois, deve ser aberta uma pull request da branch de funcionalidade para `develop`, com uma descrição do contexto, das alterações e dos testes realizados.

## Acessibilidade

O formulário utiliza labels associados aos campos, agrupamento com `fieldset` e `legend`, identificação de campos obrigatórios com `required` e `aria-required`, além de `role="status"` e `aria-live` para comunicar mensagens de retorno.

## Licença

Projeto académico desenvolvido para fins educacionais.
