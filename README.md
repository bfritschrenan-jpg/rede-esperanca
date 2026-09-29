# Rede Esperança

Projeto acadêmico de desenvolvimento front-end para uma plataforma fictícia de organização social. Apresenta as áreas de atuação da ONG, seus projetos e um formulário para pessoas interessadas em colaborar como voluntárias, doadoras ou parceiras.

## Funcionalidades

- Navegação entre Início, Projetos e Cadastro sem recarregar o documento principal.
- Menu responsivo com submenu.
- Exibição de projetos a partir de dados JavaScript.
- Formulário com validação de campos e máscaras para CPF, telefone e CEP.
- Armazenamento local dos dados do cadastro no navegador.
- Componentes visuais de feedback, como etiquetas, alerta e notificação toast.

## Tecnologias

HTML, CSS e JavaScript com módulos nativos. O projeto não possui uma etapa de instalação de dependências.

## Como executar localmente

1. Obtenha os arquivos do projeto e abra a pasta `ong_esperanca` no editor.
2. Inicie um servidor local, como o Five Server no VS Code.
3. Abra `html/index.html` por esse servidor.
4. Use o menu para acessar Início, Projetos e Cadastro.

O servidor local é necessário porque a navegação carrega arquivos HTML com `fetch()`. Abrir o arquivo diretamente pelo endereço `file://` pode impedir esse carregamento.

## Estrutura principal

- `html/index.html`: documento principal, cabeçalho, área de conteúdo e rodapé.
- `html/inicio.html`: conteúdo da página inicial.
- `html/projetos.html`: conteúdo da página de projetos.
- `html/cadastro.html`: formulário de cadastro.
- `css/style.css`: estilos e responsividade.
- `js/app.js`: inicialização dos módulos.
- `js/modulos/navegacao.js`: navegação e carregamento dos conteúdos.
- `js/modulos/menu.js`: comportamento do menu.
- `js/modulos/formulario.js`: máscaras e validação do cadastro.
- `js/modulos/storage.js`: gravação e leitura no armazenamento local.
- `js/modulos/templates.js` e `js/dados/projetos.js`: apresentação e dados dos projetos.
- `img/voluntarios.jpg`: imagem utilizada na interface.

## Limitações e uso dos dados

Este é um protótipo acadêmico: não há integração com back-end, banco de dados ou envio efetivo de cadastros à ONG. Os dados preenchidos ficam no `localStorage` do navegador utilizado e podem ser restaurados ao voltar ao formulário. Para testes, use somente dados fictícios; não informe CPF nem outros dados pessoais reais.

## Versionamento

O projeto usa `main` para a versão de lançamento e `develop` para integrar o desenvolvimento. Novas alterações são trabalhadas em branches `feature/` criadas a partir de `develop`, revisadas e depois integradas a ela. Correções urgentes podem ser trabalhadas em branches `hotfix/` quando necessárias.