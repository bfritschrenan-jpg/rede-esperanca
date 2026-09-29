export function iniciarMenuResponsivo() {
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