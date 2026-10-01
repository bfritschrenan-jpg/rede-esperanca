const CHAVE_CADASTRO = "redeEsperancaCadastro";

export function salvarCadastro(dadosCadastro) {
    localStorage.setItem(CHAVE_CADASTRO, JSON.stringify(dadosCadastro));
}

export function recuperarCadastro() {
    const dadosSalvos = localStorage.getItem(CHAVE_CADASTRO);

    if (!dadosSalvos) {
        return null;
    }

    return JSON.parse(dadosSalvos);
}