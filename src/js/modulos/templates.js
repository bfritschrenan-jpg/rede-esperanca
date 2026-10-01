import { projetosSociais } from "../dados/projetos.js";

export function renderizarProjetos() {
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