const conteudoPrincipal = document.querySelector("#conteudo-principal");

const paginas = {
    inicio: "inicio.html",
    projetos: "projetos.html",
    cadastro: "cadastro.html"
};

async function carregarPagina(pagina) {
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
        iniciarEventosDaPagina();
        conteudoPrincipal.focus();
    } catch (erro) {
        conteudoPrincipal.innerHTML = `
      <section class="container secao-formulario">
        <div class="alerta alerta-erro">
          Não foi possível carregar o conteúdo. Execute o projeto usando o Live Server.
        </div>
      </section>
    `;
    }
}

function navegarPara(pagina) {
    window.location.hash = pagina;
}

function atualizarMenu(paginaAtual) {
    const links = document.querySelectorAll(".link-spa");

    links.forEach(function (link) {
        const paginaDoLink = link.dataset.pagina;
        link.classList.toggle("ativo", paginaDoLink === paginaAtual);
    });
}

function obterPaginaAtual() {
    const pagina = window.location.hash.replace("#", "");
    return paginas[pagina] ? pagina : "inicio";
}

function iniciarNavegacaoSPA() {
    document.addEventListener("click", function (evento) {
        const link = evento.target.closest(".link-spa");

        if (!link) {
            return;
        }

        evento.preventDefault();
        navegarPara(link.dataset.pagina);
    });

    window.addEventListener("hashchange", function () {
        carregarPagina(obterPaginaAtual());
    });
}

function iniciarMenuResponsivo() {
    const botaoMenu = document.querySelector(".botao-menu");
    const menuPrincipal = document.querySelector(".menu");
    const botaoDropdown = document.querySelector(".botao-dropdown");
    const itemDropdown = document.querySelector(".item-dropdown");

    if (botaoMenu && menuPrincipal) {
        botaoMenu.addEventListener("click", function () {
            const menuAberto = menuPrincipal.classList.toggle("aberto");

            botaoMenu.classList.toggle("ativo", menuAberto);
            botaoMenu.setAttribute("aria-expanded", menuAberto);
        });
    }

    if (botaoDropdown && itemDropdown) {
        botaoDropdown.addEventListener("click", function () {
            const dropdownAberto = itemDropdown.classList.toggle("aberto");

            botaoDropdown.setAttribute("aria-expanded", dropdownAberto);
        });
    }
}

function somenteNumeros(valor) {
    return valor.replace(/\D/g, "");
}

function cpfValido(cpf) {
    cpf = somenteNumeros(cpf);

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;

    for (let i = 1; i <= 9; i++) {
        soma += Number(cpf.substring(i - 1, i)) * (11 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== Number(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += Number(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === Number(cpf.substring(10, 11));
}

const CHAVE_CADASTRO = "redeEsperancaCadastro";

function salvarCadastro(formulario) {
    const dadosCadastro = {
        nome: formulario.nome.value,
        nascimento: formulario.nascimento.value,
        cpf: formulario.cpf.value,
        email: formulario.email.value,
        telefone: formulario.telefone.value,
        cep: formulario.cep.value,
        endereco: formulario.endereco.value,
        numero: formulario.numero.value,
        bairro: formulario.bairro.value,
        cidade: formulario.cidade.value,
        estado: formulario.estado.value,
        tipoColaboracao: formulario["tipo-colaboracao"].value,
        interesse: formulario.interesse.value,
        mensagem: formulario.mensagem.value
    };

    localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(dadosCadastro));
}

function restaurarCadastro(formulario) {
    const dadosSalvos = localStorage.getItem(CHAVE_CADASTRO);

    if (!dadosSalvos) {
        return;
    }

    const dadosCadastro = JSON.parse(dadosSalvos);

    formulario.nome.value = dadosCadastro.nome || "";
    formulario.nascimento.value = dadosCadastro.nascimento || "";
    formulario.cpf.value = dadosCadastro.cpf || "";
    formulario.email.value = dadosCadastro.email || "";
    formulario.telefone.value = dadosCadastro.telefone || "";
    formulario.cep.value = dadosCadastro.cep || "";
    formulario.endereco.value = dadosCadastro.endereco || "";
    formulario.numero.value = dadosCadastro.numero || "";
    formulario.bairro.value = dadosCadastro.bairro || "";
    formulario.cidade.value = dadosCadastro.cidade || "";
    formulario.estado.value = dadosCadastro.estado || "";
    formulario.interesse.value = dadosCadastro.interesse || "";
    formulario.mensagem.value = dadosCadastro.mensagem || "";

    if (dadosCadastro.tipoColaboracao) {
        const opcao = formulario.querySelector(
            `[name="tipo-colaboracao"][value="${dadosCadastro.tipoColaboracao}"]`
        );

        if (opcao) {
            opcao.checked = true;
        }
    }
}

function iniciarFormulario() {
    const formulario = document.querySelector("#form-cadastro");
    const campoCpf = document.querySelector("#cpf");
    const campoTelefone = document.querySelector("#telefone");
    const campoCep = document.querySelector("#cep");
    const mensagemFormulario = document.querySelector("#mensagem-formulario");

    if (!formulario || !campoCpf || !mensagemFormulario) {
        return;
    }

    restaurarCadastro(formulario);

    campoCpf.addEventListener("input", function () {
        let cpf = somenteNumeros(campoCpf.value);

        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        campoCpf.value = cpf;
    });

    campoCpf.addEventListener("blur", function () {
        if (campoCpf.value === "") {
            campoCpf.setCustomValidity("");
            return;
        }

        if (!cpfValido(campoCpf.value)) {
            campoCpf.setCustomValidity("Digite um CPF válido.");
        } else {
            campoCpf.setCustomValidity("");
        }
    });

    if (campoTelefone) {
        campoTelefone.addEventListener("input", function () {
            let telefone = somenteNumeros(campoTelefone.value);

            if (telefone.length <= 10) {
                telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
                telefone = telefone.replace(/(\d{4})(\d)/, "$1-$2");
            } else {
                telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
                telefone = telefone.replace(/(\d{5})(\d)/, "$1-$2");
            }

            campoTelefone.value = telefone;
        });
    }

    if (campoCep) {
        campoCep.addEventListener("input", function () {
            let cep = somenteNumeros(campoCep.value);

            cep = cep.replace(/(\d{5})(\d)/, "$1-$2");

            campoCep.value = cep;
        });
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!cpfValido(campoCpf.value)) {
            campoCpf.setCustomValidity("Digite um CPF válido.");
            campoCpf.reportValidity();
            return;
        }

        campoCpf.setCustomValidity("");

        if (formulario.checkValidity()) {
            salvarCadastro(formulario);

            mensagemFormulario.textContent =
                "Cadastro enviado com sucesso! Seus dados foram salvos neste navegador.";

            formulario.reset();
        } else {
            formulario.reportValidity();
        }
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
            navegarPara("cadastro");
        }, 1200);
    });
}

