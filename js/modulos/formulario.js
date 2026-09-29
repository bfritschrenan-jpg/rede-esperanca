import { salvarCadastro, recuperarCadastro } from "./storage.js";

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

function restaurarFormulario(formulario) {
    const dadosCadastro = recuperarCadastro();

    if (!dadosCadastro) {
        return;
    }

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

function obterDadosFormulario(formulario) {
    return {
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
}

export function iniciarFormulario() {
    const formulario = document.querySelector("#form-cadastro");
    const campoCpf = document.querySelector("#cpf");
    const campoTelefone = document.querySelector("#telefone");
    const campoCep = document.querySelector("#cep");
    const mensagemFormulario = document.querySelector("#mensagem-formulario");

    if (!formulario || !campoCpf || !mensagemFormulario) {
        return;
    }

    restaurarFormulario(formulario);

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
            const dadosCadastro = obterDadosFormulario(formulario);

            salvarCadastro(dadosCadastro);

            mensagemFormulario.textContent =
                "Cadastro enviado com sucesso! Seus dados foram salvos neste navegador.";

            formulario.reset();
        } else {
            formulario.reportValidity();
        }
    });
}