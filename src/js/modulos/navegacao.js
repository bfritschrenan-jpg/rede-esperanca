import { iniciarFormulario } from "./formulario.js";
import { renderizarProjetos } from "./templates.js";

const paginas = {
    inicio: "/html/inicio.html",
    projetos: "/html/projetos.html",
    cadastro: "/html/cadastro.html"
};

function obterPaginaAtual() {
    const pagina = window.location.hash.replace("#", "");
    return paginas[pagina] ? pagina : "inicio";
}

function atualizarMenu(paginaAtual) {
    const links = document.querySelectorAll(".link-spa");

    links.forEach(function (link) {
        link.classList.toggle("ativo", link.dataset.pagina === paginaAtual);
    });
}

function iniciarBotaoColaborar() {
    const botaoColaborar = document.querySelector("#botao-colaborar");
    const toastColaborar = document.querySelector("#toast-colaborar");

    if (!botaoColaborar || !toastColaborar) {
        return;
    }

    botaoColaborar.addEventListener("click", function () {
        toastColaborar.hidden = false;

        setTimeout(function () {
            toastColaborar.hidden = true;
            window.location.hash = "cadastro";
        }, 1200);
    });
}

export async function carregarPagina(pagina) {
    const conteudoPrincipal = document.querySelector("#conteudo-principal");
    const arquivo = paginas[pagina] || paginas.inicio;

    try {
        const resposta = await fetch(arquivo);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a página.");
        }

        const conteudo = await resposta.text();

        conteudoPrincipal.innerHTML = conteudo;
        document.title = `Rede Esperança | ${pagina}`;
        atualizarMenu(pagina);
        iniciarFormulario();
        renderizarProjetos();
        iniciarBotaoColaborar();
        conteudoPrincipal.focus();
    } catch (erro) {
        conteudoPrincipal.innerHTML = `
      <section class="container secao-formulario">
        <div class="alerta alerta-erro">
          Não foi possível carregar o conteúdo. Execute o projeto pelo Five Server.
        </div>
      </section>
    `;
    }
}

export function iniciarNavegacaoSPA() {
    document.addEventListener("click", function (evento) {
        const link = evento.target.closest(".link-spa");

        if (!link) {
            return;
        }

        evento.preventDefault();
        window.location.hash = link.dataset.pagina;
    });

    window.addEventListener("hashchange", function () {
        carregarPagina(obterPaginaAtual());
    });

    carregarPagina(obterPaginaAtual());
}