const projetosSociais = [
    {
        categoria: "Educação",
        titulo: "Conecta Futuro",
        descricao: "Projeto de inclusão digital que oferece aulas básicas de informática, criação de currículos, navegação segura e apoio para uso de ferramentas digitais.",
        publico: "Jovens e adultos",
        atividades: "Informática básica e orientação profissional",
        necessidade: "Voluntários para ministrar oficinas"
    },
    {
        categoria: "Alimentação",
        titulo: "Mesa Solidária",
        descricao: "Iniciativa voltada à arrecadação de alimentos e montagem de cestas básicas destinadas a famílias em situação de vulnerabilidade social.",
        publico: "Famílias da comunidade local",
        atividades: "Arrecadação, triagem e entrega de alimentos",
        necessidade: "Doações de alimentos não perecíveis"
    },
    {
        categoria: "Capacitação",
        titulo: "Primeiro Passo",
        descricao: "Programa de preparação para o mercado de trabalho, com apoio na criação de currículos, preparação para entrevistas e oficinas sobre atendimento ao cliente.",
        publico: "Pessoas em busca do primeiro emprego",
        atividades: "Oficinas, palestras e simulações de entrevistas",
        necessidade: "Profissionais voluntários e empresas parceiras"
    },
    {
        categoria: "Comunidade",
        titulo: "Comunidade em Movimento",
        descricao: "Ação comunitária que promove campanhas de arrecadação, eventos de integração, orientação social e atividades para crianças, adolescentes e idosos.",
        publico: "Moradores da comunidade",
        atividades: "Eventos solidários e ações de cidadania",
        necessidade: "Apoio para organização de eventos"
    }
];

function renderizarProjetos() {
    const listaProjetos = document.querySelector("#lista-projetos");

    if (!listaProjetos) {
        return;
    }

    listaProjetos.innerHTML = projetosSociais.map(function (projeto) {
        return `
      <article class="projeto">
        <div class="projeto-conteudo">
          <span class="tag">${projeto.categoria}</span>
          <h2>${projeto.titulo}</h2>
          <p>${projeto.descricao}</p>

          <ul>
            <li><strong>Público atendido:</strong> ${projeto.publico}</li>
            <li><strong>Atividades:</strong> ${projeto.atividades}</li>
            <li><strong>Necessidade atual:</strong> ${projeto.necessidade}</li>
          </ul>
        </div>
      </article>
    `;
    }).join("");
}

function iniciarEventosDaPagina() {
    iniciarFormulario();
    iniciarBotaoColaborar();
    renderizarProjetos();
}

iniciarNavegacaoSPA();
iniciarMenuResponsivo();
carregarPagina(obterPaginaAtual());